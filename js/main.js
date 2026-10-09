/* ============================================================
   RILEY CARNEY — Official Portfolio & Engineering Resume
   main.js — Clean Executive Utilities
   Navigation, Clipboard & Print Controls
   ============================================================ */

(function () {
  'use strict';

  // Clear any legacy theme preference to ensure dark profile permanence
  try {
    localStorage.removeItem('rileycarney_theme_preference');
  } catch (err) {}

  /* ------------------------------------------------------------
     2. NAVIGATION SCROLL & ACTIVE SECTION HIGHLIGHT
     ------------------------------------------------------------ */
  const siteHeader = document.getElementById('site-header');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav .mobile-nav-link');
  const trackedSections = document.querySelectorAll('section[id]');

  function updateHeaderOnScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 15) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            const targetHref = `#${sectionId}`;

            desktopLinks.forEach((link) => {
              const matches = link.getAttribute('href') === targetHref;
              link.classList.toggle('active', matches);
            });

            mobileLinks.forEach((link) => {
              const matches = link.getAttribute('href') === targetHref;
              link.classList.toggle('active', matches);
            });
          }
        });
      },
      {
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0,
      }
    );

    trackedSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* ------------------------------------------------------------
     3. MOBILE DRAWER NAVIGATION
     ------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav');

  function closeMobileNav() {
    if (!mobileMenuBtn || !mobileNavDrawer) return;
    mobileMenuBtn.classList.remove('open');
    mobileNavDrawer.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  function openMobileNav() {
    if (!mobileMenuBtn || !mobileNavDrawer) return;
    mobileMenuBtn.classList.add('open');
    mobileNavDrawer.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        closeMobileNav();
        mobileMenuBtn.focus();
      }
    });
  }

  /* ------------------------------------------------------------
     6. SCROLL TO TOP UTILITY
     ------------------------------------------------------------ */
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------
     7. COPYRIGHT YEAR AUTO-UPDATE
     ------------------------------------------------------------ */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
