const library = []

function Book (title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read ? "Read" : "Not read yet",
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

function addBookToLibrary (title, author, pages, read) {
    library.push(new Book(title, author, pages, read))
}

function addInitialBooks(){
    const books = [
        {
            title:'The Hobbit',
            author: 'J. R. R. Tolkien',
            pages: 310,
            read: false
        },
        {
            title:'A Game of Thrones',
            author: 'George R. R. Martin',
            pages: 694,
            read: true
        },
        {
            title: 'The Catcher in the Rye',
            author: 'J. D. Salinger',
            pages: 234,
            read: true
        }
    ]

    books.forEach(book => addBookToLibrary(book.title, book.author, book.pages, book.read))
}

addInitialBooks()

function createBookCard(book, index){
    return `<article class="library__book" data-index="${index}">
    <h2 class="book__title">${book.title}</h2>
    <p class="book__author">${book.author}</p>
    <p class="book__pages">${book.pages}</p>
    <p class="book__read">${book.read}</p>
    <button class="book__remove-button"></button>
</article>`
}

function displayBookCard(bookCard) {
    const sectionLibrary = document.querySelector('.library')
    sectionLibrary.innerHTML += bookCard
}

function displayAllBooks() {
    library.forEach((book, index)=> {
        displayBookCard(createBookCard(book,index))
    })
}