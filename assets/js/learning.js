/* ============================================
   AI GALAXY — LEARN PAGE JS
   learnpage.js  (Learn page only — does not touch
   any other page's script)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hero search: redirect to Trending with query ---- */
  const searchForm  = document.getElementById('lr-search-form');
  const searchInput = document.getElementById('lr-search-input');

  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (q) {
      window.location.href = `trending.html?search=${encodeURIComponent(q)}`;
    }
  });

  /* ---- Popular tags: fill search input on click ---- */
  document.querySelectorAll('.lr-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const value = tag.dataset.tag || tag.textContent.trim();
      searchInput.value = value;
      searchInput.focus();
    });
  });

  /* ---- Newsletter form ---- */
  const newsletterForm = document.getElementById('lr-newsletter-form');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim()) {
      if (typeof window.showToast === 'function') {
        window.showToast('Umejiunga! Asante kwa kufuatilia AI Galaxy 🚀');
      }
      newsletterForm.reset();
    }
  });

  document.querySelectorAll('.lr-course-card .btn--primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('This learning path is opening soon.');
      }
    });
  });

});