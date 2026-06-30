/* ============================================
   AI GALAXY — NAVBAR JS
   navbar.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  /* ---- Create mobile drawer ---- */
  const drawer = document.createElement('div');
  drawer.className = 'navbar__drawer';
  drawer.id = 'nav-drawer';

  const links = [
    { href: 'index.html',     label: 'Home'      },
    { href: 'trending.html',  label: 'AI Tools'  },
    { href: 'learn.html',     label: 'Learn'     },
    { href: '#blog',          label: 'Blog'      },
    { href: 'community.html', label: 'Community' },
    { href: 'contact.html',   label: 'About Us'  },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const a = document.createElement('a');
    a.href      = link.href;
    a.className = 'nav-link';
    a.textContent = link.label;
    if (link.href === currentPage || (currentPage === '' && link.href === 'index.html')) {
      a.classList.add('active');
    }
    drawer.appendChild(a);
    a.addEventListener('click', closeDrawer);
  });

  document.getElementById('navbar').after(drawer);

  /* ---- Toggle hamburger ---- */
  function openDrawer() {
    drawer.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    // Animate spans to X
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }

  hamburger?.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  /* ---- Close drawer on outside click ---- */
  document.addEventListener('click', e => {
    if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
      closeDrawer();
    }
  });

  /* ---- Set active nav link (desktop) ---- */
  document.querySelectorAll('.navbar__links .nav-link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});