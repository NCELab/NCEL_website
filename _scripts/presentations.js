/**
 * presentations.js – NCEL presentations browser (posters + oral presentations)
 *
 * Data: PRES_DATA (injected inline by _includes/presentations-browser.html,
 *       sourced from _data/presentations.yml)
 *
 * Mirrors the interaction pattern of publications.js (search / sort / year
 * filter / section tabs) but only needs a flat card list per section, since
 * presentations aren't grouped by year.
 */

(function () {
  'use strict';

  var state = {
    section:    'all',
    sort:       'year-desc',
    yearFilter: '',
    query:      ''
  };

  var els = {};

  function qs(sel, ctx)  { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function matchesFilters(p) {
    if (!p.title) return false;
    if (state.yearFilter && p.year !== state.yearFilter) return false;
    if (state.query) {
      var words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
      var hay = [p.title, p.authors, p.venue, p.year, p.abstract, p.type]
        .join(' ').toLowerCase();
      if (!words.every(function (w) { return hay.includes(w); })) return false;
    }
    return true;
  }

  function bySection(p) {
    if (state.section === 'poster') return p.type === 'Poster';
    if (state.section === 'oral')   return p.type === 'Oral Presentation';
    return true;
  }

  function applySort(arr) {
    return arr.slice().sort(function (a, b) {
      if (state.sort === 'year-asc')  return (a.date || '').localeCompare(b.date || '');
      if (state.sort === 'title-asc') return (a.title || '').localeCompare(b.title || '');
      return (b.date || '').localeCompare(a.date || '');
    });
  }

  function presentationCard(p) {
    var excerpt = (p.abstract || '').slice(0, 200);
    if ((p.abstract || '').length > 200) excerpt += '…';

    var file  = p.type === 'Oral Presentation' ? (p.slides || p.poster) : (p.poster || p.slides);
    var label = p.type === 'Oral Presentation' ? 'View Slides →' : 'View Poster →';

    return '<div class="pub-card pub-card--poster">' +
      '<div class="pub-card__body pub-card__body--centered">' +
        '<div class="pub-card__chips">' +
          '<span class="pub-card__chip pub-card__chip--preprint">' + esc(p.type || 'Poster') + '</span>' +
        '</div>' +
        '<div class="pub-card__title">' + esc(p.title || '(Untitled)') + '</div>' +
        '<div class="pub-card__authors">' + esc(p.authors) + '</div>' +
        '<div class="pub-card__meta">' + esc([p.venue, p.year].filter(Boolean).join(' · ')) + '</div>' +
        (excerpt ? '<p class="pub-card__excerpt">' + esc(excerpt) + '</p>' : '') +
        (file
          ? '<a class="pub-card__learn-more" href="' + esc(file) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>'
          : '') +
      '</div>' +
    '</div>';
  }

  function renderList(pubs, listId, emptyMsg) {
    var el = qs('#' + listId);
    if (!el) return;
    el.innerHTML = pubs.length
      ? pubs.map(presentationCard).join('')
      : '<p class="pub-empty">' + emptyMsg + '</p>';
  }

  function render() {
    var filtered = (PRES_DATA || []).filter(matchesFilters).filter(bySection);
    var sorted = applySort(filtered);

    if (state.section === 'poster') {
      renderList(sorted, 'pres-list-poster', 'No posters match the current filters.');
    } else if (state.section === 'oral') {
      renderList(sorted, 'pres-list-oral', 'No oral presentations match the current filters.');
    } else {
      renderList(sorted, 'pres-list-all', 'No presentations match the current filters.');
    }
    updateStatus();
  }

  function updateStatus() {
    var total = (PRES_DATA || []).filter(function (p) { return p.title; }).length;
    var hasFilter = state.query || state.yearFilter;
    if (hasFilter) {
      var showing = (PRES_DATA || []).filter(matchesFilters).filter(bySection).length;
      els.status.innerHTML =
        'Showing <strong>' + showing + '</strong> of ' + total +
        ' presentations. <a href="#" id="pres-clear-link">Clear filters</a>';
      var cl = qs('#pres-clear-link');
      if (cl) cl.addEventListener('click', function (e) { e.preventDefault(); clearAll(); });
    } else {
      els.status.innerHTML = '<strong>' + total + '</strong> total presentations';
    }
  }

  function clearAll() {
    state.query = ''; state.yearFilter = '';
    if (els.search) els.search.value = '';
    if (els.year)   els.year.value   = '';
    render();
  }

  function switchSection(name) {
    state.section = name;
    qsa('.pub-section-tab').forEach(function (t) {
      if (t.dataset.section !== 'all' && t.dataset.section !== 'poster' && t.dataset.section !== 'oral') return;
      t.classList.toggle('is-active', t.dataset.section === name);
      t.setAttribute('aria-selected', t.dataset.section === name);
    });
    ['pres-panel-all', 'pres-panel-poster', 'pres-panel-oral'].forEach(function (id) {
      var panel = qs('#' + id);
      if (panel) panel.classList.toggle('is-active', id === 'pres-panel-' + name);
    });
    render();
  }

  function init() {
    if (typeof PRES_DATA === 'undefined') return;

    els.status = qs('#pres-status');
    els.search = qs('#pres-search');
    els.sort   = qs('#pres-sort');
    els.year   = qs('#pres-year');

    if (!els.status) return;

    qsa('.pub-section-tab[data-section="all"], .pub-section-tab[data-section="poster"], .pub-section-tab[data-section="oral"]')
      .forEach(function (tab) {
        tab.addEventListener('click', function () { switchSection(tab.dataset.section); });
      });

    if (els.sort) els.sort.addEventListener('change', function () { state.sort = els.sort.value; render(); });
    if (els.year) els.year.addEventListener('change', function () { state.yearFilter = els.year.value; render(); });

    if (els.search) {
      var timer;
      els.search.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          state.query = els.search.value.trim().toLowerCase();
          render();
        }, 280);
      });
    }

    switchSection('all');
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
