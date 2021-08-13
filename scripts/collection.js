const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
const bookshelve = urlParams.get("bookshelve")
let collection_books = []

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
        id: 3
    }
}
document.querySelector("#title").innerHTML = bookshelve_config[bookshelve].title
//get collection_books

const createBook = (book, addFunction) => {
    console.log(book)
    let {title, authors, description} = book.volumeInfo //id and preview
    let imageLink = book.volumeInfo.imageLinks?.thumbnail || "https://books.google.pt/googlebooks/images/no_cover_thumb.gif" 

    let div = document.createElement("div")
    div.className = "book_div"
    div.innerHTML = `
        <img src='${imageLink}'/>
        <h2>${title}</h2>
        <h3>${authors.join(", ")}</h3>
        <p>${description ? description : ""} </p>
    `
    return div
    
}

chrome.runtime.sendMessage({message: "get_collection", bookshelve}, function(response) {
    console.log(response)
    collection_books = response
    collection_books.forEach(book => {
        document.querySelector("#bookshelve").append(createBook(book))
    })
});

document.querySelector("#back").addEventListener("click", () => {window.location.href = "../htmls/home.html"})