/* =============================================
   Tobey's Story — Page JavaScript
   ============================================= */

// -----------------------------------------------
// 1. SCROLL REVEAL — general .reveal sections
// -----------------------------------------------
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach(el => observer.observe(el));
})();


// -----------------------------------------------
// 2. STAGGERED TIMELINE ITEMS
// -----------------------------------------------
(function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // stagger each item by its index
          const index = [...items].indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach(item => observer.observe(item));
})();


// -----------------------------------------------
// 3. HERO PARALLAX — subtle depth on scroll
// -----------------------------------------------
(function initHeroParallax() {
  const hero = document.querySelector('.story-hero');
  if (!hero) return;

  // Skip on mobile
  if (window.matchMedia('(max-width: 850px)').matches) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Background moves at 40% of scroll speed
    hero.style.backgroundPositionY = `calc(30% + ${scrollY * 0.4}px)`;
  }, { passive: true });
})();


// -----------------------------------------------
// 4. SCROLL HINT — fade out after first scroll
// -----------------------------------------------
(function initScrollHint() {
  const hint = document.querySelector('.story-hero-scroll-hint');
  if (!hint) return;

  const onScroll = () => {
    if (window.scrollY > 80) {
      hint.style.opacity = '0';
      hint.style.pointerEvents = 'none';
      window.removeEventListener('scroll', onScroll);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();


// -----------------------------------------------
// 5. MOBILE MENU (reuse app.js logic is already
//    loaded — this is a safety re-init in case
//    the DOM wasn't ready when app.js ran)
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const toggle    = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (!toggle || !mobileNav) return;

  // Only bind if app.js hasn't already done so
  if (toggle.dataset.bound) return;
  toggle.dataset.bound = 'true';

  toggle.addEventListener('click', () => {
    const isOpen = !mobileNav.hidden;
    mobileNav.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!mobileNav.hidden && !mobileNav.contains(e.target) && e.target !== toggle) {
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});