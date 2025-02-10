const arrayContainer = document.getElementById('array-container');
const generateButton = document.getElementById('generate');
const sortButton = document.getElementById('sort');
const createButton = document.getElementById('create');
const input = document.getElementById('user-input');
const size = document.getElementById('size');
const speedInput = document.getElementById('speed');

let array = [];

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
    for (let i = 0; i < 20; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        const number = document.createElement('div');
        number.classList.add('number');
        number.innerText = value;
        arrayContainer.appendChild(number);
    }
}

async function quickSort(low = 0, high = array.length - 1) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const pivot = array[high];
    const numbers = document.getElementsByClassName('number');
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            numbers[i].innerText = array[i];
            numbers[j].innerText = array[j];
        }
    }
    const temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    numbers[i + 1].innerText = array[i + 1];
    numbers[high].innerText = array[high];

    numbers[i + 1].classList.add('sorted');
    numbers[high].classList.add('sorted');
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    numbers[i + 1].classList.remove('sorted');
    numbers[high].classList.remove('sorted');
    
    return i + 1;
}

createButton.addEventListener('click', createArray);
generateButton.addEventListener('click', generateArray);
sortButton.addEventListener('click', () => quickSort());

generateArray();
