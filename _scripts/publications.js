/**
 * publications.js  –  NCEL publication browser
 * Vanilla JS, no dependencies beyond what the template already loads.
 * Reads RB_PUBS injected by research-browser.html (Liquid → JSON).
 */

(function () {
  'use strict';

  /* ── State ────────────────────────────────────────────────────────────── */
  var state = {
    view:        'year',     // 'year' | 'topic' | 'featured' | 'preprint'
    sort:        'year-desc',
    limitType:   '',         // '' | 'published' | 'preprint' | 'featured'
    yearFilter:  '',
    query:       '',
    activeTopics: []
  };

  /* ── DOM refs (populated after DOMContentLoaded) ─────────────────────── */
  var els = {};

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlightPI(str) {
    // Bold any variation of the PI name
    return str.replace(/(Cycowicz[^,;<]*)/g, '<strong>$1</strong>');
  }

  /* ── Filter & sort ────────────────────────────────────────────────────── */
  function applyFilters() {
    if (typeof PUB_DATA === 'undefined' || !PUB_DATA.length) return;

    var pubs = PUB_DATA.filter(function (p) {
      // Skip entries with no real title
      if (!p.title || p.title === 'Web of Science') return false;

      // Year filter
      if (state.yearFilter && p.year !== state.yearFilter) return false;

      // Type/limit filter
      if (state.limitType === 'preprint' && !p.preprint) return false;
      if (state.limitType === 'published' && p.preprint) return false;
      if (state.limitType === 'featured' && !p.featured) return false;

      // Topic filter
      if (state.activeTopics.length) {
        var pt = p.topics || [];
        if (!state.activeTopics.every(function (t) { return pt.includes(t); })) return false;
      }

      // Text search
      if (state.query) {
        var words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
        var hay = [
          p.title, p.authors, p.publisher, p.year,
          p.doi, p.abstract,
          (p.topics || []).join(' '),
          (p.keywords || []).join(' ')
        ].join(' ').toLowerCase();
        if (!words.every(function (w) { return hay.includes(w); })) return false;
      }

      return true;
    });

    // Sort
    pubs = pubs.slice().sort(function (a, b) {
      if (state.sort === 'year-asc') return (a.date || '').localeCompare(b.date || '');
      if (state.sort === 'title-asc') return (a.title || '').localeCompare(b.title || '');
      return (b.date || '').localeCompare(a.date || ''); // year-desc default
    });

    return pubs;
  }

  /* ── Render ───────────────────────────────────────────────────────────── */
  function render() {
    var pubs = applyFilters();
    if (!pubs) return;

    updateStatus(pubs);

    if (state.view === 'year') renderByYear(pubs);
    if (state.view === 'topic') renderByTopic(pubs);
    if (state.view === 'featured') renderFlat(pubs.filter(function (p) { return p.featured; }), 'featured');
    if (state.view === 'preprint') renderFlat(pubs.filter(function (p) { return p.preprint; }), 'preprint');
  }

  function updateStatus(pubs) {
    var total = (PUB_DATA || []).filter(function (p) {
      return p.title && p.title !== 'Web of Science';
    }).length;

    if (pubs.length < total || state.query || state.yearFilter || state.limitType || state.activeTopics.length) {
      els.status.innerHTML = 'Showing <strong>' + pubs.length + '</strong> of ' + total +
        ' publications. <a href="#" id="pub-clear-link">Clear filters</a>';
      var cl = qs('#pub-clear-link');
      if (cl) cl.addEventListener('click', function (e) { e.preventDefault(); clearAll(); });
    } else {
      els.status.innerHTML = '<strong>' + total + '</strong> publications';
    }
  }

  function renderByYear(pubs) {
    var el = els.byYearContent;
    if (!pubs.length) { el.innerHTML = emptyHtml(); return; }

    // Group
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
      return '<div class="pub-year-group" data-year="' + esc(year) + '">' +
        '<div class="pub-year-heading" onclick="PUB.toggleYear(this)">' +
          '<h2 class="pub-year-heading__label">' + esc(year) + '</h2>' +
          '<span class="pub-year-heading__count">(' + groups[year].length + ')</span>' +
          '<span class="pub-year-heading__toggle">▼</span>' +
        '</div>' +
        '<div class="pub-year-body">' +
          groups[year].map(pubCard).join('') +
        '</div>' +
      '</div>';
    }).join('');
  }

  function renderByTopic(pubs) {
    var el = els.byTopicContent;

    // Build tag cloud
    var tagCount = {};
    PUB_DATA.forEach(function (p) {
      if (!p.title || p.title === 'Web of Science') return;
      (p.topics || []).forEach(function (t) {
        tagCount[t] = (tagCount[t] || 0) + 1;
      });
    });

    var allTags = Object.keys(tagCount).sort(function (a, b) { return tagCount[b] - tagCount[a]; });

    var cloudHtml = allTags.map(function (t) {
      var active = state.activeTopics.includes(t) ? ' is-active' : '';
      return '<button class="pub-chip' + active + '" onclick="PUB.toggleTopic(' + JSON.stringify(t) + ')">' +
        esc(t) +
        '<span class="pub-chip__count">' + tagCount[t] + '</span>' +
      '</button>';
    }).join('');

    var listHtml;
    if (!state.activeTopics.length) {
      listHtml = '<p class="pub-empty">Select a topic above to filter publications.</p>';
    } else if (!pubs.length) {
      listHtml = emptyHtml();
    } else {
      listHtml = pubs.map(pubCard).join('');
    }

    el.innerHTML = '<div class="pub-topic-cloud">' + cloudHtml + '</div>' + listHtml;
  }

  function renderFlat(pubs, viewName) {
    var el = viewName === 'featured' ? els.featuredContent : els.preprintContent;
    if (!pubs.length) {
      el.innerHTML = '<p class="pub-empty">No ' + viewName + ' publications found.</p>';
    } else {
      el.innerHTML = pubs.map(pubCard).join('');
    }
  }

  /* ── Card HTML ────────────────────────────────────────────────────────── */
  function pubCard(p) {
    var cardId = 'pub-' + Math.random().toString(36).slice(2, 8);

    // Topic + status chips
    var chips = [];
    if (p.featured) chips.push('<span class="pub-card__chip pub-card__chip--featured">★ Featured</span>');
    if (p.preprint) chips.push('<span class="pub-card__chip pub-card__chip--preprint">Preprint</span>');
    (p.topics || []).forEach(function (t) {
      chips.push('<button class="pub-card__chip" onclick="PUB.filterTopic(' + JSON.stringify(t) + ')">' + esc(t) + '</button>');
    });
    var chipsHtml = chips.length ? '<div class="pub-card__chips">' + chips.join('') + '</div>' : '';

    // Title
    var doiClean = (p.doi || '').replace(/^doi:/, '').replace(/^https?:\/\/doi\.org\//, '');
    var doiUrl   = p.link || (doiClean ? 'https://doi.org/' + doiClean : '');
    var titleHtml = doiUrl
      ? '<a href="' + esc(doiUrl) + '" target="_blank" rel="noopener">' + esc(p.title || '(Untitled)') + '</a>'
      : esc(p.title || '(Untitled)');

    // Authors
    var authorsHtml = p.authors ? highlightPI(esc(p.authors)) : '';

    // Meta
    var meta = [p.publisher, p.year].filter(Boolean).join(' · ');

    // Links row
    var links = [];
    if (doiUrl) links.push('<a class="pub-card__link" href="' + esc(doiUrl) + '" target="_blank" rel="noopener">↗ DOI</a>');
    if (p.pdf)  links.push('<a class="pub-card__link" href="' + esc(p.pdf) + '" target="_blank" rel="noopener">⬇ PDF</a>');
    if (p.materials) links.push('<a class="pub-card__link" href="' + esc(p.materials) + '" target="_blank" rel="noopener">📁 Materials</a>');
    if (p.code)      links.push('<a class="pub-card__link" href="' + esc(p.code) + '" target="_blank" rel="noopener">{ } Code</a>');
    var linksHtml = links.length ? '<div class="pub-card__links">' + links.join('<span class="pub-card__link-sep">·</span>') + '</div>' : '';

    // Toggle buttons
    var toggles = '';
    if (p.abstract) {
      toggles += '<button class="pub-card__toggle-btn" onclick="PUB.toggleDrawer(\'' + cardId + '-abs\',this)" aria-expanded="false">Abstract</button>';
    }
    var bibtex = p.bibtex || buildBibtex(p);
    if (bibtex) {
      toggles += '<button class="pub-card__toggle-btn" onclick="PUB.toggleDrawer(\'' + cardId + '-bib\',this)" aria-expanded="false">BibTeX</button>';
    }
    var togglesHtml = toggles ? '<div class="pub-card__toggles">' + toggles + '</div>' : '';

    // Drawers
    var drawers = '';
    if (p.abstract) {
      drawers += '<div id="' + cardId + '-abs" class="pub-card__drawer">' +
        '<div class="pub-card__drawer-label">Abstract</div>' +
        '<p style="margin:0">' + esc(p.abstract) + '</p>' +
      '</div>';
    }
    if (bibtex) {
      drawers += '<div id="' + cardId + '-bib" class="pub-card__drawer">' +
        '<div class="pub-card__bibtex">' +
          '<button class="pub-card__copy-btn" onclick="PUB.copyBibtex(this,' + JSON.stringify(bibtex) + ')">Copy</button>' +
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
          '<div class="pub-card__authors">' + authorsHtml + '</div>' +
          '<div class="pub-card__meta">' + esc(meta) + '</div>' +
          linksHtml +
        '</div>' +
        togglesHtml +
      '</div>' +
      drawers +
    '</div>';
  }

  function emptyHtml() {
    return '<p class="pub-empty">No publications match. <a href="#" onclick="PUB.clearAll();return false;">Clear filters</a></p>';
  }

  /* ── BibTeX builder ───────────────────────────────────────────────────── */
  function buildBibtex(p) {
    if (!p.title) return '';
    var firstAuthor = (p.authors || 'author')
      .split(',')[0]
      .trim()
      .split(' ')
      .pop()
      .replace(/[^a-zA-Z]/g, '');
    var key = firstAuthor + (p.year || '');
    var doi = (p.doi || '').replace(/^doi:/, '').replace(/^https?:\/\/doi\.org\//, '');
    return '@article{' + key + ',\n' +
      '  title   = {' + (p.title || '') + '},\n' +
      '  author  = {' + (p.authors || '') + '},\n' +
      '  journal = {' + (p.publisher || '') + '},\n' +
      '  year    = {' + (p.year || '') + '}' +
      (doi ? ',\n  doi     = {' + doi + '}' : '') +
    '\n}';
  }

  /* ── Public API (called from inline HTML onclick) ─────────────────────── */
  window.PUB = {

    toggleYear: function (heading) {
      heading.classList.toggle('is-collapsed');
      var body = heading.nextElementSibling;
      body.style.display = body.style.display === 'none' ? '' : 'none';
    },

    toggleDrawer: function (id, btn) {
      var drawer = qs('#' + id);
      if (!drawer) return;
      var isOpen = drawer.classList.toggle('is-open');
      btn.classList.toggle('is-open', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
    },

    copyBibtex: function (btn, text) {
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied!';
        btn.classList.add('is-copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('is-copied');
        }, 2000);
      }).catch(function () {
        // fallback
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
      });
    },

    toggleTopic: function (tag) {
      var idx = state.activeTopics.indexOf(tag);
      if (idx === -1) state.activeTopics.push(tag);
      else state.activeTopics.splice(idx, 1);
      render();
    },

    filterTopic: function (tag) {
      // Switch to topic view with this tag active
      state.activeTopics = [tag];
      switchView('topic');
    },

    clearAll: clearAll
  };

  /* ── Event wiring ─────────────────────────────────────────────────────── */
  function switchView(name) {
    state.view = name;
    qsa('.pub-tab').forEach(function (t) {
      t.classList.toggle('is-active', t.dataset.view === name);
      t.setAttribute('aria-selected', t.dataset.view === name);
    });
    qsa('.pub-panel').forEach(function (p) {
      p.classList.toggle('is-active', p.id === 'pub-panel-' + name);
    });
    render();
  }

  function clearAll() {
    state.query       = '';
    state.yearFilter  = '';
    state.limitType   = '';
    state.activeTopics = [];
    if (els.search) els.search.value = '';
    if (els.year)   els.year.value   = '';
    if (els.limit)  els.limit.value  = '';
    render();
  }

  /* ── Init ─────────────────────────────────────────────────────────────── */
  function init() {
    if (typeof PUB_DATA === 'undefined') return;

    els.status        = qs('#pub-status');
    els.search        = qs('#pub-search');
    els.sort          = qs('#pub-sort');
    els.year          = qs('#pub-year');
    els.limit         = qs('#pub-limit');
    els.byYearContent = qs('#pub-panel-year');
    els.byTopicContent = qs('#pub-panel-topic');
    els.featuredContent = qs('#pub-panel-featured');
    els.preprintContent = qs('#pub-panel-preprint');

    if (!els.status) return; // not on this page

    // Tab clicks
    qsa('.pub-tab').forEach(function (tab) {
      tab.addEventListener('click', function () { switchView(tab.dataset.view); });
    });

    // Controls
    if (els.sort)  els.sort.addEventListener('change',  function () { state.sort       = els.sort.value;  render(); });
    if (els.year)  els.year.addEventListener('change',  function () { state.yearFilter = els.year.value;  render(); });
    if (els.limit) els.limit.addEventListener('change', function () { state.limitType  = els.limit.value; render(); });

    if (els.search) {
      var searchTimer;
      els.search.addEventListener('input', function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          state.query = els.search.value.trim().toLowerCase();
          render();
        }, 280);
      });
    }

    // Initial render
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
