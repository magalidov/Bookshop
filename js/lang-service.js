var gCurrLang = 'en'

var gTrans = {
    'caption': {
        en: 'The old Bookshop',
        he: 'חנות הספרים הישנה',
    },
    'sort-lable': {
        en: 'Sort',
        he: 'מיון',
    },
    'lang-lable': {
        en: 'Lang',
        he: 'שפה',
    },
    'sort-lable-title': {
        en: 'Title',
        he: 'כותר',
    },
    'sort-lable-price': {
        en: 'Price',
        he: 'עלות',
    },
    'btn-add': {
        en: 'Add a New Book',
        he: 'הוספת ספר חדש',
    },
    'btn-confirm-add': {
        en: 'Confirm Add',
        he: 'אשר הוספה',
    },
    'col-id': {
        en: 'Id',
        he: 'מזהה',
    },
    'col-title': {
        en: 'Title',
        he: 'כותר',
    },
    'col-price': {
        en: 'Price',
        he: 'עלות',
    },
    'col-actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'btn-read': {
        en: 'Read',
        he: 'עיין',
    },
    'btn-update': {
        en: 'Update',
        he: 'עדכן',
    },
    'btn-save': {
        en: 'Save',
        he: 'שמור',
    },
    'btn-delete': {
        en: 'Delete',
        he: 'מחק',
    },
    'footer-txt': {
        en: 'Thank you for visiting this dusty Bookshop',
        he: 'תודה שביקרתם בחנות ספרים מאובקת זו',
    },
    'btn-close': {
        en: 'Close',
        he: 'סגור',
    },
    'modal-price': {
        en: 'Price',
        he: 'עלות',
    },
    'modal-rating': {
        en: 'Rating',
        he: 'דירוג',
    },
    'modal-about': {
        en: 'About',
        he: 'תקציר',
    },
    'input-title': {
        en: 'Book Title in Eng',
        he: 'שם הספר בעברית',
    },
    'input-price': {
        en: 'Price',
        he: 'עלות',
    },
}

function getTrans(transKey) {
    if (!gTrans[transKey]) return 'UNKNOWN'
    var transMap = gTrans[transKey];
    var trans = transMap[gCurrLang];
    if (!trans) trans = transMap['en']
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i = 0; i < els.length; i++) {
        var el = els[i]
        var transKey = el.dataset.trans;
        var trans = getTrans(transKey);
        if (el.nodeName === 'INPUT') el.placeholder = trans
        else el.innerText = trans;
    }
}

function setLang(lang) {
    gCurrLang = (lang) ? lang : (loadFromStorage('LAN')!==null) ? loadFromStorage('LAN') : 'en'
    if (gCurrLang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    saveToStorage('LAN', gCurrLang)
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function onGetLang(){
    return gCurrLang
}