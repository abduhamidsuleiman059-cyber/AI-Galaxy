/* ============================================
   LEARNING.JS — AI Galaxy Learning Page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- CATEGORY PILLS ----------
  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('cat-pill--active'));
      pill.classList.add('cat-pill--active');
      // Future: filter courses by category
      const cat = pill.dataset.cat;
      filterCourses(cat);
    });
  });

  function filterCourses(cat) {
    // Placeholder — hook up to real data later
    console.log('Filter by:', cat);
  }

  // ---------- DARK MODE TOGGLE ----------
  const darkToggle = document.getElementById('darkToggle');
  if (darkToggle) {
    darkToggle.addEventListener('change', () => {
      document.body.classList.toggle('light-mode', !darkToggle.checked);
    });
  }

  // ---------- ANIMATE PROGRESS BARS ON SCROLL ----------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-bar__fill');
        if (fill) {
          const width = fill.style.width;
          fill.style.width = '0%';
          setTimeout(() => { fill.style.width = width; }, 100);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-card').forEach(card => observer.observe(card));

  // ---------- CONTINUE BUTTONS ----------
  document.querySelectorAll('.btn-continue').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.progress-card');
      const title = card?.querySelector('.progress-card__title')?.textContent;
      console.log('Continue:', title);
      // Future: navigate to course page
    });
  });

  // ---------- SEARCH ----------
  const searchInput = document.querySelector('.topbar__search input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) return;
      // Future: filter visible cards
      console.log('Search:', query);
    });
  }

  // ---------- SAVE BOOKMARKS ----------
  document.querySelectorAll('.rec-card__save').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const saved = btn.dataset.saved === 'true';
      btn.dataset.saved = !saved;
      btn.textContent = saved ? '🔖' : '🔖';
      btn.style.opacity = saved ? '0.5' : '1';
    });
  });

});