/* FUNCTIONS */
function Book (title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = Number(pages),
    this.read = read ? "Read" : "Not read yet",
    this.id = getNextId(),
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function getNextId () {
    const nextId = greatestId + 1;
    greatestId = nextId;
    return nextId
}

function addBookToLibrary (title, author, pages, read) {
    library.push(new Book(title, author, pages, read));
}

function addInitialBooks (){
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
    ];

    function displayAllBooks () {
        library.forEach((book)=> {
            displayBookCard(createBookCard(book));
        });
    };

    books.forEach(book => addBookToLibrary(book.title, book.author, book.pages, book.read));

    displayAllBooks();
}

function createBookCard (book){
    return `<article class="library__book" data-id="${book.id}">
    <h2 class="book__title">${book.title}</h2>
    <p class="book__author">${book.author}</p>
    <p class="book__pages">${book.pages} Pages</p>
    <div class="book__read">
        <p class="read__status">${book.read}</p>
        <input type="range" min="1" max="2" value="${book.read === 'Read' ? 2 : 1}" onchange="changeReadStatus(this)" class="read__toggle">
    </div>
    <button class="book__remove-button" onclick="deleteParentElement(this)" >X</button>
</article>`;
}

function displayBookCard (bookCard) {
    const sectionLibrary = document.querySelector('#library');
    sectionLibrary.innerHTML += bookCard;
}

function deleteCard (card) {
        const bookIndex = library.findIndex(book => book.id == Number(card.dataset.id) );

        library.splice(bookIndex, 1);
        card.remove();
}

function deleteParentElement (buttonInput) {
    deleteCard(buttonInput.parentElement);
}

function configureForm() {
    const form = document.querySelector('#form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        function resetForm() {
            event.target[1].value = "";
            event.target[2].value = "";
            event.target[3].value = 0;
            event.target[4].checked = false;
        }

        let title = event.target[1].value;
        let author = event.target[2].value;
        let pages = event.target[3].value;
        let read = event.target[4].checked;

        addBookToLibrary(title, author, pages, read);
        displayBookCard(createBookCard(library[library.length - 1]));

        resetForm();
    })
}

function changeReadStatus(rangeInput) {
    const newValue = Number(rangeInput.value);
    const parentElementId = Number(rangeInput.parentElement.parentElement.dataset.id);
    const bookIndex = library.findIndex(book => book.id === parentElementId)
                      library.findIndex(book => book.id === 3);

    function changeStatusOnLibraryObject() {
        library[bookIndex].read = newValue === 2 ? "Read" : "Not read yet";
    }
    function changeStatusOnBookCard() {
        rangeInput.parentElement.children[0].innerHTML = newValue === 2 ? "Read" : "Not read yet";
    }

    changeStatusOnLibraryObject();
    changeStatusOnBookCard();
}

function configureAsideDisplay() {
    const symbol = document.querySelector('[data-open]');

    symbol.addEventListener('click', () => {
        const form = document.querySelector('#form-container');

        symbol.classList.remove("not-clicked");

        if (symbol.dataset.open === "0" ) {
            form.classList.remove('hide');
            symbol.dataset.open = "1";
        } else {
            form.classList.add('hide');
            symbol.dataset.open = "0";
        }
    })
}

/* APP */

let greatestId = 0;
const library = [];

addInitialBooks();
configureForm();
configureAsideDisplay();