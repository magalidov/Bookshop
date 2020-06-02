var gCurrLang = 'en'

var gTrans = {
    'caption': {
        en: 'Bookshop with no Style',
        he: 'חנות ספרים בלי הסטייל',
    },
    'sort-lable': {
        en: 'Sort',
        he: 'מיון',
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
        he: 'הוסף ספר חדש',
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
        he: 'עיון',
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
        en: 'Thank you for visiting this ugly Bookshop!',
        he: 'תודה שביקרתם בחנות ספרים מכוערת זו!',
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
        en: 'Book Title',
        he: 'שם הספר',
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
    for (var i=0; i < els.length; i++){
        var el = els[i]
        var transKey = el.dataset.trans;
        var trans = getTrans(transKey);
        if (el.nodeName === 'INPUT') el.placeholder = trans
        else el.innerText = trans;
    }
}

function setLang(lang) {
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    gCurrLang = lang;
}

// function setLang(lang) {
//     gCurrLang = loadFromStorage('LAN')
//     if (gCurrLang === null){
//         gCurrLang = en;    
//     }
//     if (gCurrLang === 'he') document.body.classList.add('rtl');
//     else document.body.classList.remove('rtl');
//     saveToStorage('LAN',gCurrLang)
//     console.log('a:', lan)
// }