//variables
let book_search = document.querySelector("#book_search")
let searched_books = document.querySelector("#searched_books")
let list = document.querySelector("#list")
const APP_KEY = "AIzaSyDJalQbZ22nGh1kpckaCb5MqFuSzyWP-jQ"

//Functions
const search_books = async (search) => {
    return new Promise((resolve, error) => {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APP_KEY}`, {method: 'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => {
            // Removing ebooks
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
    document.querySelectorAll(".add_book").forEach(button => {
        button.addEventListener("click", book => {
            console.log("running")
            addBook(book.target.dataset.volumeid)
        })
    })
}
const createBook = (book) => {
    let {title, authors, description} = book.volumeInfo //id and preview
    let imageLink = book.volumeInfo.imageLinks?.thumbnail || "https://books.google.pt/googlebooks/images/no_cover_thumb.gif" 
    console.log(book)
    let div = document.createElement("div")
    div.classList.add("book_div")
    div.title = description ? description : ""
    div.innerHTML = `
        <img src='${imageLink}'/>
        <h4>${title}</h4>
        <h5>${authors?.join(", ")}</h5>
        <button class="add_book" data-volumeid="${book.id}" ->Adicionar</button>
    `
    return div
    
}

const addBook = (volumeid) => {
    chrome.runtime.sendMessage({message: "add_delete", action: "add", volumeid: volumeid, shelf: list.value}, function(response) {
        searched_books.innerHTML = ""
        book_search.value = ""
    });
}

//Events
book_search.addEventListener("keydown", () => {search_books(book_search.value)})
document.querySelector("#back").addEventListener("click", () => {window.location.href = "../html/home.html"})
