'use strict'

var gCurrModal = null
var gOnUpdate = false

function onInit() {
    // localStorage.clear(); // For Easy Coding Only
    createBooks(7);
    setLang();
    renderBooks();
}

//Lang Control
function onSetLang(lang) {
    setLang(lang);
    setSort(gSortBy);
    renderBooks();
    renderBookModal();
}

//Sort control
function onSetSort(sortType) {
    if (sortType==='unset') return;
    setSort(sortType)
    renderBooks();
}

//CRUD button calls
//C
function onAddBook() {
    document.querySelector('.add-inputs').removeAttribute('hidden');
    var elAddBtn = document.querySelector('.add-book');
    elAddBtn.setAttribute('data-trans', 'btn-confirm-add');
    elAddBtn.setAttribute('onclick', `onAddBookConfirm()`);
    doTrans();

}
function onAddBookConfirm() {
    var bookName = document.querySelector('[data-trans="input-title"]');
    var bookPrice = document.querySelector('[data-trans="input-price"]');
    if (bookName.value !== '' && bookPrice.value >= 0){
        addBook(bookName.value, bookPrice.value);
        renderBooks();
    }
    bookName.value = '';
    bookPrice.value = '';
    document.querySelector('.add-inputs').setAttribute('hidden', 'true');
    var elAddBtn = document.querySelector('.add-book');
    elAddBtn.setAttribute('data-trans', 'btn-add');
    elAddBtn.setAttribute('onclick', `onAddBook()`);
    doTrans();
}
//R
function onReadClick(bookId) {
    var book = getBook(bookId);
    gCurrModal = book;
    renderBookModal(book);
    doTrans();
}
//U
function onUpdatClick(bookId) {
    if (gOnUpdate===true) return
    gOnUpdate= true
    var book = getBook(bookId);
    var titleTd = document.querySelector(`[data-title="${bookId}"]`);
    var priceTd = document.querySelector(`[data-price="${bookId}"]`);
    titleTd.innerHTML = `<input class="title-update" data-trans="input-title" placeholder="Book Title" value="${book.name[gCurrLang]}">`;
    priceTd.innerHTML = `<input class="price-update" data-trans="input-price" type="number" placeholder="Price" value="${book.price}">`;
    var elUpdateBtn = document.querySelector(`[data-bookid="${bookId})"]`);
    elUpdateBtn.innerText = 'Save';
    elUpdateBtn.setAttribute('onclick', `onSaveUpdateClick('${bookId}')`);
    elUpdateBtn.setAttribute('data-trans', 'btn-save');
    doTrans();
}
function onSaveUpdateClick(bookId) {
    gOnUpdate= false
    var newName = document.querySelector('.title-update');
    var newPrice = document.querySelector('.price-update');
    if (newName.value === '' || newPrice.value < 0) return
    updateBook(bookId, newName.value, newPrice.value);
    onCloseModal();
    renderBooks();
}
function onRaitingChange(bookId, rate) {
    document.querySelector('.currRate').innerHTML = `<span data-trans="modal-rating">Rating</span>: ${rate}/10</div>`;
    updateRating(bookId, rate);
    doTrans();
}
//D
function onRemoveClick(bookId) {
    removeBook(bookId);
    renderBooks();
    onCloseModal();
}

//Render
function renderBooks() {
    var books = getBooks();
    var strHtml = books.map(book => {
        return `
        <tr>
        <td class="td-id">${book.id}</td>
        <td class="td-title" data-title="${book.id}">${book.name[gCurrLang]}</td>
        <td class="td-price" data-price="${book.id}">${formatCurrency(book.price)}</td>
        <td><button data-trans="btn-read" class="read" onclick="onReadClick('${book.id}'); onShowModal()">Read</button>
        <button data-trans="btn-update" class="update" onclick="onUpdatClick('${book.id}')" data-bookid="${book.id})">Update</button>
        <button data-trans="btn-delete" class="delete" onclick="onRemoveClick('${book.id}')">Delete</button>
        </td></tr>
    `
    });
    document.querySelector('.books-list tbody').innerHTML = `${strHtml.join('')}`;
    document.querySelector('.next-page').disabled = !hasNext();
    document.querySelector('.curr-page').innerText = getCurrPage() + 1;
    document.querySelector('.prev-page').disabled = !hasPrev();
    doTrans();
}

function renderBookModal() {
    if (!gCurrModal) return;
    var strHtml = `
        <button data-trans="btn-close" class="close-modal" onclick="onCloseModal()">Close</button>
        <h6>${gCurrModal.id}</h6>
        <img src="img/${gCurrModal.imgFile}"/>
        <h3>${gCurrModal.name[gCurrLang]}</h3>
        <div class="modal-price"><span data-trans="col-price">Price</span>: ${gCurrModal.price}</div>
        <div class="currRate"><span data-trans="modal-rating">Rating</span>: ${gCurrModal.rate}/10</div>
        <input type="range" class="rating-slider" data-id="${gCurrModal.id}" min="0" max="10" value="${gCurrModal.rate}" onchange="onRaitingChange(this.dataset.id,this.value)">
        <p class="about"><span data-trans="modal-about">About</span>:<br>${gCurrModal.about[gCurrLang]}</p>
        `;
    document.querySelector('.book-modal').innerHTML = strHtml;
}


// Hide/Unhide The modal
function onShowModal() {
    document.querySelector('.book-modal').removeAttribute('hidden');
}
function onCloseModal() {
    document.querySelector('.book-modal').setAttribute('hidden', true);
}


//Page Controls
function onNextPage() {
    nextPage();
    renderBooks();
}
function onPrevPage() {
    prevPage();
    renderBooks();
}