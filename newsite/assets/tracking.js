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
    var payload = {
      visitor_id: getCookie(COOKIE_NAME) || undefined,
      fbclid: q('fbclid') || undefined,
      utm_source: q('utm_source') || undefined,
      utm_medium: q('utm_medium') || undefined,
      utm_campaign: q('utm_campaign') || undefined
    };
    if (payload.fbclid || payload.utm_source || payload.utm_medium || payload.utm_campaign) {
      beacon('/collect-params', payload);
    }
  }

  function trackDownloadClick(e){
    var a = e.currentTarget;
    var targetUrl = a.getAttribute('href') || APP_LINK;
    beacon('/event', {
      visitor_id: getCookie(COOKIE_NAME) || undefined,
      type: 'download',
      target_url: targetUrl,
      page_path: location.pathname
    });
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

