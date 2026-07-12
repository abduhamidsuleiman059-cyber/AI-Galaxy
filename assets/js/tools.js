/* ============================================
   AI GALAXY — TOOLS & CATEGORIES LOADER
   tools.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Default categories ---- */
  const defaultCategories = [
    {
      name: 'Writing AI', count: 24, href: 'trending.html?cat=writing',
      gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
      svg: `<svg width="28" height="28" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`
    },
    {
      name: 'Image AI', count: 18, href: 'trending.html?cat=image',
      gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
      svg: `<svg width="28" height="28" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    },
    {
      name: 'Video AI', count: 12, href: 'trending.html?cat=video',
      gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)',
      svg: `<svg width="28" height="28" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`
    },
    {
      name: 'Code AI', count: 15, href: 'trending.html?cat=code',
      gradient: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      svg: `<svg width="28" height="28" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
    },
    {
      name: 'Music AI', count: 9, href: 'trending.html?cat=music',
      gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
      svg: `<svg width="28" height="28" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`
    },
    {
      name: 'Data & Analytics', count: 11, href: 'trending.html?cat=data',
      gradient: 'linear-gradient(135deg, #4f46e5, #6366f1)',
      svg: `<svg width="28" height="28" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`
    },
    {
      name: 'Translation', count: 8, href: 'trending.html?cat=translate',
      gradient: 'linear-gradient(135deg, #059669, #10b981)',
      svg: `<svg width="28" height="28" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
    },
    {
      name: 'Chatbots', count: 20, href: 'trending.html?cat=chatbots',
      gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
      svg: `<svg width="28" height="28" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
    },
  ];

  /* ---- Render categories ---- */
  function renderCategories(data) {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;
    grid.innerHTML = '';
    grid.classList.add('reveal-stagger');

    data.forEach(cat => {
      const a = document.createElement('a');
      a.href      = cat.href || '#';
      a.className = 'category-card';
      a.innerHTML = `
        <div class="category-card__icon" style="background: ${cat.gradient};">
          ${cat.svg}
        </div>
        <span class="category-card__name">${cat.name}</span>
        <span class="category-card__count">${cat.count} tools</span>
      `;
      grid.appendChild(a);
    });
  }

  renderCategories(defaultCategories);

});
