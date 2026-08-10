// ==UserScript==
// @name        VSCode | Add Install If Missing
// @namespace   https://github.com/BinToss/UserScripts
// @homepageURL https://github.com/BinToss/UserScripts
// @updateUrl   https://github.com/BinToss/UserScripts/raw/refs/heads/main/src/VSCode%20%7C%20Add%20Install%20If%20Missing.user.js
// @version     1.0.0
// @author      BinToss
// @icon        https://code.visualstudio.com/assets/favicon.ico
// @match       https://marketplace.visualstudio.com/items*
// @grant       none
// @description 10/10/2025, 5:12:28 PM
// ==/UserScript==

// @run-at: (Default) (document-end)
addInstallBtnIfMissing();
const mainContentObserver = new MutationObserver(addInstallBtnIfMissing);
mainContentObserver.observe(
  document.querySelector('div.main-content.item-details-main-content'),
  { attributes: true },
);

/** @type {MutationCallback} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function addInstallBtnIfMissing(_mutations, _observer) {
  if (
    document.querySelector(
      '.bread-crumb-container>a.member[href="/vscode"]',
    )
  ) {
    const uxItemAct = document.querySelector('.ux-item-action');
    if (!uxItemAct) {
      console.error('ux-item-action not found');
      return;
    }
    if (!uxItemAct.querySelector('.one-click-install-container')) {
      uxItemAct.innerHTML = /* html */ `
        <div class="installButtonContainer">
          <div class="ms-Fabric">
            <span class="ux-oneclick-install-button-container">
              <a href="vscode:extension/lextudio.vscode-axaml" class="ms-Button ux-button install ms-Button--default" data-is-focusable="true">
                <div class="ms-Button-flexContainer">
                  <div class="ms-Button-textContainer">
                    <div class="ms-Button-label" id="id__0">Install</div>
                  </div>
                </div>
              </a>
            </span>
            <span class="installHelpInfo">
              <a href="https://aka.ms/vscode_extn_install" target="_blank" rel="noreferrer noopener nofollow">
                Trouble Installing?
                <i class="bowtie-icon bowtie-navigate-external"></i>
              </a>
            </span>
          </div>
        </div>` + uxItemAct.innerHTML;
      const style = document.createElement('style');
      style.innerText = /* css */ `
.one-click-install-container {
  display: flex;
}

div.one-click-install-container>div>div.ms-Fabric {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: rgb(51, 51, 51);
}

a.ms-Button.ux-button.install.ms-Button--default {
  outline: transparent;
  position: relative;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;
  border: 1px solid transparent;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  vertical-align: top;
  padding: 0px 16px;
  border-radius: 0px;
  min-width: 80px;
  height: 32px;
  background-color: rgb(244, 244, 244);
  color: rgb(51, 51, 51);
  user-select: none;

  background-color: #107c10;
  color: #fff;
  min-width: 120px;
  border: 1px solid #fff;
}

a.ms-Button.ux-button.install.ms-Button--default>div.ms-Button-flexContainer {
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

a.ms-Button.ux-button.install.ms-Button--default>div.ms-Button-flexContainer>div.ms-Button-textContainer {
  flex-grow: 1;
}

#id__0 {
  margin: 0px 4px;
  line-height: 100%;
  font-weight: 600;
}`;
      document.querySelector('head')?.appendChild(style);
    }
  }
}
