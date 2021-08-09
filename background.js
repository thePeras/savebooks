window.browser = (function () {
    return window.msBrowser ||
      window.browser ||
      window.chrome;
  })();
  

let color = '#3aa757';

browser.runtime.onInstalled.addListener(() => {
  //chrome.storage.sync.set({ color:color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});