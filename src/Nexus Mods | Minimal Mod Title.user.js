// ==UserScript==
// @name          Nexus Mods | Minimal Mod Title
// @namespace     https://github.com/BinToss/UserScripts
// @homepageURL https://github.com/BinToss/UserScripts
// @updateUrl     https://github.com/BinToss/UserScripts/raw/refs/heads/main/src/Nexus%20Mods%20%7C%20Minimal%20Mod%20Title.user.js
// @version       1.0.2
// @author        bintoss
// @icon          https://www.nexusmods.com/apple-icon.png?apple-icon.b62fc276.png
// @match         https://www.nexusmods.com/*/mods/*
// @grant         none
// @description   9/19/2025, 1:58:36 PM
//  Strips ' at [GameTitle] Nexus - Mods and Community' from the title of a mod's page. Intended for short-named browser bookmarks.
// @run-at        document-body
// ==/UserScript==
document.title = document.title.replace(/ at (?!.+ at ).+ Nexus - Mods and [Cc]ommunity$/, '');

// at Fallout 76 Nexus - Mods and community
