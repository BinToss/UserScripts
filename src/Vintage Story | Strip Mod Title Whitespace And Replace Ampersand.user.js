// ==UserScript==
// @name          Vintage Story | Strip Mod Title Whitespace And Replace Ampersand
// @namespace     https://github.com/BinToss/UserScripts
// @updateUrl     https://github.com/BinToss/UserScripts/raw/refs/heads/main/src/Vintage%20Story%20%7C%20Strip%20Mod%20Title%20Whitespace%20And%20Replace%20Ampersand.user.js
// @version       1.1.0
// @author        BinToss
// @icon          https://mods.vintagestory.at/web/favicon/apple-touch-icon.png
// @match         https://mods.vintagestory.at/show/mod/*
// @match         https://mods.vintagestory.at/*
// @exclude-match https://mods.vintagestory.at/*/
// @description   10/14/2025, 6:37:13 PM
//  Strips whitespace from a mod's title. This should make copy-pasting to VS Launcher less aggravating.
//  Also replaces "&amp;" with "&"
// ==/UserScript==

document.title = document.title.replaceAll('&amp;', '&');

const modTitle = document.querySelector('div.edit-asset>h2');
if (modTitle) {
  modTitle.childNodes.forEach(node => {
    if (node instanceof Text) {
      node.data = node.data.trim();
      if (node.data.length === 0) {
        node.remove();
        return;
      }
      const tmp = document.createElement('span');
      tmp.innerHTML = ' / ';
      node.replaceWith(tmp);
    }
    else if (node instanceof HTMLSpanElement)
      node.innerHTML = node.innerHTML.trim();
  });
  const titleSpan = modTitle.children[modTitle.children.length - 1];
}