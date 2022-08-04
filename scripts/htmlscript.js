//Login button event
document.querySelector("#google-login").addEventListener("click", () => {
    chrome.runtime.sendMessage({message: "login"}, (response) => {
        if(response === "success"){
            window.location.href = '../htmls/home.html'
        }
    })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse("recived")
    switch(request.message){
        case "logged_in":
            window.location.href = "../htmls/home.html";
            break
        default:
            console.log(request.message)
    }
})