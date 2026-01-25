/*
 * DBTools Documentation - Theme Enforcement
 *
 * This script enforces dark mode only (no light mode toggle) to match
 * the DBTools application theming. It also removes oversized logo watermarks.
 */

(function() {
  'use strict';

  // Force dark theme immediately on page load
  function forceDarkMode() {
    // Set the theme attribute on html element
    document.documentElement.setAttribute('data-bs-theme', 'dark');

    // Store preference to prevent flashing on navigation
    localStorage.setItem('theme', 'dark');
  }

  // Hide the theme toggle button
  function hideThemeToggle() {
    // DocFX modern template uses a theme toggle button
    const toggleSelectors = [
      '.bi-sun-fill',           // Light mode icon
      '.bi-moon-fill',          // Dark mode icon
      '#theme-toggle',          // Common toggle ID
      '[data-bs-theme-toggle]', // Theme toggle attribute
      'button[title*="theme"]', // Button with theme in title
      'button[title*="Theme"]',
      '.theme-toggle',          // Theme toggle class
      '.btn-theme'              // Theme button class
    ];

    // Wait for DOM to be ready, then hide toggles
    function hideToggles() {
      toggleSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          // Hide the element and its parent button if applicable
          el.style.display = 'none';
          if (el.closest('button')) {
            el.closest('button').style.display = 'none';
          }
          if (el.closest('li')) {
            el.closest('li').style.display = 'none';
          }
        });
      });
    }

    // Run immediately and after a short delay (for dynamic content)
    hideToggles();
    setTimeout(hideToggles, 100);
    setTimeout(hideToggles, 500);
  }

  // Remove oversized logo watermarks - keep only navbar logo
  function removeLogoWatermark() {
    // Find all images that might be logos
    document.querySelectorAll('img').forEach(img => {
      const src = (img.src || img.getAttribute('src') || '').toLowerCase();
      const isLogo = src.includes('logo') || src.includes('icon') || src.includes('brand');

      if (isLogo) {
        // Check if this image is in the navbar (keep it)
        const inNavbar = img.closest('nav') ||
                         img.closest('.navbar') ||
                         img.closest('.navbar-brand') ||
                         img.closest('header nav');

        if (!inNavbar) {
          // Remove large logos outside navbar
          img.style.display = 'none';
          img.remove();
        } else {
          // Ensure navbar logo is properly sized
          img.style.maxWidth = '32px';
          img.style.maxHeight = '32px';
          img.style.width = '32px';
          img.style.height = '32px';
        }
      }
    });

    // Hide any hero/cover sections that DocFX might generate
    const heroSelectors = [
      '.hero', '.hero-image', '.cover', '.cover-img', '.home-hero',
      '.cover-container', '.cover-main', '.cover-heading',
      '.jumbotron', '.masthead', '.splash', '.banner',
      '[class*="hero"]', '[class*="cover"]', '[class*="splash"]',
      '[class*="banner"]', '[class*="masthead"]'
    ];

    heroSelectors.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(el => {
          // Don't hide if it's just a CSS class that happens to match
          // and is actually content
          if (!el.closest('nav') && !el.closest('.navbar')) {
            el.style.display = 'none';
          }
        });
      } catch (e) { /* ignore invalid selectors */ }
    });

    // Remove any background images on main content areas
    const contentAreas = document.querySelectorAll('main, article, .content, section, .body-content, #main, .main');
    contentAreas.forEach(el => {
      el.style.backgroundImage = 'none';
    });

    // Handle SVG logos
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

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      forceDarkMode();
      hideThemeToggle();
      removeLogoWatermark();
    });
  } else {
    forceDarkMode();
    hideThemeToggle();
    removeLogoWatermark();
  }

  // Also run on page show (for back/forward navigation)
  window.addEventListener('pageshow', function() {
    forceDarkMode();
    hideThemeToggle();
    removeLogoWatermark();
  });

  // Run watermark removal multiple times to catch dynamically loaded content
  setTimeout(removeLogoWatermark, 100);
  setTimeout(removeLogoWatermark, 300);
  setTimeout(removeLogoWatermark, 1000);

  // Force dark mode immediately (before DOMContentLoaded)
  forceDarkMode();
})();
