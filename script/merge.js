const arrayContainer = document.getElementById('array-container');
const generateButton = document.getElementById('generate');
const sortButton = document.getElementById('sort');
const createButton = document.getElementById('create');
const input= document.getElementById('user-input');
const size=document.getElementById('size');
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
async function mergeSort(left = 0, right = array.length - 1) {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    let tempArray = [];
    let i = left, j = mid + 1;
    let numbers = document.getElementsByClassName('number');
    
    while (i <= mid && j <= right) {
        numbers[i].classList.add('comparing');
        numbers[j].classList.add('comparing');
        await new Promise(resolve => setTimeout(resolve, speedInput.value || 200));
        
        if (array[i] <= array[j]) {
            tempArray.push(array[i]);
            i++;
        } else {
            tempArray.push(array[j]);
            j++;
        }   
        numbers[i - 1]?.classList.remove('comparing');
        numbers[j - 1]?.classList.remove('comparing');
    } 
    while (i <= mid) {
        tempArray.push(array[i]);
        i++;
    }
    while (j <= right) {
        tempArray.push(array[j]);
        j++;
    }
    for (let k = left; k <= right; k++) {
        array[k] = tempArray[k - left];
        numbers[k].innerText = array[k];
        numbers[k].classList.add('sorted');
        await new Promise(resolve => setTimeout(resolve, speedInput.value || 200));
        numbers[k].classList.remove('sorted');
    }
}

createButton.addEventListener('click',createArray);
generateButton.addEventListener('click', generateArray);
sortButton.addEventListener('click', async () => {
    await mergeSort();
    let numbers = document.getElementsByClassName('number');
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].classList.add('final');
    }
});
