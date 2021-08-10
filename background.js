/**window.browser = (function () {
    return window.msBrowser ||
      window.browser ||
      window.chrome;
  })();**/

const client_id = encodeURIComponent("1068499458128-rtql6hemdvta9i76vk517urt80c9mpe7.apps.googleusercontent.com")
const response_type = encodeURIComponent("token")
const redirect_uri = encodeURIComponent("https://edpnkilfjdnehojaedoeicbjabdocghb.chromiumapp.org")
const state = encodeURIComponent("123")
const scope = encodeURIComponent("https://www.googleapis.com/auth/books")


const createUrl = () => {
  let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString().substring(2, 15))
  let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`
  console.log(url)
  return url
}
const login = (sendResponse) => {
  chrome.identity.launchWebAuthFlow({
    url: createUrl(),
    interactive: true
  }, (redirect_uri) => {
    //check if user accepts
    console.log(redirect_uri)

    const urlParams = new URLSearchParams(redirect_uri.split("?")[1]);
    console.log("the token:", urlParams.get("token"))
    if(urlParams.has("error")) console.log(urlParams.get("error"))
    chrome.storage.sync.set({ token: urlParams.get("token") });
    
    chrome.browserAction.setPopup({popup: "./home.html"}, () => {
      sendResponse("success")
      //send initial books
    })
  })
}
const logout = () => {
  console.log("logout!")
}
const isUserSignIn = () => {
  console.log("user sign in status")
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("THIS IS A MESSAGE!")
  console.log(request.message)
  switch(request.message){
    case "login": 
      //check for user already login
      break;
    case "logout": logout(); break;
    case "isUserSignIn": isUserSignIn(); break;
    default:
      console.log("Sorry I dint understand")
  }
})

chrome.runtime.onInstalled.addListener(() => {
  //how to set some storage
  //chrome.storage.sync.set({ color:color });
});

/*
"default_icon": {
          "16": "/images/get_started16.png",
          "32": "/images/get_started32.png",
          "48": "/images/get_started48.png",
          "128": "/images/get_started128.png"
        }

  "icons": {
      "16": "/images/get_started16.png",
      "32": "/images/get_started32.png",
      "48": "/images/get_started48.png",
      "128": "/images/get_started128.png"
    }       

*/

const get_token = () => {
  //got to storage
  let token = chrome.storage.sync.get("token");
  //see if the token is alyready expired
}

const get_books = () => {

}
