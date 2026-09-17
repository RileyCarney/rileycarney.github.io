/* ============================================================
   RILEY CARNEY — Official Portfolio & Engineering Resume
   main.js — Clean Executive Utilities
   Theme Management, Navigation, Clipboard & Print Controls
   ============================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------
     1. THEME CONTROLLER (LIGHT / DARK)
     ------------------------------------------------------------ */
  const THEME_STORAGE_KEY = 'rileycarney_theme_preference';
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      themeToggleBtn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light color theme' : 'Switch to dark color theme'
      );
      themeToggleBtn.setAttribute(
        'title',
        isDark ? 'Switch to light color theme' : 'Switch to dark color theme'
      );
    }
  }

  // Initialize theme immediately
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch (err) {
        // Handle private browsing or localStorage disabled
      }
    });
  }

  // React to OS theme changes if user hasn't explicitly set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

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
     4. CLIPBOARD UTILITY (COPY EMAIL)
     ------------------------------------------------------------ */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'carneyriley@gmail.com';
      const label = copyEmailBtn.querySelector('.copy-text');
      try {
        await navigator.clipboard.writeText(email);
        if (label) {
          const originalText = label.textContent;
          label.textContent = 'Copied';
          copyEmailBtn.setAttribute('aria-label', 'Email copied to clipboard');
          setTimeout(() => {
            label.textContent = originalText;
            copyEmailBtn.setAttribute('aria-label', 'Copy email address to clipboard');
          }, 2000);
        }
      } catch (err) {
        // Fallback for browsers that don't support async clipboard API
        window.location.href = `mailto:${email}`;
      }
    });
  }

  /* ------------------------------------------------------------
     5. PRINT SYSTEM DOSSIER
     ------------------------------------------------------------ */
  const printResumeBtn = document.getElementById('print-resume-btn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
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
