const operandButtons = document.querySelectorAll('button.number');
const clearButton = document.getElementById('clear');
const display = document.querySelector('.display');
const percent = document.getElementById('percent');
const plusMinus = document.getElementById('sign');

let currentValue = 0; 
let operationActive = false;
let resultActive = false;
let shouldClearDisplay = false;

function percentage() {
    currentValue = currentValue * 0.01;
    updateDisplay();
}

function clear() {
    currentValue = 0;
    operationActive = false;
    resultActive = false;
    shouldClearDisplay = true;
    updateDisplay();
}

function changeSign() {
    currentValue *= -1;
    updateDisplay();
}

function insertDigit(button) {
    const value = button.textContent;

    if (!operationActive || shouldClearDisplay) {
        currentValue = parseFloat(value);
        operationActive = true;
        shouldClearDisplay = false;
    } else {
        currentValue = parseFloat(currentValue.toString() + value);
    }
    updateDisplay();
}

function updateDisplay() {
    const displayValue = parseFloat(currentValue.toPrecision(9)).toString();
    if (displayValue.length <= 9) {
        display.textContent = displayValue;
    } else {
        display.textContent = parseFloat(displayValue).toExponential(2);
    }
}

let currentOperator = null;
let prevValue = null;

function performOperation(operator) {
    if (prevValue === null) {
        prevValue = currentValue;
    } else if (currentOperator !== null) {
        switch (currentOperator) {
            case '+':
                prevValue += currentValue;
                break;
            case '-':
                prevValue -= currentValue;
                break;
            case 'x':
                prevValue *= currentValue;
                break;
            case '/':
                if (currentValue !== 0) {
                    prevValue /= currentValue;
                } else {
                    currentValue = 'LMAOOOO';
                    updateDisplay();
                    return;
                }
                break;
        }
    }
    currentOperator = operator;
    operationActive = false;
    shouldClearDisplay = true;
}

function calculateResult() {
    if (currentOperator !== null) {
        performOperation(currentOperator);
        currentOperator = null;
        currentValue = prevValue;
        prevValue = null;
        updateDisplay();
        resultActive = true;
    }
}

document.getElementById('equal').addEventListener('click', calculateResult);
document.getElementById('sum').addEventListener('click', () => performOperation('+'));
document.getElementById('subtract').addEventListener('click', () => performOperation('-'));
document.getElementById('multiply').addEventListener('click', () => performOperation('x'));
document.getElementById('divide').addEventListener('click', () => performOperation('/'));

operandButtons.forEach(button => {
    button.addEventListener('click', () => insertDigit(button))
});

clearButton.addEventListener('click', clear);
plusMinus.addEventListener('click', changeSign);
percent.addEventListener('click', percentage);
