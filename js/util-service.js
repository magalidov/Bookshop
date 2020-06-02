'use strict';

function makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLoremEn(size = 50) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}
function makeLoremHe(size = 50) {
    var words = ['השמיים', 'למעלה', 'המזח', 'היה', 'צבע הטלוויזיה', 'מכוון', 'עבור', 'ערוץ מת', '.', 'הכל', 'זה קרה', 'פחות או יותר', '.', 'אני', 'היה', 'הסיפור', 'חלק אחר חלק', 'מאנשים שונים', 'וכך', 'באופן כללי', 'זה קרה', 'במקרים כאלו', 'בכל פעם', 'זה', 'היה', 'סיפור אחר', '.', 'זה', 'היה', 'תענוג', 'עבור', 'שורף'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
