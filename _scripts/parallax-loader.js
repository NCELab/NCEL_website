/**
 * parallax-loader.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Responsibilities:
 * 1. Loading screen – tracks image preload progress, drives the progress bar
 *    and percentage counter, then fades out the loader once all assets are
 *    ready (or after a safety timeout).
 * 2. Hero parallax – listens to scroll events and moves the hero background
 *    image at a reduced rate (scroll-synced, no autoplay). Fully disabled
 *    when prefers-reduced-motion is set.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
      'use strict';

   /* ── Config ────────────────────────────────────────────────────────────── */
   const PARALLAX_SPEED = 0.35; // 0 = fixed, 1 = normal scroll speed
   const LOADER_TIMEOUT = 8000; // ms – max wait before forcing loader hide
   const LOADER_MIN_TIME = 600; // ms – always show loader for at least this long
   const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

   /* ── Utilities ─────────────────────────────────────────────────────────── */
   function qs(sel, ctx) { return (ctx || document).querySelector(sel); }

   function preloadImage(src) {
           return new Promise(function (resolve) {
                     if (!src) { resolve(); return; }
                     var img = new Image();
                     img.onload = resolve;
                     img.onerror = resolve; // resolve even on error so we don't block forever
                                    img.src = src;
           });
   }

   /* ── Main init (wait for DOM) ──────────────────────────────────────────── */
   function init() {
           /* ══════════════════════════════════════════════════════════════════════════
              1. LOADING SCREEN
              ══════════════════════════════════════════════════════════════════════════ */
        var loader = qs('#ncel-loader');
           var loaderBar = qs('#ncel-loader-bar');
           var loaderPct = qs('#ncel-loader-pct');

        if (!loader) return; // not on homepage – nothing to do

        var startTime = Date.now();

        function setProgress(pct) {
                  var p = Math.min(100, Math.max(0, Math.round(pct)));
                  if (loaderBar) loaderBar.style.width = p + '%';
                  if (loaderPct) loaderPct.textContent = p + '%';
        }

        function hideLoader() {
                  var elapsed = Date.now() - startTime;
                  var delay = Math.max(0, LOADER_MIN_TIME - elapsed);
                  setTimeout(function () {
                              setProgress(100);
                              // Short pause so the bar visually hits 100 before fade
                                     setTimeout(function () {
                                                   loader.classList.add('is-hidden');
                                                   // Re-enable scroll after loader gone
                                                          document.body.style.overflow = '';
                                     }, 250);
                  }, delay);
        }

        // Prevent scroll during loading
        document.body.style.overflow = 'hidden';

        // Safety timeout – always hide loader eventually
        var safetyTimer = setTimeout(hideLoader, LOADER_TIMEOUT);

        /* Collect images to preload:
              - Hero background image (from data-hero-bg on the hero section)
              - Any images with data-preload="true" */
        function gatherImages() {
              var imgs = [];
              var heroEl = qs('.ncel-hero');
              if (heroEl) {
                var bg = heroEl.dataset.heroBg;
                if (bg && !bg.includes('{{')) imgs.push(bg);
              }
              document.querySelectorAll('[data-preload="true"]').forEach(function (el) {
                var src = el.src || el.dataset.src || el.href;
                if (src) imgs.push(src);
              });
              return imgs;
            }

        function runLoader() {
                  var images = gatherImages();

             if (!images.length) {
                         // Nothing to preload – just simulate a brief progress sweep
                    var steps = 0;
                         var total = 20;
                         var id = setInterval(function () {
                                       steps++;
                                       setProgress((steps / total) * 100);
                                       if (steps >= total) {
                                                       clearInterval(id);
                                                       clearTimeout(safetyTimer);
                                                       hideLoader();
                                       }
                         }, 30);
                         return;
             }

             var loaded = 0;
                  var n = images.length;

             // 建立一個包含所有圖片 Promise 的陣列
             var promises = images.map(function (src) {
                         return preloadImage(src).then(function () {
                                       loaded++;
                                       // 每好一張就更新一次進度條
                                                                 setProgress((loaded / n) * 100);
                         });
             });

             // 當所有圖片都處理完畢（包含 onerror 的狀況）
             Promise.all(promises).then(function () {
                         clearTimeout(safetyTimer);
                         hideLoader();
             }).catch(function () {
                         // 萬一有漏網之魚出錯，也強制關閉載入畫面
                              clearTimeout(safetyTimer);
                         hideLoader();
             });
        }

        runLoader();

        /* ══════════════════════════════════════════════════════════════════════════
              2. HERO PARALLAX (scroll-synced, no autoplay)
              ══════════════════════════════════════════════════════════════════════════ */
        if (REDUCED_MOTION) return; // honour prefers-reduced-motion

        var heroEl = null;
           var ticking = false;

        function initParallax() {
                  heroEl = qs('.ncel-hero');
                  if (!heroEl) return;

             /* The parallax works by shifting the CSS custom property --parallax-y
                     which is consumed by the hero's ::before pseudo-element in parallax.scss.
                     This keeps DOM writes minimal and avoids layout recalculation. */
             window.addEventListener('scroll', onScroll, { passive: true });
                  onScroll(); // initial position
        }

        function onScroll() {
                  if (ticking) return;
                  ticking = true;
                  requestAnimationFrame(updateParallax);
        }

        function updateParallax() {
                  ticking = false;
                  if (!heroEl) return;

             var rect = heroEl.getBoundingClientRect();
                  var viewH = window.innerHeight;
                  // Progress: 0 when hero top is at viewport bottom → 1 when hero bottom is at viewport top
             var progress = 1 - (rect.bottom / (viewH + rect.height));
                  var offset = progress * rect.height * PARALLAX_SPEED;

             heroEl.style.setProperty('--parallax-y', offset.toFixed(2) + 'px');
        }

        // Init parallax after DOM is ready (already in DOMContentLoaded, so call directly)
        initParallax();

        // Re-init if the viewport resizes (debounced)
        var resizeTimer;
           window.addEventListener('resize', function () {
                     clearTimeout(resizeTimer);
                     resizeTimer = setTimeout(function () {
                                 if (heroEl) updateParallax();
                     }, 150);
           });
   }

   // Wait for DOM to be ready before running
   if (document.readyState === 'loading') {
           document.addEventListener('DOMContentLoaded', init);
   } else {
           init();
   }

}());
