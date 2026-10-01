/**
 * proj-scroll.js  v4 — text-card strip
 * Uses the browser's native horizontal scroll (+ CSS scroll-snap), so
 * trackpad, touch swipe and keyboard all work out of the box.
 * This script adds: arrow buttons, card counter, mouse drag on desktop,
 * and vertical mouse-wheel → horizontal scroll while hovering the strip.
 */

(function () {
  'use strict';

  function init() {
    var track   = document.getElementById('proj-track');
    if (!track) return;
    var wrapper = track.closest('.proj-scroll-track-wrapper');
    var prevBtn = document.getElementById('proj-prev');
    var nextBtn = document.getElementById('proj-next');
    var counter = document.getElementById('proj-counter');
    var cards   = Array.from(track.querySelectorAll('.proj-scroll-card'));
    if (!cards.length) return;

    function maxScroll() { return track.scrollWidth - track.clientWidth; }

    function step() {
      var gap = parseFloat(getComputedStyle(track).columnGap) || 24;
      return cards[0].offsetWidth + gap;
    }

    /* index of the first card that is mostly in view */
    function currentIndex() {
      var left = track.scrollLeft;
      if (left >= maxScroll() - 2) return cards.length - 1;
      return Math.min(cards.length - 1, Math.round(left / step()));
    }

    function update() {
      var left = track.scrollLeft;
      var atStart = left <= 2;
      var atEnd = left >= maxScroll() - 2;
      if (counter) counter.textContent = (currentIndex() + 1) + ' / ' + cards.length;
      if (prevBtn) prevBtn.disabled = atStart;
      if (nextBtn) nextBtn.disabled = atEnd;
      if (wrapper) wrapper.classList.toggle('is-end', atEnd);
    }

    function scrollByCard(dir) {
      track.scrollBy({ left: dir * step(), behavior: 'smooth' });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCard(1); });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollByCard(-1); }
    });

    var ticking = false;
    track.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', update);

    /* vertical mouse wheel scrolls the strip sideways (until it reaches an end) */
    track.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // trackpad sideways swipe: leave native
      var left = track.scrollLeft;
      if ((e.deltaY < 0 && left <= 0) || (e.deltaY > 0 && left >= maxScroll() - 1)) return;
      e.preventDefault();
      track.scrollBy({ left: e.deltaY, behavior: 'auto' });
    }, { passive: false });

    /* mouse drag (touch devices already swipe natively) */
    var startX = null, startLeft = 0, moved = false;

    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      moved = false;
    });

    window.addEventListener('pointermove', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        track.classList.add('is-dragging');
      }
      if (moved) track.scrollLeft = startLeft - dx;
    });

    window.addEventListener('pointerup', function () {
      if (startX === null) return;
      startX = null;
      if (moved) {
        track.classList.remove('is-dragging');
        // snap to the nearest card after dragging
        track.scrollTo({ left: currentIndex() * step(), behavior: 'smooth' });
      }
    });

    /* a drag should not also open the card link */
    track.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    /* prevent native link/image ghost-drag */
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
