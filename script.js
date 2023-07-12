const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('button'));
let firstNumber = '';
let operator = '';
let secondNumber = '';
let shouldResetScreen = false;

buttons.map(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerText === 'C') {
            resetCalculator();
            updateDisplay();
            return;
        }

        if (['+', '-', '*', '/'].includes(e.target.innerText)) {
            if (firstNumber === '') return;
            operator = e.target.innerText;
            shouldResetScreen = true;
            return;
        }

        if (e.target.innerText === '=') {
            if (firstNumber === '' || operator === '') return;
            calculate();
            updateDisplay();
            return;
        }

        if (e.target.innerText === '.') {
            if (operator === '' && firstNumber.includes('.')) return;
            if (operator !== '' && secondNumber.includes('.')) return;
        }

        if (shouldResetScreen) {
            display.value = '';
            shouldResetScreen = false;
        }

        display.value += e.target.innerText;
        if (operator === '') {
            firstNumber += e.target.innerText;
        } else {
            secondNumber += e.target.innerText;
        }
    });
});

function updateDisplay() {
    display.value = firstNumber + operator + secondNumber;
}

function resetCalculator() {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    shouldResetScreen = false;
}

function calculate() {
    let result;
    switch (operator) {
        case '+':
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case '-':
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case '*':
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case '/':
            if (secondNumber === '0') {
                alert('Error: Division by zero');
                resetCalculator();
                return;
            }
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
    }
    firstNumber = result.toString();
    operator = '';
    secondNumber = '';
}
