/**
 * proj-scroll.js
 * Horizontal card strip with:
 *  - Arrow button + drag navigation
 *  - Scroll-synced parallax depth (no autoplay)
 *  - Counter update
 */

(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PARALLAX_DEPTH = 0.06; // subtle: cards further right shift slightly left on scroll

  function init() {
    var track   = document.getElementById('proj-track');
    var prevBtn = document.getElementById('proj-prev');
    var nextBtn = document.getElementById('proj-next');
    var counter = document.getElementById('proj-counter');

    if (!track) return;

    var cards      = Array.from(track.querySelectorAll('.proj-scroll-card'));
    var totalCards = cards.length;
    var current    = 0;
    var offset     = 0;       // current translateX in px
    var dragStart  = null;
    var dragOffset = 0;

    /* ── counter ── */
    function updateCounter() {
      if (counter) counter.textContent = (current + 1) + ' / ' + totalCards;
    }

    /* ── scroll to card index ── */
    function scrollTo(index) {
      current = Math.max(0, Math.min(index, totalCards - 1));
      var card = cards[current];
      var trackRect  = track.parentElement.getBoundingClientRect();
      var cardRect   = card.getBoundingClientRect();
      // target: card left edge = 48px from wrapper left
      var padding = parseInt(getComputedStyle(track).paddingLeft) || 48;
      offset = offset - (cardRect.left - trackRect.left) + padding;
      applyOffset(offset);
      updateCounter();
    }

    function applyOffset(x) {
      if (!REDUCED) {
        track.style.transform = 'translateX(' + x + 'px)';
      }
    }

    /* ── buttons ── */
    if (prevBtn) prevBtn.addEventListener('click', function () { scrollTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollTo(current + 1); });

    /* ── drag / swipe ── */
    track.addEventListener('mousedown', function (e) {
      dragStart = e.clientX;
      dragOffset = offset;
      track.style.transition = 'none';
    });
    window.addEventListener('mousemove', function (e) {
      if (dragStart === null) return;
      var delta = e.clientX - dragStart;
      applyOffset(dragOffset + delta);
    });
    window.addEventListener('mouseup', function (e) {
      if (dragStart === null) return;
      var delta = e.clientX - dragStart;
      track.style.transition = '';
      if (Math.abs(delta) > 60) {
        scrollTo(delta < 0 ? current + 1 : current - 1);
      } else {
        applyOffset(offset); // snap back
      }
      dragStart = null;
    });

    /* Touch */
    track.addEventListener('touchstart', function (e) {
      dragStart = e.touches[0].clientX;
      dragOffset = offset;
      track.style.transition = 'none';
    }, { passive: true });
    track.addEventListener('touchmove', function (e) {
      if (dragStart === null) return;
      var delta = e.touches[0].clientX - dragStart;
      applyOffset(dragOffset + delta);
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (dragStart === null) return;
      var delta = e.changedTouches[0].clientX - dragStart;
      track.style.transition = '';
      if (Math.abs(delta) > 50) {
        scrollTo(delta < 0 ? current + 1 : current - 1);
      } else {
        applyOffset(offset);
      }
      dragStart = null;
    });

    /* ── Parallax on page scroll ── */
    if (!REDUCED) {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          cards.forEach(function (card, i) {
            // each card shifts by a different amount based on its position
            var depth = (i - current) * PARALLAX_DEPTH * scrollY * 0.015;
            card.style.setProperty('--px', depth.toFixed(2) + 'px');
          });
          ticking = false;
        });
      }, { passive: true });
    }

    /* ── Dismiss button: prevent navigation, just visual ── */
    cards.forEach(function (card) {
      var btn = card.querySelector('.proj-scroll-card__close');
      if (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          card.style.opacity = '0.4';
          card.style.pointerEvents = 'none';
        });
      }
    });

    updateCounter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
