let firstNumber=Math.ceil(Math.random()*9);
let secondNumber=Math.ceil(Math.random()*9);
let result=firstNumber*secondNumber;

const word=document.createElement('div');
word.textContent=`${firstNumber} 곱하기 ${secondNumber}`;
document.body.append(word);

const form=document.createElement('form');
document.body.append(form);

const input=document.createElement('input');
input.type='number';
form.append(input);

const button=document.createElement('button');
button.textContent='input!'
form.append(button);

const resultDiv=document.createElement('div');
document.body.append(resultDiv)

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(result===Number(input.value)){
        resultDiv.textContent='Correct';
        firstNumber=Math.ceil(Math.random()*9)
        secondNumber=Math.ceil(Math.random()*9)
        result=firstNumber*secondNumber;
        word.textContent=`${firstNumber} 곱하기 ${secondNumber} is?`
        input.value='';
        input.focus();
    }else{
        resultDiv.textContent='Wrong ~~'
        input.value='';
        input.focus();
    }
})