const greetingMessages = [
  '안녕하세요!',
  '환영합니다!',
  'Welcome back!',
  'Hello!',
  "How's it going?",
  "What's up?",
  'Good to see you again.',
  "It's been a while.",
  '어서오세요!',
  '오랜만입니다.',
];

const greeting = document.querySelector('#home .home__title .greeting');

function paintGreeting() {
  const greetingMessage =
    greetingMessages[Math.floor(Math.random() * greetingMessages.length)];
  greeting.innerText = greetingMessage;
}

paintGreeting();
