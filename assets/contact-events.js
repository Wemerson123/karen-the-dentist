document.addEventListener('click', function (event) {
  var link = event.target.closest('a[href]');
  if (!link) return;
  var href = link.getAttribute('href');
  var channel = href.startsWith('tel:') ? 'phone' : href.includes('wa.me/') ? 'whatsapp' : href.includes('noosavillefamilydental.com.au') ? 'booking' : null;
  if (!channel || !window.karenAnalyticsAllowed || !window.karenAnalyticsAllowed()) return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'contact_intent', {contact_channel: channel, transport_type: 'beacon'});
  } else {
    window.dataLayer.push({event: 'contact_intent', contact_channel: channel});
  }
});
