// ==UserScript==
// @name          Vintage Story | Strip Mod Title Whitespace; Replace "&"
// @namespace     https://github.com/BinToss/UserScripts
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