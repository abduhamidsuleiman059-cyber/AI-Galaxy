/* ============================================
   AI GALAXY — NAVBAR JS
   navbar.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.getElementById('hamburger');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const normalizedCurrent = (currentPage || 'index.html').split('?')[0].split('/').pop() || 'index.html';

  /* ============================================
     ICONS (feather-style, stroke = currentColor)
     ============================================ */
  const ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    text: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
    audio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
    crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h20l-1.5-9-5 4-3.5-7-3.5 7-5-4z"/><path d="M4 21h16"/></svg>',
  };

  /* ============================================
     DATA
     ============================================ */
  const topItems = [
    { href: 'index.html', label: 'Home', icon: ICONS.home },
    { href: 'trending.html', label: 'Trending', icon: ICONS.zap },
    { href: 'learn.html', label: 'Learn', icon: ICONS.book },
    { href: 'tools.html', label: 'Tools', icon: ICONS.briefcase },
    { href: 'community.html', label: 'Community', icon: ICONS.users },
    { href: 'contact.html', label: 'About Us', icon: ICONS.info },
  ];

  const isActive = (href) => {
    const cleanHref = (href || '').split('?')[0].replace(/^\/+/, '');
    const normalizedCurrent = (currentPage || 'index.html').split('?')[0].replace(/^\/+/, '');
    return cleanHref === normalizedCurrent || (normalizedCurrent === '' && cleanHref === 'index.html');
  };
  /* ============================================
     BUILD DRAWER
     ============================================ */
  const drawer = document.createElement('div');
  drawer.className = 'mobile-drawer';
  drawer.id = 'mobile-drawer';

  const overlay = document.createElement('div');
  overlay.className = 'mobile-drawer__overlay';

  const panel = document.createElement('nav');
  panel.className = 'mobile-drawer__panel';

  const body = document.createElement('div');
  body.className = 'mobile-drawer__body';

  function makeItem({ href, label, icon }, withArrow) {
    const a = document.createElement('a');
    a.href = href;
    a.className = 'mobile-drawer__item';
    if (isActive(href)) a.classList.add('active');
    a.innerHTML = `
      <span class="mobile-drawer__item-icon">${icon}</span>
      <span class="mobile-drawer__item-label">${label}</span>
      ${withArrow ? `<span class="mobile-drawer__chevron">${ICONS.chevronRight}</span>` : ''}
    `;
    a.addEventListener('click', closeDrawer);
    return a;
  }

  /* Home */
  topItems.forEach(item => body.appendChild(makeItem(item, true)));

  /* Upgrade to Pro footer card */
  const footer = document.createElement('div');
  footer.className = 'mobile-drawer__footer';
  footer.innerHTML = `
    <div class="mobile-drawer__pro-card">
      <div class="mobile-drawer__pro-top">
        <span class="mobile-drawer__pro-icon">${ICONS.crown}</span>
        <div>
          <p class="mobile-drawer__pro-title">Upgrade to Pro</p>
          <p class="mobile-drawer__pro-desc">Unlock premium AI tools and exclusive features.</p>
        </div>
      </div>
      <a href="tools.html" class="mobile-drawer__pro-btn">
        Explore Tools
        <span class="mobile-drawer__pro-btn-arrow">${ICONS.chevronRight}</span>
      </a>
    </div>
  `;
  footer.querySelector('.mobile-drawer__pro-btn').addEventListener('click', closeDrawer);

  panel.appendChild(body);
  panel.appendChild(footer);
  drawer.appendChild(overlay);
  drawer.appendChild(panel);
  document.getElementById('navbar').after(drawer);

  /* ============================================
     OPEN / CLOSE
     ============================================ */
  function openDrawer() {
    drawer.classList.add('open');
    document.body.classList.add('drawer-open');
    hamburger.setAttribute('aria-expanded', 'true');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.classList.remove('drawer-open');
    hamburger.setAttribute('aria-expanded', 'false');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }

  hamburger?.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('click', e => {
    if (drawer.classList.contains('open') &&
        !panel.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ---- Set active nav link (desktop) ---- */
  const desktopLinks = document.querySelectorAll('.navbar__links .nav-link');
  desktopLinks.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
  });
  desktopLinks.forEach(link => {
    const href = (link.getAttribute('href') || '').split('?')[0].split('/').pop() || 'index.html';
    if (href === normalizedCurrent || (normalizedCurrent === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const bottomNavLinks = document.querySelectorAll('.bottom-nav__item');
  bottomNavLinks.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
  });
  bottomNavLinks.forEach(link => {
    const href = (link.getAttribute('href') || '').split('?')[0].split('/').pop() || 'index.html';
    if (href === normalizedCurrent || (normalizedCurrent === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('.mobile-drawer__item, .mobile-drawer__sub-item').forEach(item => {
    item.classList.remove('active');
    item.removeAttribute('aria-current');
  });
  document.querySelectorAll('.mobile-drawer__item, .mobile-drawer__sub-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href && isActive(href)) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    }
  });

});