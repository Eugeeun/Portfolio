const greetingMessages = [
  'Hello!',
  'Hi.',
  'Welcome back!',
  'Hey.',
  "How's it going?",
  "What's up?",
  'Good to see you again.',
  "It's been a while.",
];

const greeting = document.querySelector('#home .home__title .greeting');

function paintGreeting() {
  const greetingMessage =
    greetingMessages[Math.floor(Math.random() * greetingMessages.length)];
  greeting.innerText = greetingMessage;
}

paintGreeting();
