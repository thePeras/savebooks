let logout_button = document.querySelector("#logout")
let close_button = document.querySelector("#close")
let add_new_book_button = document.querySelector("#add_new_book")

const logout = () => {
    chrome.runtime.sendMessage({message: "logout"})
}

const toggleAddNewBook = () => {
    document.querySelector("#add_new_book_div").classList.toggle("hidden")
}

//Events
logout_button.addEventListener("click", logout)
add_new_book_button.addEventListener("click", toggleAddNewBook)
close_button.addEventListener("click", toggleAddNewBook)
