let grid = document.querySelector(".grid");
let tempBox = document.querySelector('#tempBox');
let tempValue = document.querySelector('#tempValue');
let buttons = document.querySelectorAll('.btn');
let heading =document.querySelector('h1');
let timeout = 1000;
let timeouts = []; // Array to keep track of timeouts
let squares = [];
let swapCount=0;

// Function to disable all buttons
function disableButtons() {
    buttons.forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = 'lightgrey'; // Change color to gray
        button.style.cursor = 'not-allowed';
    });
}

// Function to enable all buttons and reset their color
function enableButtons() {
    buttons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = 'rgb(26, 61, 83)'; // Original color
        button.style.cursor = 'pointer';
    });
}

// Function to generate new random elements for the grid
function generateElements() {
    grid.innerHTML = ""; // Clear the existing elements
    squares = []; // Clear the existing array of squares
    swapCount=0;
    for (let i = 0; i < 10; i++) {
        let square = document.createElement('div');
        square.setAttribute('id', i);
        let randomNumber = Math.floor(Math.random() * 100) + 1; // Generate random number between 1-100
        square.innerHTML = randomNumber;
        grid.append(square);
        squares.push(square);
    }
}

// Helper function to create a delay and track the timeout
function delay(time) {
    return new Promise(resolve => {
        let timeoutId = setTimeout(resolve, time);
        timeouts.push(timeoutId); // Track the timeout ID
    });
}

// Initial call to generate the elements
generateElements();

// Function to reset the page to its initial state
function resetPage() {
    // Clear all tracked timeouts
    timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    timeouts = []; // Reset the timeout array
    timeout = 1000; // Reset the timeout interval

    // Generate new elements
    generateElements();

    // Reset all visual styles applied to squares
    squares.forEach(square => {
        square.className = ''; // Remove all classes
    });

    // Hide the temp box and clear temp value
    tempBox.style.display = 'none';
    tempValue.innerHTML = '';

    // Enable all sorting buttons and restore their initial styles
    enableButtons();
    //reset the heading text
    heading.innerHTML="SORT IT";
}

// Bubble Sort function
function bubble_sort() {
    disableButtons(); // Disable all buttons
    heading.innerHTML = "BUBBLE SORT";
    swapCount = 0;

    for (let i = 0; i < squares.length - 1; i++) {
        let alreadySorted = true;

        for (let j = 0; j < (squares.length - i - 1); j++) {
            let timeoutId1 = setTimeout(() => {
                if (j > 0) {
                    squares[j - 1].classList.remove('exchange');
                    squares[j].classList.remove('exchange');
                }

                squares[j].classList.add('exchange');
                squares[j + 1].classList.add('exchange');

                if (parseInt(squares[j].innerHTML) > parseInt(squares[j + 1].innerHTML)) {
                    let timeoutId2 = setTimeout(() => {
                        let temp = squares[j].innerHTML;
                        squares[j].innerHTML = squares[j + 1].innerHTML;
                        squares[j + 1].innerHTML = temp;
                        swapCount++;
                        alreadySorted = false;
                    }, 1000);
                    timeouts.push(timeoutId2);
                }
            }, timeout);
            timeouts.push(timeoutId1);
            timeout += 2000;
        }
        
        timeout += 1000;
        let timeoutId3 = setTimeout(() => {
            squares[squares.length - i - 2].classList.remove('exchange');
            squares[squares.length - i - 1].classList.add('sorted');
        }, timeout - 1000);
        timeouts.push(timeoutId3);

        let timeoutId4 = setTimeout(() => {
            if (alreadySorted) {
                squares.forEach(square => square.classList.add("sorted"));
            }
        }, timeout);
        timeouts.push(timeoutId4);
    }

    // Add a small delay after turning the first index green to ensure the visual update is complete
    let timeoutId5 = setTimeout(() => {
        squares[0].classList.add("sorted");
    }, timeout);

    // Delay the alert after the final sorting visual update
    timeout += 1000;
    let timeoutId6 = setTimeout(() => {
        alert(`Bubble Sort completed with ${swapCount} swaps.`);
        enableButtons(); // Re-enable buttons after sorting is complete
    }, timeout);

    timeouts.push(timeoutId5);
    timeouts.push(timeoutId6);
}


// Add event listener for Bubble Sort
btn1.addEventListener('click', () => {
    bubble_sort();
});

// Insertion Sort function
async function insertion_sort() {
    disableButtons(); // Disable all buttons
    heading.innerHTML="INSERTION SORT";    tempBox.style.display = 'block';
    squares[0].classList.add('sorted');
    for (let i = 1; i < squares.length; i++) {
        squares[i].classList.add('exchange');
    }
    await delay(1000);

    for (let i = 1; i < squares.length; i++) {
        let temp = parseInt(squares[i].innerHTML);
        squares[i].innerHTML = '';
        squares[i].classList.add('empty');
        tempValue.innerHTML = temp;
        await delay(1500);
        let j = i - 1;
        while (j >= 0 && parseInt(squares[j].innerHTML) > temp) {
            squares[j].classList.add('jump');
            await delay(1500);
            squares[j].classList.remove('jump');
            squares[j + 1].innerHTML = squares[j].innerHTML;
            squares[j].innerHTML = '';
            squares[j].classList.remove('sorted');
            squares[j].classList.add('empty');
            squares[j + 1].classList.remove('exchange', 'empty');
            squares[j + 1].classList.add('sorted');
            await delay(1500);
            squares[j].classList.add('empty');
            j--;
        }
           if(j >= 0){
            squares[j].classList.add('jump');
            await delay(1500);
            squares[j].classList.remove('jump');
        }
        squares[j + 1].innerHTML = temp;
        squares[j + 1].classList.remove('exchange', 'empty');
        squares[j + 1].classList.add('sorted');
        tempValue.innerHTML = '';
        await delay(1500);
    }
    tempBox.style.display = 'none';
}

// Add event listener for Insertion Sort
btn2.addEventListener('click', () => {
    insertion_sort();
});

// Selection Sort function
async function selection_sort() {
    disableButtons(); // Disable all buttons
    heading.innerHTML="SELECTION SORT"
    swapCount=0;
    squares.forEach(square => {
        square.classList.add('exchange');
    });
    await delay(1000);
    for (let i = 0; i < squares.length - 1; i++) {
        let minIndex = i;
        squares[minIndex].classList.add('empty');
        for (let j = i + 1; j < squares.length; j++) {
            await delay(1000);
            squares[j].classList.add('jump');
            await delay(500);
            if (parseInt(squares[j].innerHTML) < parseInt(squares[minIndex].innerHTML)) {
                if (minIndex === i) {
                    await delay(1000);
                    squares[minIndex].classList.remove('empty');
                    squares[minIndex].classList.add('yellow');
                } else {
                    await delay(1000);
                    squares[minIndex].classList.remove('empty');
                    squares[minIndex].classList.add('exchange');
                }
                minIndex = j;
                squares[minIndex].classList.add('empty');
            }
            squares[j].classList.remove('jump');
        }
        await delay(1500);
        if (i === squares.length - 2) {
            squares[i + 1].classList.add('sorted');
        }
        if (minIndex != i) {
            let temp = squares[i].innerHTML;
            squares[i].innerHTML = squares[minIndex].innerHTML;
            squares[minIndex].innerHTML = temp;
            swapCount++;
            await delay(1000);
        }
        squares[i].classList.remove('yellow');
        squares[i].classList.add('sorted');
        squares[minIndex].classList.remove('empty');
        squares[minIndex].classList.add('exchange');
        await delay(2000);
    }
    alert(`Selection Sort completed with ${swapCount} swaps.`);
}

// Add event listener for Selection Sort
btn3.addEventListener('click', () => {
    selection_sort();
});

// Event listener for the Reset button
document.getElementById('reset').addEventListener('click', resetPage);
