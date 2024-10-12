const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;
let resultDisplayed = false

document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => {
    if (resultDisplayed) {
      currentInput = '';  
      resultDisplayed = false;
    }
    currentInput += button.textContent;
    display.textContent = currentInput;
  });
});

const setOperator = (op) => {
  if (currentInput === '') return;  
  if (previousInput !== '') {
    currentInput = operate(previousInput, currentInput, operator);
    display.textContent = currentInput;
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';  
};

document.getElementById('add').addEventListener('click', () => setOperator('+'));
document.getElementById('subtract').addEventListener('click', () => setOperator('-'));
document.getElementById('multiply').addEventListener('click', () => setOperator('*'));
document.getElementById('divide').addEventListener('click', () => setOperator('/'));

document.getElementById('equals').addEventListener('click', () => {
  if (operator !== null && currentInput !== '' && previousInput !== '') {
    currentInput = operate(previousInput, currentInput, operator);
    display.textContent = currentInput;
    operator = null;  
    resultDisplayed = true;  
    previousInput = '';
  }
});

document.getElementById('clear').addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  operator = null;
  display.textContent = '0';
  resultDisplayed = false;
});

document.getElementById('decimal').addEventListener('click', () => {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    display.textContent = currentInput;
  }
});

function operate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+':
      return (a + b).toString();
    case '-':
      return (a - b).toString();
    case '*':
      return (a * b).toString();
    case '/':
      return b !== 0 ? (a / b).toString() : 'Error'; 
    default:
      return '';
  }
}