const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
const bookshelve = urlParams.get("bookshelve")
let collection_books = []
const APP_KEY = "AIzaSyDJalQbZ22nGh1kpckaCb5MqFuSzyWP-jQ"

let bookshelve_config = {
    favorites:{
        title: "Favourites",
        color: "",
        icon: "",
        id: 0
    },
    reading:{
        title: "Reading Now",
        color: "",
        icon: "",
        id: 3
    },
    to_read:{
        title: "To Read",
        color: "",
        icon: "",
        id: 2
    },
    have_read:{
        title: "Have Read",
        color: "",
        icon: "",
        id: 4
    }
}
document.querySelector("#title").innerHTML = bookshelve_config[bookshelve].title

//get collection_books
const createBook = (book, addFunction) => {
    let {title, authors, description} = book.volumeInfo //id and preview
    let imageLink = book.volumeInfo.imageLinks?.thumbnail || "https://books.google.pt/googlebooks/images/no_cover_thumb.gif" 

    let div = document.createElement("div")
    div.className = "book_div"
    div.title = description ? description : ""
    div.onClick = console.log(book)
    div.innerHTML = `
        <img src='${imageLink}'/>
        <h4>${title}</h4>
        <h5>${authors.join(", ")}</h5>
        <button class="delete_book" data-volumeid="${book.id}">delete</button>
    `
    return div
}

chrome.runtime.sendMessage({message: "get_collection", bookshelve}, function(response) {
    console.log(response)
    collection_books = response
    collection_books.forEach(book => {
        document.querySelector("#bookshelve").append(createBook(book))
    })
    document.querySelectorAll(".delete_book").forEach(button => {
        button.addEventListener("click", (book) => {
            chrome.runtime.sendMessage({message: "add_delete", action: "delete", volumeid: book.target.dataset.volumeid, shelf: bookshelve_config[bookshelve].id}, function(response) {
                console.log(response)
            });
            book.target.dataset.volumeid
        })
    })
});

document.querySelector("#back").addEventListener("click", () => {window.location.href = "../htmls/home.html"})

