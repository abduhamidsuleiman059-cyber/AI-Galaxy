import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

/* ============================================
   AI GALAXY — AUTH STATE + USER DROPDOWN
   auth-state.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const signinBtn = document.getElementById('signin-btn');
  if (!signinBtn) return;

  const originalLabel = signinBtn.textContent;
  let loggedIn = false;

  /* ---- Dropdown markup ---- */
  const dropdown = document.createElement('div');
  dropdown.className = 'user-dropdown';
  dropdown.hidden = true;
  dropdown.innerHTML = `
    <div class="user-dropdown__email" id="user-dropdown-email"></div>
    <button class="user-dropdown__signout" id="user-dropdown-signout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Sign Out
    </button>
  `;
  document.body.appendChild(dropdown);

  /* ---- Dropdown styles ---- */
  const style = document.createElement('style');
  style.textContent = `
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
  `;
  document.head.appendChild(style);

  const emailLabel = dropdown.querySelector('#user-dropdown-email');
  const signoutBtn  = dropdown.querySelector('#user-dropdown-signout');

  function positionDropdown() {
    const rect = signinBtn.getBoundingClientRect();
    dropdown.style.top   = `${rect.bottom + window.scrollY + 8}px`;
    dropdown.style.right = `${window.innerWidth - rect.right}px`;
  }

  function openDropdown()  { positionDropdown(); dropdown.hidden = false; }
  function closeDropdown() { dropdown.hidden = true; }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedIn = true;
      const firstName = (user.displayName || user.email || 'User').split(' ')[0];
      signinBtn.textContent = `Hi, ${firstName}`;
      emailLabel.textContent = user.email || '';
    } else {
      loggedIn = false;
      signinBtn.textContent = originalLabel;
      closeDropdown();
    }
  });

  /* Capture phase — mtu akiwa amelogin, click ya signinBtn inafungua dropdown badala ya modal */
  signinBtn.addEventListener('click', (e) => {
    if (loggedIn) {
      e.stopImmediatePropagation();
      e.preventDefault();
      dropdown.hidden ? openDropdown() : closeDropdown();
    }
  }, true);

  signoutBtn.addEventListener('click', () => {
    signOut(auth);
    closeDropdown();
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.hidden && !dropdown.contains(e.target) && e.target !== signinBtn) {
      closeDropdown();
    }
  });

  window.addEventListener('resize', () => {
    if (!dropdown.hidden) positionDropdown();
  });
});