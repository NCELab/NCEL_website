/**
 * NCEL Navbar - Interactive Script
 *
 * Features:
 * - Dropdown menus: hover (desktop) + click + keyboard
 * - Forgiving pointer behaviour: short open delay, generous close delay, and
 *   an invisible CSS "hover bridge" so the menu never disappears while the
 *   mouse travels from the toggle down to the items
 * - Menu visibility is driven by ONE source of truth: the `data-expanded`
 *   attribute on .nav-dropdown (CSS also falls back to :hover / :focus-within)
 * - Mobile accordion menus + accessible focus management
 */

(function () {
  'use strict';

  const OPEN_DELAY = 60; // ms of hover intent before opening
  const CLOSE_DELAY = 280; // ms grace period before closing on mouse leave
  const DESKTOP_QUERY = '(min-width: 701px)'; // must match $mobile-breakpoint

  const desktopMQ = window.matchMedia(DESKTOP_QUERY);
  const isDesktop = () => desktopMQ.matches;

  const dropdowns = [];

  // ============================================================
  // INITIALIZATION
  // ============================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }

  function initNavigation() {
    // Tells the stylesheet that JS controls the menus (see header.scss)
    document.documentElement.classList.add('js-nav');

    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.site-navigation');

    if (menuToggle && navigation) {
      setupMobileMenuToggle(menuToggle, navigation);
    }

    document.querySelectorAll('.nav-dropdown').forEach(setupDropdown);
    markCurrentPage();

    // Close everything when clicking anywhere outside a dropdown
    document.addEventListener('click', (e) => {
      dropdowns.forEach((d) => {
        if (!d.root.contains(e.target)) closeDropdown(d, true);
      });
    });

    // Escape closes the open menu
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      dropdowns.forEach((d) => {
        if (isOpen(d)) {
          closeDropdown(d, true);
          d.toggle.focus();
        }
      });
    });

    window.addEventListener('resize', handleResize);
  }

  // ============================================================
  // MOBILE MENU TOGGLE
  // ============================================================

  function setupMobileMenuToggle(toggle, nav) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      toggle.setAttribute('aria-expanded', String(!isExpanded));
      nav.classList.toggle('is-open', !isExpanded);

      if (isExpanded) {
        dropdowns.forEach((d) => closeDropdown(d, true));
      }
    });

    // Close the mobile menu after tapping an actual link
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  // ============================================================
  // DROPDOWN SETUP
  // ============================================================

  function setupDropdown(root) {
    const toggle = root.querySelector('.dropdown-toggle');
    const menu = root.querySelector('.dropdown-menu');
    if (!toggle || !menu) return;

    const items = Array.from(menu.querySelectorAll('.dropdown-item'));
    const d = {
      root,
      toggle,
      menu,
      items,
      openTimer: null,
      closeTimer: null,
      lastPointerType: 'mouse',
      // After closing with a click, don't let the pointer immediately re-open
      // the menu while it is still sitting on the toggle.
      suppressHover: false,
    };
    dropdowns.push(d);

    // ---------- Pointer (desktop) ----------
    root.addEventListener('pointerdown', (e) => {
      d.lastPointerType = e.pointerType;
    });

    root.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch' || !isDesktop()) return;
      clearTimers(d);
      if (d.suppressHover) return;
      d.openTimer = setTimeout(() => openDropdown(d), OPEN_DELAY);
    });

    root.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'touch' || !isDesktop()) return;
      clearTimers(d);
      d.suppressHover = false;
      d.closeTimer = setTimeout(() => closeDropdown(d), CLOSE_DELAY);
    });

    // Moving back inside cancels a pending close (e.g. brief pointer glitches)
    menu.addEventListener('pointerenter', () => clearTimers(d));

    // ---------- Click ----------
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearTimers(d);

      dropdowns.forEach((other) => {
        if (other !== d) closeDropdown(other, true);
      });

      // Clicks fired by the keyboard (Enter / Space) report detail === 0
      const fromKeyboard = e.detail === 0;
      // With a mouse, a click never closes a menu the pointer is still sitting
      // on - closing that way is what made the menu feel like it "escaped".
      // It closes on mouse-out, Escape, or a click elsewhere instead.
      const usingMouse =
        !fromKeyboard &&
        isDesktop() &&
        d.lastPointerType !== 'touch' &&
        d.lastPointerType !== 'pen';

      if (isOpen(d) && !usingMouse) {
        closeDropdown(d, true);
        d.suppressHover = true; // don't bounce straight back open on hover
      } else {
        openDropdown(d);
        if (fromKeyboard) focusItem(d, 0);
      }
    });

    // Let a click on an item close the menu immediately
    menu.addEventListener('click', (e) => {
      if (e.target.closest('.dropdown-item')) closeDropdown(d, true);
    });

    // ---------- Keyboard ----------
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Down') {
        e.preventDefault();
        openDropdown(d);
        focusItem(d, 0);
      } else if (e.key === 'Escape') {
        closeDropdown(d, true);
      }
    });

    items.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && index < items.length - 1) {
          e.preventDefault();
          items[index + 1].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (index > 0) items[index - 1].focus();
          else toggle.focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          items[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeDropdown(d, true);
          toggle.focus();
        } else if (e.key === 'Tab' && !e.shiftKey && index === items.length - 1) {
          closeDropdown(d, true);
        }
      });
    });

    // Keyboard focus leaving the dropdown closes it
    root.addEventListener('focusout', (e) => {
      if (!root.contains(e.relatedTarget)) closeDropdown(d, true);
    });
  }

  // ============================================================
  // OPEN / CLOSE HELPERS
  // ============================================================

  // The menu is `visibility: hidden` until it opens, and a hidden element
  // cannot take focus - wait one frame so the style has been applied.
  function focusItem(d, index) {
    const item = d.items[index];
    if (!item) return;

    const tryFocus = () => {
      d.menu.getBoundingClientRect(); // force the new styles to be applied
      item.focus();
      return document.activeElement === item;
    };

    if (tryFocus()) return;
    requestAnimationFrame(() => {
      if (!tryFocus()) setTimeout(tryFocus, 80);
    });
  }

  function isOpen(d) {
    return d.root.getAttribute('data-expanded') === 'true';
  }

  function clearTimers(d) {
    clearTimeout(d.openTimer);
    clearTimeout(d.closeTimer);
    d.openTimer = null;
    d.closeTimer = null;
  }

  function openDropdown(d) {
    clearTimers(d);
    d.root.setAttribute('data-expanded', 'true');
    d.toggle.setAttribute('aria-expanded', 'true');
    d.menu.setAttribute('aria-expanded', 'true');
    d.toggle.classList.add('is-open');
    alignMenu(d);
  }

  function closeDropdown(d, immediate) {
    if (immediate) clearTimers(d);
    d.root.removeAttribute('data-expanded');
    d.toggle.setAttribute('aria-expanded', 'false');
    d.menu.setAttribute('aria-expanded', 'false');
    d.toggle.classList.remove('is-open');
  }

  // Flip the menu to the right edge if it would overflow the viewport
  function alignMenu(d) {
    if (!isDesktop()) return;
    d.menu.removeAttribute('data-align');
    const rect = d.menu.getBoundingClientRect();
    if (rect.right > window.innerWidth - 8) {
      d.menu.setAttribute('data-align', 'right');
    }
  }

  // ============================================================
  // CURRENT PAGE MARKING
  // ============================================================

  function markCurrentPage() {
    const currentPath = window.location.pathname;

    document.querySelectorAll('.nav-link, .dropdown-item').forEach((link) => {
      const href = link.getAttribute('href');
      if (!isCurrentPage(href, currentPath)) return;

      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');

      if (link.classList.contains('dropdown-item')) {
        const parent = link.closest('.nav-dropdown');
        const parentToggle = parent && parent.querySelector('.dropdown-toggle');
        if (parentToggle) parentToggle.classList.add('is-active');
      }
    });
  }

  function isCurrentPage(href, currentPath) {
    if (!href) return false;
    const normalize = (url) => url.replace(/\/$/, '') || '/';
    const a = normalize(href);
    const b = normalize(currentPath);
    if (a === b) return true;
    if (a !== '/' && b.startsWith(a + '/')) return true;
    return false;
  }

  // ============================================================
  // RESIZE
  // ============================================================

  let resizeTimeout;

  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      dropdowns.forEach((d) => {
        closeDropdown(d, true);
        d.menu.removeAttribute('data-align');
        d.suppressHover = false;
      });
    }, 150);
  }
})();
