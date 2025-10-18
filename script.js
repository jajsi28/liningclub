/* script.js
   Updated: added site-wide user state, profile dropdown, animated search overlay,
   login/signup persistent storage (localStorage), and header update logic.
   All user-facing text is in Mongolian per request.
*/

/* ---------- Utilities for user state (localStorage) ---------- */
const USERS_KEY = 'liningclub_users';       // array of registered users
const CURRENT_USER_KEY = 'liningclub_current_user'; // currently logged-in user

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users || []));
}
function loadUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
        return [];
    }
}
function setCurrentUser(user) {
    if (!user) {
        localStorage.removeItem(CURRENT_USER_KEY);
    } else {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
    updateHeaderUI();
}
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    } catch {
        return null;
    }
}
function logoutCurrentUser() {
    setCurrentUser(null);
    if (typeof showToast === 'function') showToast('Системээс гарлаа', 'info', 1400);
    setTimeout(() => { window.location.href = 'index.html'; }, 400);
}

/* ---------- Header / Profile UI updates (works on all pages) ---------- */
function buildLoggedOutActions() {
    // return element for not-logged-in state (Нэвтрэх / Бүртгүүлэх)
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-actions';
    wrapper.innerHTML = `
        <a href="login.html" class="nav-link header-action-link">Нэвтрэх</a>
        <a href="signup.html" class="nav-link header-action-link">Бүртгүүлэх</a>
        <div class="search-icon header-icon" title="Хайх" role="button" aria-label="Search">🔍</div>
        <div class="cart-icon header-icon" title="Сагс" role="button" aria-label="Cart">🛒 <span class="cart-count">0</span></div>
        <div class="profile-icon header-icon" title="Профайл" role="button" aria-label="Profile">👤</div>
        <div class="hamburger" onclick="toggleMobileMenu()" aria-label="Open menu">
            <span></span><span></span><span></span>
        </div>
    `;
    return wrapper;
}

function buildLoggedInActions(user) {
    // return element showing user's avatar/name and dropdown
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-actions';
    wrapper.innerHTML = `
        <div class="welcome-text">Сайн байна уу, <strong>${escapeHtml(user.name || user.email || 'Хэрэглэгч')}</strong></div>
        <div class="search-icon header-icon" title="Хайх" role="button" aria-label="Search">🔍</div>
        <div class="cart-icon header-icon" title="Сагс" role="button" aria-label="Cart">🛒 <span class="cart-count">${(user.cartCount||0)}</span></div>
        <div class="profile-wrap">
            <button class="profile-btn" aria-haspopup="true" aria-expanded="false" title="Профайл">
                <span class="profile-avatar">👤</span>
                <span class="profile-name">${shortName(user.name || user.email)}</span>
                <span class="chev">▾</span>
            </button>
            <div class="profile-dropdown" role="menu" aria-hidden="true">
                <div class="profile-card">
                    <div class="pd-row">
                        <div class="pd-avatar">👤</div>
                        <div>
                            <div class="pd-name">${escapeHtml(user.name || user.email)}</div>
                            <div class="pd-email">${escapeHtml(user.email || '')}</div>
                        </div>
                    </div>
                    <div class="pd-stats">
                        <div><strong>${(user.purchases?user.purchases.length:0)}</strong><span> Захиалга</span></div>
                        <div><strong>${(user.wishlist?user.wishlist.length:0)}</strong><span> Хадгалсан</span></div>
                    </div>
                </div>
                <ul class="profile-links">
                    <li><button class="profile-link-btn" data-action="orders">Миний захиалгууд</button></li>
                    <li><button class="profile-link-btn" data-action="profile">Миний мэдээлэл</button></li>
                    <li><button class="profile-link-btn" data-action="address">Хаяг</button></li>
                    <li><button class="profile-link-btn" data-action="settings">Тохиргоо</button></li>
                    <li><button class="profile-link-btn" data-action="logout">Гарах</button></li>
                </ul>
            </div>
        </div>
        <div class="hamburger" onclick="toggleMobileMenu()" aria-label="Open menu">
            <span></span><span></span><span></span>
        </div>
    `;
    return wrapper;
}

function shortName(name) {
    if (!name) return 'Х';
    const parts = name.split(' ');
    if (parts.length === 1) return name.slice(0,10);
    return parts[0];
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
}

function updateHeaderUI() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;

    // find existing .nav-actions and replace
    const existing = navContainer.querySelector('.nav-actions');
    if (existing) existing.remove();

    const user = getCurrentUser();
    let newActions;
    if (user) {
        newActions = buildLoggedInActions(user);
    } else {
        newActions = buildLoggedOutActions();
    }
    navContainer.appendChild(newActions);

    // attach listeners for search, profile, cart
    attachHeaderListeners();
}

/* ---------- Attach header click handlers ---------- */
function attachHeaderListeners() {
    // search
    document.querySelectorAll('.search-icon').forEach(el=>{
        el.removeEventListener('click', onSearchIconClick);
        el.addEventListener('click', onSearchIconClick);
    });

    // profile button (if logged in)
    document.querySelectorAll('.profile-btn').forEach(btn=>{
        btn.removeEventListener('click', onProfileBtnClick);
        btn.addEventListener('click', onProfileBtnClick);
    });

    // profile link buttons (orders, profile, address, logout)
    document.querySelectorAll('.profile-link-btn').forEach(b=>{
        b.removeEventListener('click', onProfileActionClick);
        b.addEventListener('click', onProfileActionClick);
    });

    // profile icon when logged out opens login/signup prompt
    document.querySelectorAll('.profile-icon').forEach(el=>{
        el.removeEventListener('click', onProfileIconGuestClick);
        el.addEventListener('click', onProfileIconGuestClick);
    });

    // cart
    document.querySelectorAll('.cart-icon').forEach(el=>{
        el.removeEventListener('click', onCartClick);
        el.addEventListener('click', onCartClick);
    });
}

/* ---------- Profile handlers ---------- */
function onProfileIconGuestClick() {
    // show small menu offering login/signup (modal-like mini menu)
    const box = document.createElement('div');
    box.className = 'guest-quickbox';
    box.innerHTML = `
        <a href="login.html" class="guest-quicklink">Нэвтрэх</a>
        <a href="signup.html" class="guest-quicklink">Бүртгүүлэх</a>
    `;
    appendTransientMenu(this, box);
}

function appendTransientMenu(anchorEl, menuEl) {
    // remove any existing
    document.querySelectorAll('.transient-menu').forEach(n=>n.remove());

    menuEl.classList.add('transient-menu');
    document.body.appendChild(menuEl);

    const rect = anchorEl.getBoundingClientRect();
    menuEl.style.position = 'absolute';
    menuEl.style.top = `${rect.bottom + window.scrollY + 8}px`;
    menuEl.style.left = `${Math.max(8, rect.left + window.scrollX - 80)}px`;
    menuEl.addEventListener('mouseleave', ()=> menuEl.remove());
    setTimeout(()=> {
        menuEl.classList.add('enter');
    }, 8);
}

function onProfileBtnClick(e) {
    const btn = e.currentTarget;
    const wrap = btn.closest('.profile-wrap');
    const dropdown = wrap.querySelector('.profile-dropdown');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
        closeProfileDropdown(wrap);
    } else {
        openProfileDropdown(wrap);
    }
}

function openProfileDropdown(wrap) {
    const btn = wrap.querySelector('.profile-btn');
    const dropdown = wrap.querySelector('.profile-dropdown');
    btn.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
    dropdown.classList.add('open');
    // close when clicking outside
    setTimeout(() => {
        document.addEventListener('click', closeProfileOnOutsideClick);
    }, 10);
}

function closeProfileDropdown(wrap) {
    const btn = wrap.querySelector('.profile-btn');
    const dropdown = wrap.querySelector('.profile-dropdown');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (dropdown) {
        dropdown.setAttribute('aria-hidden', 'true');
        dropdown.classList.remove('open');
    }
    document.removeEventListener('click', closeProfileOnOutsideClick);
}

function closeProfileOnOutsideClick(e) {
    const wrap = document.querySelector('.profile-wrap');
    if (!wrap) return;
    if (!wrap.contains(e.target)) {
        closeProfileDropdown(wrap);
    }
}

function onProfileActionClick(e) {
    const action = e.currentTarget.dataset.action;
    const user = getCurrentUser();
    if (!user) {
        showToast && showToast('Эхлээд нэвтэрнэ үү', 'info', 1500);
        return;
    }
    switch(action) {
        case 'orders':
            // demo: show list of purchases via toast or modal
            const purchases = (user.purchases && user.purchases.length) ? user.purchases.join(', ') : 'Захиалга байхгүй';
            showToast && showToast(`Таны захиалгууд: ${purchases}`, 'info', 3000, 'Миний захиалгууд');
            break;
        case 'profile':
            showProfileModal(user);
            break;
        case 'address':
            showAddressModal(user);
            break;
        case 'settings':
            showToast && showToast('Тохиргоо хэсэг (Demo)', 'info', 1600);
            break;
        case 'logout':
            logoutCurrentUser();
            break;
    }
}

/* ---------- Profile modals (simple) ---------- */
function showProfileModal(user) {
    const modal = createSimpleModal(`
        <h3>Миний мэдээлэл</h3>
        <p><strong>Нэр:</strong> ${escapeHtml(user.name || '')}</p>
        <p><strong>Имэйл:</strong> ${escapeHtml(user.email || '')}</p>
        <p><strong>Утас:</strong> ${escapeHtml(user.phone || '')}</p>
    `);
    document.body.appendChild(modal);
}
function showAddressModal(user) {
    const address = user.address || '';
    const modal = createSimpleModal(`
        <h3>Хаяг</h3>
        <p>${escapeHtml(address || 'Тохиргоогүй')}</p>
        <div style="margin-top:8px;"><button id="editAddressBtn" class="btn-auth">Засах</button></div>
    `);
    document.body.appendChild(modal);
    const editBtn = modal.querySelector('#editAddressBtn');
    editBtn && editBtn.addEventListener('click', () => {
        const newAddr = prompt('Шинэ хаяг оруулна уу', user.address || '');
        if (newAddr !== null) {
            user.address = newAddr;
            // update in users list and current
            const users = loadUsers();
            const idx = users.findIndex(u => u.email === user.email);
            if (idx > -1) { users[idx] = user; saveUsers(users); }
            setCurrentUser(user);
            showToast && showToast('Хаяг амжилттай шинэчиллээ', 'success', 1400);
        }
        modal.remove();
    });
}

function createSimpleModal(innerHTML) {
    const overlay = document.createElement('div');
    overlay.className = 'lc-modal';
    overlay.innerHTML = `
        <div class="lc-modal-card">
            <button class="lc-modal-close" aria-label="Хаах">✕</button>
            <div class="lc-modal-body">${innerHTML}</div>
        </div>
    `;
    overlay.addEventListener('click', (e)=> {
        if (e.target === overlay) overlay.remove();
    });
    overlay.querySelector('.lc-modal-close').addEventListener('click', ()=> overlay.remove());
    return overlay;
}

/* ---------- Search overlay (animated, site-wide) ---------- */
let searchOverlayEl = null;
function createSearchOverlay() {
    if (searchOverlayEl) return searchOverlayEl;
    const el = document.createElement('div');
    el.className = 'lc-search-overlay';
    el.innerHTML = `
        <div class="lc-search-panel">
            <button class="lc-search-close" aria-label="Хаах">✕</button>
            <div class="lc-search-header">
                <div class="lc-search-logo">Lining Club</div>
                <p class="lc-search-sub">Хайх: бүтээгдэхүүн, төрөл, брэнд...</p>
            </div>
            <form id="lcSearchForm" class="lc-search-form">
                <input id="lcSearchInput" class="lc-search-input" type="search" placeholder="Жишээ: Air Jordan" autofocus />
                <button class="lc-search-submit" type="submit">Хайх</button>
            </form>
            <div class="lc-search-suggestions">
                <button class="suggestion">Air Jordan</button>
                <button class="suggestion">Air Max</button>
                <button class="suggestion">Hoodie</button>
            </div>
        </div>
    `;
    document.body.appendChild(el);

    // events
    el.querySelector('.lc-search-close').addEventListener('click', ()=> hideSearchOverlay());
    el.querySelectorAll('.suggestion').forEach(btn=>{
        btn.addEventListener('click', (e)=>{
            const q = e.currentTarget.textContent;
            runSearch(q);
            hideSearchOverlay();
        });
    });
    el.querySelector('#lcSearchForm').addEventListener('submit', (e)=>{
        e.preventDefault();
        const q = el.querySelector('#lcSearchInput').value.trim();
        if (q) {
            runSearch(q);
            hideSearchOverlay();
        }
    });
    // close on ESC
    el.addEventListener('keydown', (e)=> { if (e.key === 'Escape') hideSearchOverlay(); });

    searchOverlayEl = el;
    return el;
}

function showSearchOverlay() {
    const node = createSearchOverlay();
    node.classList.add('open');
    node.querySelector('#lcSearchInput').focus();
    document.body.style.overflow = 'hidden';
}
function hideSearchOverlay() {
    if (!searchOverlayEl) return;
    searchOverlayEl.classList.remove('open');
    document.body.style.overflow = '';
}

/* ---------- header event helper functions ---------- */
function onSearchIconClick(e) {
    showSearchOverlay();
}

function onCartClick(e) {
    if (typeof openCart === 'function') openCart();
    else showToast && showToast('Сагс нээлттэй (Demo)', 'info', 1400);
}

/* ---------- Hook into DOM on load ---------- */
document.addEventListener('DOMContentLoaded', function() {
    // Ensure header UI reflects current login state across pages
    updateHeaderUI();

    // If on login/signup pages, attach form logic (these pages also contain their own scripts,
    // but we provide robust handling here to set persistent user data)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = (document.getElementById('login-email') || {}).value || '';
            const pass = (document.getElementById('login-password') || {}).value || '';
            if (!email || !pass) {
                showToast && showToast('Бүх талбарыг бөглөнө үү', 'error', 2000);
                return;
            }
            // find user by email & password
            const users = loadUsers();
            const user = users.find(u => u.email === email && u.password === pass);
            if (user) {
                setCurrentUser(user);
                showToast && showToast('Амжилттай нэвтэрлээ! Тавтай морилно уу.', 'success', 1500, 'Сайн байна уу!');
                setTimeout(()=> window.location.href = 'index.html', 900);
            } else {
                showToast && showToast('Нэвтрэх мэдээлэл буруу эсвэл бүртгэлгүй байна', 'error', 2200);
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = (document.getElementById('signup-name') || {}).value || '';
            const email = (document.getElementById('signup-email') || {}).value || '';
            const phone = (document.getElementById('signup-phone') || {}).value || '';
            const pass = (document.getElementById('signup-password') || {}).value || '';
            if (!name || !email || !phone || !pass) {
                showToast && showToast('Бүх талбарыг бөглөнө үү', 'error', 2000);
                return;
            }
            const users = loadUsers();
            if (users.find(u => u.email === email)) {
                showToast && showToast('Ийм имэйлтэй хэрэглэгч аль хэдийн бүртгэлтэй', 'error', 2200);
                return;
            }
            const newUser = {
                name: name,
                email: email,
                phone: phone,
                password: pass,
                address: '',
                purchases: [],
                wishlist: [],
                cartCount: 0,
                joined: new Date().toISOString()
            };
            users.push(newUser);
            saveUsers(users);
            setCurrentUser(newUser);
            showToast && showToast('Амжилттай бүртгэгдлээ! Нэвтрэх хуудас руу шилжиж байна...', 'success', 1600, 'Баяр хүргэе!');
            setTimeout(()=> window.location.href = 'index.html', 900);
        });
    }

    // Close dropdown on ESC as well
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.profile-dropdown.open').forEach(dd=>{
                const wrap = dd.closest('.profile-wrap');
                if (wrap) closeProfileDropdown(wrap);
            });
            hideSearchOverlay();
        }
    });

    // Accessibility: allow profile open via Enter on profile-btn
    document.addEventListener('keydown', function(e) {
        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.classList.contains('profile-btn')) {
            e.preventDefault();
            document.activeElement.click();
        }
    });
});

/* ---------- Keep the rest of the existing script functionality below ---------- */
/* (Note: existing features such as smooth scroll, product hover, cart modal, etc. are kept.
   If you previously had other functions below, ensure to merge them. For brevity they are omitted here.
   The rest of your app should continue to import and run this script.)
*/
