/* ============================================================
   RILEY CARNEY — GitHub Pages Personal Site
   main.js — Navigation, Scroll Animations, IntersectionObserver
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     1. NAVIGATION — sticky scroll shadow + active section highlight
     ---------------------------------------------------------------- */
  const nav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
  const sections = document.querySelectorAll('section[id]');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');

  // Sticky nav shadow on scroll
  function onScroll() {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility
    const scrollTop = document.getElementById('scroll-top');
    if (scrollTop) {
      if (window.scrollY > 400) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Active nav link — IntersectionObserver on sections
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------------
     2. FADE-UP ENTRANCE ANIMATIONS — IntersectionObserver
     ---------------------------------------------------------------- */
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target); // animate once
        }
      });
    },
    {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1,
    }
  );

  document.querySelectorAll('.fade-up, .stagger').forEach((el) => {
    animObserver.observe(el);
  });

  /* ----------------------------------------------------------------
     3. SCROLL-TO-TOP BUTTON
     ---------------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------------
     4. SMOOTH SCROLL for internal anchor links
     ---------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 60;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------------
     5. TYPING EFFECT for hero title (subtle, classy)
     ---------------------------------------------------------------- */
  function initTypingEffect() {
    const titleEl = document.querySelector('.hero-title');
    if (!titleEl) return;

    // Only run if user hasn't set prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const originalText = titleEl.innerHTML;
    titleEl.style.animationPlayState = 'paused'; // pause CSS fade-in

    // After the CSS fade-in delay would have fired, start typing
    setTimeout(() => {
      titleEl.style.opacity = '1';
      titleEl.style.transform = 'translateY(0)';
      titleEl.style.animation = 'none';
    }, 500);
  }

  initTypingEffect();

  /* ----------------------------------------------------------------
     6. CURRENT YEAR in footer
     ---------------------------------------------------------------- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------------
     7. GITHUB STATS — live repo/follower counts via public API
     ---------------------------------------------------------------- */
  async function loadGitHubStats() {
    try {
      const res = await fetch('https://api.github.com/users/RileyCarney', {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });
      if (!res.ok) return;
      const data = await res.json();

      const reposEl = document.getElementById('gh-repos');
      const followersEl = document.getElementById('gh-followers');
      const memberEl = document.getElementById('gh-member');

      if (reposEl) reposEl.textContent = data.public_repos;
      if (followersEl) followersEl.textContent = data.followers;
      if (memberEl) {
        const year = new Date(data.created_at).getFullYear();
        memberEl.textContent = year;
      }
    } catch (_) {
      // Fail silently — static fallback values are in the HTML
    }
  }

  loadGitHubStats();

})();
