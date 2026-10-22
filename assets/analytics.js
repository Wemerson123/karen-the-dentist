// Optional GA4 measurement for Dr Karen Silva. No request before opt-in.
(function () {
  'use strict';
  var key = 'karen-analytics-consent';
  var loaded = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  function read() { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function clearCookies() {
    document.cookie.split(';').forEach(function (entry) {
      var name = entry.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) return;
      ['', location.hostname, '.' + location.hostname].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : '');
      });
    });
  }
  function enable() {
    window['ga-disable-G-84ZME9B6V1'] = false;
    if (loaded) return;
    loaded = true;
    gtag('js', new Date());
    gtag('config', 'G-84ZME9B6V1', {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: location.origin + location.pathname
    });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-84ZME9B6V1';
    document.head.appendChild(script);
  }
  window.karenAnalyticsAllowed = function () { return read() === 'granted'; };
  if (read() === 'granted') enable();
  else window['ga-disable-G-84ZME9B6V1'] = true;
  document.addEventListener('DOMContentLoaded', function () {
    var panel = document.createElement('aside');
    panel.setAttribute('aria-label', 'Optional website analytics');
    panel.style.cssText = 'position:fixed;bottom:16px;left:16px;right:16px;max-width:540px;margin-left:auto;padding:20px;background:#061126;color:#f7fbff;border:1px solid #8798b2;z-index:10000;font:15px/1.5 sans-serif;box-shadow:0 8px 32px #0006';
    panel.innerHTML = '<p style="margin:0 0 12px">May we use optional analytics to understand visits and contact-button clicks? <a href="./privacy.html" style="color:#8bd5ff">Website privacy</a></p><div style="display:flex;gap:12px;flex-wrap:wrap"><button type="button" data-choice="denied">Decline</button><button type="button" data-choice="granted">Accept analytics</button></div>';
    panel.querySelectorAll('button').forEach(function (button) {
      button.style.cssText = 'min-height:44px;padding:10px 18px;background:#f7fbff;color:#061126;border:1px solid #8798b2;cursor:pointer;font:inherit';
      button.addEventListener('click', function () {
        var choice = button.getAttribute('data-choice');
        try { localStorage.setItem(key, choice); } catch (_) { panel.querySelector('p').textContent = 'Your browser could not save this choice. Analytics will remain off.'; return; }
        panel.hidden = true;
        if (choice === 'granted') enable();
        else {
          window['ga-disable-G-84ZME9B6V1'] = true;
          clearCookies();
          if (loaded) location.reload();
        }
      });
    });
    panel.hidden = !!read();
    document.body.appendChild(panel);
    document.querySelectorAll('[data-analytics-settings]').forEach(function (button) {
      button.addEventListener('click', function () { panel.hidden = false; panel.querySelector('button').focus(); });
    });
  });
})();
