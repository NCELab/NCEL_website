/**
 * publications.js  –  NCEL three-section publication browser (v2)
 *
 * Sections:
 *   all         – full year-grouped timeline (deduped, year-desc default)
 *   peer-review – from PEER_REVIEW_DATA (_data/peer_review.yml)
 *   poster      – from POSTER_DATA (_data/posters.yml)
 *
 * Name styling:
 *   PI (Cycowicz)        → <strong>Cycowicz …</strong>
 *   NCEL members         → <u><strong class="pub-author-member">Name</strong></u>
 */

(function () {
  'use strict';

  /* ── State ────────────────────────────────────────────────────────────── */
  var state = {
    section:     'all',
    sort:        'year-desc',
    yearFilter:  '',
    query:       ''
  };

  var els = {};

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ── Author name rendering ────────────────────────────────────────────── */
  function renderAuthors(raw) {
    if (!raw) return '<span class="pub-card__authors-empty">[no author info]</span>';

    var parts = raw.split(/,\s*/);
    var names = [];
    var i = 0;
    while (i < parts.length) {
      var p = parts[i];
      if (i + 1 < parts.length && /^[A-Z][\.\w]{0,3}\.?$/.test(parts[i + 1].trim())) {
        names.push(p.trim() + ', ' + parts[i + 1].trim());
        i += 2;
      } else {
        names.push(p.trim());
        i += 1;
      }
    }

    var rendered = names.map(function (name) {
      var last = name.split(',')[0].trim();
      if (last === PI_NAME || name.indexOf(PI_NAME) !== -1) {
        return '<strong>' + esc(name) + '</strong>';
      }
      var isMember = NCEL_MEMBERS.some(function (m) {
        return last === m || name.indexOf(m) !== -1;
      });
      if (isMember) {
        return '<u><strong class="pub-author-member">' + esc(name) + '</strong></u>';
      }
      return esc(name);
    });

    if (rendered.length > 6) {
      rendered = rendered.slice(0, 6).concat(['<em>et al.</em>']);
    }

    return rendered.join(', ');
  }

  /* ── Filter helpers ───────────────────────────────────────────────────── */
  function matchesFilters(p) {
    if (!p.title || p.title === 'Web of Science') return false;
    if (state.yearFilter && p.year !== state.yearFilter) return false;
    if (state.query) {
      var words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
      var hay = [p.title, p.authors, p.publisher, p.year,
                 p.doi, p.abstract,
                 (p.topics || []).join(' '), (p.keywords || []).join(' ')
                ].join(' ').toLowerCase();
      if (!words.every(function (w) { return hay.includes(w); })) return false;
    }
    return true;
  }

  function applySort(arr) {
    return arr.slice().sort(function (a, b) {
      if (state.sort === 'year-asc')  return (a.date || '').localeCompare(b.date || '');
      if (state.sort === 'title-asc') return (a.title || '').localeCompare(b.title || '');
      return (b.date || '').localeCompare(a.date || '');
    });
  }

  /* ── Render ───────────────────────────────────────────────────────────── */
  function render() {
    var pubs = (PUB_DATA || []).filter(matchesFilters);
    var sorted = applySort(pubs);

    if (state.section === 'all') {
      renderByYear(sorted);
    } else if (state.section === 'peer-review') {
      var prPubs = (typeof PEER_REVIEW_DATA !== 'undefined' ? PEER_REVIEW_DATA : []).filter(matchesFilters);
      renderFlat(applySort(prPubs), 'peer-review');
    } else if (state.section === 'poster') {
      var posterPubs = (typeof POSTER_DATA !== 'undefined' ? POSTER_DATA : []).filter(matchesFilters);
      renderPosterList(posterPubs);
    }
    updateStatus();
  }

  /* ── Status bar ───────────────────────────────────────────────────────── */
  function updateStatus() {
    var total = (PUB_DATA || []).filter(function (p) {
      return p.title && p.title !== 'Web of Science';
    }).length;

    var hasFilter = state.query || state.yearFilter;
    if (hasFilter) {
      var showing = (PUB_DATA || []).filter(matchesFilters).length;
      els.status.innerHTML = 'Showing <strong>' + showing + '</strong> of ' + total +
        ' publications. <a href="#" id="pub-clear-link">Clear filters</a>';
      var cl = qs('#pub-clear-link');
      if (cl) cl.addEventListener('click', function (e) { e.preventDefault(); clearAll(); });
    } else {
      els.status.innerHTML = '<strong>' + total + '</strong> total publications';
    }
  }

  /* ── Flat list (Peer Review) ──────────────────────────────────────────── */
  function renderFlat(pubs, listId) {
    var el = qs('#pub-list-' + listId);
    if (!el) return;
    if (!pubs.length) {
      el.innerHTML = '<p class="pub-empty">No publications match the current filters.</p>';
    } else {
      el.innerHTML = pubs.map(pubCard).join('');
    }
  }

  /* ── All Publications: year groups ───────────────────────────────────── */
  function renderByYear(pubs) {
    var el = qs('#pub-list-all');
    if (!el) return;
    if (!pubs.length) {
      el.innerHTML = '<p class="pub-empty">No publications match. <a href="#" onclick="NCEL_PUB.clearAll();return false;">Clear filters</a></p>';
      return;
    }
    var groups = {};
    pubs.forEach(function (p) {
      var y = p.year || 'Unknown';
      if (!groups[y]) groups[y] = [];
      groups[y].push(p);
    });
    var years = Object.keys(groups).sort(function (a, b) {
      return state.sort === 'year-asc' ? a.localeCompare(b) : b.localeCompare(a);
    });
    el.innerHTML = years.map(function (year) {
      return yearGroup(year, groups[year]);
    }).join('');
  }

  function yearGroup(year, pubs) {
    return '<div class="pub-year-group" data-year="' + esc(year) + '">' +
      '<div class="pub-year-heading" onclick="NCEL_PUB.toggleYear(this)">' +
        '<h2 class="pub-year-heading__label">' + esc(year) + '</h2>' +
        '<span class="pub-year-heading__count">(' + pubs.length + ')</span>' +
        '<span class="pub-year-heading__toggle">▼</span>' +
      '</div>' +
      '<div class="pub-year-body" style="display:none">' + pubs.map(pubCard).join('') + '</div>' +
    '</div>';
  }

  /* ── Poster list ──────────────────────────────────────────────────────── */
  function renderPosterList(pubs) {
    var el = qs('#pub-list-poster');
    if (!el) return;
    el.innerHTML = pubs.length
      ? pubs.map(posterCard).join('')
      : '<p class="pub-empty">No posters match the current filters.</p>';
  }

  function posterCard(p) {
    var excerpt = (p.abstract || '').slice(0, 200);
    if ((p.abstract || '').length > 200) excerpt += '…';
    var posterFile = p.poster || p.pdf || '';

    return '<div class="pub-card pub-card--poster">' +
      '<div class="pub-card__body">' +
        '<div class="pub-card__title">' + esc(p.title || '(Untitled)') + '</div>' +
        '<div class="pub-card__authors">' + renderAuthors(p.authors) + '</div>' +
        '<div class="pub-card__meta">' + esc([p.publisher, p.year].filter(Boolean).join(' · ')) + '</div>' +
        '<p class="pub-card__excerpt">' + esc(excerpt) + '</p>' +
        (posterFile ? '<a class="pub-card__learn-more" href="' + esc(posterFile) + '" target="_blank" rel="noopener noreferrer">Learn More →</a>' : '') +
      '</div>' +
    '</div>';
  }

  /* ── Publication card ─────────────────────────────────────────────────── */
  function pubCard(p) {
    var id = 'pub-' + Math.random().toString(36).slice(2, 9);

    /* Chips — only preprint remains; featured chip removed */
    var chips = [];
    if (p.preprint) chips.push('<span class="pub-card__chip pub-card__chip--preprint">Preprint</span>');
    var chipsHtml = chips.length ? '<div class="pub-card__chips">' + chips.join('') + '</div>' : '';

    /* Title link */
    var doiClean = (p.doi || '').replace(/^doi:/, '').replace(/^https?:\/\/doi\.org\//, '');
    var doiUrl = p.link || (doiClean ? 'https://doi.org/' + doiClean : '');
    var titleHtml = doiUrl
      ? '<a href="' + esc(doiUrl) + '" target="_blank" rel="noopener">' + esc(p.title || '(Untitled)') + '</a>'
      : esc(p.title || '(Untitled)');

    /* Meta */
    var meta = [p.publisher, p.year].filter(Boolean).join(' · ');

    /* Links row */
    var links = [];
    if (doiUrl)      links.push('<a class="pub-card__link" href="' + esc(doiUrl) + '" target="_blank" rel="noopener">↗ DOI</a>');
    if (p.pdf)       links.push('<a class="pub-card__link" href="' + esc(p.pdf) + '" target="_blank" rel="noopener">⬇ PDF</a>');
    if (p.materials) links.push('<a class="pub-card__link" href="' + esc(p.materials) + '" target="_blank" rel="noopener">📁 Materials</a>');
    if (p.code)      links.push('<a class="pub-card__link" href="' + esc(p.code) + '" target="_blank" rel="noopener">{ } Code</a>');
    var linksHtml = links.length ? '<div class="pub-card__links">' + links.join('<span class="pub-card__link-sep">·</span>') + '</div>' : '';

    /* Toggle buttons */
    var toggles = '';
    if (p.abstract) {
      toggles += '<button class="pub-card__toggle-btn" onclick="NCEL_PUB.toggleDrawer(\'' + id + '-abs\',this)" aria-expanded="false">Abstract</button>';
    }
    var bibtex = p.bibtex || buildBibtex(p);
    if (bibtex) {
      toggles += '<button class="pub-card__toggle-btn" onclick="NCEL_PUB.toggleDrawer(\'' + id + '-bib\',this)" aria-expanded="false">BibTeX</button>';
    }
    var togglesHtml = toggles ? '<div class="pub-card__toggles">' + toggles + '</div>' : '';

    /* Drawers */
    var drawers = '';
    if (p.abstract) {
      drawers += '<div id="' + id + '-abs" class="pub-card__drawer">' +
        '<div class="pub-card__drawer-label">Abstract</div>' +
        '<p style="margin:0">' + esc(p.abstract) + '</p>' +
      '</div>';
    }
    if (bibtex) {
      drawers += '<div id="' + id + '-bib" class="pub-card__drawer">' +
        '<div class="pub-card__bibtex">' +
          '<button class="pub-card__copy-btn" onclick="NCEL_PUB.copyBibtex(this,' + JSON.stringify(bibtex) + ')">Copy</button>' +
          '<div class="pub-card__drawer-label">BibTeX</div>' +
          '<pre>' + esc(bibtex) + '</pre>' +
        '</div>' +
      '</div>';
    }

    return '<div class="pub-card">' +
      '<div class="pub-card__main">' +
        '<div class="pub-card__body">' +
          chipsHtml +
          '<div class="pub-card__title">' + titleHtml + '</div>' +
          '<div class="pub-card__authors">' + renderAuthors(p.authors) + '</div>' +
          '<div class="pub-card__meta">' + esc(meta) + '</div>' +
          linksHtml +
        '</div>' +
        togglesHtml +
      '</div>' +
      drawers +
    '</div>';
  }

  /* ── BibTeX fallback ──────────────────────────────────────────────────── */
  function buildBibtex(p) {
    if (!p.title) return '';
    var first = (p.authors || 'author').split(',')[0].trim().split(' ').pop().replace(/[^a-zA-Z]/g,'');
    var key   = first + (p.year || '');
    var doi   = (p.doi || '').replace(/^doi:/, '').replace(/^https?:\/\/doi\.org\//, '');
    return '@article{' + key + ',\n  title   = {' + (p.title || '') + '},\n  author  = {' +
      (p.authors || '') + '},\n  journal = {' + (p.publisher || '') + '},\n  year    = {' +
      (p.year || '') + '}' + (doi ? ',\n  doi     = {' + doi + '}' : '') + '\n}';
  }

  /* ── Public API ───────────────────────────────────────────────────────── */
  window.NCEL_PUB = {
    toggleYear: function (heading) {
      var body = heading.nextElementSibling;
      var isOpen = body.style.display !== 'none';
      if (isOpen) {
        body.style.display = 'none';
        heading.classList.add('is-collapsed');
      } else {
        body.style.display = '';
        heading.classList.remove('is-collapsed');
      }
    },
    toggleDrawer: function (id, btn) {
      var drawer = qs('#' + id);
      if (!drawer) return;
      var open = drawer.classList.toggle('is-open');
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open);
    },
    copyBibtex: function (btn, text) {
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied!';
        btn.classList.add('is-copied');
        setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('is-copied'); }, 2000);
      }).catch(function () {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
      });
    },
    clearAll: clearAll
  };

  /* ── Event wiring ─────────────────────────────────────────────────────── */
  function switchSection(name) {
    state.section = name;
    qsa('.pub-section-tab').forEach(function (t) {
      t.classList.toggle('is-active', t.dataset.section === name);
      t.setAttribute('aria-selected', t.dataset.section === name);
    });
    qsa('.pub-section-panel').forEach(function (p) {
      p.classList.toggle('is-active', p.id === 'pub-panel-' + name);
    });
    render();
  }

  function clearAll() {
    state.query = ''; state.yearFilter = '';
    if (els.search) els.search.value = '';
    if (els.year)   els.year.value   = '';
    render();
  }

  /* ── Init ─────────────────────────────────────────────────────────────── */
  function init() {
    if (typeof PUB_DATA === 'undefined') return;

    els.status = qs('#pub-status');
    els.search = qs('#pub-search');
    els.sort   = qs('#pub-sort');
    els.year   = qs('#pub-year');

    if (!els.status) return;

    qsa('.pub-section-tab').forEach(function (tab) {
      tab.addEventListener('click', function () { switchSection(tab.dataset.section); });
    });

    if (els.sort) els.sort.addEventListener('change', function () { state.sort = els.sort.value; render(); });
    if (els.year) els.year.addEventListener('change', function () { state.yearFilter = els.year.value; render(); });

    if (els.search) {
      var timer;
      els.search.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () { state.query = els.search.value.trim().toLowerCase(); render(); }, 280);
      });
    }

    switchSection('all');
    render();

    if (window.location.hash === '#open') {
      setTimeout(function () {
        qsa('.pub-year-heading').forEach(function (heading) {
          heading.classList.remove('is-collapsed');
          var body = heading.nextElementSibling;
          if (body) body.style.display = '';
        });
      }, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
