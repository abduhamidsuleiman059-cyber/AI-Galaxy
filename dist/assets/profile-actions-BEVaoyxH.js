import{i as e,o as t,s as n}from"./modal-kWVoKFoC.js";import{EmailAuthProvider as r,deleteUser as i,onAuthStateChanged as a,reauthenticateWithCredential as o,updatePassword as s,updateProfile as c}from"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";var l=n((()=>{t();var n=`jnkghelo`,l=`h9wkai0t`;async function u(e){let t=`https://api.cloudinary.com/v1_1/${n}/image/upload`,r=new FormData;r.append(`file`,e),r.append(`upload_preset`,l),r.append(`folder`,`avatars`);let i=await fetch(t,{method:`POST`,body:r});if(!i.ok)throw Error(`Cloudinary upload failed`);return(await i.json()).secure_url}document.addEventListener(`DOMContentLoaded`,()=>{let t=null;a(e,e=>{t=e});let n=document.createElement(`div`);n.className=`modal-overlay`,n.id=`pa-overlay`,n.hidden=!0,n.innerHTML=`
    <div class="modal-box" role="dialog" aria-modal="true">
      <button class="modal-close" id="pa-close" aria-label="Close">✕</button>
      <h2 class="modal-heading" id="pa-heading"></h2>
      <p class="modal-subheading" id="pa-subheading"></p>
      <div id="pa-body"></div>
      <p class="modal-error" id="pa-error" hidden></p>
    </div>`,document.body.appendChild(n);let l=n.querySelector(`#pa-heading`),d=n.querySelector(`#pa-subheading`),f=n.querySelector(`#pa-body`),p=n.querySelector(`#pa-error`),m=n.querySelector(`#pa-close`);function h(e,t){p.textContent=e,p.style.color=t?`#4ade80`:`#ef4444`,p.hidden=!1}function g(){p.hidden=!0,p.textContent=``}function _(e,t,r){l.textContent=e,d.textContent=t,f.innerHTML=r,g(),n.hidden=!1}function v(){n.hidden=!0}let y=document.createElement(`style`);y.textContent=`
    .pa-avatar-upload { display: flex; align-items: center; gap: 1rem; }
    .pa-avatar-preview {
      width: 56px; height: 56px; border-radius: 50%; overflow: hidden;
      background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3);
      display: flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,0.5); flex-shrink: 0;
    }
    .pa-avatar-preview img { width: 100%; height: 100%; object-fit: cover; }
  `,document.head.appendChild(y),m.addEventListener(`click`,v),n.addEventListener(`click`,e=>{e.target===n&&v()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!n.hidden&&v()});function b(){return t?!0:(document.getElementById(`signin-btn`)?.click(),!1)}function x(){let e=(t.displayName||t.email||`User`).split(` `)[0],n=document.getElementById(`signin-btn`);n&&(n.textContent=`Hi, ${e}`);let r=document.querySelector(`#panel-profile .mob-panel__name`);r&&(r.textContent=t.displayName||e)}let S=null;document.getElementById(`mob-edit-profile-btn`)?.addEventListener(`click`,()=>{if(!b())return;S=null,_(`Edit Profile`,`Update your display name and photo`,`
      <div class="modal-field">
        <label>Profile Photo</label>
        <div class="pa-avatar-upload">
          <div class="pa-avatar-preview" id="pa-avatar-preview">
            ${t.photoURL?`<img src="${t.photoURL}" alt="" />`:`<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`}
          </div>
          <button type="button" class="btn btn--outline" id="pa-avatar-btn">Change Photo</button>
          <input type="file" id="pa-avatar-file" accept="image/*" hidden />
        </div>
      </div>
      <div class="modal-field">
        <label>Full Name</label>
        <input type="text" id="pa-name-input" value="${t.displayName||``}" placeholder="Your name" />
      </div>
      <button class="btn btn--primary modal-submit" id="pa-save-name-btn">Save Changes</button>
    `);let e=document.getElementById(`pa-avatar-btn`),n=document.getElementById(`pa-avatar-file`),r=document.getElementById(`pa-avatar-preview`);e.addEventListener(`click`,()=>n.click()),n.addEventListener(`change`,()=>{let e=n.files[0];e&&(S=e,r.innerHTML=`<img src="${URL.createObjectURL(e)}" alt="" />`)}),document.getElementById(`pa-save-name-btn`).addEventListener(`click`,async()=>{let e=document.getElementById(`pa-name-input`).value.trim();if(g(),!e){h(`Please enter your name.`);return}let n=document.getElementById(`pa-save-name-btn`);n.disabled=!0;try{let r=t.photoURL||null;S&&(n.textContent=`Uploading photo…`,r=await u(S)),n.textContent=`Saving…`;let i={displayName:e};r&&(i.photoURL=r),await c(t,i),x(),h(`Profile updated successfully.`,!0)}catch(e){console.error(`Edit profile error:`,e),h(`Could not update profile. Please try again.`)}finally{n.textContent=`Save Changes`,n.disabled=!1}})}),document.getElementById(`mob-change-password-btn`)?.addEventListener(`click`,()=>{b()&&(_(`Change Password`,`Enter your current password to confirm`,`
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
    `),document.getElementById(`pa-save-pass-btn`).addEventListener(`click`,async()=>{let e=document.getElementById(`pa-current-pass`).value.trim(),n=document.getElementById(`pa-new-pass`).value.trim(),i=document.getElementById(`pa-new-pass2`).value.trim();if(g(),!e||!n||!i){h(`Please fill in all fields.`);return}if(n.length<6){h(`New password must be at least 6 characters.`);return}if(n!==i){h(`New passwords do not match.`);return}let a=document.getElementById(`pa-save-pass-btn`);a.textContent=`Updating…`,a.disabled=!0;try{let i=r.credential(t.email,e);await o(t,i),await s(t,n),h(`Password updated successfully.`,!0)}catch(e){console.error(`Change password error:`,e),e.code===`auth/wrong-password`||e.code===`auth/invalid-credential`?h(`Current password is incorrect.`):h(`Could not update password. Please try again.`)}finally{a.textContent=`Update Password`,a.disabled=!1}}))}),document.getElementById(`mob-settings-btn`)?.addEventListener(`click`,()=>{b()&&(_(`Settings`,`Manage your account`,`
      <div class="modal-field">
        <label>Signed in as</label>
        <input type="text" value="${t.email||``}" disabled />
      </div>
      <button class="btn btn--outline modal-submit" id="pa-delete-account-btn" style="color:#ef4444;border-color:rgba(239,68,68,0.4);">
        Delete Account
      </button>
    `),document.getElementById(`pa-delete-account-btn`).addEventListener(`click`,()=>{_(`Delete Account`,`This cannot be undone. Enter your password to confirm.`,`
        <div class="modal-field">
          <label>Password</label>
          <input type="password" id="pa-delete-pass" placeholder="••••••••" />
        </div>
        <button class="btn btn--outline modal-submit" id="pa-confirm-delete-btn" style="color:#ef4444;border-color:rgba(239,68,68,0.4);">
          Permanently Delete My Account
        </button>
      `),document.getElementById(`pa-confirm-delete-btn`).addEventListener(`click`,async()=>{let e=document.getElementById(`pa-delete-pass`).value.trim();if(g(),!e){h(`Please enter your password.`);return}let n=document.getElementById(`pa-confirm-delete-btn`);n.textContent=`Deleting…`,n.disabled=!0;try{let n=r.credential(t.email,e);await o(t,n),await i(t),v(),window.location.href=`index.html`}catch(e){console.error(`Delete account error:`,e),e.code===`auth/wrong-password`||e.code===`auth/invalid-credential`?h(`Incorrect password.`):h(`Could not delete account. Please try again.`)}finally{n.textContent=`Permanently Delete My Account`,n.disabled=!1}})}))})})}));export{l as t};