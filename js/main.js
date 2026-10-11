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

    const sectionsArr = Array.from(trackedSections);
    const firstSectionId = sectionsArr.length > 0 ? sectionsArr[0].getAttribute('id') : '';
    const lastSectionId = sectionsArr.length > 0 ? sectionsArr[sectionsArr.length - 1].getAttribute('id') : '';

    // Check if at the bottom of the page
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
      currentId = lastSectionId;
    } else if (window.scrollY < 80) {
      currentId = firstSectionId;
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
          const sectionsArr = Array.from(trackedSections);
          const firstSectionId = sectionsArr.length > 0 ? sectionsArr[0].getAttribute('id') : '';
          if (targetId === `#${firstSectionId}` || targetId === '#hero' || targetId === '#consulting-hero') {
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

  const brandLinks = document.querySelectorAll('.brand-link, .sidebar-brand-link');
  brandLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (history.pushState) {
          history.pushState(null, '', href);
        }
      }
    });
  });

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
        if (targetHref && targetHref.startsWith('#')) {
          if (targetHref === '#hero' || targetHref === '#consulting-hero') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (history.pushState) {
              history.pushState(null, '', targetHref);
            }
          }
        }
        closeMobileNav();
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (
        mobileNavDrawer.classList.contains('open') &&
        !mobileNavDrawer.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        closeMobileNav();
      }
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
     4. CONSULTING INQUIRY FORM CONTROLLER
     ------------------------------------------------------------ */
  const inquiryForm = document.getElementById('consulting-inquiry-form');
  const copyInquiryBtn = document.getElementById('btn-copy-inquiry');
  const feedbackEl = document.getElementById('inquiry-feedback');

  function getInquiryDetails() {
    const typeEl = document.querySelector('input[name="engagement_type"]:checked');
    const typeVal = typeEl ? typeEl.value : 'Scoped Project Sprint';
    const nameVal = (document.getElementById('inquiry-name') || {}).value || '';
    const companyVal = (document.getElementById('inquiry-company') || {}).value || '';
    const emailVal = (document.getElementById('inquiry-email') || {}).value || '';
    const timelineVal = (document.getElementById('inquiry-timeline') || {}).value || 'Immediate (Next 1-2 Weeks)';
    const scopeVal = (document.getElementById('inquiry-scope') || {}).value || '';

    return {
      type: typeVal,
      name: nameVal.trim(),
      company: companyVal.trim(),
      email: emailVal.trim(),
      timeline: timelineVal,
      scope: scopeVal.trim()
    };
  }

  function formatInquiryText(details) {
    return [
      `CONSULTING INQUIRY — RILEY CARNEY`,
      `---------------------------------`,
      `Engagement Type: ${details.type}`,
      `Client Name:     ${details.name || 'Not specified'}`,
      `Company/Org:     ${details.company || 'Not specified'}`,
      `Work Email:      ${details.email || 'Not specified'}`,
      `Target Timeline: ${details.timeline}`,
      ``,
      `Project Scope & Technical Objectives:`,
      `${details.scope || 'To be discussed during initial consultation.'}`,
      `---------------------------------`
    ].join('\n');
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const details = getInquiryDetails();

      const subject = encodeURIComponent(`[Consulting Inquiry] ${details.type} — ${details.company || details.name || 'Client'}`);
      const bodyText = [
        `Hello Riley,`,
        ``,
        `I would like to inquire about an engagement with you.`,
        ``,
        `Engagement Type: ${details.type}`,
        `Client Name: ${details.name || 'Not provided'}`,
        `Company: ${details.company || 'Not provided'}`,
        `Work Email: ${details.email || 'Not provided'}`,
        `Target Timeline: ${details.timeline}`,
        ``,
        `Project Scope & Objectives:`,
        `${details.scope || 'Let us discuss on a brief introductory call.'}`,
        ``,
        `Best regards,`,
        `${details.name || ''}`
      ].join('\n');

      const mailtoUrl = `mailto:riley.carney.ai@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
      window.location.href = mailtoUrl;

      if (feedbackEl) {
        feedbackEl.textContent = 'Inquiry draft opened in your email client! If your mail client did not open, you can also use "Copy Scope Details" and email riley.carney.ai@gmail.com directly.';
        feedbackEl.classList.add('visible');
        setTimeout(() => {
          feedbackEl.classList.remove('visible');
        }, 8000);
      }
    });
  }

  if (copyInquiryBtn) {
    copyInquiryBtn.addEventListener('click', () => {
      const details = getInquiryDetails();
      const textToCopy = formatInquiryText(details);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          if (feedbackEl) {
            feedbackEl.textContent = 'Inquiry scope copied to clipboard! You can paste directly into an email to riley.carney.ai@gmail.com.';
            feedbackEl.classList.add('visible');
            setTimeout(() => {
              feedbackEl.classList.remove('visible');
            }, 6000);
          }
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (feedbackEl) {
        feedbackEl.textContent = 'Inquiry scope copied to clipboard! You can paste directly into an email to riley.carney.ai@gmail.com.';
        feedbackEl.classList.add('visible');
        setTimeout(() => {
          feedbackEl.classList.remove('visible');
        }, 6000);
      }
    } catch (err) {}
    document.body.removeChild(textArea);
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
