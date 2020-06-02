'use strict'
const KEY = 'books';
var gBooks;
var gBooksNames = [
    {
        en: 'Dune',
        he: 'חולית'
    },
    {
        en: 'Dune Messiah',
        he: 'משיח חולית'
    },
    {
        en: 'Children of Dune',
        he: 'ילדי חולית'
    },
    {
        en: 'God Emperor of Dune',
        he: 'הקיסר האל של חולית'
    }
]
const PAGE_SIZE = 5;
var gPageIdx = 0;
var gSortBy;


// Permissions
function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}
function getBook(bookId) {
    return gBooks.find(book => {
        return (book.id === bookId);
    })
}
//Actions
function addBook(name, price) {
    var nameLangs = { en: name, he: name };
    var addedBook = _createBook(nameLangs, price);
    gBooks.unshift(addedBook);
}
function updateBook(bookId, name, price) {
    gBooks.forEach(book => {
        book.name[gCurrLang] = (book.id === bookId) ? name : book.name[gCurrLang];
        book.price = (book.id === bookId) ? price : book.price;
    })
}
function updateRating(bookId, rate) {
    gBooks.forEach(book => {
        book.rate = (book.id === bookId) ? rate : book.rate;
    })
}
function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => {
        return (book.id === bookId);
    })
    gBooks.splice(bookIdx, 1);
}

//Paging
function nextPage() {
    gPageIdx++;
}
function prevPage() {
    gPageIdx--;
}
function getCurrPage() {
    return gPageIdx;
}
function hasNext() {
    return (gPageIdx + 1) * PAGE_SIZE < gBooks.length;
}
function hasPrev() {
    return (gPageIdx > 0);
}

//Sorting
function setSort(sortType) {
    gSortBy = sortType;
    gBooks = sortByType(gBooks, gSortBy);
    return;
}

function sortByType(books,sortType) {
    return books.sort((a, b) => {
        var sortedBooks = ((sortType === 'name') ? a[sortType][gCurrLang].localeCompare(b[sortType][gCurrLang]) : a[sortType] - b[sortType]);
        return sortedBooks ;
    });
}

//Create Books
function createBooks(amount) {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        var books = []
        for (let i = 0; i < amount; i++) {
            var bookName = gBooksNames[getRandomIntInclusive(0, gBooksNames.length - 1)];
            books.push(_createBook(bookName, getRandomIntInclusive(80, 150)));
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}
function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}
function _createBook(name, price) {
    var imgName = (gBooksNames.find(book => book.en === name.en) ? name.en : 'default');
    if (!price) price = getRandomIntInclusive(50, 200);
    return {
        id: makeId(),
        name: {
            en: name.en,
            he: name.he
        },
        price: price,
        about: {
            en: makeLoremEn(),
            he: makeLoremHe()
        },
        rate: 1,
        imgFile: `${imgName}.jpg`,
    };
};
