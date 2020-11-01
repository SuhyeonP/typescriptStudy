var firstNumber = Math.ceil(Math.random() * 9);
var secondNumber = Math.ceil(Math.random() * 9);
var result = firstNumber * secondNumber;
var word = document.createElement('div');
word.textContent = firstNumber + " \uACF1\uD558\uAE30 " + secondNumber;
document.body.append(word);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
input.type = 'number';
form.append(input);
var button = document.createElement('button');
button.textContent = 'input!';
form.append(button);
var resultDiv = document.createElement('div');
document.body.append(resultDiv);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (result === Number(input.value)) {
        resultDiv.textContent = 'Correct';
        firstNumber = Math.ceil(Math.random() * 9);
        secondNumber = Math.ceil(Math.random() * 9);
        result = firstNumber * secondNumber;
        word.textContent = firstNumber + " \uACF1\uD558\uAE30 " + secondNumber + " is?";
        input.value = '';
        input.focus();
    }
    else {
        resultDiv.textContent = 'Wrong ~~';
        input.value = '';
        input.focus();
    }
});
