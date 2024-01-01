document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.Display');
    let currentInput = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function clearCalculator() {
        currentInput = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }

    function inputDigit(digit) {
        if (waitingForSecondOperand) {
            currentInput = digit;
            waitingForSecondOperand = false;
        } else {
            currentInput = currentInput === '0' ? digit : currentInput + digit;
        }
        updateDisplay();
    }

    function inputDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            currentInput = String(result);
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    const performCalculation = {
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
        'x': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '÷': (firstOperand, secondOperand) => firstOperand / secondOperand,
        '%': (firstOperand, secondOperand) => firstOperand % secondOperand,
        '=': (firstOperand, secondOperand) => secondOperand,
    };

    document.querySelector('#clear').addEventListener('click', clearCalculator);
    document.querySelector('#zero').addEventListener('click', () => inputDigit('0'));
    document.querySelector('#one').addEventListener('click', () => inputDigit('1'));
    document.querySelector('#two').addEventListener('click', () => inputDigit('2'));
    document.querySelector('#three').addEventListener('click', () => inputDigit('3'));
    document.querySelector('#four').addEventListener('click', () => inputDigit('4'));
    document.querySelector('#five').addEventListener('click', () => inputDigit('5'));
    document.querySelector('#six').addEventListener('click', () => inputDigit('6'));
    document.querySelector('#seven').addEventListener('click', () => inputDigit('7'));
    document.querySelector('#eight').addEventListener('click', () => inputDigit('8'));
    document.querySelector('#nine').addEventListener('click', () => inputDigit('9'));
    document.querySelector('#decimal').addEventListener('click', inputDecimal);

    document.querySelector('#add').addEventListener('click', () => handleOperator('+'));
    document.querySelector('#subtract').addEventListener('click', () => handleOperator('-'));
    document.querySelector('#multiply').addEventListener('click', () => handleOperator('x'));
    document.querySelector('#divide').addEventListener('click', () => handleOperator('÷'));
    document.querySelector('#percent').addEventListener('click', () => handleOperator('%'));

    document.querySelector('#equals').addEventListener('click', () => {
        if (operator !== null) {
            const inputValue = parseFloat(currentInput);
            currentInput = String(performCalculation[operator](firstOperand, inputValue));
            operator = null;
            firstOperand = null;
            updateDisplay();
        }
    });

    document.querySelector('#plus-minus').addEventListener('click', () => {
        currentInput = String(-parseFloat(currentInput));
        updateDisplay();
    });
});
