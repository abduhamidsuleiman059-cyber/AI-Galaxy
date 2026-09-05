import{initializeApp as e}from"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";import{createUserWithEmailAndPassword as t,getAuth as n,onAuthStateChanged as r,sendPasswordResetEmail as i,signInWithEmailAndPassword as a,signOut as o,updateProfile as s}from"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import{getFirestore as c}from"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import{getStorage as l}from"https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";var u=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},d=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var f,p,m,h=u((()=>{f=e({apiKey:`AIzaSyA1ItCjZEm-dW6FpP8eQyi3Fe1VsH1Yioo`,authDomain:`ai-galaxy-b19f6.firebaseapp.com`,projectId:`ai-galaxy-b19f6`,storageBucket:`ai-galaxy-b19f6.firebasestorage.app`,messagingSenderId:`516546792682`,appId:`1:516546792682:web:4a788bf5f49672e608db93`}),p=n(f),m=c(f),l(f)}));function g(e){return(e&&(e.displayName||e.email)||`U`).trim().charAt(0).toUpperCase()}function _(e,t){return e&&e.photoURL?`<img src="${e.photoURL}" alt="" class="${t}" />`:`<div class="${t} avatar-letter">${g(e)}</div>`}function v(e){let t=document.querySelector(`.bottom-nav__item[data-panel="profile"]`);if(t){let n=t.querySelector(`svg, img.nav-avatar, div.nav-avatar`);n&&(n.outerHTML=e?_(e,`nav-avatar`):y)}let n=document.querySelector(`.mob-panel__avatar`);n&&(n.innerHTML=e?_(e,`mob-avatar-img`):b)}var y,b,x=u((()=>{y=`<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,b=`<svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`})),S=d((()=>{h(),x(),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`signin-btn`);if(!e)return;let t=e.textContent,n=!1,i=document.createElement(`div`);i.className=`user-dropdown`,i.hidden=!0,i.innerHTML=`
    <div class="user-dropdown__email" id="user-dropdown-email"></div>
    <button class="user-dropdown__signout" id="user-dropdown-signout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Sign Out
    </button>
  `,document.body.appendChild(i);let a=document.createElement(`style`);a.textContent=`
    .user-dropdown {
      position: absolute; z-index: 9500;
      background: #0f0a1e; border: 1px solid rgba(124,58,237,0.3);
      border-radius: 14px; padding: 0.5rem;
      min-width: 200px; box-shadow: 0 12px 40px rgba(0,0,0,0.5);
      animation: userDropdownFadeIn 0.15s ease;
    }
    .user-dropdown[hidden] { display: none; }
    .user-dropdown__email {
      font-size: 0.78rem; color: rgba(255,255,255,0.5);
      padding: 0.5rem 0.75rem 0.6rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      margin-bottom: 0.35rem;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .user-dropdown__signout {
      display: flex; align-items: center; gap: 0.6rem;
      width: 100%; padding: 0.6rem 0.75rem; border-radius: 10px;
      background: none; border: none; color: #f87171;
      font-size: 0.88rem; font-weight: 600; cursor: pointer;
      font-family: 'Space Grotesk', sans-serif; text-align: left;
      transition: background 0.15s;
    }
    .user-dropdown__signout:hover { background: rgba(239,68,68,0.12); }
    @keyframes userDropdownFadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `,document.head.appendChild(a);let s=i.querySelector(`#user-dropdown-email`),c=i.querySelector(`#user-dropdown-signout`);function l(){let t=e.getBoundingClientRect();i.style.top=`${t.bottom+window.scrollY+8}px`,i.style.right=`${window.innerWidth-t.right}px`}function u(){l(),i.hidden=!1}function d(){i.hidden=!0}r(p,r=>{let i=document.querySelector(`.mob-panel__name`),a=document.querySelector(`.mob-panel__email`);if(r){n=!0;let t=(r.displayName||r.email||`User`).split(` `)[0];e.textContent=`Hi, ${t}`,s.textContent=r.email||``,i&&(i.textContent=r.displayName||t),a&&(a.textContent=r.email||``)}else n=!1,e.textContent=t,d(),i&&(i.textContent=`Galaxy User`),a&&(a.textContent=`Sign in to view your profile`);v(r)}),e.addEventListener(`click`,e=>{n&&(e.stopImmediatePropagation(),e.preventDefault(),i.hidden?u():d())},!0),c.addEventListener(`click`,()=>{o(p),d()});let f=document.getElementById(`mob-logout-btn`);f&&f.addEventListener(`click`,()=>{o(p)});let m=document.getElementById(`mob-saved-tools-btn`);m&&m.addEventListener(`click`,()=>{window.location.href=`tools.html?filter=saved`}),document.addEventListener(`click`,t=>{!i.hidden&&!i.contains(t.target)&&t.target!==e&&d()}),window.addEventListener(`resize`,()=>{i.hidden||l()})})})),C=d((()=>{h(),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`signin-btn`),n=document.getElementById(`auth-modal-container`);if(!e||!n)return;n.innerHTML=`
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
    </div>`;let r=document.createElement(`style`);r.textContent=`
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
  `,document.head.appendChild(r);let o=document.getElementById(`auth-overlay`),c=document.getElementById(`modal-close`),l=document.getElementById(`modal-heading`),u=document.getElementById(`modal-subheading`),d=document.getElementById(`modal-error`),f=document.getElementById(`step-email`),m=document.getElementById(`step-login`),h=document.getElementById(`step-register`),g=document.getElementById(`auth-email`),_=document.getElementById(`signin-direct-btn`),v=document.getElementById(`register-direct-btn`),y=document.getElementById(`login-email-display`),b=document.getElementById(`reg-email-display`);function x(e){d.textContent=e,d.hidden=!1}function S(){d.hidden=!0,d.textContent=``}function C(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function w(){f.style.display=`block`,m.style.display=`none`,h.style.display=`none`,l.textContent=`Welcome back`,u.textContent=`Sign in or create an account to continue`,S(),g.focus()}function T(e){f.style.display=`none`,m.style.display=`block`,h.style.display=`none`,y.textContent=e,l.textContent=`Sign in`,u.textContent=`Enter your password to continue`,S(),document.getElementById(`login-pass`).focus()}function E(e){f.style.display=`none`,m.style.display=`none`,h.style.display=`block`,b.textContent=e,l.textContent=`Create your account`,u.textContent=`Just a few details to get started`,S(),document.getElementById(`reg-name`).focus()}e.addEventListener(`click`,()=>{o.hidden=!1,w()}),c.addEventListener(`click`,()=>{o.hidden=!0}),o.addEventListener(`click`,e=>{e.target===o&&(o.hidden=!0)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!o.hidden&&(o.hidden=!0)}),_.addEventListener(`click`,()=>{let e=g.value.trim();if(S(),!C(e)){x(`Please enter a valid email address.`);return}T(e)}),v.addEventListener(`click`,()=>{let e=g.value.trim();if(S(),!C(e)){x(`Please enter a valid email address.`);return}E(e)}),g.addEventListener(`keydown`,e=>{e.key===`Enter`&&_.click()}),document.getElementById(`change-email-login`).addEventListener(`click`,w),document.getElementById(`change-email-reg`).addEventListener(`click`,w),document.querySelectorAll(`.modal-pass-toggle`).forEach(e=>{e.addEventListener(`click`,()=>{let t=document.getElementById(e.dataset.target),n=t.type===`password`;t.type=n?`text`:`password`,e.querySelector(`.eye-open`).style.display=n?`none`:`block`,e.querySelector(`.eye-closed`).style.display=n?`block`:`none`})}),document.getElementById(`forgot-pass-link`).addEventListener(`click`,async e=>{e.preventDefault();let t=y.textContent.trim();if(S(),!t){x(`Please enter your email first.`);return}let n=document.getElementById(`forgot-pass-link`),r=n.textContent;n.textContent=`Sending…`;try{await i(p,t),d.style.color=`#4ade80`,x(`Password reset link sent to ${t}. Check your inbox.`)}catch(e){console.error(`Reset password error:`,e),d.style.color=`#ef4444`,e.code===`auth/user-not-found`?x(`No account found with this email.`):x(`Could not send reset link. Please try again.`)}finally{n.textContent=r}}),document.getElementById(`login-btn`).addEventListener(`click`,async()=>{let e=y.textContent.trim(),t=document.getElementById(`login-pass`).value.trim();if(S(),!t){x(`Please enter your password.`);return}let n=document.getElementById(`login-btn`);n.textContent=`Signing in…`,n.disabled=!0;try{await a(p,e,t),o.hidden=!0,window.location.reload()}catch(e){console.error(`Login error:`,e),e.code===`auth/user-not-found`?x(`No account found with this email. Try Create Account instead.`):e.code===`auth/wrong-password`||e.code===`auth/invalid-credential`?x(`Incorrect email or password. Please try again.`):e.code===`auth/too-many-requests`?x(`Too many attempts. Please try again later.`):x(`Sign in failed. Please try again.`)}finally{n.textContent=`Sign In`,n.disabled=!1}}),document.getElementById(`register-btn`).addEventListener(`click`,async()=>{let e=b.textContent.trim(),n=document.getElementById(`reg-name`).value.trim(),r=document.getElementById(`reg-pass`).value.trim(),i=document.getElementById(`reg-pass2`).value.trim();if(S(),!n||!r||!i){x(`Please fill in all fields.`);return}if(r.length<6){x(`Password must be at least 6 characters.`);return}if(r!==i){x(`Passwords do not match.`);return}let a=document.getElementById(`register-btn`);a.textContent=`Creating account…`,a.disabled=!0;try{await s((await t(p,e,r)).user,{displayName:n}),o.hidden=!0,window.location.reload()}catch(e){console.error(`Register error:`,e),e.code===`auth/email-already-in-use`?x(`This email is already registered. Try Sign In instead.`):e.code===`auth/weak-password`?x(`Password is too weak.`):x(`Registration failed. Please try again.`)}finally{a.textContent=`Create Account`,a.disabled=!1}})})}));export{m as a,p as i,S as n,h as o,x as r,d as s,C as t};