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

async function selectionSort() {
    const numbers = document.getElementsByClassName('number');

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        numbers[i].classList.add('selected'); 

        for (let j = i + 1; j < array.length; j++) {
            numbers[j].classList.add('checking'); 
            await delay();

            if (array[j] < array[minIndex]) {
                numbers[minIndex].classList.remove('min'); 
                minIndex = j;
                numbers[minIndex].classList.add('min'); 
            }

            numbers[j].classList.remove('checking');
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            numbers[i].innerText = array[i];
            numbers[minIndex].innerText = array[minIndex];
        }

        numbers[minIndex].classList.remove('min'); 
        numbers[i].classList.remove('selected');
        numbers[i].classList.add('sorted'); 
        await delay();
    }

    highlightFinalSorted(); 
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
sortButton.addEventListener('click', () => selectionSort());
createButton.addEventListener('click', createArray);
generateButton.addEventListener('click', generateArray);
generateArray();
