import { auth } from './firebase-config.js';
import {
  onAuthStateChanged, updateProfile,
  EmailAuthProvider, reauthenticateWithCredential,
  updatePassword, deleteUser
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

/* ============================================
   AI GALAXY — PROFILE ACTIONS
   Edit Profile, Change Password, Settings (Delete Account)
   profile-actions.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  let currentUser = null;
  onAuthStateChanged(auth, (user) => { currentUser = user; });

  /* ---- Generic small modal (mtindo ule ule wa auth modal) ---- */
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'pa-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true">
      <button class="modal-close" id="pa-close" aria-label="Close">✕</button>
      <h2 class="modal-heading" id="pa-heading"></h2>
      <p class="modal-subheading" id="pa-subheading"></p>
      <div id="pa-body"></div>
      <p class="modal-error" id="pa-error" hidden></p>
    </div>`;
  document.body.appendChild(overlay);

  const paHeading    = overlay.querySelector('#pa-heading');
  const paSubheading = overlay.querySelector('#pa-subheading');
  const paBody       = overlay.querySelector('#pa-body');
  const paError      = overlay.querySelector('#pa-error');
  const paClose      = overlay.querySelector('#pa-close');

  function paShowError(msg, ok) {
    paError.textContent = msg;
    paError.style.color = ok ? '#4ade80' : '#ef4444';
    paError.hidden = false;
  }
  function paClearError() {
    paError.hidden = true;
    paError.textContent = '';
  }
  function paOpen(heading, subheading, bodyHTML) {
    paHeading.textContent = heading;
    paSubheading.textContent = subheading;
    paBody.innerHTML = bodyHTML;
    paClearError();
    overlay.hidden = false;
  }
  function paCloseModal() { overlay.hidden = true; }

  paClose.addEventListener('click', paCloseModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) paCloseModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) paCloseModal(); });

  function requireLogin() {
    if (!currentUser) {
      document.getElementById('signin-btn')?.click();
      return false;
    }
    return true;
  }

  /* ---- Update mob/desktop displayed name after a change ---- */
  function refreshDisplayedName() {
    const firstName = (currentUser.displayName || currentUser.email || 'User').split(' ')[0];
    const signinBtn = document.getElementById('signin-btn');
    if (signinBtn) signinBtn.textContent = `Hi, ${firstName}`;
    const mobName = document.querySelector('#panel-profile .mob-panel__name');
    if (mobName) mobName.textContent = currentUser.displayName || firstName;
  }

  /* ================= EDIT PROFILE ================= */
  document.getElementById('mob-edit-profile-btn')?.addEventListener('click', () => {
    if (!requireLogin()) return;

    paOpen('Edit Profile', 'Update your display name', `
      <div class="modal-field">
        <label>Full Name</label>
        <input type="text" id="pa-name-input" value="${currentUser.displayName || ''}" placeholder="Your name" />
      </div>
      <button class="btn btn--primary modal-submit" id="pa-save-name-btn">Save Changes</button>
    `);

    document.getElementById('pa-save-name-btn').addEventListener('click', async () => {
      const name = document.getElementById('pa-name-input').value.trim();
      paClearError();
      if (!name) { paShowError('Please enter your name.'); return; }

      const btn = document.getElementById('pa-save-name-btn');
      btn.textContent = 'Saving…';
      btn.disabled = true;
      try {
        await updateProfile(currentUser, { displayName: name });
        refreshDisplayedName();
        paShowError('Profile updated successfully.', true);
      } catch (err) {
        console.error('Edit profile error:', err);
        paShowError('Could not update profile. Please try again.');
      } finally {
        btn.textContent = 'Save Changes';
        btn.disabled = false;
      }
    });
  });

  /* ================= CHANGE PASSWORD ================= */
  document.getElementById('mob-change-password-btn')?.addEventListener('click', () => {
    if (!requireLogin()) return;

    paOpen('Change Password', 'Enter your current password to confirm', `
      <div class="modal-field">
        <label>Current Password</label>
        <input type="password" id="pa-current-pass" placeholder="••••••••" />
      </div>
      <div class="modal-field">
        <label>New Password</label>
        <input type="password" id="pa-new-pass" placeholder="••••••••" />
      </div>
      <div class="modal-field">
        <label>Confirm New Password</label>
        <input type="password" id="pa-new-pass2" placeholder="••••••••" />
      </div>
      <button class="btn btn--primary modal-submit" id="pa-save-pass-btn">Update Password</button>
    `);

    document.getElementById('pa-save-pass-btn').addEventListener('click', async () => {
      const current = document.getElementById('pa-current-pass').value.trim();
      const next    = document.getElementById('pa-new-pass').value.trim();
      const next2   = document.getElementById('pa-new-pass2').value.trim();
      paClearError();

      if (!current || !next || !next2) { paShowError('Please fill in all fields.'); return; }
      if (next.length < 6) { paShowError('New password must be at least 6 characters.'); return; }
      if (next !== next2) { paShowError('New passwords do not match.'); return; }

      const btn = document.getElementById('pa-save-pass-btn');
      btn.textContent = 'Updating…';
      btn.disabled = true;
      try {
        const cred = EmailAuthProvider.credential(currentUser.email, current);
        await reauthenticateWithCredential(currentUser, cred);
        await updatePassword(currentUser, next);
        paShowError('Password updated successfully.', true);
      } catch (err) {
        console.error('Change password error:', err);
        if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          paShowError('Current password is incorrect.');
        } else {
          paShowError('Could not update password. Please try again.');
        }
      } finally {
        btn.textContent = 'Update Password';
        btn.disabled = false;
      }
    });
  });

  /* ================= SETTINGS (Delete Account) ================= */
  document.getElementById('mob-settings-btn')?.addEventListener('click', () => {
    if (!requireLogin()) return;

    paOpen('Settings', 'Manage your account', `
      <div class="modal-field">
        <label>Signed in as</label>
        <input type="text" value="${currentUser.email || ''}" disabled />
      </div>
      <button class="btn btn--outline modal-submit" id="pa-delete-account-btn" style="color:#ef4444;border-color:rgba(239,68,68,0.4);">
        Delete Account
      </button>
    `);

    document.getElementById('pa-delete-account-btn').addEventListener('click', () => {
      paOpen('Delete Account', 'This cannot be undone. Enter your password to confirm.', `
        <div class="modal-field">
          <label>Password</label>
          <input type="password" id="pa-delete-pass" placeholder="••••••••" />
        </div>
        <button class="btn btn--outline modal-submit" id="pa-confirm-delete-btn" style="color:#ef4444;border-color:rgba(239,68,68,0.4);">
          Permanently Delete My Account
        </button>
      `);

      document.getElementById('pa-confirm-delete-btn').addEventListener('click', async () => {
        const pass = document.getElementById('pa-delete-pass').value.trim();
        paClearError();
        if (!pass) { paShowError('Please enter your password.'); return; }

        const btn = document.getElementById('pa-confirm-delete-btn');
        btn.textContent = 'Deleting…';
        btn.disabled = true;
        try {
          const cred = EmailAuthProvider.credential(currentUser.email, pass);
          await reauthenticateWithCredential(currentUser, cred);
          await deleteUser(currentUser);
          paCloseModal();
          window.location.href = 'index.html';
        } catch (err) {
          console.error('Delete account error:', err);
          if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
            paShowError('Incorrect password.');
          } else {
            paShowError('Could not delete account. Please try again.');
          }
        } finally {
          btn.textContent = 'Permanently Delete My Account';
          btn.disabled = false;
        }
      });
    });
  });

});