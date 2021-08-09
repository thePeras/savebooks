document.querySelector("#login").addEventListener("click", () => {
    chrome.runtime.sendMessage({response: "login"}, function(response) {
        console.log(response);
    });
})
