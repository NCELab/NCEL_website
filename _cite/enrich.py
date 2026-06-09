"""
_cite/enrich.py
──────────────────────────────────────────────────────────────────────────────
DOI-based metadata enrichment for NCEL citations.

Run automatically by cite.py after citations.yaml is written, OR manually:
    python _cite/enrich.py

What it does for each citation that has a DOI and is missing data:
  1. Fetches metadata from Crossref /works/{doi}
     → fills abstract, publisher/journal, authors, date when missing
  2. Fetches BibTeX via DOI content negotiation
     → fills bibtex when missing
  3. Checks Unpaywall for a legal open-access PDF URL
     → fills pdf when missing and OA PDF is available

Results are merged BACK into _data/citations.yaml (only missing fields are
added; existing fields from sources.yaml or previous runs are never overwritten).

Configuration
─────────────
Set environment variable UNPAYWALL_EMAIL to your lab email so Unpaywall can
contact you if needed. Without it, Unpaywall requests are skipped.

    export UNPAYWALL_EMAIL=NCEL@nyspi.columbia.edu

Dependencies: requests (already in requirements.txt as a sub-dep of manubot)
──────────────────────────────────────────────────────────────────────────────
"""

import os
import re
import time
import json
import logging
from pathlib import Path

import yaml
from yaml.loader import SafeLoader

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
log = logging.getLogger(__name__)

CITATIONS_FILE = Path("_data/citations.yaml")
CROSSREF_URL   = "https://api.crossref.org/works/{doi}"
BIBTEX_ACCEPT  = "application/x-bibtex"
UNPAYWALL_URL  = "https://api.unpaywall.org/v2/{doi}?email={email}"

# Polite delay between network requests (seconds)
REQUEST_DELAY = 0.4


# ── Helpers ────────────────────────────────────────────────────────────────

def clean_doi(raw: str) -> str:
    """Return bare DOI like 10.1234/something from any URI/prefix form."""
    raw = raw.strip()
    # Remove common prefixes
    for prefix in ("https://doi.org/", "http://doi.org/", "doi:", "DOI:"):
        if raw.startswith(prefix):
            raw = raw[len(prefix):]
            break
    return raw.strip()


def is_doi(s: str) -> bool:
    """Check if string looks like a DOI."""
    s = clean_doi(s)
    return bool(re.match(r"^10\.\d{4,}", s))


def get(url: str, headers: dict = None, accept: str = None, timeout: int = 10):
    """HTTP GET with simple error handling. Returns (status_code, text/None)."""
    try:
        import requests
        h = headers or {}
        if accept:
            h["Accept"] = accept
        h.setdefault("User-Agent", "NCEL-cite-enricher/1.0 (https://ncelab.github.io)")
        r = requests.get(url, headers=h, timeout=timeout)
        return r.status_code, r.text
    except Exception as exc:
        log.debug("GET %s failed: %s", url, exc)
        return 0, None


# ── Enrichment functions ───────────────────────────────────────────────────

def enrich_from_crossref(doi: str) -> dict:
    """Return dict of fields to potentially fill from Crossref."""
    url = CROSSREF_URL.format(doi=doi)
    status, body = get(url, accept="application/json")
    if status != 200 or not body:
        log.debug("Crossref miss for %s (status %s)", doi, status)
        return {}

    try:
        data = json.loads(body).get("message", {})
    except (json.JSONDecodeError, AttributeError):
        return {}

    result = {}

    # Abstract – Crossref often has it
    abstract = data.get("abstract", "")
    if abstract:
        # Strip JATS XML tags like <jats:p>
        abstract = re.sub(r"<[^>]+>", "", abstract).strip()
        result["abstract"] = abstract

    # Publisher / journal
    journal = (
        data.get("container-title", [""])[0]
        or data.get("publisher", "")
    )
    if journal:
        result["publisher"] = journal

    # Authors
    authors_raw = data.get("author", [])
    if authors_raw:
        names = []
        for a in authors_raw:
            given  = a.get("given", "").strip()
            family = a.get("family", "").strip()
            if given or family:
                names.append(f"{given} {family}".strip())
        if names:
            result["authors"] = names

    # Date
    dp = (
        data.get("published-print", {}).get("date-parts")
        or data.get("published-online", {}).get("date-parts")
    )
    if dp and dp[0]:
        parts = dp[0]
        year  = str(parts[0]) if len(parts) > 0 else ""
        month = str(parts[1]).zfill(2) if len(parts) > 1 else "01"
        day   = str(parts[2]).zfill(2) if len(parts) > 2 else "01"
        if year:
            result["date"] = f"{year}-{month}-{day}"

    # Title
    titles = data.get("title", [])
    if titles:
        result["title"] = titles[0]

    # Link / landing page
    url_field = data.get("URL", "")
    if url_field:
        result["link"] = url_field

    return result


def fetch_bibtex(doi: str) -> str:
    """Fetch BibTeX via content negotiation from doi.org."""
    url = f"https://doi.org/{doi}"
    status, body = get(url, accept=BIBTEX_ACCEPT)
    if status == 200 and body and body.strip().startswith("@"):
        return body.strip()
    return ""


def fetch_oa_pdf(doi: str, email: str) -> str:
    """Check Unpaywall for a legal open-access PDF URL. Returns URL or ''."""
    if not email:
        return ""
    url = UNPAYWALL_URL.format(doi=doi, email=email)
    status, body = get(url, accept="application/json")
    if status != 200 or not body:
        return ""
    try:
        data = json.loads(body)
    except json.JSONDecodeError:
        return ""

    # Prefer best_oa_location with a PDF URL
    best = data.get("best_oa_location") or {}
    pdf  = best.get("url_for_pdf", "") or ""
    if pdf:
        return pdf

    # Fall back to any oa_location with a PDF
    for loc in data.get("oa_locations", []):
        pdf = loc.get("url_for_pdf", "") or ""
        if pdf:
            return pdf

    return ""


# ── Main ───────────────────────────────────────────────────────────────────

def load_yaml(path: Path):
    with open(path, encoding="utf-8") as f:
        return yaml.load(f, Loader=SafeLoader) or []


def save_yaml(path: Path, data):
    yaml.Dumper.ignore_aliases = lambda *_: True
    with open(path, "w", encoding="utf-8") as f:
        f.write("# DO NOT EDIT, GENERATED AUTOMATICALLY\n\n")
        yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)


def enrich(citations: list, unpaywall_email: str = "") -> tuple[list, int]:
    """
    Enrich citations in-place. Returns (updated_list, count_changed).
    Only fills fields that are missing/empty.
    """
    changed = 0

    for i, entry in enumerate(citations):
        # Determine raw DOI candidate
        raw_id  = entry.get("id", "")
        raw_doi = entry.get("doi", raw_id)

        if not is_doi(raw_doi):
            continue

        doi = clean_doi(raw_doi)

        # Track whether we update this entry
        entry_changed = False

        needs_crossref = any([
            not entry.get("abstract"),
            not entry.get("publisher"),
            not entry.get("authors"),
            not entry.get("date"),
            not entry.get("link"),
        ])

        if needs_crossref:
            log.info("[%d/%d] Crossref  %s", i + 1, len(citations), doi)
            cr = enrich_from_crossref(doi)
            time.sleep(REQUEST_DELAY)
            for field, value in cr.items():
                if not entry.get(field) and value:
                    entry[field] = value
                    entry_changed = True
                    log.debug("  + %s", field)

        if not entry.get("bibtex"):
            log.info("[%d/%d] BibTeX    %s", i + 1, len(citations), doi)
            bib = fetch_bibtex(doi)
            time.sleep(REQUEST_DELAY)
            if bib:
                entry["bibtex"] = bib
                entry_changed = True

        if not entry.get("pdf") and unpaywall_email:
            log.info("[%d/%d] Unpaywall %s", i + 1, len(citations), doi)
            pdf_url = fetch_oa_pdf(doi, unpaywall_email)
            time.sleep(REQUEST_DELAY)
            if pdf_url:
                entry["pdf"] = pdf_url
                entry_changed = True
                log.info("  ✓ OA PDF found")
            else:
                log.debug("  – no OA PDF")

        if entry_changed:
            changed += 1
            citations[i] = entry

    return citations, changed


def main():
    if not CITATIONS_FILE.exists():
        log.error("No %s found. Run cite.py first.", CITATIONS_FILE)
        return

    email = os.environ.get("UNPAYWALL_EMAIL", "")
    if not email:
        log.warning("UNPAYWALL_EMAIL not set – PDF enrichment will be skipped.")

    citations = load_yaml(CITATIONS_FILE)
    log.info("Loaded %d citations from %s", len(citations), CITATIONS_FILE)

    citations, n = enrich(citations, email)

    if n:
        save_yaml(CITATIONS_FILE, citations)
        log.info("Enriched %d citation(s) and saved %s", n, CITATIONS_FILE)
    else:
        log.info("No new enrichment needed.")


if __name__ == "__main__":
    main()
