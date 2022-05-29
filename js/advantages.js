const myAdvantages = [
  '큰 그림을 보는 것을 잘합니다.',
  '분석적인 시야를 갖고 있습니다.',
  '토론과 논쟁을 즐깁니다',
];

const homeDesc = document.querySelector('.home__description');

function setMyAdvan() {
  const advantage =
    myAdvantages[Math.floor(Math.random() * myAdvantages.length)];
  homeDesc.innerText = `장점들 : ${advantage}`;
}

setMyAdvan();

homeDesc.addEventListener('click', (event) => {
  setMyAdvan();
});
