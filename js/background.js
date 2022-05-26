const backgroundImgCnt = 5;
const chosenImg = Math.floor(Math.random() * backgroundImgCnt) + 1;
console.log(chosenImg);

document.getElementById(
  'home'
).style.backgroundImage = `url(../imgs/backgrounds/background${chosenImg}.jpg)`;
