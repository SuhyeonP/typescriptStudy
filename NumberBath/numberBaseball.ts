const {body}=document;
let candidate:number[];
let array:number[]=[];

function chooseNumber(){
    candidate=[1,2,3,4,5,6,7,8,9];
    array=[];
    for(let i:number=0;i<4;i+=1){
        const chosen=candidate.splice(Math.floor(Math.random()*(9-i)),1)[0]
        array.push(chosen)
    }
}

chooseNumber();

const result=document.createElement('h1');
result.textContent='숫자야구~'
body.append(result);

const form=document.createElement('form');
body.append(form)

const input=document.createElement('input');
form.append(input);
input.type='text'
input.maxLength=4;
const button=document.createElement('button');
button.textContent='input~'
form.append(button)

let wrongCount=0;
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const answer=input.value;
    if(answer===array.join('')){
        result.textContent='homeRun!!'
        input.value=''
        input.focus()
        chooseNumber();
        wrongCount=0;
        console.log(array)
    }else{
        const answerArray=answer.split('');
        let strike=0;
        let ball=0;
        wrongCount+=1;
        if(wrongCount>9){
            alert(`10번 틀렸습니다. 답은${array.join('')}`)
            let doornot:boolean=confirm('게임을 계속 진행하시겠습니까?')
            result.textContent=`답은 ${array.join('')}였습니다.`
            if(doornot){
                input.value=''
                input.focus()
                chooseNumber();
                wrongCount=0;
            }else {
                result.textContent=`게임을 진행하고싶다면 새로고침을 해주세요`
            }
        }else{
            for(let i:number=0;i<=3;i+=1){
                if(Number(answerArray[i])===array[i]){
                    strike+=1;
                }else if(array.indexOf(Number(answerArray[i]))>-1){
                    ball+=1
                }
            }
            result.textContent=`스트라이크: ${strike}, 볼:${ball} 입니다. 현재 ${10-wrongCount}번 남았습니다.`
            input.value=''
            input.focus()
        }
    }
})