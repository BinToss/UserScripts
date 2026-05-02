// ==UserScript==
// @name        Discord | Get Discord GameSDK URL
// @namespace   https://github.com/BinToss/UserScripts
// @homepageURL https://github.com/BinToss/UserScripts
// @updateUrl   https://github.com/BinToss/UserScripts/raw/refs/heads/main/src/Discord%20%7C%20Get%20Discord%20GameSDK%20URL.user.js
// @version     1.0.4
// @author      BinToss
// @icon        https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6266bc493fb42d4e27bb8393_847541504914fd33810e70a0ea73177e.ico
// @match       https://discord.com/developers/docs/game-sdk/sdk-starter-guide
// @match       https://github.com/discord/discord-api-docs/blob/master/docs/game_sdk/SDK_Starter_Guide.md
// @grant       none
// @description 7/15/2021, 7:05:57 PM
// ==/UserScript==
async function getGameSDKURL() {
  while (document.querySelector('a[href^="#get-set-up"]') === null)
    await new Promise(resolve => setTimeout(resolve, 200));
  const links = [
    ...document.querySelectorAll('a[href^="https://dl-game-sdk.discordapp.net"]'),
  ].map(elm =>
    'href' in elm && typeof elm.href === 'string'
      ? elm.href
      : null,
  ).filter(v => v !== null);
  console.log('Discord GameSDK URLs are...');
  for (const link of links)
    console.log(link);
}

if (document.readyState === 'loading') { // Loading hasn't finished yet
  document.addEventListener(
    'DOMContentLoaded',
    () => { void getGameSDKURL(); },
  );
}
else { // `DOMContentLoaded` has already fired
  await getGameSDKURL();
}
