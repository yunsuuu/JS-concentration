const $wrapper = document.querySelector("#wrapper");
const total = 12;
const colors = ['red', 'orange', 'pink', 'green', 'yellow', 'white'];
let colorCopy = colors.concat(colors);
let shuffled = []; // 랜덤으로 섞인 카드 담는 배열
let clicked = []; // 클릭한 카드 담는 배열
let completed = []; // 색상이 같은 카드를 차례로 담는 배열
let clickable = false;

// 랜덤의 카드 12개를 shuffle 배열 안으로 push 
const shuffle = () => {
  for(let i = 0; colorCopy.length > 0; i++){
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    const spliced = colorCopy.splice(randomIndex, 1);
    shuffled.push(spliced[0]);
  }
};

const createCard = (i) => {
  // 함수 안에서 새로운 객체들을 만든 후 마지막에 return 객체 -> 팩토리 함수로 볼 수 있음
  const card = document.createElement("div");
  card.className = "card";
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";
  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  const cardBack = document.createElement("div");
  cardBack.className = "card-back";
  cardBack.style.backgroundColor = shuffled[i];

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card; // <div class="card"></div>
};

const onClickCard = (e) => {
  const card = e.target.parentNode.parentNode;
  if(!clickable || completed.includes(card) || clicked[0] === card){
    return;
  }
  card.classList.toggle("flipped");
  clicked.push(card);
  if(clicked.length !== 2){
    return;
  } else { // 선택한 카드색이 같을 때
    const firstBackColor = clicked[0].querySelector(".card-back").style.backgroundColor;
    const secondBackColor = clicked[1].querySelector(".card-back").style.backgroundColor;
    if(firstBackColor === secondBackColor){
      completed.push(clicked[0]);
      completed.push(clicked[1]);
      clicked = [];
      if(completed.length !== total){
        return;
      } else {
        setTimeout(() => {
          alert("축하합니다!");
          resetGame();
        }, 500);
        return; // 게임종료
      }
    } else {
      clickable = false;
      setTimeout(() => {
        clicked[0].classList.remove("flipped");
        clicked[1].classList.remove("flipped");
        clicked = [];
        clickable = true;
      }, 500);
    }
  }
};

const playGame = () => {
  clickable = false;
  shuffle();
  // createCard 함수를 12번 반복(카드 12장 생성)
  for(let i = 0; i < total; i++){ // total = 12
    const card = createCard(i);
    card.addEventListener("click", onClickCard);
    $wrapper.appendChild(card);
  }

  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      clickable = false;
      card.classList.add("flipped");
    }, 1000 + (100 * index)); // 1초, 1.1초, 1.2초 ...
  });

  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped");
      clickable = true;
    })
  }, 5000);
};
playGame();

const resetGame = () => {
  $wrapper.innerHTML = "";
  colorCopy = colors.concat(colors);
  shuffled = [];
  completed = [];
  playGame();
};