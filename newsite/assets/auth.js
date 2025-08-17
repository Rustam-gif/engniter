(function(){
  const PAYMENT_URL = 'https://buy.stripe.com/cNi28rb94gVm0ghcZm4wM00';
  const PRICE_LABEL = '€6.99';
  function createGoTrueClient(){
    return new GoTrue({
      url: window.location.origin + '/.netlify/identity',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    });
  }

  function getElements(){
    return {
      signinNav: document.getElementById('signin-nav'),
      accountNav: document.getElementById('account-nav'),
      navList: document.querySelector('header.nav nav ul')
    };
  }

  function ensureLogoutNav(){
    const { navList } = getElements();
    if (!navList) return null;
    let logoutLink = document.getElementById('logout-nav');
    if (!logoutLink){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.id = 'logout-nav';
      a.textContent = 'Log Out';
      li.appendChild(a);
      navList.appendChild(li);
      logoutLink = a;
    }
    return logoutLink;
  }

  function ensurePayNowNav(){
    // Do not render Pay Now on the account page
    const path = window.location.pathname || '';
    if (path.endsWith('/account.html') || path.endsWith('account.html')) return null;
    const { navList } = getElements();
    if (!navList) return null;
    let payLink = document.getElementById('pay-now-nav');
    if (!payLink){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.id = 'pay-now-nav';
      a.className = 'pay-now-nav';
      a.textContent = `Pay Now — ${PRICE_LABEL}`;
      li.appendChild(a);
      li.classList.add('hidden');
      navList.appendChild(li);
      payLink = a;
    }
    return payLink;
  }

  function ensureUserNameNav(){
    const { navList } = getElements();
    if (!navList) return null;
    let nameEl = document.getElementById('user-name-nav');
    if (!nameEl){
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.id = 'user-name-nav';
      span.style.display = 'none';
      li.appendChild(span);
      li.classList.add('hidden');
      navList.appendChild(li);
      nameEl = span;
    }
    return nameEl;
  }

  function hide(el){ if (el) el.classList.add('hidden'); }
  function show(el){ if (el) el.classList.remove('hidden'); }

  function isEmailConfirmed(user){
    if (!user) return false;
    const provider = (user.app_metadata && user.app_metadata.provider) || user.user_metadata?.provider || 'email';
    if (provider !== 'email') return true; // social providers are considered verified
    return Boolean(user.confirmed_at || user.email_confirmed);
  }

  const Auth = {
    client: null,

    init: function(){
      if (!this.client) this.client = createGoTrueClient();
      // If Netlify Identity widget is present, let it drive the navbar
      if (window.netlifyIdentity){
        this.initIdentityWidgetNav();
      } else {
        this.updateNavigation();
        window.addEventListener('storage', this.updateNavigation.bind(this));
        window.addEventListener('auth:changed', this.updateNavigation.bind(this));
      }
      this.renderPayButtons();
    },

    initIdentityWidgetNav: function(){
      const self = this;
      const { signinNav, accountNav } = getElements();
      const nameEl = ensureUserNameNav();
      const logoutLink = ensureLogoutNav();
      const payLink = ensurePayNowNav();

      function render(user){
        if (user){
          if (signinNav) signinNav.classList.add('hidden');
          if (accountNav) accountNav.classList.remove('hidden');
          // Hide user name per request
          if (nameEl && nameEl.parentElement) nameEl.parentElement.classList.add('hidden');
          if (logoutLink && logoutLink.parentElement) logoutLink.parentElement.classList.remove('hidden');
          if (payLink){
            payLink.textContent = `Pay Now — ${PRICE_LABEL}`;
            payLink.href = PAYMENT_URL;
            payLink.onclick = null;
            if (payLink.parentElement) payLink.parentElement.classList.remove('hidden');
          }
        } else {
          if (signinNav) signinNav.classList.remove('hidden');
          if (accountNav) accountNav.classList.add('hidden');
          if (nameEl && nameEl.parentElement) nameEl.parentElement.classList.add('hidden');
          if (logoutLink && logoutLink.parentElement) logoutLink.parentElement.classList.add('hidden');
          if (payLink){
            payLink.textContent = 'Sign In to Pay';
            payLink.href = '#';
            payLink.onclick = function(e){ e.preventDefault(); try{ window.netlifyIdentity.open('login'); } catch(_){} };
            if (payLink.parentElement) payLink.parentElement.classList.remove('hidden');
          }
        }
        // Also refresh any pay buttons in the page content
        try { window.Auth.renderPayButtons(); } catch(_) {}
      }

      // Sign in button opens modal
      if (signinNav){
        signinNav.addEventListener('click', function(e){
          // If it is a link to login.html, prefer opening modal instead
          e.preventDefault();
          try { window.netlifyIdentity.open('login'); } catch(_) {}
        });
      }

      // Logout triggers identity logout
      if (logoutLink){
        logoutLink.addEventListener('click', function(e){
          e.preventDefault();
          try { window.netlifyIdentity.logout(); } catch(_) {}
        });
      }

      // Identity events
      window.netlifyIdentity.on('init', function(user){ render(user); });
      window.netlifyIdentity.on('login', function(user){ render(user); window.netlifyIdentity.close(); });
      window.netlifyIdentity.on('logout', function(){ render(null); });

      try { window.netlifyIdentity.init(); } catch(_) {}
    },

    renderPayButtons: function(){
      const buttons = Array.from(document.querySelectorAll('.pay-now-btn'));
      if (!buttons.length) return;
      const user = this.getCurrentUser();
      buttons.forEach((btn)=>{
        if (user){
          btn.textContent = `Pay Now — ${PRICE_LABEL}`;
          btn.setAttribute('href', PAYMENT_URL);
          btn.classList.add('pay-now');
          btn.onclick = null;
        } else {
          btn.textContent = 'Sign In to Pay';
          btn.setAttribute('href', '#');
          btn.classList.remove('pay-now');
          btn.onclick = function(e){ e.preventDefault(); try{ window.netlifyIdentity.open('login'); } catch(_) {} };
        }
      });
    },

    updateNavigation: function(){
      if (!this.client) this.client = createGoTrueClient();
      const user = this.client.currentUser;
      const { signinNav, accountNav } = getElements();
      const logoutLink = ensureLogoutNav();
      if (user){
        hide(signinNav);
        show(accountNav);
        if (logoutLink){
          logoutLink.parentElement.classList.remove('hidden');
          logoutLink.onclick = (e)=>{ e.preventDefault(); this.logout(); };
        }
      } else {
        show(signinNav);
        hide(accountNav);
        if (logoutLink){
          logoutLink.onclick = null;
          logoutLink.parentElement.classList.add('hidden');
        }
      }
    },

    handleOAuthCallback: async function(options){
      if (!this.client) this.client = createGoTrueClient();
      const hash = window.location.hash || '';
      if (!hash) return false;
      const params = new URLSearchParams(hash.replace(/^#/, ''));

      // 1) External OAuth tokens
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      if (accessToken && refreshToken){
        try {
          await this.client.setSession(accessToken, refreshToken);
          history.replaceState({}, document.title, window.location.pathname);
          window.dispatchEvent(new CustomEvent('auth:changed'));
          if (options && options.redirectToAccount){
            window.location.href = 'account.html';
          }
          return true;
        } catch(err){
          console.error('Error setting session from OAuth callback', err);
        }
      }

      // 2) Email confirmation token
      const confirmationToken = params.get('confirmation_token') || params.get('token');
      const type = params.get('type') || 'signup';
      if (confirmationToken){
        try {
          if (typeof this.client.verify === 'function'){
            await this.client.verify(type, confirmationToken);
          } else if (typeof this.client.confirm === 'function') {
            await this.client.confirm(confirmationToken);
          }
          history.replaceState({}, document.title, window.location.pathname);
          if (options && options.redirectToAccount){
            window.location.href = 'account.html';
          }
          return true;
        } catch(err){
          console.error('Email confirmation failed', err);
        }
      }
      return false;
    },

    loginWithGoogle: function(){
      if (!this.client) this.client = createGoTrueClient();
      try {
        const url = this.client.loginExternalUrl('google');
        window.location.href = url;
      } catch(err){
        console.error('Failed to start Google login', err);
      }
    },

    signup: async function(email, password, fullName){
      if (!this.client) this.client = createGoTrueClient();
      const data = fullName ? { full_name: fullName, provider: 'email' } : { provider: 'email' };
      return this.client.signup(email, password, data);
    },

    login: async function(email, password){
      if (!this.client) this.client = createGoTrueClient();
      const remember = true;
      const user = await this.client.login(email, password, remember);
      return user;
    },

    logout: async function(){
      if (!this.client) this.client = createGoTrueClient();
      try { await this.client.signOut(); } catch(err){ console.warn('Sign out error', err); }
      try { new Image().src = 'https://accounts.google.com/Logout'; } catch(_) {}
      window.dispatchEvent(new CustomEvent('auth:changed'));
      window.location.href = 'login.html';
    },

    getCurrentUser: function(){
      if (!this.client) this.client = createGoTrueClient();
      let user = this.client.currentUser;
      if ((!user || !user.email) && window.netlifyIdentity && typeof window.netlifyIdentity.currentUser === 'function'){
        const idUser = window.netlifyIdentity.currentUser();
        if (idUser) user = idUser;
      }
      return user;
    },

    requireAccountPage: function(){
      const user = this.getCurrentUser();
      if (!user){
        window.location.href = 'login.html';
        return null;
      }
      return user;
    },

    isEmailConfirmed: isEmailConfirmed
  };

  window.Auth = Auth;
})();


