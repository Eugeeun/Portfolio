'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  // console.log(`navbarHeight: ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', event => {
  const target = event.target;
  const link = target.dataset.link;
  if (!link) return;
  // 링크가 없다면 early return
  else console.log(event.target.dataset.link); // 그냥 찍어보는 거임

  scrollIntoView(link);
});

// Scrolling to contact when click 'contact me'
const contact = document.querySelector('.home__contact');
contact.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  // console.log(1 - window.scrollY / homeHeight); // 알고리즘을 만들 때 내가 생각한 것이 맞는지 증명하면서 만들기
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const toTopBtn = document.querySelector('.toTopBtn');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) toTopBtn.classList.add('visible');
  else toTopBtn.classList.remove('visible');
});

// when button's clicked locate to top
toTopBtn.addEventListener('click', () => {
  scrollIntoView('#home');
});

// do filtering when btn is clicked
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', event => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  // 클릭한 곳에 데이터가 들어있으면 그것을 쓰고 없으면 부모노드로 가서 가져옴

  if (!filter) return;

  projectContainer.classList.add('ani-out');
  setTimeout(() => {
    projects.forEach(project => {
      // console.log(project.dataset.type);
      if (filter === 'all' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    // 필터링을 수행하고 이제 다시 나타나야 됨
    projectContainer.classList.remove('ani-out');
    // 제거해줌
    // 그래서 필터링이 안된 채로 사라지고 필터링이 된 채로 나타남!
  }, 300); // 이 코드를 0.3초 후에 실행해줘
  // console.log(filter);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
