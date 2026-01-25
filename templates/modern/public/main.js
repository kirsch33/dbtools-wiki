/*
 * DBTools Documentation - Force Dark Mode
 *
 * This script enforces dark mode only (no light mode toggle) to match
 * the DBTools application theming.
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

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      forceDarkMode();
      hideThemeToggle();
    });
  } else {
    forceDarkMode();
    hideThemeToggle();
  }

  // Also run on page show (for back/forward navigation)
  window.addEventListener('pageshow', function() {
    forceDarkMode();
    hideThemeToggle();
  });

  // Force dark mode immediately (before DOMContentLoaded)
  forceDarkMode();
})();
