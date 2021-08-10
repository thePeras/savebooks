/**window.browser = (function () {
    return window.msBrowser ||
      window.browser ||
      window.chrome;
  })();**/

const user_sign_in = false
const client_id = encodeURIComponent("1068499458128-rtql6hemdvta9i76vk517urt80c9mpe7.apps.googleusercontent.com")
const response_type = encodeURIComponent("code")
const redirect_uri = encodeURIComponent("https://edpnkilfjdnehojaedoeicbjabdocghb.chromiumapp.org")
const state = encodeURIComponent("123")
const scope = encodeURIComponent("https://www.googleapis.com/auth/books")


const createUrl = () => {
  let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString().substring(2, 15))
  let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}&nonce=${nonce}`
  console.log(url)
  return url
}
const login = (sendResponse) => {
  chrome.identity.launchWebAuthFlow({
    url: createUrl(),
    interactive: true
  }, (redirect_uri) => {
    console.log(redirect_uri)
    sendResponse("success")
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
      if(!user_sign_in) login(sendResponse)
      break;
    case "logout": logout(); break;
    case "isUserSignIn": isUserSignIn(); break;
    default:
      console.log("Sorry I dint understand")
  }
})

chrome.runtime.onInstalled.addListener(() => {
  //chrome.storage.sync.set({ color:color });
  console.log('Default background color set to %cgreen');
});

/*const app = firebase.initializeApp(config);
const auth = app.auth();
const signInWithPopup = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider).catch((error) => {
    console.log(error);
  });
};


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