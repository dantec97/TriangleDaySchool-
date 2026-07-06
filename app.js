/* =============================================
   TDS Homepage — Custom JavaScript
   ============================================= */

// -----------------------------------------------
// 1. HERO SLIDER
// -----------------------------------------------
(function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');

  if (!slides.length) return;

  // Set background images from data-bg attribute
  slides.forEach(slide => {
    const bg = slide.dataset.bg;
    if (bg) slide.style.backgroundImage = `url('${bg}')`;
  });

  let currentIndex = 0;
  let autoplayInterval;

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    dots[currentIndex].setAttribute('aria-selected', 'false');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
    dots[currentIndex].setAttribute('aria-selected', 'true');
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 6000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Dot click navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      goToSlide(i);
      startAutoplay();
    });
  });

  // Pause autoplay when user tabs to slider
  document.querySelector('.hero-section')?.addEventListener('focusin', stopAutoplay);
  document.querySelector('.hero-section')?.addEventListener('focusout', startAutoplay);

  startAutoplay();
})();


// -----------------------------------------------
// 2. MOBILE MENU TOGGLE
// -----------------------------------------------
(function initMobileMenu() {
  const toggle  = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = !mobileNav.hidden;
    mobileNav.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!mobileNav.hidden && !mobileNav.contains(e.target) && e.target !== toggle) {
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();


// -----------------------------------------------
// 3. MOBILE DROPDOWN TOGGLES
// -----------------------------------------------
(function initMobileDropdowns() {
  const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

  dropdownToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const dropdown = btn.nextElementSibling;
      const isOpen   = !dropdown.hidden;

      // Close all others
      document.querySelectorAll('.mobile-dropdown').forEach(d => { d.hidden = true; });
      document.querySelectorAll('.mobile-dropdown-toggle').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
      });

      // Open this one if it wasn't already open
      if (!isOpen) {
        dropdown.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();


// -----------------------------------------------
// 4. STICKY HEADER — shrink on scroll
// -----------------------------------------------
(function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const SCROLL_THRESHOLD = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }, { passive: true });
})();


// -----------------------------------------------
// 5. NEWS CARD — show excerpt on keyboard focus
//    (hover is handled in CSS, this handles focus)
// -----------------------------------------------
(function initNewsCardFocus() {
  const cards = document.querySelectorAll('.news-card');

  cards.forEach(card => {
    const excerpt = card.querySelector('.news-card-excerpt');
    if (!excerpt) return;

    card.addEventListener('focusin',  () => { excerpt.style.display = 'block'; });
    card.addEventListener('focusout', () => { excerpt.style.display = '';      });
  });
})();


// -----------------------------------------------
// 6. PARALLAX — CTA section background
// -----------------------------------------------
(function initParallax() {
  const bg = document.querySelector('.cta-parallax-bg');
  if (!bg) return;

  // Disable on mobile (matches the original site's behavior)
  const mq = window.matchMedia('(max-width: 850px)');
  if (mq.matches) return;

  function applyParallax() {
    const section = bg.closest('.cta-section');
    const rect    = section.getBoundingClientRect();
    const viewH   = window.innerHeight;

    // Only animate when section is visible
    if (rect.bottom < 0 || rect.top > viewH) return;

    // Progress: 0 when entering from bottom, 1 when leaving at top
    const progress = 1 - (rect.bottom / (viewH + rect.height));
    const shift    = (progress - 0.5) * 620; // ±310px travel

    bg.style.transform = `translateY(${shift}px)`;
  }

  window.addEventListener('scroll', applyParallax, { passive: true });
  applyParallax();
})();
