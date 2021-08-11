document.querySelector("#login").addEventListener("click", () => {
    chrome.runtime.sendMessage({message: "login"}, function(response) {
        console.log(response);
    })
})
