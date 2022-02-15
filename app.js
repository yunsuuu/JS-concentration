const $wrapper = document.querySelector("#wrapper");

const total = 12; // 12개의 랜덤한 카드
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
// 앞면 색상 6, 뒷면 남색으로 통일
let colorCopy = colors.concat(colors);
// concat = 원본 수정 없이 새로운 배열 생성
// 6개의 color 배열을 곱하기 2 해서 2쌍으로 만들어줌
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;

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
  cardBack.style.backgroundColor = shuffled[i];

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
};

const onClickCard = (e) => {
  const card = e.target.parentElement.parentElement; 
  // function 함수로 바꾸고 this 사용 가능 -> this = card
  if(!clickable || completed.includes(card) || clicked[0] === card){
    return; // 함수종료
  }
  card.classList.toggle("flipped"); // flipped 적용 = 앞면(색상 보이는)
  clicked.push(card);
  if(clicked.length !== 2){
    return; // 함수종료
  }
  // 뒤집은 카드의 색상이 같은가
  const firstBackColor = clicked[0].querySelector(".card-back").style.backgroundColor;
  const secondBackColor = clicked[1].querySelector(".card-back").style.backgroundColor;
  if(firstBackColor === secondBackColor){ // 선택한 두 카드가 같은 카드면
    // completed = completed.concat(clicked);
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = []; // 초기화
    if(completed.length !== total){ // 완료전
      return; // 함수종료
    } else {
      setTimeout(() => {
        alert("축하합니다!");
        resetGame();
      }, 500);
      return; // 함수종료
    }
  } else {
    // 카드 다시 뒤집기
    setTimeout(() => {
      clicked[0].classList.remove("flipped");
      clicked[1].classList.remove("flipped");
      clicked = []; // 초기화
    }, 500);
  }
};

const playGame = () => {
  clickable = false;
  shuffle(); // 카드 12장을 랜덤으로 섞음
  for(let i = 0; i < total; i++){ // 12번 반복
    const card = createCard(i); // <div class="card"></div>
    card.addEventListener("click", onClickCard);
    $wrapper.appendChild(card);
  }
  
  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      clickable = false;
      card.classList.add("flipped");
    }, 1000 + (100 * index)); // 1초, 1.1초, 1.2초 ... 
  });
  
  setTimeout(() => { // 카드 감추기
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped");
    })
    clickable = true; // 클릭가능하게
  }, 5000);
};
playGame(); // 함수를 호출
 
const resetGame = () => { // 함수를 호출하지 않으면 호출스택에 들어가지 않음
  // resetGame은 함수를 선언한 것!
  $wrapper.innerHTML = "";
  colorCopy = colors.concat(colors);
  shuffled = []; // 초기화
  completed = []; // 초기화
  playGame();
};