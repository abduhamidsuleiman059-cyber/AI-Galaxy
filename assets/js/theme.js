/* ============================================
   AI GALAXY — THEME TOGGLE
   theme.js
   ============================================ */

(function () {
  const STORAGE_KEY = 'aigalaxy-theme';
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    /* Update icon kulingana na theme */
    function updateIcon(theme) {
      btn.innerHTML = theme === 'dark'
        ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
           </svg>`
        : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
           </svg>`;
    }

    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);
      updateIcon(theme);
    }

    /* Set icon mara moja ukiopen page */
    updateIcon(saved);

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
})();