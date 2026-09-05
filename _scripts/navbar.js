/**
 * NCEL Navbar - Interactive Script
 * 
 * Features:
 * - Dropdown menu toggle (hover + click)
 * - Keyboard navigation (Tab, Enter, Escape)
 * - Mobile accordion menus
 * - Accessible focus management
 * - 200ms delay before closing submenu on mouse leave
 */

(function() {
  'use strict';

  const TRANSITION_DELAY = 200; // ms before closing menu on mouse leave
  const IS_MOBILE = window.innerWidth <= 700;

  // ============================================================
  // INITIALIZATION
  // ============================================================

  document.addEventListener('DOMContentLoaded', initNavigation);
  window.addEventListener('resize', handleResize);

  function initNavigation() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.site-navigation');

    if (menuToggle) {
      setupMobileMenuToggle(menuToggle, navigation);
    }

    dropdowns.forEach(setupDropdown);
    markCurrentPage();
  }

  // ============================================================
  // MOBILE MENU TOGGLE
  // ============================================================

  function setupMobileMenuToggle(toggle, nav) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      toggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('is-open');

      // Close all dropdowns when opening/closing main menu
      if (isExpanded) {
        document.querySelectorAll('.dropdown-toggle').forEach(btn => {
          btn.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close menu when clicking on a nav item
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  // ============================================================
  // DROPDOWN SETUP
  // ============================================================

  function setupDropdown(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    const items = menu?.querySelectorAll('.dropdown-item');

    if (!toggle || !menu) return;

    let closeTimeout;

    // Desktop: Hover to open
    if (!IS_MOBILE) {
      dropdown.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);
        openDropdown(toggle, menu);
      });

      dropdown.addEventListener('mouseleave', () => {
        // Delay closing to allow mouse movement
        closeTimeout = setTimeout(() => {
          closeDropdown(toggle, menu);
        }, TRANSITION_DELAY);
      });
    }

    // Mobile & Desktop: Click to toggle
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        closeDropdown(toggle, menu);
      } else {
        // Close other dropdowns on mobile
        if (IS_MOBILE) {
          document.querySelectorAll('.dropdown-toggle').forEach(btn => {
            if (btn !== toggle) {
              closeDropdown(btn, btn.getAttribute('data-dropdown'));
            }
          });
        }
        openDropdown(toggle, menu);
      }
    });

    // Keyboard navigation
    if (items) {
      items.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown' && index < items.length - 1) {
            e.preventDefault();
            items[index + 1].focus();
          } else if (e.key === 'ArrowUp' && index > 0) {
            e.preventDefault();
            items[index - 1].focus();
          } else if (e.key === 'Home') {
            e.preventDefault();
            items[0].focus();
          } else if (e.key === 'End') {
            e.preventDefault();
            items[items.length - 1].focus();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            closeDropdown(toggle, menu);
            toggle.focus();
          }
        });
      });
    }

    // Close menu when focusing outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        closeDropdown(toggle, menu);
      }
    });
  }

  // ============================================================
  // DROPDOWN OPEN/CLOSE HELPERS
  // ============================================================

  function openDropdown(toggle, menu) {
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-expanded', 'true');
    toggle.classList.add('is-open');
    
    // Set data attribute for CSS targeting
    const menuId = menu.id;
    if (menuId) {
      toggle.closest('.nav-dropdown').setAttribute('data-expanded', 'true');
    }
  }

  function closeDropdown(toggle, menu) {
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('is-open');
    
    const dropdown = toggle.closest('.nav-dropdown');
    if (dropdown) {
      dropdown.removeAttribute('data-expanded');
    }
  }

  // ============================================================
  // CURRENT PAGE MARKING
  // ============================================================

  function markCurrentPage() {
    const currentPath = window.location.pathname;
    
    // Get all nav links and items
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Check if this is the current page
      if (isCurrentPage(href, currentPath)) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
        
        // Mark parent dropdown as active if applicable
        const dropdown = link.closest('.nav-dropdown');
        if (dropdown) {
          const parentToggle = dropdown.querySelector('.dropdown-toggle');
          if (parentToggle && link.classList.contains('dropdown-item')) {
            parentToggle.classList.add('is-active');
          }
        }
      }
    });
  }

  function isCurrentPage(href, currentPath) {
    if (!href) return false;
    
    // Normalize paths
    const normalizeUrl = (url) => {
      return url.replace(/\/$/, '') || '/';
    };
    
    const normalizedHref = normalizeUrl(href);
    const normalizedPath = normalizeUrl(currentPath);
    
    // Exact match
    if (normalizedHref === normalizedPath) return true;
    
    // Parent directory match (e.g., /people/ matches /people/pi/)
    if (normalizedPath.startsWith(normalizedHref + '/')) return true;
    
    return false;
  }

  // ============================================================
  // RESPONSIVE RESIZE HANDLER
  // ============================================================

  let resizeTimeout;
  
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const isMobileNow = window.innerWidth <= 700;
      
      // If switching between mobile and desktop, reset menus
      if (isMobileNow !== IS_MOBILE) {
        location.reload(); // Or implement sophisticated toggle logic
      }
    }, 250);
  }

  // ============================================================
  // FOCUS TRAP IN DROPDOWN (OPTIONAL - ENHANCE ACCESSIBILITY)
  // ============================================================

  function trapFocusInDropdown(menu, toggle) {
    const items = menu.querySelectorAll('.dropdown-item');
    if (items.length === 0) return;

    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    menu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift+Tab on first item -> focus toggle
        if (document.activeElement === firstItem) {
          e.preventDefault();
          toggle.focus();
        }
      } else {
        // Tab on last item -> loop to first
        if (document.activeElement === lastItem) {
          e.preventDefault();
          firstItem.focus();
        }
      }
    });
  }
})();
