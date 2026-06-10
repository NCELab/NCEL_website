/**
 * proj-scroll.js
 * Horizontal card strip with:
 *  - Mouse position → scroll speed (hover-driven, no autoplay)
 *  - Scroll-synced parallax depth
 *  - Counter update
 *  - Drag / swipe support
 */

(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PARALLAX_DEPTH = 0.06;

  function init() {
    var wrapper = document.querySelector('.proj-scroll-track-wrapper');
    var track   = document.getElementById('proj-track');
    var prevBtn = document.getElementById('proj-prev');
    var nextBtn = document.getElementById('proj-next');
    var counter = document.getElementById('proj-counter');

    if (!track || !wrapper) return;

    var cards      = Array.from(track.querySelectorAll('.proj-scroll-card'));
    var totalCards = cards.length;
    var current    = 0;

    /* ── Offset state ── */
    var offset     = 0;      // current translateX in px
    var targetOffset = 0;    // where we want to be (for lerp)
    var raf        = null;
    var isHovering = false;
    var mouseX     = 0;      // normalised 0–1 position within wrapper

    /* ── Drag state ── */
    var dragStart  = null;
    var dragBase   = 0;

    /* ── Helpers ── */
    function clampOffset(x) {
      var maxScroll = -(track.scrollWidth - wrapper.clientWidth + 96);
      return Math.min(0, Math.max(maxScroll, x));
    }

    function applyOffset(x) {
      track.style.transform = 'translateX(' + x + 'px)';
    }

    function updateCounter() {
      // find which card is most visible in the centre of the wrapper
      var wrapRect = wrapper.getBoundingClientRect();
      var centre   = wrapRect.left + wrapRect.width / 2;
      var best = 0, bestDist = Infinity;
      cards.forEach(function (card, i) {
        var r = card.getBoundingClientRect();
        var dist = Math.abs((r.left + r.width / 2) - centre);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      current = best;
      if (counter) counter.textContent = (current + 1) + ' / ' + totalCards;
    }

    /* ── Lerp animation loop ── */
    function tick() {
      if (!REDUCED) {
        offset += (targetOffset - offset) * 0.08;
        if (Math.abs(targetOffset - offset) < 0.5) offset = targetOffset;
        applyOffset(offset);
      }
      updateCounter();

      if (isHovering || Math.abs(targetOffset - offset) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    function startLoop() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    /* ── Mouse hover → scroll ── */
    wrapper.addEventListener('mouseenter', function () {
      isHovering = true;
      startLoop();
    });

    wrapper.addEventListener('mouseleave', function () {
      isHovering = false;
      // loop will stop naturally once settled
    });

    wrapper.addEventListener('mousemove', function (e) {
      if (dragStart !== null) return; // don't interfere with drag
      var rect     = wrapper.getBoundingClientRect();
      mouseX       = (e.clientX - rect.left) / rect.width; // 0 = left, 1 = right

      // Dead zone: centre 20% does nothing
      var deadZone = 0.15;
      var speed    = 0;

      if (mouseX < deadZone) {
        // left zone → scroll left (positive offset)
        speed = (deadZone - mouseX) / deadZone;   // 0→1 as mouse moves to edge
        speed = speed * speed * 18;               // ease + max px per frame
        targetOffset = clampOffset(targetOffset + speed);
      } else if (mouseX > (1 - deadZone)) {
        // right zone → scroll right (negative offset)
        speed = (mouseX - (1 - deadZone)) / deadZone;
        speed = speed * speed * 18;
        targetOffset = clampOffset(targetOffset - speed);
      }
    });

    /* ── Arrow buttons ── */
    function scrollByCard(dir) {
      var step = (cards[0] ? cards[0].offsetWidth + 20 : 300) * dir * -1;
      targetOffset = clampOffset(targetOffset + step);
      startLoop();
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCard(1); });

    /* ── Drag / swipe ── */
    track.addEventListener('mousedown', function (e) {
      dragStart  = e.clientX;
      dragBase   = targetOffset;
      track.style.transition = 'none';
      isHovering = false;
    });

    window.addEventListener('mousemove', function (e) {
      if (dragStart === null) return;
      var delta  = e.clientX - dragStart;
      targetOffset = clampOffset(dragBase + delta);
      offset       = targetOffset;
      applyOffset(offset);
    });

    window.addEventListener('mouseup', function () {
      if (dragStart === null) return;
      track.style.transition = '';
      dragStart = null;
      startLoop();
    });

    /* Touch */
    track.addEventListener('touchstart', function (e) {
      dragStart  = e.touches[0].clientX;
      dragBase   = targetOffset;
      track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      if (dragStart === null) return;
      var delta  = e.touches[0].clientX - dragStart;
      targetOffset = clampOffset(dragBase + delta);
      offset       = targetOffset;
      applyOffset(offset);
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      if (dragStart === null) return;
      track.style.transition = '';
      dragStart = null;
      startLoop();
    });

    /* ── Parallax on page scroll ── */
    if (!REDUCED) {
      var pageTicking = false;
      window.addEventListener('scroll', function () {
        if (pageTicking) return;
        pageTicking = true;
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          cards.forEach(function (card, i) {
            var depth = (i - current) * PARALLAX_DEPTH * scrollY * 0.015;
            card.style.setProperty('--px', depth.toFixed(2) + 'px');
          });
          pageTicking = false;
        });
      }, { passive: true });
    }

    updateCounter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
