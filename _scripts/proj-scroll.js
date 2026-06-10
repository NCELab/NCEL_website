/**
 * proj-scroll.js  v3
 * – Mouse hover: left 40% = scroll left, right 40% = scroll right, centre 20% = stop
 * – Speed accelerates toward edge (quadratic ease)
 * – Centre card is largest; cards shrink symmetrically away from centre
 * – Drag / touch / arrow button support
 */

(function () {
  'use strict';

  var REDUCED       = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DEAD_ZONE     = 0.20;   // centre ±10% = no scroll (total 20%)
  var MAX_SPEED     = 28;     // px per frame at edge
  var LERP          = 0.10;   // smoothing factor

  // Scale range for cards
  var SCALE_CENTER  = 1.08;
  var SCALE_EDGE    = 0.78;

  function init() {
    var wrapper = document.querySelector('.proj-scroll-track-wrapper');
    var track   = document.getElementById('proj-track');
    var prevBtn = document.getElementById('proj-prev');
    var nextBtn = document.getElementById('proj-next');
    var counter = document.getElementById('proj-counter');

    if (!track || !wrapper) return;

    var cards      = Array.from(track.querySelectorAll('.proj-scroll-card'));
    var totalCards = cards.length;

    var offset       = 0;
    var targetOffset = 0;
    var raf          = null;
    var isHovering   = false;
    var mouseNorm    = 0.5;   // normalised 0–1 cursor X within wrapper

    var dragStart = null;
    var dragBase  = 0;

    /* ── clamp ── */
    function clampOffset(x) {
      var maxScroll = -(track.scrollWidth - wrapper.clientWidth + 96);
      return Math.min(0, Math.max(maxScroll, x));
    }

    function applyOffset(x) {
      track.style.transform = 'translateX(' + x + 'px)';
    }

    /* ── scale cards by distance from centre ── */
    function updateScales() {
      var wrapRect = wrapper.getBoundingClientRect();
      var centre   = wrapRect.left + wrapRect.width / 2;

      // find max possible distance (half of track visible width)
      var halfW = wrapRect.width / 2;

      cards.forEach(function (card) {
        var r    = card.getBoundingClientRect();
        var cX   = r.left + r.width / 2;
        var dist = Math.abs(cX - centre);
        // normalise: 0 = at centre, 1 = at or beyond edge
        var t    = Math.min(dist / halfW, 1);
        var scale = SCALE_CENTER - (SCALE_CENTER - SCALE_EDGE) * t;
        card.style.transform = 'scale(' + scale.toFixed(3) + ')';
        card.style.zIndex    = Math.round((1 - t) * 10);
      });
    }

    /* ── counter ── */
    function updateCounter() {
      var wrapRect = wrapper.getBoundingClientRect();
      var centre   = wrapRect.left + wrapRect.width / 2;
      var best = 0, bestDist = Infinity;
      cards.forEach(function (card, i) {
        var r    = card.getBoundingClientRect();
        var dist = Math.abs((r.left + r.width / 2) - centre);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      if (counter) counter.textContent = (best + 1) + ' / ' + totalCards;
    }

    /* ── animation loop ── */
    function tick() {
      if (!REDUCED) {
        // compute scroll velocity from mouse position
        if (isHovering && dragStart === null) {
          var half     = (1 - DEAD_ZONE) / 2;  // = 0.40
          var deadHalf = DEAD_ZONE / 2;          // = 0.10

          var speed = 0;
          if (mouseNorm < 0.5 - deadHalf) {
            // left zone: mouseNorm goes from 0 → (0.5-deadHalf)
            var t = (0.5 - deadHalf - mouseNorm) / half; // 0 at dead edge, 1 at far left
            speed = t * t * MAX_SPEED;           // quadratic, scroll RIGHT (positive)
            targetOffset = clampOffset(targetOffset + speed);
          } else if (mouseNorm > 0.5 + deadHalf) {
            // right zone
            var t2 = (mouseNorm - (0.5 + deadHalf)) / half;
            speed = t2 * t2 * MAX_SPEED;
            targetOffset = clampOffset(targetOffset - speed);
          }
        }

        offset += (targetOffset - offset) * LERP;
        if (Math.abs(targetOffset - offset) < 0.3) offset = targetOffset;
        applyOffset(offset);
        updateScales();
        updateCounter();
      }

      if (isHovering || Math.abs(targetOffset - offset) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        updateScales();
        updateCounter();
        raf = null;
      }
    }

    function startLoop() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    /* ── hover ── */
    wrapper.addEventListener('mouseenter', function () {
      isHovering = true;
      startLoop();
    });

    wrapper.addEventListener('mouseleave', function () {
      isHovering = false;
    });

    wrapper.addEventListener('mousemove', function (e) {
      if (dragStart !== null) return;
      var rect  = wrapper.getBoundingClientRect();
      mouseNorm = (e.clientX - rect.left) / rect.width;
    });

    /* ── arrow buttons ── */
    function scrollByCard(dir) {
      var cardW = cards[0] ? cards[0].offsetWidth + 20 : 300;
      targetOffset = clampOffset(targetOffset - dir * cardW);
      startLoop();
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCard(1); });

    /* ── drag ── */
    track.addEventListener('mousedown', function (e) {
      dragStart = e.clientX;
      dragBase  = targetOffset;
      track.style.transition = 'none';
      isHovering = false;
    });

    window.addEventListener('mousemove', function (e) {
      if (dragStart === null) return;
      targetOffset = clampOffset(dragBase + (e.clientX - dragStart));
      offset       = targetOffset;
      applyOffset(offset);
      updateScales();
    });

    window.addEventListener('mouseup', function () {
      if (dragStart === null) return;
      track.style.transition = '';
      dragStart = null;
      startLoop();
    });

    /* ── touch ── */
    track.addEventListener('touchstart', function (e) {
      dragStart = e.touches[0].clientX;
      dragBase  = targetOffset;
      track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      if (dragStart === null) return;
      targetOffset = clampOffset(dragBase + (e.touches[0].clientX - dragStart));
      offset       = targetOffset;
      applyOffset(offset);
      updateScales();
    }, { passive: true });

    track.addEventListener('touchend', function () {
      if (dragStart === null) return;
      track.style.transition = '';
      dragStart = null;
      startLoop();
    });

    /* initial render */
    updateScales();
    updateCounter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
