const $wrapper = document.querySelector("#wrapper");

const total = 12; // 12개의 랜덤한 카드
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
// 앞면 색상 6, 뒷면 남색으로 통일
let colorCopy = colors.concat(colors);
// concat = 원본 수정 없이 새로운 배열 생성
// 6개의 color 배열을 곱하기 2 해서 2쌍으로 만들어줌
let shuffled = [];

// 피셔-예이츠 셔플(랜덤 정렬 방법)
const shuffle = () => {
  for(let i = 0; colorCopy.length > 0; i++){
    const randomIndex = Math.floor(Math.random() * colorCopy.length); // 0-11까지 정수
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
};

const createCard = (i) => { // 랜덤 색상 카드 12장 만들기 
  const card = document.createElement("div");
  card.className = "card";
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";
  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  const cardBack = document.createElement("div");
  cardBack.className = "card-back";
  cardBack.style.backgroundColor = shuffled[i]; // 뒷면 랜덤색상
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  // $wrapper.appendChild(card);
  return card;
};

const onClickCard = (e) => {
  console.log(e.target);
};

const playGame = () => {
  shuffle(); // 카드 12장을 랜덤으로 섞음
  for(let i = 0; i < total; i++){ // 12번 반복
    const card = createCard(i); // HTML 태그 생성
    $wrapper.appendChild(card);
    card.addEventListener("click", onClickCard);
  }
  
  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("flipped");
    }, 1000 + (100 * index)); // 1초, 1.1초, 1.2초 ... 
  });

  document.querySelectorAll(".card").forEach((card) => {
    setTimeout(() => {
      card.classList.remove("flipped");
    }, 5000);
  });
};

playGame();