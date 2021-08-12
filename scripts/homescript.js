//
const APP_KEY = "AIzaSyDJalQbZ22nGh1kpckaCb5MqFuSzyWP-jQ"

//elements
let logout_button = document.querySelector("#logout")
let close_button = document.querySelector("#close")
let add_new_book_button = document.querySelector("#add_new_book")
let book_search = document.querySelector("#book_search")
let searched_books = document.querySelector("#searched_books")

//Functions
const toggleAddNewBook = () => {
    document.querySelector("#add_new_book_div").classList.toggle("hidden")
}
const logout = () => {
    chrome.runtime.sendMessage({message: "logout"})
}

const search_books = async (search) => {
    return new Promise((resolve, error) => {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APP_KEY}`, {method: 'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => {
            //remove isBook: true
            let search = data.items.filter((book) => !book.saleInfo.isEbook)
            print_books(search)
        })
        .catch(err => console.error(err))
    })
}
const print_books = (books) => {
    searched_books.innerHTML = ""
    books.forEach(book => {
        searched_books.append(createBook(book, false))
    })
}

const createBook = (book, addFunction) => {
    let {title, authors, imageLinks, description} = book.volumeInfo //id and preview

    let div = document.createElement("div")
    div.className = "book_div"
    div.onClick = open_book(book)
    div.innerHTML = `
        <image src='${imageLinks.thumbnail}' height="100"/>
        <h2>${title}</h2>
        <h3>${authors.join(", ")}</h3>
        <p>${description}</p>
    `
    return div
    
}

const open_book = (book) => {
    console.log(book)
}
//Events
logout_button.addEventListener("click", logout)
add_new_book_button.addEventListener("click", toggleAddNewBook)
close_button.addEventListener("click", toggleAddNewBook)

book_search.addEventListener("change", () => {search_books(book_search.value)})




chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse("recived")
    switch(request.message){
        case "logged_out":
            window.location.href = "../htmls/popup.html";
            break
        default:
            console.log(request.message)
    }
})

document.querySelectorAll(".books_collection").forEach(collection => collection.addEventListener("click", () => {
    console.log("asdasdasd")
    window.location.href = `../htmls/collection.html?bookshelve=${collection.dataset.bookshelve}`
}))