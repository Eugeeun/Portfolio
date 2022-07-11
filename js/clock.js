const clock = document.querySelector('.clock'); // html에서 class="clock"을 선택!
// console.log(clock);

function getClock() {
  const date = new Date(); // Date라는 클래스 생성! 자바 때 배운거랑 똑같음
  const hours = String(date.getHours()).padStart(2, '0'); // 1시면 표시를 01시 이렇게 하기 위해 한 것임
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  clock.innerText = `${hours}:${minutes}:${seconds}`; // .clock의 텍스트로 시간을 넣어줌
}

getClock(); // 처음 페이지가 로딩 되었을 때 한 번 갱신해주고
setInterval(getClock, 1000); // 1초 마다 시간을 갱신!
// setInterval(getClock, 1000); => 1000ms 마다 getClock을 실행시켜죠!!
