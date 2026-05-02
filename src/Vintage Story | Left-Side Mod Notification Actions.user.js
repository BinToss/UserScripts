// ==UserScript==
// @name        Vintage Story | Left-Side Mod Notification Actions
// @namespace   https://github.com/BinToss/UserScripts
// @homepageURL https://github.com/BinToss/UserScripts
// @updateUrl   https://github.com/BinToss/UserScripts/raw/refs/heads/main/src/Vintage%20Story%20%7C%20Left-Side%20Mod%20Notification%20Actions.user.js
// @version     1.0.1
// @author      BinToss
// @icon        https://mods.vintagestory.at/web/favicon/apple-touch-icon.png
// @match       https://mods.vintagestory.at/notifications
// @description 2026-05-01, 01:47:00 PM
// Looks for the "Go there" and "Clear" anchors/buttons(?) and moves them to the left of their checkbox.
// Also, removes the leftover "div.flex-spacer".
// ==/UserScript==

let clearSelectedObserver;

const notificationList = document.getElementById('notifications-list');
if (notificationList) {
  const styleScaleIcons = document.createElement('style');
  styleScaleIcons.innerHTML = /* css */`
  #notifications-list>label.list-entry>a>i.bx {
    font-size: 1.0em;
  }`;
  document.head.append(styleScaleIcons);

  /** @type {HTMLElement|null} */
  const bulkActionsContainer = document.querySelector('div.content>main.innercontent.padded>h2>small');
  if (bulkActionsContainer != null) {
    bulkActionsContainer.style.float = 'left';

    bulkActionsContainer.childNodes.forEach((n) => {
      if (n.textContent.trim() === '' && n.constructor.name === 'Text')
        n.remove();
    });

    /** @type {HTMLAnchorElement|null} */
    const clearAll = bulkActionsContainer.children[1];
    if (clearAll?.href.includes('/notification/clearall'))
      clearAll.innerHTML = '<i class="bx bxs-trash"></i>';

    /** @type {HTMLElement|null} */
    const clearSelected = bulkActionsContainer.children[0];
    if (clearSelected?.id === 'clear-selected') {
      clearSelected.innerHTML = '<i class="bx bxs-trash"></i>';

      clearSelectedObserver = new MutationObserver((mutations) => {
        if (clearAll == null)
          return;
        for (const mutation of mutations) {
          const oldValueHasDisplayNone = true === mutation.oldValue?.includes('display: none');
          const style = 'style' in mutation.oldValue && typeof mutation.oldValue.style === 'object'
            ? mutation.oldValue.style
            : null;
          if (oldValueHasDisplayNone
            && style?.display !== 'none') {
            // clearSelected became visible; hide clearAll
            clearAll.style.display = 'none';
          }
          else if (mutation.oldValue != null
            && !oldValueHasDisplayNone
            && style?.display === 'none') {
            // clearSelected became invisible; show clearAll
            clearAll.style.display = 'inline';
          }
        }
      });
      clearSelectedObserver.observe(clearSelected, { attributeOldValue: true });
    }
  }

  const listEntries = notificationList.getElementsByClassName('list-entry');
  for (const listEntry of listEntries) {
    /** @type {HTMLElement} */
    const entry = listEntry;
    if (entry.getElementsByTagName('input')[0]) {
      entry.querySelector('div.flex-spacer')?.remove();

      const oldActions = entry.getElementsByTagName('a');
      while (oldActions.length != 0) {
        entry.removeChild(oldActions[0]);
      }

      // Why is this button doing nothing, now?
      let btnClear = document.createElement('a');
      btnClear.classList.add('n-clear');
      btnClear.href = '#';
      btnClear.innerHTML = '<i class="bx bxs-trash"></i>';

      let btnGo = document.createElement('a');
      btnGo.href = '/notification/' + String(entry.getElementsByTagName('input')[0]?.id.replace('nid-', ''));
      btnGo.innerHTML = '<i class="bx bx-link-alt" />';

      entry.children[0].after(btnClear, btnGo);
    }
  }
}
