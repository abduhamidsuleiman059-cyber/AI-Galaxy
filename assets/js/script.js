/* ============================================
   AI GALAXY — MAIN SCRIPT
   script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Generate Stars ---- */
  const starsContainer = document.getElementById('hero-stars');
  if (starsContainer) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    starsContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
      canvas.width  = starsContainer.offsetWidth;
      canvas.height = starsContainer.offsetHeight;
    }

    function createStars(count) {
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x:       Math.random() * canvas.width,
          y:       Math.random() * canvas.height,
          r:       Math.random() * 1.5 + 0.3,
          alpha:   Math.random(),
          speed:   Math.random() * 0.008 + 0.003,
          dir:     Math.random() > 0.5 ? 1 : -1,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.speed * s.dir;
        if (s.alpha >= 1 || s.alpha <= 0) s.dir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    createStars(200);
    draw();

    window.addEventListener('resize', () => { resize(); createStars(200); });
  }

  /* ---- Scroll Reveal ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  /* ---- Navbar Scroll Effect ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ---- Footer Loader ---- */
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__brand">
              <a href="index.html" class="navbar__logo">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="6" fill="url(#fg1)"/>
                  <ellipse cx="16" cy="16" rx="15" ry="6" stroke="url(#fg1)" stroke-width="1.5" fill="none" transform="rotate(-30 16 16)"/>
                  <defs>
                    <linearGradient id="fg1" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stop-color="#7c3aed"/>
                      <stop offset="100%" stop-color="#06b6d4"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span>AI <strong>GALAXY</strong></span>
              </a>
              <p>Your ultimate guide to the best AI tools, written in Swahili and English. Explore, learn and create with AI.</p>
            </div>
            <div class="footer__col">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="trending.html">AI Tools</a></li>
                <li><a href="learn.html">Learn</a></li>
                <li><a href="community.html">Community</a></li>
              </ul>
            </div>
            <div class="footer__col">
              <h5>Categories</h5>
              <ul>
                <li><a href="#">Writing AI</a></li>
                <li><a href="#">Image AI</a></li>
                <li><a href="#">Video AI</a></li>
                <li><a href="#">Code AI</a></li>
              </ul>
            </div>
            <div class="footer__col">
              <h5>Company</h5>
              <ul>
                <li><a href="contact.html">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Use</a></li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <p>© 2026 AI Galaxy. All rights reserved.</p>
            <p>Made with ❤️ for the Swahili-speaking world.</p>
          </div>
        </div>
      </footer>`;
  }

  /* ---- Toast Helper ---- */
  window.showToast = function(msg, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    setTimeout(() => { toast.hidden = true; }, duration);
  };

});

/**
 * assets/js/trending.js
 * Paste hii kwenye assets/js/trending.js (file mpya)
 * Inategemea api.js (window.API) ipakiwe kwanza
 */

(function () {
  'use strict';

  /* ── Filter: period buttons ── */
  function initPeriodFilters() {
    const btns = document.querySelectorAll('.tr-filter-btn[data-period]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('tr-filter-btn--active'));
        btn.classList.add('tr-filter-btn--active');
        // hapa unaweza kuload data mpya kulingana na period
        console.log('[Trending] Period:', btn.dataset.period);
      });
    });
  }

  /* ── Filter: category buttons ── */
  function initCatFilters() {
    const btns = document.querySelectorAll('.tr-filter-btn[data-cat]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('tr-filter-btn--active'));
        btn.classList.add('tr-filter-btn--active');
        filterCards(btn.dataset.cat);
      });
    });
  }

  function filterCards(cat) {
    const cards = document.querySelectorAll('.tr-card');
    cards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.style.display = match ? '' : 'none';
      if (match) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity .3s ease, transform .3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      }
    });
  }

  /* ── Sort select ── */
  function initSort() {
    const select = document.querySelector('.tr-sort-select');
    if (!select) return;
    select.addEventListener('change', () => {
      console.log('[Trending] Sort by:', select.value);
    });
  }

  /* ── Rising items ── */
  function initRising() {
    document.querySelectorAll('.tr-rising-item').forEach(item => {
      item.addEventListener('click', () => {
        console.log('[Trending] Rising:', item.querySelector('.tr-rising__name')?.textContent);
      });
    });
  }

  /* ── Animated counter ── */
  function animateCounter(el, target) {
    let startTime = null;
    const duration = 1400;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = (ease * target / 1000).toFixed(1) + 'K';
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounter() {
    const el = document.getElementById('tr-total-views');
    if (!el) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(el, 128400);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  }

  /* ── Category bar animation ── */
  function initCatBars() {
    const fills = document.querySelectorAll('.tr-cat-fill');
    if (!fills.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fills.forEach(fill => {
            const w = fill.style.width;
            fill.style.width = '0';
            requestAnimationFrame(() => {
              setTimeout(() => { fill.style.width = w; }, 80);
            });
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    const list = document.querySelector('.tr-cat-list');
    if (list) observer.observe(list);
  }

  /* ── Newsletter ── */
  function initNewsletter() {
    document.querySelectorAll('.tr-newsletter__form').forEach(form => {
      const input = form.querySelector('.tr-newsletter__input');
      const btn   = form.querySelector('.tr-newsletter__btn');
      if (!input || !btn) return;

      async function subscribe() {
        const email = input.value.trim();
        if (!email || !email.includes('@')) {
          input.style.borderColor = '#ef4444';
          setTimeout(() => { input.style.borderColor = ''; }, 2000);
          return;
        }
        btn.textContent = 'Sending…';
        btn.disabled = true;
        try {
          if (window.API && typeof window.API.subscribe === 'function') {
            await window.API.subscribe(email);
          } else {
            await new Promise(r => setTimeout(r, 800));
          }
          btn.textContent = '✓ Subscribed!';
          input.value = '';
          input.style.borderColor = '#34d399';
          setTimeout(() => {
            btn.textContent = 'Subscribe';
            btn.disabled = false;
            input.style.borderColor = '';
          }, 3000);
        } catch (err) {
          btn.textContent = 'Try Again';
          btn.disabled = false;
        }
      }

      btn.addEventListener('click', subscribe);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') subscribe(); });
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    initPeriodFilters();
    initCatFilters();
    initSort();
    initRising();
    initCounter();
    initCatBars();
    initNewsletter();
  });
/* ============================================================
   === TRENDING PAGE — PREMIUM JS POLISH ===
   Paste hii CHINI ya trending.js yako (kabla ya closing bracket ya IIFE)
   yaani kabla ya mstari:   })();
   ============================================================ */

  /* ── Button ripple effect ── */
  function initRipple() {
    document.querySelectorAll('.tr-btn-primary, .tr-btn-outline, .tr-newsletter__btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position:absolute;
          width:6px; height:6px;
          background:rgba(255,255,255,.45);
          border-radius:50%;
          transform:translate(-50%,-50%) scale(0);
          left:${x}px; top:${y}px;
          pointer-events:none;
          animation: tr-ripple .55s ease-out forwards;
        `;
        // Ensure btn has position relative
        if (getComputedStyle(btn).position === 'static') {
          btn.style.position = 'relative';
        }
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Inject ripple keyframe once
    if (!document.getElementById('tr-ripple-style')) {
      const s = document.createElement('style');
      s.id = 'tr-ripple-style';
      s.textContent = `
        @keyframes tr-ripple {
          to { transform: translate(-50%,-50%) scale(28); opacity: 0; }
        }
      `;
      document.head.appendChild(s);
    }
  }

  /* ── Smooth animated line chart in sidebar ── */
  function initMiniChart() {
    const chartSvg = document.querySelector('.tr-mini-chart svg');
    if (!chartSvg) return;

    // Animate the fill path
    const fill = chartSvg.querySelector('path:first-of-type');
    const line = chartSvg.querySelector('path:last-of-type');
    if (!fill || !line) return;

    // Animate stroke on line
    const lineLen = line.getTotalLength ? line.getTotalLength() : 300;
    line.style.strokeDasharray  = lineLen;
    line.style.strokeDashoffset = lineLen;
    line.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) .3s';

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          line.style.strokeDashoffset = '0';
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(chartSvg);
  }

  /* ── Navbar active link smooth indicator ── */
  function initNavIndicator() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        links.forEach(l => { if (!l.classList.contains('active')) l.style.opacity = '.65'; });
        link.style.opacity = '1';
      });
      link.addEventListener('mouseleave', () => {
        links.forEach(l => { l.style.opacity = ''; });
      });
    });
  }

  /* ── Scroll-triggered fade-up for elements below fold ── */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.tr-rising-item, .tr-card, .tr-sidebar-card'
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(el => {
      // Pause animations until in view (only if not already visible)
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.style.animationPlayState = 'paused';
      }
      observer.observe(el);
    });
  }

  /* ── Orb: interactive mouse parallax ── */
  function initOrbParallax() {
    const orb = document.querySelector('.tr-orb-wrap');
    if (!orb) return;

    const hero = document.querySelector('.tr-hero');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      orb.style.transform = `translate(${dx * 12}px, ${dy * 10}px)`;
    });
    hero.addEventListener('mouseleave', () => {
      orb.style.transform = '';
    });
    orb.style.transition = 'transform .4s ease';
  }

  /* ── Init all polish features ── */
  document.addEventListener('DOMContentLoaded', () => {
    initRipple();
    initMiniChart();
    initNavIndicator();
    initScrollReveal();
    initOrbParallax();
  });
})();

/* ============================================
   MOBILE PANELS — JS
   script.js — chini kabisa
   ============================================ */

(function () {

  /* ── Elements ── */
  const overlay    = document.getElementById('mob-overlay');
  const bottomNav  = document.getElementById('bottom-nav');

  /* Panel map — icon index => panel id */
  const panelMap = {
    1: 'panel-tools',    // Tools (index 1)
    2: 'panel-learn',    // Learn (index 2)
    4: 'panel-profile',  // Profile (index 4)
  };

  let activePanel = null;

  /* ── Open panel ── */
  function openPanel(id) {
    closePanel(); // funga iliyowazi kwanza
    const panel = document.getElementById(id);
    if (!panel) return;

    panel.classList.add('active');
    overlay.classList.add('active');
    activePanel = panel;

    // Zuia scroll ya page
    document.body.style.overflow = 'hidden';
  }

  /* ── Close panel ── */
  function closePanel() {
    if (activePanel) {
      activePanel.classList.remove('active');
      activePanel = null;
    }
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ── Bottom nav click handler ── */
  function initBottomNav() {
    if (!bottomNav) return;

    const items = bottomNav.querySelectorAll('.bottom-nav__item');

    items.forEach((item, index) => {
      // Home (index 0) — iende index.html kawaida, usifanye panel
      if (index === 0) return;

      item.addEventListener('click', function (e) {
        e.preventDefault(); // Zuia link ya kawaida

        const panelId = panelMap[index];
        if (!panelId) return;

        // Kama panel hii tayari iko wazi — funga
        const panel = document.getElementById(panelId);
        if (panel && panel.classList.contains('active')) {
          closePanel();
          return;
        }

        openPanel(panelId);

        // Active state kwenye bottom nav
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  /* ── Overlay click — funga panel ── */
  function initOverlay() {
    if (!overlay) return;
    overlay.addEventListener('click', () => {
      closePanel();
      // Rudisha active state kwa Home
      const items = bottomNav?.querySelectorAll('.bottom-nav__item');
      items?.forEach((item, i) => {
        item.classList.toggle('active', i === 0);
      });
    });
  }

  /* ── Swipe down kufunga panel ── */
  function initSwipeDown() {
    let startY = 0;

    document.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY;
      const diff = endY - startY;

      // Swipe chini zaidi ya 80px — funga panel
      if (diff > 80 && activePanel) {
        closePanel();
      }
    }, { passive: true });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    initBottomNav();
    initOverlay();
    initSwipeDown();
  });

})();