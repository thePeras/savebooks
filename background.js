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
const APP_KEY = "AIzaSyDJalQbZ22nGh1kpckaCb5MqFuSzyWP-jQ"

let collections = {}

const createUrl = () => {
  let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString().substring(2, 15))
  let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`
  console.log(url)
  return url
}
const login = (initial = false) => {
  return new Promise((resolve, error) => {
    chrome.identity.launchWebAuthFlow({
      url: createUrl(),
      interactive: true
    }, (redirect_uri) => {
  
      //get params
      const urlParams = new URLSearchParams(redirect_uri.split("#")[1]);
  
      //check if user accepts
      if(urlParams.has("error")){
        console.log(urlParams.get("error"))
        error("error")
      }
  
      console.log("the token:", urlParams.get("access_token"))
  
      let auth = {
        token: urlParams.get("access_token"),
        expires_in: urlParams.get("expires_in"),
        expires_at: new Date().getTime() + urlParams.get("expires_in")*1000
      }
      console.log(auth)
      chrome.storage.sync.set({auth: auth}, (error) => {
        if(error) {
          console.log(error)
          error("error")
        }
  
        //initial login or pass login
        if(initial){
          chrome.action.setPopup({popup: "./htmls/home.html"}, () => {
            setTimeout(() => {
              get_collections()
            }, 1000)
            //send initial books
            resolve("success")
          })
        }else{
          resolve(auth.token)
        }
      });
    })
  })
}
const logout = () => {
  console.log("logout!")
  chrome.storage.sync.remove("auth", () => {
    chrome.action.setPopup({popup: "./htmls/popup.html"})
  });
  chrome.runtime.sendMessage({message: "logged_out"}, function(response) {
    console.log(response);
  });
}
const isUserSignIn = () => {
  console.log("user sign in status")
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("new message:", request.message)
    switch(request.message){
      case "login": 
        //check for user already login
        login(true).then(response => {
          console.log(response)
          chrome.runtime.sendMessage({message: "logged_in"}, function(response) {
            console.log(response);
          });
        })
        sendResponse("done")
        break;
      case "logout": logout(); sendResponse("done"); break; 
      case "get_collection":
        sendResponse(collections[request.bookshelve])
        break;
      default:
        console.log("Sorry I dint understand")
        sendResponse("done")
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

const get_token = async () => {
  //got to storage
  return new Promise(resolve => {
    chrome.storage.sync.get("auth", (auth) => {
      if(auth){
        //see if the token is alyready expired
        if(new Date().getTime() > auth.auth.expires_at){
          console.log("token has expired")
          let token = login() //returning a new token
          resolve(token)
        }else{
          console.log("token", auth.auth.token)
          let dif = (auth.auth.expires_at - new Date().getTime()) / 1000
          console.log("this token expires in " + dif + " seconds")
          resolve(auth.auth.token)
        }
      }else{
        cconsole.log("some error somewhere")
      }
    })
  });
}
const get_collections = async () => {
  let token = await get_token()

  collections = {
    favorites: await fetch_collection(0, token),
    reading: await fetch_collection(3, token),
    to_read: await fetch_collection(2, token),
    have_read: await fetch_collection(4, token), 
    recommended: await fetch_collection(8, token)
  }
}
const fetch_collection = async (id, token) => {
  return new Promise((resolve, error) => {
    fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${id}/volumes?key=${APP_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then(response => response.json())
    .then(data => resolve(data.items || []))
    .catch(err => error(err))
  })
}



// TO CHECK IF THE USER IS ALREADY LOGGED
// This goes into eventPage.js and executes once on extension load
/*chrome.storage.local.get("logged_in", function(data) {
  if(data.logged_in)
    chrome.browserAction.setPopup({popup: "logged_in.html"});
});*/