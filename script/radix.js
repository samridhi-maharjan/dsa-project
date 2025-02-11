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
    for (let i = 0; i < 20; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        const number = document.createElement('div');
        number.classList.add('number');
        number.innerText = value;
        arrayContainer.appendChild(number);
    }
}
async function radixSort() {
    const numbers = document.getElementsByClassName('number');
    const speed = parseInt(speedInput.value);
    const max = Math.max(...array); 
    let digitPlace = 1; 
    while (max / digitPlace > 0) {
        let buckets = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < array.length; i++) {
            const digit = Math.floor(array[i] / digitPlace) % 10;
            buckets[digit].push(array[i]);
        }
        let index = 0;
        for (let i = 0; i < buckets.length; i++) {
            for (let j = 0; j < buckets[i].length; j++) {
                array[index] = buckets[i][j];
                numbers[index].innerText = array[index];
                numbers[j].classList.add('sorted');
                numbers[j + 1].classList.add('sorted');
                
                await new Promise(resolve => setTimeout(resolve, speed));
                
                numbers[j].classList.remove('sorted');
                numbers[j + 1].classList.remove('sorted');
                index++;
            }
        }
        digitPlace *= 10;
    }
    for (let i = 0; i < array.length; i++) {
        numbers[i].classList.add('final');
    }
}

sortButton.addEventListener('click', radixSort);
createButton.addEventListener('click', createArray);
generateButton.addEventListener('click', generateArray);
generateArray();

