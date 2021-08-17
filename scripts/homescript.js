//
const APP_KEY = "AIzaSyDJalQbZ22nGh1kpckaCb5MqFuSzyWP-jQ"

//elements
let logout_button = document.querySelector("#logout")
let add_new_book_button = document.querySelector("#add_new_book")
let recommended_books = document.querySelector("#recommended_books")

//Functions
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
    console.log(book)
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
    `
    return div
}

const open_book = (book) => {
    console.log(book)
}
//Events

chrome.storage.local.get('recommended', function(result) {
    recommended_books.innerHTML = ""
    if(result.recommended.length > 0){
        console.log("first initial", result.recommended)
        result.recommended.forEach(book => {
            recommended_books.append(createBook(book, false))
        })
    }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if(key === "recommended"){
            recommended_books.innerHTML = ""
            if(newValue.length > 0){
                newValue.forEach(book => {
                    recommended_books.append(createBook(book, false))
                })
            }
        }
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });

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

logout_button.addEventListener("click", logout)
add_new_book_button.addEventListener("click", () => window.location.href = '../htmls/search.html')

document.querySelectorAll(".books_collection").forEach(collection => collection.addEventListener("click", () => {
    window.location.href = `../htmls/collection.html?bookshelve=${collection.dataset.bookshelve}`
}))