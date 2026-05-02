// ==UserScript==
// @name        Nexus Mods | Strip tab=description Parameter
// @namespace   https://github.com/BinToss/UserScripts
// @updateUrl   https://github.com/BinToss/UserScripts/raw/refs/heads/main/src/Nexus%20Mods%20%7C%20Strip%20tab%3Ddescription%20Parameter.user.js
// @version     1.0.0
// @author      BinToss
// @icon        https://images.nexusmods.com/favicons/DeepBlue/mstile-310x310.png
// @match       https://www.nexusmods.com/*/mods/*
// @description 12/20/2025, 10:14:17 PM
// The default tab of a mod's page is "description". Using a URL parameter to
// jump to the default tab is silly, redundant, and leads to multiple bookmarks
// with different URLs for the same webpage.
// ==/UserScript==

const parameter = '?tab=description';

function trimParameter() {
  window.history.pushState({}, '', window.location.toString().replace(parameter, ''));
}

// on first load...

if (window.location.search == parameter)
  trimParameter();

// on subsequent navigations...

window.addEventListener('popstate', (event) => {
  if (window.location.search === parameter)
    trimParameter();
  if (event.state) {
    document.getElementById("content").innerHTML = event.state.html;
    document.title = event.state.pageTitle;
  }
});

// this does most of the work

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === "attributes"
        && mutation.attributeName === 'class'
        && mutation.target.className === 'selected') {
      trimParameter();
    }
  });
});
observer.observe(
  document.querySelector('li#mod-page-tab-description > a'),
  { attributeFilter: ['class'] }
);
