const horizontal: number = 4;
const vertical: number = 3;
const colors: string[] = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];

let colorCandidate: string[] = colors.slice();
let color: string[] = [];
let clickFlag: boolean = true;//카드 눌럿는지 여부
let clickCard: HTMLDivElement[] = [];
let completedCard: HTMLDivElement[] = [];
let startTime: Date | null = null;

function shuffle(): void {//card color shuffle function  함수 리턴이 없으면 void로 해준다.
    for (let i: number = 0; colorCandidate.length > 0; i += 1) {//shuffle algorithm
        color = color.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
    }
}

function setCard(horizontal: number, vertical: number) {
    clickFlag = false;
    for (let i: number = 0; i < horizontal * vertical; i++) {
        const card: HTMLDivElement = document.createElement('div');
        card.className = 'card';
        const cardInner: HTMLDivElement = document.createElement('div');
        cardInner.className = 'card-inner';
        const cardFront: HTMLDivElement = document.createElement('div');
        cardFront.className = 'card-front';
        const cardBack: HTMLDivElement = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);//화면에 그려주는 작업

        card.addEventListener('click', function (this: HTMLDivElement) {
            if (clickFlag && !completedCard.includes(this)) {//클릭할수있고 짝을맞춘카드가 아니면
                this.classList.toggle('flipped');
                clickCard.push(this);
                if (clickCard.length === 2) {//2장의 카드를 뒤집은거!
                    const firstBackground: string = (clickCard[0].querySelector('.card-back') as HTMLDivElement).style.backgroundColor;
                    const secondBackground: string = (clickCard[1].querySelector('.card-back') as HTMLDivElement).style.backgroundColor;
                    if (firstBackground === secondBackground) {
                        completedCard.push(clickCard[0]);
                        completedCard.push(clickCard[1]);
                        clickCard = [];//2장의 카드색을 짝맞춘카드배열에 넣었으니 초기화
                        if (completedCard.length === horizontal * vertical) {//짝맞춘배열이 카드수와 같을때 끝나는거
                            const endTime: number = new Date().getTime();
                            alert(`축하합니다! ${(endTime - startTime!.getTime()) / 1000}초 걸렸습니다!`);
                            (document.querySelector('#wrapper') as HTMLDivElement).innerHTML = '';
                            colorCandidate = colors.slice();
                            color = [];
                            completedCard = [];
                            startTime = null;//성공해서 초기화과정 그리고 위에서 starttime data|null한 이유
                            shuffle();
                            setCard(horizontal, vertical);
                        }
                    } else {//2장의 카드색이 일치하지않을때
                        clickFlag = false;//누른 카드니까
                        setTimeout(() => {
                            clickCard[0].classList.remove('flipped');//클래스의 flippped클래스이름을 지움
                            clickCard[1].classList.remove('flipped');
                            clickFlag = true;//다시 카드 안누른 상태로해줌줌                            clickCard = [];
                        }, 1000);//1초뒤에 다시 뒤집히게
                    }
                }
            }
        });

        (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
    }

    Array.prototype.forEach.call<HTMLCollectionOf<Element>, [(card: HTMLDivElement, index: number) => void], void>(document.getElementsByClassName('card'), (card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000 + 100 * index);
    });//시작시 카드 색 보여주는거 순서대로 보여주기 위해서 1000+100*index를 해준것

    setTimeout(() => {
        Array.prototype.forEach.call<HTMLCollectionOf<Element>, [(card: HTMLDivElement, index: number) => void], void>(document.getElementsByClassName('card'), (card, index) => {
            card.classList.remove('flipped');
        });
        clickFlag = true;
        startTime = new Date();
    }, 5000);//
}

shuffle();
setCard(horizontal, vertical);