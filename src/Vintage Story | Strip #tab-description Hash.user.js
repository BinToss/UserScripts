// ==UserScript==
// @name        Vintage Story | Strip #tab-description Hash
// @namespace   https://github.com/BinToss/UserScripts
// @updateUrl   https://github.com/BinToss/UserScripts/raw/refs/heads/main/src/Vintage%20Story%20%7C%20Strip%20%23tag-description%20Hash.user.js
// @version     1.0.0
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

window.addEventListener("popstate", (e) => {
    if(e.state){
        document.getElementById("content").innerHTML = e.state.html;
        document.title = e.state.pageTitle;
    }
});
