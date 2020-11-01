"use strict";
var opponent = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var me = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var Hero = /** @class */ (function () {
    function Hero(mine) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.mine = mine;
        this.field = true;
    }
    return Hero;
}());
var Sub = /** @class */ (function () {
    function Sub(mine) {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
        this.mine = mine;
        this.field = false;
    }
    return Sub;
}());
var isSub = function (data) {
    if (data.cost) { //쫄병은 cost가 있어서 쫄병인걸 알수있음(영웅은 cost 가 없음)
        return true;
    }
    return false; //data에 cost가 없는경우 그럼 hero 라는것
};
var turnButton = document.getElementById('turn-btn');
var turn = true; // true면 내턴, false면 상대 턴
function initiate() {
    [opponent, me].forEach(function (item) {
        item.deckData = [];
        item.heroData = null;
        item.fieldData = [];
        item.chosenCard = null;
        item.chosenCardData = null;
    });
    createDeck({ mine: false, count: 5 }); // 상대 덱 생성 쫄병 5개씩생성
    createDeck({ mine: true, count: 5 }); // 내 덱 생성 쫄병 5개씩생성
    createHero({ mine: false }); // 상대 영웅 그리기
    createHero({ mine: true }); // 내 영웅 그리기
    redrawScreen({ mine: false }); // 상대화면
    redrawScreen({ mine: true }); // 내화면
}
initiate(); // 진입점
function createDeck(_a) {
    var mine = _a.mine, count = _a.count;
    var player = mine ? me : opponent;
    for (var i = 0; i < count; i++) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
}
function createHero(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    player.heroData = new Hero(mine); //영웅정보 만들어줌
    connectCardDOM(player.heroData, player.hero, true);
}
function redrawScreen(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    redrawField(player);
    redrawDeck(player);
    redrawHero(player);
}
function redrawField(target) {
    target.field.innerHTML = '';
    target.fieldData.forEach(function (data) {
        connectCardDOM(data, target.field);
    });
}
function redrawDeck(target) {
    target.deck.innerHTML = '';
    target.deckData.forEach(function (data) {
        connectCardDOM(data, target.deck);
    });
}
function redrawHero(target) {
    if (!target.heroData) {
        console.error(target);
        throw new Error('heroData가 없습니다');
    }
    target.hero.innerHTML = '';
    connectCardDOM(target.heroData, target.hero, true);
}
function connectCardDOM(data, DOM, hero) {
    var cardEl = document.querySelector('.card-hidden .card').cloneNode(true); //clonenode가 htmlelement라서 강제로 바꿔주고
    cardEl.querySelector('.card-att').textContent = String(data.att); //느낌표붙이는 이유는 문자열도 인식못하기때문에 내가 확신줄려고 ! 씀
    cardEl.querySelector('.card-hp').textContent = String(data.hp);
    if (hero) { //영웅카드일 경우 데이터를 화면에 크리는 메서드
        cardEl.querySelector('.card-cost').style.display = 'none';
        var name_1 = document.createElement('div');
        name_1.textContent = '영웅';
        cardEl.appendChild(name_1);
    }
    else { //쫄병카드 그리는거
        cardEl.querySelector('.card-cost').textContent = String(data.cost);
    }
    cardEl.addEventListener('click', function () {
        if (isSub(data) && data.mine === turn && !data.field) { // 자신의 덱에 있는 쫄병이고,내 쫄병카드이고, 이미뽑은거는 다시못뽑고 상대쫄병은 못뽑게
            if (!deckToField({ data: data })) { // 쫄병을 하나 뽑았으면 deckTofield함수는 뽑은 쫄명 빈쫄병자리에 추가하게해주는 함수
                createDeck({ mine: turn, count: 1 }); //덱에 새로운 쫄병 추가 항상 5마리 유지되게
            }
        }
        turnAction({ cardEl: cardEl, data: data });
    }); //이거<click>이렇게 해도되는데 알아서 click인거 알아먹어서 굳이 안해도됨
    DOM.appendChild(cardEl);
}
function deckToField(_a) {
    var data = _a.data;
    var target = turn ? me : opponent; // 조건 ? 참 : 거짓;
    var currentCost = Number(target.cost.textContent);
    if (currentCost < data.cost) { // 코스트가 모자르면 종료
        alert('코스트가 모자릅니다.');
        return true;
    }
    data.field = true; //비용 안모자란경우
    var idx = target.deckData.indexOf(data); //필드로 옮겨주느거
    target.deckData.splice(idx, 1); //덱에서 빼는거
    target.fieldData.push(data); //뺀카드 옮겨주는거
    redrawField(target);
    redrawDeck(target);
    target.cost.textContent = String(currentCost - data.cost); //쫄병뽑는데 비용썻으니까 그 비용빼주기
    return false; //비용 다 안썻으면 return false
}
function turnAction(_a) {
    var cardEl = _a.cardEl, data = _a.data;
    var team = turn ? me : opponent; // 지금 턴의 편
    var enemy = turn ? opponent : me; // 그 상대 편
    if (cardEl.classList.contains('card-turnover')) { // 턴이 끝난 카드면 아무일도 일어나지 않음
        return;
    }
    var enemyCard = turn ? !data.mine : data.mine;
    if (enemyCard && team.chosenCardData) { // 선택한 카드가 있고 적군 카드를 클릭한 경우 공격 수행
        data.hp = data.hp - team.chosenCardData.att;
        if (data.hp <= 0) { // 카드가 죽었을 때
            if (isSub(data)) { // 쫄병이 죽었을 때
                var index = enemy.fieldData.indexOf(data);
                enemy.fieldData.splice(index, 1);
            }
            else { // 영웅이 죽었을 때
                alert('승리하셨습니다!');
                initiate();
            }
        }
        redrawScreen({ mine: !turn }); // 상대 화면 다시 그리기
        if (team.chosenCard) { // 클릭 해제 후 카드 행동 종료
            team.chosenCard.classList.remove('card-selected');
            team.chosenCard.classList.add('card-turnover');
        }
        team.chosenCard = null;
        team.chosenCardData = null;
        return;
    }
    else if (enemyCard) { // 상대 카드면
        return;
    }
    if (data.field) { // 카드가 필드에 있으면
        //  영웅 부모와 필드카드의 부모가 다르기때문에 document에서 모든 .card를 검색한다
        // 카드.parentNode.querySelectorAll('.card').forEach(function (card) {
        document.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('card-selected');
        });
        console.log(cardEl);
        cardEl.classList.add('card-selected');
        team.chosenCard = cardEl;
        team.chosenCardData = data;
    }
}
turnButton.addEventListener('click', function () {
    var target = turn ? me : opponent;
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    redrawField(target);
    redrawHero(target);
    turn = !turn; // 턴을 넘기는 코드
    if (turn) {
        me.cost.textContent = '10';
    }
    else {
        opponent.cost.textContent = '10';
    }
});
