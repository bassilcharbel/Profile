const display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendCharacter(char) {
    if (char === '.' && currentInput.includes('.')) return;
    currentInput += char;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    if (operator === '' || previousInput === '' || currentInput === '') return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        currentInput = 'Error';
        updateDisplay();
        currentInput = ''; // Reset for next input
        operator = '';
        previousInput = '';
        return;
    }

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error';
                updateDisplay();
                currentInput = ''; // Reset for next input
                operator = '';
                previousInput = '';
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

// Modify appendCharacter to handle operators
const originalAppendCharacter = appendCharacter;
appendCharacter = function(char) {
    if (['+', '-', '*', '/'].includes(char)) {
        if (currentInput === '' && previousInput === '') return; // No number to operate on
        if (currentInput === '' && previousInput !== '' && operator !== '') { // Change operator
            operator = char;
            return;
        }
        if (previousInput !== '') { // If there's a previous input, calculate first
            calculateResult();
            // If calculateResult resulted in an error, currentInput will be 'Error'
            // We need to reset it before proceeding or it will become part of previousInput
            if (display.value === 'Error') {
                 currentInput = '';
            }
        }
        operator = char;
        previousInput = currentInput;
        currentInput = '';
    } else {
        originalAppendCharacter(char);
    }
}

// Initialize display
updateDisplay();
