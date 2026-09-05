import{a as e,i as t,n,o as r,r as i,s as a,t as o}from"./modal-kWVoKFoC.js";import{t as s}from"./profile-actions-BEVaoyxH.js";/* empty css               */import{onAuthStateChanged as c}from"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import{addDoc as l,collection as u,deleteDoc as d,doc as f,getDocs as p,limit as m,orderBy as h,query as g,serverTimestamp as _}from"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";var v=a((()=>{r(),document.addEventListener(`DOMContentLoaded`,()=>{let n=document.getElementById(`cm-recent-posts-list`),r=document.getElementById(`cm-new-post-btn`);if(!n)return;let i=null;c(t,e=>{i=e,y()});let a=document.createElement(`style`);a.textContent=`
    #cm-new-post-btn {
      padding: 0.45rem 1rem; font-size: 0.82rem; border-radius: 999px;
      box-shadow: none; display: inline-flex; align-items: center; gap: 0.35rem;
    }
    #cm-new-post-btn:hover { filter: brightness(1.08); }

    .cm-post-item {
      display: block; cursor: pointer; padding: 0.65rem 0.5rem; border-radius: 10px;
      transition: background 0.15s; position: relative;
    }
    .cm-post-item:hover { background: rgba(124,58,237,0.06); }
    .cm-post-item:hover .cm-post-item__delete { opacity: 1; }

    .cm-post-item__body {
      max-height: 0; overflow: hidden; opacity: 0;
      transition: max-height 0.3s ease, opacity 0.2s ease, margin-top 0.25s ease;
      font-size: 0.85rem; color: rgba(255,255,255,0.62);
      margin-top: 0; margin-left: calc(36px + var(--space-3));
      line-height: 1.65; white-space: pre-wrap; word-break: break-word;
    }
    .cm-post-item.is-open .cm-post-item__body {
      max-height: 1000px; opacity: 1; margin-top: 0.6rem;
    }

    .cm-post-item__chevron {
      margin-left: auto; flex-shrink: 0; color: rgba(255,255,255,0.3);
      transition: transform 0.2s ease;
    }
    .cm-post-item.is-open .cm-post-item__chevron { transform: rotate(180deg); }

    .cm-post-item__row { display: flex; align-items: center; gap: var(--space-3); }

    .cm-post-item__delete {
      flex-shrink: 0; width: 30px; height: 30px; border-radius: 9px;
      background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.18);
      color: rgba(248,113,113,0.8); display: flex; align-items: center; justify-content: center;
      cursor: pointer; opacity: 0; transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
    }
    .cm-post-item__delete svg { width: 14px; height: 14px; }
    .cm-post-item__delete:hover,
    .cm-post-item__delete:focus-visible {
      background: rgba(239,68,68,0.18); border-color: rgba(248,113,113,0.5); color: #fca5a5;
      opacity: 1;
    }
    .cm-post-item__delete:focus-visible { outline: 2px solid rgba(248,113,113,0.75); outline-offset: 2px; }
    @media (max-width: 768px) {
      .cm-post-item__delete { opacity: 0.6; }
    }
  `,document.head.appendChild(a);function o(e){let t=Math.floor((Date.now()-e.getTime())/1e3);if(t<60)return`just now`;let n=Math.floor(t/60);if(n<60)return`${n}m ago`;let r=Math.floor(n/60);return r<24?`${r}h ago`:`${Math.floor(r/24)}d ago`}function s(e){let t=document.createElement(`div`);return t.textContent=e||``,t.innerHTML}function v(e,t){let n=t.createdAt?o(t.createdAt.toDate()):`just now`,r=i&&t.authorUid===i.uid,a=t.body?s(t.body).replace(/\n/g,`<br>`):`<em style="opacity:.6;">No additional details.</em>`;return`
      <div class="cm-post-item" data-id="${e}">
        <div class="cm-post-item__row">
          <div class="cm-post-item__avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></div>
          <div>
            <div class="cm-post-item__title">${s(t.title)}</div>
            <div class="cm-post-item__meta">@${s(t.authorName)} · ${n} · 💬 0</div>
          </div>
          ${r?`<button class="cm-post-item__delete" data-delete-id="${e}" type="button" title="Delete post" aria-label="Delete post"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>`:``}
          <span class="cm-post-item__chevron"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></span>
        </div>
        <div class="cm-post-item__body">${a}</div>
      </div>`}async function y(){n.innerHTML=`<p style="color:var(--text-muted);padding:1rem 0;">Loading posts…</p>`;try{let t=await p(g(u(e,`posts`),h(`createdAt`,`desc`),m(20)));if(t.empty){n.innerHTML=`<p style="color:var(--text-muted);padding:1rem 0;">No posts yet — be the first to start a discussion!</p>`;return}n.innerHTML=t.docs.map(e=>v(e.id,e.data())).join(``)}catch(e){console.error(`Load posts error:`,e),n.innerHTML=`<p style="color:var(--text-muted);padding:1rem 0;">Could not load posts. Please try again.</p>`}}n.addEventListener(`click`,async t=>{let r=t.target.closest(`.cm-post-item__delete`);if(r){t.stopPropagation();let n=r.dataset.deleteId;if(!confirm(`Delete this post? This cannot be undone.`))return;try{await d(f(e,`posts`,n)),y()}catch(e){console.error(`Delete post error:`,e),alert(`Could not delete post. Please try again.`)}return}let i=t.target.closest(`.cm-post-item`);if(!i)return;let a=i.classList.contains(`is-open`);n.querySelectorAll(`.cm-post-item.is-open`).forEach(e=>e.classList.remove(`is-open`)),a||i.classList.add(`is-open`)});let b=document.createElement(`div`);b.className=`modal-overlay`,b.id=`cm-post-overlay`,b.hidden=!0,b.innerHTML=`
    <div class="modal-box" role="dialog" aria-modal="true">
      <button class="modal-close" id="cm-post-close" aria-label="Close">✕</button>
      <h2 class="modal-heading">Start a Discussion</h2>
      <p class="modal-subheading">Share something with the AI Galaxy community</p>
      <div class="modal-field">
        <label>Title</label>
        <input type="text" id="cm-post-title" placeholder="What's on your mind?" maxlength="120" />
      </div>
      <div class="modal-field">
        <label>Details (optional)</label>
        <textarea id="cm-post-body" rows="4" placeholder="Add more context…" style="width:100%;padding:0.75rem 1rem;background:rgba(255,255,255,0.05);border:1px solid rgba(124,58,237,0.25);border-radius:12px;color:#fff;font-size:0.9rem;box-sizing:border-box;resize:vertical;font-family:inherit;"></textarea>
      </div>
      <button class="btn btn--primary modal-submit" id="cm-post-submit">Post Discussion</button>
      <p class="modal-error" id="cm-post-error" hidden></p>
    </div>`,document.body.appendChild(b);let x=b.querySelector(`#cm-post-close`),S=b.querySelector(`#cm-post-title`),C=b.querySelector(`#cm-post-body`),w=b.querySelector(`#cm-post-submit`),T=b.querySelector(`#cm-post-error`);function E(){S.value=``,C.value=``,T.hidden=!0,b.hidden=!1,S.focus()}function D(){b.hidden=!0}x.addEventListener(`click`,D),b.addEventListener(`click`,e=>{e.target===b&&D()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!b.hidden&&D()}),r?.addEventListener(`click`,()=>{if(!i){document.getElementById(`signin-btn`)?.click();return}E()}),w.addEventListener(`click`,async()=>{let t=S.value.trim(),n=C.value.trim();if(T.hidden=!0,!t){T.textContent=`Please enter a title.`,T.style.color=`#ef4444`,T.hidden=!1;return}if(!i){D(),document.getElementById(`signin-btn`)?.click();return}w.textContent=`Posting…`,w.disabled=!0;try{await l(u(e,`posts`),{title:t,body:n,authorUid:i.uid,authorName:i.displayName||i.email.split(`@`)[0],createdAt:_()}),D(),y()}catch(e){console.error(`New post error:`,e),T.textContent=`Could not post. Please try again.`,T.style.color=`#ef4444`,T.hidden=!1}finally{w.textContent=`Post Discussion`,w.disabled=!1}}),y()})}));r(),n(),s(),v(),o(),i();