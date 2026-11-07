/*
 * DB Tools documentation - theme enforcement
 *
 * This script forces dark mode to match the DB Tools tool windows;
 * main.css hides the theme toggle. It also hides off-navbar logos,
 * hero/cover/banner sections and content background images, and sizes the
 * navbar logo.
 */

(function() {
  'use strict';

  function forceDarkMode() {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  }

  // Keep only a 32px navbar logo; hide other logos, hero/cover/banner sections and content background images.
  function stripPageDecorationsAndSizeNavbarLogo() {
    document.querySelectorAll('img').forEach(img => {
      const src = (img.src || img.getAttribute('src') || '').toLowerCase();
      const isLogo = src.includes('logo') || src.includes('icon') || src.includes('brand');

      if (isLogo) {
        const inNavbar = img.closest('nav') ||
                         img.closest('.navbar') ||
                         img.closest('.navbar-brand');

        if (!inNavbar) {
          img.remove();
        } else {
          img.style.maxWidth = '32px';
          img.style.maxHeight = '32px';
          img.style.width = '32px';
          img.style.height = '32px';
        }
      }
    });

    const heroSelectors = [
      '.jumbotron', '[class*="hero"]', '[class*="cover"]', '[class*="splash"]',
      '[class*="banner"]', '[class*="masthead"]'
    ];

    heroSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.closest('nav') && !el.closest('.navbar')) {
          el.style.display = 'none';
        }
      });
    });

    const contentAreas = document.querySelectorAll('main, article, .content, section, .body-content, #main, .main');
    contentAreas.forEach(el => {
      el.style.backgroundImage = 'none';
    });

    document.querySelectorAll('svg').forEach(svg => {
      const classes = (svg.className.baseVal || svg.getAttribute('class') || '').toLowerCase();
      const id = (svg.id || '').toLowerCase();
      if (classes.includes('logo') || id.includes('logo') || classes.includes('brand') || id.includes('brand')) {
        if (!svg.closest('nav') && !svg.closest('.navbar') && !svg.closest('.navbar-brand')) {
          svg.style.display = 'none';
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      forceDarkMode();
      stripPageDecorationsAndSizeNavbarLogo();
    });
  } else {
    forceDarkMode();
    stripPageDecorationsAndSizeNavbarLogo();
  }

  // Also run on page show (for back/forward navigation)
  window.addEventListener('pageshow', function() {
    forceDarkMode();
    stripPageDecorationsAndSizeNavbarLogo();
  });

  // Repeat the decoration pass for content DocFX renders after load.
  setTimeout(stripPageDecorationsAndSizeNavbarLogo, 100);
  setTimeout(stripPageDecorationsAndSizeNavbarLogo, 300);
  setTimeout(stripPageDecorationsAndSizeNavbarLogo, 1000);

  // Force dark mode immediately (before DOMContentLoaded)
  forceDarkMode();
})();
