// ==UserScript==
// @name        Vintage Story | Strip #follow Hash
// @namespace   https://github.com/BinToss/UserScripts
// @homepageURL https://github.com/BinToss/UserScripts
// @updateUrl   https://github.com/BinToss/UserScripts/raw/refs/heads/main/src/Vintage%20Story%20%7C%20Strip%20%23follow%20Hash.user.js
// @version     1.0.2
// @author      BinToss
// @icon        https://mods.vintagestory.at/web/favicon/apple-touch-icon.png
// @match       https://mods.vintagestory.at/*
// @description 8/29/2025, 2:18:51 PM
// @run-at      document-body
// ==/UserScript==

if (window.location.hash === '#follow')
  window.history.pushState({}, '', window.location.toString().replace('#follow', ''));
window.addEventListener('hashchange', (event) => {
  if (event.newURL.includes('#follow')) {
    window.history.pushState({}, '', event.newURL.replace('#follow', ''));
    if (window.location.hash === '#follow')
      window.history.pushState({}, '', window.location.toString().replace('#follow', ''));
  }
});

window.addEventListener('popstate', (e) => {
  const state = typeof e.state === 'object' ? /** @type {object|null} */(e.state) : null;
  if (state !== null && 'html' in state && typeof state.html === 'object') {
    document.getElementById('content').innerHTML = state.html;
    if ('pageTitle' in state && typeof state.pageTitle === 'string')
      document.title = state.pageTitle;
  }
});

document.addEventListener('load', () => {
  var followBtn = document.getElementsByClassName('interactbox')[0];
  if (followBtn) {
    // remove annoying anchor ID; break jquery script.
    followBtn.removeAttribute('href');
    // replace jquery event handler using browser-native event handler
    followBtn.addEventListener('click', () => {
      followBtn_OnClickHandler(followBtn);
    });
  }
});

/**
 *
 * @param {HTMLElement} element
 */
function followBtn_OnClickHandler(element) {
  /** @type {Element | undefined} If undefined, the follows counter is gone. */
  let followsCount = element.getElementsByClassName('count')[0];
  /** @type {number} */
  const oldCount = parseInt(followsCount?.textContent ?? '0');
  /** @type {Promise<Response>} */
  let promise;

  const modId = 'modId' in globalThis && typeof globalThis.modId === 'number' ? /** @type {number} */(globalThis.modId) : null;
  if (modId === null) return;

  if (element.classList.replace('on', 'off')) {
    if (followsCount)
      followsCount.textContent = String(oldCount - 1);
    promise = fetch(
      `/api/v2/notifications/settings/followed-mods/${modId.toString()}/unfollow`,
      {
        method: 'post',
        priority: 'high',
        keepalive: true,
      },
    );
  }
  else {
    element.classList.replace('off', 'on');
    if (followsCount)
      followsCount.textContent = String(oldCount + 1);

    promise = fetch(
      `/api/v2/notifications/settings/followed-mods/${modId.toString()}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: 'new: 1',
        priority: 'high',
        keepalive: true,
      },
    );
  }

  promise.then(async (response) => {
    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        'Failed to (un-)follow mod' + (text ? ': ' + text : '.'),
        { cause: text },
      );
    }
  }).catch((/** @type {unknown} */reason) => {
    element.classList.toggle('on');
    element.classList.toggle('off');
    followsCount.textContent = String(oldCount);

    if (reason && typeof reason.message === 'string') {
      const MSG_CLASS_ERROR = typeof globalThis.MSG_CLASS_ERROR === 'string'
        ? /** @type {string} */(globalThis.MSG_CLASS_ERROR)
        : 'bg-error.text-error';
      let R = /** @type {unknown} */(globalThis.R) ?? null;
      if ('addMessage' in R && typeof R.addMessage === 'function' && R.addMessage.length === 3) {
        R.addMessage.call(
          R,
          MSG_CLASS_ERROR,
          reason.message,
          true,
        );
      }
    }
  });
}
