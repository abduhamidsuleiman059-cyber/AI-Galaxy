/* ============================================
   AI GALAXY — SEARCH
   search.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

 const input = document.getElementById('nav-search');
  if (!input) return;

  /* ---- Lazimisha field iwe tupu, Chrome autofill ikijaza yenyewe ---- */
  setTimeout(() => { input.value = ''; }, 50);
  input.addEventListener('animationstart', () => { input.value = ''; });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      const q = encodeURIComponent(input.value.trim());
      window.location.href = `trending.html?q=${q}`;
    }
  });

});