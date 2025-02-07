const arrayContainer = document.getElementById('array-container');
const generateButton = document.getElementById('generate');
const sortButton = document.getElementById('sort');
const createButton = document.getElementById('create');
const input= document.getElementById('user-input');


let array = [];
function createArray() {
    const userValues = userInput.value.split(',').map(Number);
    if (userValues.length > 0 && userValues.every(num => !isNaN(num))) {
        array = userValues;
        arrayContainer.innerHTML = '';
        array.forEach(value => {
            const number = document.createElement('div');
            number.classList.add('number');
            number.innerText = value;
            arrayContainer.appendChild(number);
        });
    } else {
        alert('Please enter valid comma-separated numbers.');
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

async function bubbleSort() {
    const numbers = document.getElementsByClassName('number');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap array elements
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                
                // Swap number text
                numbers[j].innerText = array[j];
                numbers[j + 1].innerText = array[j + 1];
                
                // Highlight sorted numbers
                numbers[j].classList.add('sorted');
                numbers[j + 1].classList.add('sorted');
                
                await new Promise(resolve => setTimeout(resolve, 200));
                
                // Remove highlight after sorting
                numbers[j].classList.remove('sorted');
                numbers[j + 1].classList.remove('sorted');
            }
        }
    }
}
createButton.addEventListener('click',createArray);
generateButton.addEventListener('click', generateArray);
sortButton.addEventListener('click', bubbleSort);

generateArray();
