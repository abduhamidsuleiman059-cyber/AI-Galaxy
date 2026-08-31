import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
/* ============================================
   AI GALAXY — AUTH MODAL (Unified Login/Register)
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

        <h2 class="modal-heading" id="modal-heading">Welcome back</h2>
        <p class="modal-subheading" id="modal-subheading">Sign in or create an account to continue</p>

        <!-- STEP 1 — Email + explicit choice -->
        <div class="modal-form" id="step-email">
          <div class="modal-field">
            <label>Email</label>
            <input type="email" id="auth-email" placeholder="you@email.com" autocomplete="email" />
          </div>
          <button class="btn btn--primary modal-submit" id="signin-direct-btn">
            Sign In
          </button>
          <button class="btn btn--outline modal-submit" id="register-direct-btn">
            Create Account
          </button>
        </div>

        <!-- STEP 2 — Login (password only) -->
        <div class="modal-form" id="step-login" style="display:none;">
          <div class="modal-email-chip">
            <span id="login-email-display"></span>
            <button type="button" id="change-email-login">Change</button>
          </div>
          <div class="modal-field">
            <label>Password</label>
            <div class="modal-pass-wrap">
              <input type="password" id="login-pass" placeholder="••••••••" autocomplete="current-password" />
              <button type="button" class="modal-pass-toggle" data-target="login-pass" aria-label="Show password">
                <svg class="eye-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg class="eye-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.8 21.8 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>
         <div class="modal-forgot">
            <a href="#" id="forgot-pass-link">Forgot password?</a>
          </div>
          <button class="btn btn--primary modal-submit" id="login-btn">
            Sign In
          </button>
        </div>

        <!-- STEP 3 — Register (new account) -->
        <div class="modal-form" id="step-register" style="display:none;">
          <div class="modal-email-chip">
            <span id="reg-email-display"></span>
            <button type="button" id="change-email-reg">Change</button>
          </div>
          <div class="modal-field">
            <label>Full Name</label>
            <input type="text" id="reg-name" placeholder="Your name" autocomplete="name" />
          </div>
          <div class="modal-field">
            <label>Password</label>
            <div class="modal-pass-wrap">
              <input type="password" id="reg-pass" placeholder="••••••••" autocomplete="new-password" />
              <button type="button" class="modal-pass-toggle" data-target="reg-pass" aria-label="Show password">
                <svg class="eye-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg class="eye-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.8 21.8 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>
          <div class="modal-field">
            <label>Confirm Password</label>
            <div class="modal-pass-wrap">
              <input type="password" id="reg-pass2" placeholder="••••••••" autocomplete="new-password" />
              <button type="button" class="modal-pass-toggle" data-target="reg-pass2" aria-label="Show password">
                <svg class="eye-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg class="eye-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.8 21.8 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>
          <button class="btn btn--primary modal-submit" id="register-btn">
            Create Account
          </button>
        </div>

        <p class="modal-error" id="modal-error" hidden></p>

      </div>
    </div>`;

  /* ---- Inject styles ---- */
  const style = document.createElement('style');
  style.textContent = `
    .modal-overlay {
      position: fixed; inset: 0; z-index: 9000;
      background: rgba(7,7,26,0.85); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center; padding: 1rem;
    }
    .modal-overlay[hidden] { display: none; }

    .modal-box {
      background: #0f0a1e; border: 1px solid rgba(124,58,237,0.3);
      border-radius: 24px; padding: 2rem 1.75rem; width: 100%; max-width: 420px;
      position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    .modal-close {
      position: absolute; top: 1rem; right: 1rem;
      color: rgba(255,255,255,0.4); font-size: 1.1rem; cursor: pointer;
      background: rgba(255,255,255,0.05); border: none;
      width: 32px; height: 32px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; }

    .modal-logo {
      display: flex; align-items: center; gap: 0.5rem;
      font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 700;
      color: #fff; margin-bottom: 1.25rem;
    }

    .modal-heading {
      font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; font-weight: 700;
      color: #fff; margin: 0 0 0.35rem;
    }
    .modal-subheading {
      font-size: 0.85rem; color: rgba(255,255,255,0.5); margin: 0 0 1.5rem;
    }

    .modal-field { margin-bottom: 1rem; }
    .modal-field label {
      display: block; font-size: 0.8rem; font-weight: 600;
      color: rgba(255,255,255,0.6); margin-bottom: 0.4rem;
      font-family: 'Space Grotesk', sans-serif;
    }
    .modal-field input {
      width: 100%; padding: 0.75rem 1rem;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(124,58,237,0.25);
      border-radius: 12px; color: #fff; font-size: 0.9rem; outline: none;
      transition: border 0.2s; box-sizing: border-box;
    }
    .modal-field input:focus { border-color: #7c3aed; background: rgba(124,58,237,0.08); }
    .modal-field input::placeholder { color: rgba(255,255,255,0.25); }

    .modal-pass-wrap { position: relative; }
    .modal-pass-wrap input { padding-right: 2.75rem; }
  .modal-pass-toggle {
      position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);
      background: none; border: none; padding: 0; cursor: pointer;
      color: rgba(15,15,30,0.5); display: flex; align-items: center;
    }
    .modal-pass-toggle:hover { color: #7c3aed; }
    .modal-email-chip {
      display: flex; align-items: center; justify-content: space-between;
      gap: 0.75rem;
      background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.25);
      border-radius: 12px; padding: 0.6rem 1rem; margin-bottom: 1.25rem;
      font-size: 0.85rem; color: #fff;
    }
    .modal-email-chip span {
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0;
    }
    .modal-email-chip button {
      flex-shrink: 0;
      background: none; border: none; color: #a855f7;
      font-size: 0.8rem; font-weight: 600; cursor: pointer;
    }
    .modal-email-chip button:hover { color: #06b6d4; }

    .modal-forgot { text-align: right; margin-bottom: 1rem; margin-top: -0.5rem; }
    .modal-forgot a { font-size: 0.78rem; color: #a855f7; text-decoration: none; }

    .modal-submit {
      width: 100%; justify-content: center; padding: 0.85rem;
      font-size: 0.95rem; border-radius: 12px;
    }

    .btn--outline {
      background: transparent; border: 1px solid rgba(124,58,237,0.4);
      color: #fff; margin-top: 0.75rem;
      display: flex; align-items: center; cursor: pointer;
    }
    .btn--outline:hover { background: rgba(124,58,237,0.1); border-color: #7c3aed; }

    .modal-error {
      color: #ef4444; font-size: 0.82rem; text-align: center;
      margin-top: 1rem; margin-bottom: 0;
    }
    .modal-error[hidden] { display: none; }

    .modal-form { animation: modalFadeIn 0.25s ease; }
    @keyframes modalFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  /* ---- Elements ---- */
  const overlay      = document.getElementById('auth-overlay');
  const closeBtn      = document.getElementById('modal-close');
  const heading        = document.getElementById('modal-heading');
  const subheading      = document.getElementById('modal-subheading');
  const errorBox         = document.getElementById('modal-error');

  const stepEmail    = document.getElementById('step-email');
  const stepLogin     = document.getElementById('step-login');
  const stepRegister   = document.getElementById('step-register');

  const emailInput    = document.getElementById('auth-email');
  const signinDirectBtn  = document.getElementById('signin-direct-btn');
  const registerDirectBtn = document.getElementById('register-direct-btn');

  const loginEmailDisplay = document.getElementById('login-email-display');
  const regEmailDisplay    = document.getElementById('reg-email-display');

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }
  function clearError() {
    errorBox.hidden = true;
    errorBox.textContent = '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---- Step control ---- */
  function goToEmailStep() {
    stepEmail.style.display    = 'block';
    stepLogin.style.display     = 'none';
    stepRegister.style.display   = 'none';
    heading.textContent = 'Welcome back';
    subheading.textContent = 'Sign in or create an account to continue';
    clearError();
    emailInput.focus();
  }

  function goToLoginStep(email) {
    stepEmail.style.display    = 'none';
    stepLogin.style.display     = 'block';
    stepRegister.style.display   = 'none';
    loginEmailDisplay.textContent = email;
    heading.textContent = 'Sign in';
    subheading.textContent = 'Enter your password to continue';
    clearError();
    document.getElementById('login-pass').focus();
  }

  function goToRegisterStep(email) {
    stepEmail.style.display    = 'none';
    stepLogin.style.display     = 'none';
    stepRegister.style.display   = 'block';
    regEmailDisplay.textContent = email;
    heading.textContent = 'Create your account';
    subheading.textContent = 'Just a few details to get started';
    clearError();
    document.getElementById('reg-name').focus();
  }

  /* ---- Open / Close modal ---- */
  signinBtn.addEventListener('click', () => {
    overlay.hidden = false;
    goToEmailStep();
  });
  closeBtn.addEventListener('click', () => { overlay.hidden = true; });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.hidden = true;
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay.hidden) overlay.hidden = true;
  });

  /* ---- Step 1: explicit Sign In / Create Account choice ---- */
  signinDirectBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    clearError();
    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }
    goToLoginStep(email);
  });

  registerDirectBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    clearError();
    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }
    goToRegisterStep(email);
  });

  emailInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') signinDirectBtn.click();
  });

  /* ---- Change email links ---- */
  document.getElementById('change-email-login').addEventListener('click', goToEmailStep);
  document.getElementById('change-email-reg').addEventListener('click', goToEmailStep);

  /* ---- Password show/hide toggle ---- */
  document.querySelectorAll('.modal-pass-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.querySelector('.eye-open').style.display = isHidden ? 'none' : 'block';
      btn.querySelector('.eye-closed').style.display = isHidden ? 'block' : 'none';
    });
  });

  /* ---- Step 2: Login submit (Firebase Auth) ---- */
 /* ---- Forgot password ---- */
  document.getElementById('forgot-pass-link').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = loginEmailDisplay.textContent.trim();
    clearError();

    if (!email) {
      showError('Please enter your email first.');
      return;
    }

    const link = document.getElementById('forgot-pass-link');
    const originalText = link.textContent;
    link.textContent = 'Sending…';

    try {
      await sendPasswordResetEmail(auth, email);
      errorBox.style.color = '#4ade80';
      showError(`Password reset link sent to ${email}. Check your inbox.`);
    } catch (err) {
      console.error('Reset password error:', err);
      errorBox.style.color = '#ef4444';
      if (err.code === 'auth/user-not-found') {
        showError('No account found with this email.');
      } else {
        showError('Could not send reset link. Please try again.');
      }
    } finally {
      link.textContent = originalText;
    }
  });

  /* ---- Step 2: Login submit (Firebase Auth) ---- */
  document.getElementById('login-btn').addEventListener('click', async () => {
    const email = loginEmailDisplay.textContent.trim();
    const pass = document.getElementById('login-pass').value.trim();
    clearError();

    if (!pass) {
      showError('Please enter your password.');
      return;
    }

    const loginBtn = document.getElementById('login-btn');
    loginBtn.textContent = 'Signing in…';
    loginBtn.disabled = true;

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      overlay.hidden = true;
      window.location.reload();
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found') {
        showError('No account found with this email. Try Create Account instead.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        showError('Incorrect email or password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        showError('Too many attempts. Please try again later.');
      } else {
        showError('Sign in failed. Please try again.');
      }
    } finally {
      loginBtn.textContent = 'Sign In';
      loginBtn.disabled = false;
    }
  });

  /* ---- Step 3: Register submit (Firebase Auth) ---- */
  document.getElementById('register-btn').addEventListener('click', async () => {
    const email = regEmailDisplay.textContent.trim();
    const name  = document.getElementById('reg-name').value.trim();
    const pass  = document.getElementById('reg-pass').value.trim();
    const pass2 = document.getElementById('reg-pass2').value.trim();
    clearError();

    if (!name || !pass || !pass2) {
      showError('Please fill in all fields.');
      return;
    }
    if (pass.length < 6) {
      showError('Password must be at least 6 characters.');
      return;
    }
    if (pass !== pass2) {
      showError('Passwords do not match.');
      return;
    }

    const registerBtn = document.getElementById('register-btn');
    registerBtn.textContent = 'Creating account…';
    registerBtn.disabled = true;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, { displayName: name });
      overlay.hidden = true;
      window.location.reload();
    } catch (err) {
      console.error('Register error:', err);
      if (err.code === 'auth/email-already-in-use') {
        showError('This email is already registered. Try Sign In instead.');
      } else if (err.code === 'auth/weak-password') {
        showError('Password is too weak.');
      } else {
        showError('Registration failed. Please try again.');
      }
    } finally {
      registerBtn.textContent = 'Create Account';
      registerBtn.disabled = false;
    }
  });

});