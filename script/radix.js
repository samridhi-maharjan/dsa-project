const arrayContainer = document.getElementById('array-container');
const generateButton = document.getElementById('generate');
const sortButton = document.getElementById('sort');
const createButton = document.getElementById('create');
const input = document.getElementById('user-input');
const size = document.getElementById('size');
const speedInput = document.getElementById('speed');

function createArray() {
    const userValues = input.value.split(',').map(Number);
    if (userValues.length > 0 && userValues.length <= size.value && userValues.every(num => !isNaN(num))) {
        array = userValues;
        arrayContainer.innerHTML = '';
        array.forEach(value => {
            const number = document.createElement('div');
            number.classList.add('number');
            number.innerText = value;
            arrayContainer.appendChild(number);
        });
    } else {
        alert('Please enter valid comma-separated numbers and ensure the array size matches the input size.');
    }
}

function generateArray() {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const value = Math.floor(Math.random() * 1000) + 1;
        array.push(value);
        const number = document.createElement('div');
        number.classList.add('number');
        number.innerText = value;
        arrayContainer.appendChild(number);
    }
}
async function radixSort() {
    let maxNum = Math.max(...array); places
    let exp = 1;
    while (Math.floor(maxNum / exp) > 0) {
        await countingSortByDigit(exp);
        exp *= 10;
    }
    highlightFinalSorted(); 
}
async function radixSort() {
    let maxNum = Math.max(...array);
    let exp = 1;

    while (Math.floor(maxNum / exp) > 0) {
        await countingSortByDigit(exp);
        exp *= 10;
    }
    highlightFinalSorted();
}
async function radixSort() {
    let maxNum = Math.max(...array);
    let exp = 1;

    while (Math.floor(maxNum / exp) > 0) {
        await countingSortByDigit(exp);
        exp *= 10;
    }
    highlightFinalSorted();
}
async function countingSortByDigit(exp) {
    const output = new Array(array.length).fill(0);
    const count = new Array(10).fill(0);
    const numbers = document.getElementsByClassName('number');

    for (let i = 0; i < array.length; i++) {
        const digit = Math.floor(array[i] / exp) % 10;
        count[digit]++;
        highlightLSB(numbers[i], digit);
    }
    await delay();
    
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        const digit = Math.floor(array[i] / exp) % 10;
        output[count[digit] - 1] = array[i];
        count[digit]--;
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
        numbers[i].innerText = array[i];
        numbers[i].classList.add('selected');
        await delay();
        numbers[i].classList.remove('selected');
    }
}

function highlightLSB(element, digit) {
    element.classList.remove('lsb');
    const lsb = Math.floor(digit % 10);
    element.classList.add('lsb');
    element.dataset.lsb = lsb;
}
function delay() {
    return new Promise(resolve => setTimeout(resolve, speedInput.value || 200));
}
function highlightFinalSorted() {
    const numbers = document.getElementsByClassName('number');
    for (let num of numbers) {
        num.classList.add('sorted');
    }
}
sortButton.addEventListener('click', () => radixSort());
createButton.addEventListener('click', createArray);
generateButton.addEventListener('click', generateArray);
generateArray();

