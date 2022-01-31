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

  // console.log(target);
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
  console.log(navbarMenu.classList);
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

  // Remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = // target에는 항상 버튼만 할당됨
    event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add('selected');

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

// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
]; // 일단 문자열로 모두 저장
const sections = sectionIds.map(id => document.querySelector(id));
// 모든 요소들을 sections 라는 배열에 할당

const navItems = sectionIds.map(id =>
  document.querySelector(`[data-link="${id}"]`)
);
// 동일한 내비게이션 메뉴아이템 요소들을 배열로 할당
console.log(sections);
console.log(navItems);

let selectedNavIdx = 0; // 선택된 인덱스
let selectedNavItem = navItems[0]; // 선택된 아이템
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active'); // 이전을 지워주고
  selectedNavItem = selected; // 새롭게 할당하고
  selectedNavItem.classList.add('active'); // 추가해줌
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    // 여기서 navbar__menu를 활성화 시켜주면 됨
    // console.log(entry.target);
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // console.log(index, entry.target.id);

      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIdx = index + 1;
      } else {
        selectedNavIdx = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIdx = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIdx = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIdx]);
});
