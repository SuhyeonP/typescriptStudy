var body = document.body;
var candidate;
var array = [];
function chooseNumber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array = [];
    for (var i = 0; i < 4; i += 1) {
        var chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
}
chooseNumber();
var result = document.createElement('h1');
result.textContent = '숫자야구~';
body.append(result);
var form = document.createElement('form');
body.append(form);
var input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;
var button = document.createElement('button');
button.textContent = 'input~';
form.append(button);
var wrongCount = 0;
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var answer = input.value;
    if (answer === array.join('')) {
        result.textContent = 'homeRun!!';
        input.value = '';
        input.focus();
        chooseNumber();
        wrongCount = 0;
        console.log(array);
    }
    else {
        var answerArray = answer.split('');
        var strike = 0;
        var ball = 0;
        wrongCount += 1;
        if (wrongCount > 9) {
            alert("10\uBC88 \uD2C0\uB838\uC2B5\uB2C8\uB2E4. \uB2F5\uC740" + array.join(''));
            var doornot = confirm('게임을 계속 진행하시겠습니까?');
            result.textContent = "\uB2F5\uC740 " + array.join('') + "\uC600\uC2B5\uB2C8\uB2E4.";
            if (doornot) {
                input.value = '';
                input.focus();
                chooseNumber();
                wrongCount = 0;
            }
            else {
                result.textContent = "\uAC8C\uC784\uC744 \uC9C4\uD589\uD558\uACE0\uC2F6\uB2E4\uBA74 \uC0C8\uB85C\uACE0\uCE68\uC744 \uD574\uC8FC\uC138\uC694";
            }
        }
        else {
            for (var i = 0; i <= 3; i += 1) {
                if (Number(answerArray[i]) === array[i]) {
                    strike += 1;
                }
                else if (array.indexOf(Number(answerArray[i])) > -1) {
                    ball += 1;
                }
            }
            result.textContent = "\uC2A4\uD2B8\uB77C\uC774\uD06C: " + strike + ", \uBCFC:" + ball + " \uC785\uB2C8\uB2E4. \uD604\uC7AC " + (10 - wrongCount) + "\uBC88 \uB0A8\uC558\uC2B5\uB2C8\uB2E4.";
            input.value = '';
            input.focus();
        }
    }
});
