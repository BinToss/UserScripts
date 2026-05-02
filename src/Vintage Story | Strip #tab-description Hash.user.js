// ==UserScript==
// @name        Vintage Story | Strip #tab-description Hash
// @namespace   https://github.com/BinToss/UserScripts
// @homepageURL https://github.com/BinToss/UserScripts
// @updateUrl   https://github.com/BinToss/UserScripts/raw/refs/heads/main/src/Vintage%20Story%20%7C%20Strip%20%23tab-description%20Hash.user.js
// @version     1.0.2
// @author      BinToss
// @icon        https://mods.vintagestory.at/web/favicon/apple-touch-icon.png
// @match       https://mods.vintagestory.at/*
// @description 10/7/2025, 11:41:56 PM
// ==/UserScript==

if (window.location.hash === '#tab-description')
  window.history.pushState({}, '', window.location.toString().replace('#tab-description', ''));
window.addEventListener('hashchange', (event) => {
  if (event.newURL.includes('#tab-description')) {
    window.history.pushState({}, '', event.newURL.replace('#tab-description', ''));
    if (window.location.hash === '#tab-description')
      window.history.pushState({}, '', window.location.toString().replace('#tab-description', ''));
  }
});

window.addEventListener('popstate', (e) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  var state = /** @type {object?} */(e.state);
  if ('html' in state && typeof state.html === 'string')
    document.getElementById('content').innerHTML = state.html;
  if ('pageTitle' in state && typeof state.pageTitle === 'string')
    document.title = state.pageTitle;
});
