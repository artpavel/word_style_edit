'use strict';
/* змінні */
const arrColor = ['green', 'grey', 'blue', 'red', 'yellow', 'brown', 'pink', 'purple', 'orange'];
const arrColor1 = ['pink', 'purple', 'orange', 'red', 'blue', 'yellow', 'brown', 'green', 'grey'];
let colorBox = document.querySelectorAll('.color-box');
let colorBox1 = document.querySelectorAll('.color-box1');
let topBlock = document.querySelector('.top-block');
const list = document.forms['form-list'];
const table = document.forms['form-table'];

/* функції  */
const getS = selector => document.querySelector(selector);

/**
 * функція showElement
 * додає клас active до елемента, який потрібно застилізувати в CSS
 * @param elemPush - який натиснути
 * @param elemShow - який показати блок
 * @param elemRemove - який видалити блок
 */
function showElement(elemPush, elemShow, elemRemove) {
    getS(elemPush).addEventListener('click', function () {
        getS(elemShow).classList.add('active');
        getS(elemRemove).classList.remove('active');
    })
}

/**
 * Використовувати разом із showElement
 * @param elemPush
 * @param elemHide
 */
function hideElement(elemPush, elemHide) {
    getS(elemPush).addEventListener('click', function () {
        getS(elemHide).classList.remove('active');
    })
}

/**
 * saveTextArea - записує значення в textarea
 * @param push - який елемент потрібно натиснути
 * @param elemHTML
 */
function saveTextArea(push) {
    getS(push).addEventListener('click', function () {
        getS('.edit-area').value = getS('.top-block').innerHTML;
    })
}

function saveTopBlock(push) {
    getS(push).addEventListener('click', function () {
        getS('.top-block').innerHTML = getS('.edit-area').value;
    })
}

/**
 * changeStyle() - проводить зміни із стилями нашого блоку
 */
function changeStyle() {
    getS('.top-block').style.fontSize = event.target.value;
    getS('.top-block').style.fontFamily = event.target.value;
    if (event.target.checked) {
        getS('.top-block').style.fontWeight = event.target.dataset.name;
        getS('.top-block').style.fontStyle = event.target.dataset.name;
    } else {
        getS('.top-block').style.fontWeight = 'normal';
        getS('.top-block').style.fontStyle = 'normal';
    }

}

/*Вибрати що будемо створювати - list or table */
function showCreateListOrTable() {
    let f = document.querySelector('.choose');
    f.addEventListener('click', function () {
        if (event.target.checked) {
            if (f.choose.value === 'table') {
                getS('.create-table').classList.add('active');
                getS('.create-list').classList.remove('active');
            } else {
                getS('.create-list').classList.add('active');
                getS('.create-table').classList.remove('active');
            }
        }
    })
}

/**
 * colorForBlocks - замальовує блоки у віповідний колір
 * @param arr - блоки, які потрібно замалювати
 * @param arr1 - масив кольорів
 */
function colorForBlocks(arr, arr1) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.backgroundColor = arr1[i];
    }
}

/**
 * changeText - змінює колір тексту
 * @param arr - масив кольорів
 */
function changeText(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', function () {
            topBlock.style.color = getComputedStyle(arr[i]).backgroundColor;
            document.querySelector('.colors').classList.toggle('active');
        })
    }
}

function changeFon(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', function () {
            topBlock.style.backgroundColor = getComputedStyle(arr[i]).backgroundColor;
            document.querySelector('.colors1').classList.toggle('active');

        })
    }
}

/* функціональний вираз для створення списку */
(function createList() {
    getS('.btn-create-list').addEventListener('click', () => {
        const countLi = list.count.value;
        const typeLi = list.type.value;
        getS('.edit-area').value += `<ul style="list-style-type: ${typeLi}">`;
        for (let i = 0; i < countLi; i++) {
            getS('.edit-area').value += `<li>item ${i + 1}</li>`;
        }
        getS('.edit-area').value += '</ul>';
    })
})();

/* функціональний вираз для створення таблиці */
(function createTable() {
    getS('.btn-create-table').addEventListener('click', () => {
        let newTable = {
            tr: table.tr.value,
            td: table.td.value,
            widthTD: table.widthTD.value,
            heightTD: table.heightTD.value,
            widthBorder: table.widthBorder.value,
            typeBorder: table.typeBorder.value,
            colorBorder: table.colorBorder.value
        }
        console.log(newTable);
        getS('.edit-area').value += `<table style="border-collapse: collapse; text-align: center">`;
        for (let i = 0; i < newTable.tr; i++) {
            getS('.edit-area').value += `<tr>`
            for (let j = 0; j < newTable.td; j++) {
                getS('.edit-area').value += `<td style="border:${newTable.widthBorder}px ${newTable.typeBorder} ${newTable.colorBorder}; 
                                                    width: ${newTable.widthTD}px; height: ${newTable.heightTD}px">TD</td>`
            }
            `</tr>`;
        }
        getS('.edit-area').value += '</table>';
    });
})();

/* показую елементи */
showElement('.edit', '.edit-block', '.style-block');
showElement('.style', '.style-block', '.edit-block');
showElement('.btn-text-color', '.colors', '.edit-block');
showElement('.btn-bg-color', '.colors1', '.edit-block');
showElement('.btn-add', '.secondBlock', '.firstBlock');
showElement('.btn-create-list', '.firstBlock', '.secondBlock');
showElement('.btn-create-table', '.firstBlock', '.secondBlock');


/* ховаю елементи */
hideElement('.btn-save', '.edit-block');

/* зберігає зміни в блоках */
saveTextArea('.edit');
saveTopBlock('.btn-save');

/* стилізація блоку */
colorForBlocks(colorBox, arrColor);
colorForBlocks(colorBox1, arrColor1);
changeText(colorBox);
changeFon(colorBox1);



