// ==UserScript==
// @name          Vintage Story | Minimal ModDB Title
// @namespace     https://github.com/BinToss/UserScripts
// @homepageURL https://github.com/BinToss/UserScripts
// @updateUrl     https://github.com/BinToss/UserScripts/raw/refs/heads/main/src/Vintage%20Story%20%7C%20Minimal%20ModDB%20Title.user.js
// @version       1.0.0
// @author        BinToss
// @icon          https://mods.vintagestory.at/web/favicon/apple-touch-icon.png
// @match         https://mods.vintagestory.at/show/mod/*
// @match         https://mods.vintagestory.at/*
// @exclude-match https://mods.vintagestory.at/*/
// @run-at        document-body
// @description   8/29/2025, 1:36:28 PM
//  Strips ' - Vintage Story Mod DB' from the title of a mod's page. Intended for short-named browser bookmarks.
// ==/UserScript==
window.
document.title = document.title.replace(' - Vintage Story Mod DB', '');
