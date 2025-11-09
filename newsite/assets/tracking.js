// Lightweight client tracker for engniter.com
(function(){
  var APP_LINK = 'https://apps.apple.com/pt/app/vocadoo-smart-vocabulary/id6754393964?l=en-GB';
  var COOKIE_NAME = 'vid';

  function getCookie(name){
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }

  function q(k){
    var p = new URLSearchParams(window.location.search);
    return p.get(k) || '';
  }
  function ssGet(k){ try { return sessionStorage.getItem(k) || ''; } catch(e){ return ''; } }
  function ssSet(k,v){ try { if (v) sessionStorage.setItem(k, v); } catch(e){} }

  function beacon(url, payload){
    try {
      if (navigator.sendBeacon) {
        var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
        return true;
      }
    } catch(e){}
    // fetch keepalive fallback
    try {
      fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload), keepalive: true, credentials:'include' });
      return true;
    } catch(e){}
    // pixel fallback
    try {
      var img = new Image(1,1);
      var usp = new URLSearchParams(payload);
      img.src = '/event.gif?' + usp.toString();
    } catch(e){}
    return false;
  }

  function collectParams(){
    var fbclid = q('fbclid') || ssGet('fbclid');
    var utm_source = q('utm_source') || ssGet('utm_source');
    var utm_medium = q('utm_medium') || ssGet('utm_medium');
    var utm_campaign = q('utm_campaign') || ssGet('utm_campaign');

    // store in session so subsequent pages/post redirects can still attach
    ssSet('fbclid', q('fbclid'));
    ssSet('utm_source', q('utm_source'));
    ssSet('utm_medium', q('utm_medium'));
    ssSet('utm_campaign', q('utm_campaign'));

    var payload = {
      visitor_id: getCookie(COOKIE_NAME) || undefined,
      fbclid: fbclid || undefined,
      utm_source: utm_source || undefined,
      utm_medium: utm_medium || undefined,
      utm_campaign: utm_campaign || undefined
    };
    if (payload.fbclid || payload.utm_source || payload.utm_medium || payload.utm_campaign) {
      beacon('/collect-params', payload);
    }
  }

  function trackDownloadClick(e){
    var a = e.currentTarget;
    var targetUrl = a.getAttribute('href') || APP_LINK;
    var payload = {
      visitor_id: getCookie(COOKIE_NAME) || undefined,
      type: 'download',
      target_url: targetUrl,
      page_path: location.pathname
    };
    if (navigator.sendBeacon) {
      try { navigator.sendBeacon('/event', new Blob([JSON.stringify(payload)], { type:'application/json' })); } catch(_){}
      // allow default navigation immediately
      return;
    }
    // Fallback: prevent default, try fetch keepalive or pixel, then navigate shortly
    try { e.preventDefault(); } catch(_){}
    beacon('/event', payload);
    setTimeout(function(){ window.location.href = targetUrl; }, 120);
  }

  function bindDownloadButtons(){
    var selectors = [
      'a.app-store-badge',
      'a.cta',
      'a.text-link'
    ];
    document.querySelectorAll(selectors.join(',')).forEach(function(a){
      a.removeEventListener('click', trackDownloadClick);
      a.addEventListener('click', trackDownloadClick, { passive: true });
    });
  }

  window.addEventListener('DOMContentLoaded', function(){
    collectParams();
    bindDownloadButtons();
  });
})();
