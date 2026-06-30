/* ============================================
   AI GALAXY — AUTH MODAL
   modal.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const signinBtn = document.getElementById('signin-btn');
  const container = document.getElementById('auth-modal-container');
  if (!signinBtn || !container) return;

  /* ---- Inject modal HTML ---- */
  container.innerHTML = `
    <div class="modal-overlay" id="auth-overlay" hidden>
      <div class="modal-box" role="dialog" aria-modal="true">

        <button class="modal-close" id="modal-close" aria-label="Close">✕</button>

        <!-- Logo -->
        <div class="modal-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="6" fill="url(#mgrad1)"/>
            <ellipse cx="16" cy="16" rx="15" ry="6" stroke="url(#mgrad1)" stroke-width="1.5" fill="none" transform="rotate(-30 16 16)"/>
            <defs>
              <linearGradient id="mgrad1" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stop-color="#7c3aed"/>
                <stop offset="100%" stop-color="#06b6d4"/>
              </linearGradient>
            </defs>
          </svg>
          <span>AI <strong>GALAXY</strong></span>
        </div>

        <!-- Tabs -->
        <div class="modal-tabs">
          <button class="modal-tab active" id="tab-login">Sign In</button>
          <button class="modal-tab" id="tab-register">Register</button>
        </div>

        <!-- LOGIN FORM -->
        <div class="modal-form" id="form-login">
          <div class="modal-field">
            <label>Email</label>
            <input type="email" id="login-email" placeholder="you@email.com" />
          </div>
          <div class="modal-field">
            <label>Password</label>
            <input type="password" id="login-pass" placeholder="••••••••" />
          </div>
          <div class="modal-forgot">
            <a href="#">Forgot password?</a>
          </div>
          <button class="btn btn--primary modal-submit" id="login-btn">
            Sign In
          </button>
          <p class="modal-switch">
            Don't have an account? 
            <span id="go-register">Register here</span>
          </p>
        </div>

        <!-- REGISTER FORM -->
        <div class="modal-form" id="form-register" style="display:none;">
          <div class="modal-field">
            <label>Full Name</label>
            <input type="text" id="reg-name" placeholder="Your name" />
          </div>
          <div class="modal-field">
            <label>Email</label>
            <input type="email" id="reg-email" placeholder="you@email.com" />
          </div>
          <div class="modal-field">
            <label>Password</label>
            <input type="password" id="reg-pass" placeholder="••••••••" />
          </div>
          <div class="modal-field">
            <label>Confirm Password</label>
            <input type="password" id="reg-pass2" placeholder="••••••••" />
          </div>
          <button class="btn btn--primary modal-submit" id="register-btn">
            Create Account
          </button>
          <p class="modal-switch">
            Already have an account? 
            <span id="go-login">Sign in here</span>
          </p>
        </div>

      </div>
    </div>`;

  /* ---- Inject styles ---- */
  const style = document.createElement('style');
  style.textContent = `
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 9000;
      background: rgba(7,7,26,0.85);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .modal-overlay[hidden] { display: none; }

    .modal-box {
      background: #0f0a1e;
      border: 1px solid rgba(124,58,237,0.3);
      border-radius: 24px;
      padding: 2rem 1.75rem;
      width: 100%;
      max-width: 420px;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: rgba(255,255,255,0.4);
      font-size: 1.1rem;
      cursor: pointer;
      background: rgba(255,255,255,0.05);
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .modal-close:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
    }

    .modal-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 1.5rem;
    }

    .modal-tabs {
      display: flex;
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      padding: 4px;
      margin-bottom: 1.5rem;
      gap: 4px;
    }
    .modal-tab {
      flex: 1;
      padding: 0.6rem;
      border: none;
      border-radius: 9px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      background: transparent;
      color: rgba(255,255,255,0.5);
      transition: all 0.25s;
    }
    .modal-tab.active {
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      color: #fff;
      box-shadow: 0 4px 15px rgba(124,58,237,0.4);
    }

    .modal-field {
      margin-bottom: 1rem;
    }
    .modal-field label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: rgba(255,255,255,0.6);
      margin-bottom: 0.4rem;
      font-family: 'Space Grotesk', sans-serif;
    }
    .modal-field input {
      width: 100%;
      padding: 0.75rem 1rem;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(124,58,237,0.25);
      border-radius: 12px;
      color: #fff;
      font-size: 0.9rem;
      outline: none;
      transition: border 0.2s;
    }
    .modal-field input:focus {
      border-color: #7c3aed;
      background: rgba(124,58,237,0.08);
    }
    .modal-field input::placeholder {
      color: rgba(255,255,255,0.25);
    }

    .modal-forgot {
      text-align: right;
      margin-bottom: 1rem;
      margin-top: -0.5rem;
    }
    .modal-forgot a {
      font-size: 0.78rem;
      color: #a855f7;
      text-decoration: none;
    }

    .modal-submit {
      width: 100%;
      justify-content: center;
      padding: 0.85rem;
      font-size: 0.95rem;
      border-radius: 12px;
      margin-bottom: 1rem;
    }

    .modal-switch {
      text-align: center;
      font-size: 0.82rem;
      color: rgba(255,255,255,0.4);
    }
    .modal-switch span {
      color: #a855f7;
      cursor: pointer;
      font-weight: 600;
    }
    .modal-switch span:hover {
      color: #06b6d4;
    }
  `;
  document.head.appendChild(style);

  /* ---- Logic ---- */
  const overlay    = document.getElementById('auth-overlay');
  const closeBtn   = document.getElementById('modal-close');
  const tabLogin   = document.getElementById('tab-login');
  const tabReg     = document.getElementById('tab-register');
  const formLogin  = document.getElementById('form-login');
  const formReg    = document.getElementById('form-register');
  const goReg      = document.getElementById('go-register');
  const goLogin    = document.getElementById('go-login');

  /* Open */
  signinBtn.addEventListener('click', () => { overlay.hidden = false; });

  /* Close */
  closeBtn.addEventListener('click', () => { overlay.hidden = true; });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.hidden = true;
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.hidden = true;
  });

  /* Switch tabs */
  function showLogin() {
    formLogin.style.display = 'block';
    formReg.style.display   = 'none';
    tabLogin.classList.add('active');
    tabReg.classList.remove('active');
  }
  function showRegister() {
    formLogin.style.display = 'none';
    formReg.style.display   = 'block';
    tabReg.classList.add('active');
    tabLogin.classList.remove('active');
  }

  tabLogin.addEventListener('click', showLogin);
  tabReg.addEventListener('click', showRegister);
  goReg.addEventListener('click', showRegister);
  goLogin.addEventListener('click', showLogin);

  /* Submit handlers */
  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const pass  = document.getElementById('login-pass').value.trim();
    if (!email || !pass) {
      alert('Please fill in all fields!');
      return;
    }
    alert('Sign in coming soon! 🚀');
  });

  document.getElementById('register-btn').addEventListener('click', () => {
    const name  = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass  = document.getElementById('reg-pass').value.trim();
    const pass2 = document.getElementById('reg-pass2').value.trim();
    if (!name || !email || !pass || !pass2) {
      alert('Please fill in all fields!');
      return;
    }
    if (pass !== pass2) {
      alert('Passwords do not match!');
      return;
    }
    alert('Registration coming soon! 🚀');
  });

});