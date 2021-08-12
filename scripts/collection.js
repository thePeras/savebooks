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

chrome.runtime.sendMessage({message: "get_collection", bookshelve}, function(response) {
    console.log(response);
    collection_books = response
});

document.querySelector("#back").addEventListener("click", () => {window.location.href = "../htmls/home.html"})