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
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
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

            sidebarLinks.forEach((link) => {
              const matches = link.getAttribute('href') === targetHref;
              link.classList.toggle('active', matches);
              if (matches) {
                link.setAttribute('aria-current', 'true');
              } else {
                link.removeAttribute('aria-current');
              }
            });

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

  function updateActiveOnScroll() {
    const scrollPos = window.scrollY + Math.min(300, window.innerHeight * 0.35);
    let currentId = '';

    // Check if at the bottom of the page
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
      currentId = 'contact';
    } else if (window.scrollY < 80) {
      currentId = 'hero';
    } else {
      trackedSections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = section.getAttribute('id');
        }
      });
    }

    if (currentId) {
      const targetHref = `#${currentId}`;
      sidebarLinks.forEach((link) => {
        const matches = link.getAttribute('href') === targetHref;
        link.classList.toggle('active', matches);
        if (matches) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
  updateActiveOnScroll();

  sidebarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          if (targetId === '#hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          sidebarLinks.forEach((l) => {
            l.classList.remove('active');
            l.removeAttribute('aria-current');
          });
          link.classList.add('active');
          link.setAttribute('aria-current', 'true');
          if (history.pushState) {
            history.pushState(null, '', targetId);
          }
        }
      }
    });
  });

  const brandLink = document.querySelector('.brand-link');
  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (history.pushState) {
        history.pushState(null, '', '#hero');
      }
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
      link.addEventListener('click', (e) => {
        const targetHref = link.getAttribute('href');
        if (targetHref === '#hero') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (history.pushState) {
            history.pushState(null, '', targetHref);
          }
        }
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
