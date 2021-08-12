document.querySelector("#login").addEventListener("click", () => {
    chrome.runtime.sendMessage({message: "login"}, function(response) {
        console.log(response);
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