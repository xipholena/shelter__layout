'use strict';

/* eslint-env jquery */

const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');

const transformHandler = () => {
  burger.classList.toggle('burger--active');
  navbar.classList.toggle('page__navbar-upper--active');
};

burger.addEventListener('click', transformHandler);

const clickOnItemHandler = (e) => {
  const item = e.target.closest('.navbar__item');

  if (!item || !navbar.contains(item)) {
    return;
  }
  navbar.classList.remove('page__navbar-upper--active');
  burger.classList.remove('burger--active');
};

navbar.addEventListener('click', clickOnItemHandler);

$(document).ready(function(){
  $('.slider__wrapper').slick({
    prevArrow: '.slider__control-prev',
    nextArrow: '.slider__control-next',
    slidesToShow: 3,
    infinite: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200, 
        settings: {
          slidesToShow: 2,
        }
      }, 
      {
        breakpoint: 700, 
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });
});
const buttonPositionHandler = () => {
  const getScrollbarWidth = () => {
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);

    const scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
  };
  const scrollbarWidth = getScrollbarWidth();
  const container = document.querySelector('.container');
  const buttonTop = document.querySelector('.button-top');

  buttonTop.style.right = `${(
    window.innerWidth - container.clientWidth
  ) / 2 - scrollbarWidth}px`;
};

buttonPositionHandler();

window.addEventListener('resize', buttonPositionHandler);

const scrollFromTop = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const buttonTop = document.querySelector('.button-top');

  if (scrollTop > window.innerHeight / 2) {
    buttonTop.style.opacity = 1;
  } else {
    buttonTop.style.opacity = 0;
  }
};

window.addEventListener('scroll', scrollFromTop);

const calculateNavbarPadding = () => {
  if (window.innerWidth < 1024) {
    const navbar = document.querySelector('.navbar');
    const container = document.querySelector('.container');
    navbar.style.paddingLeft = `${(
      window.innerWidth - container.clientWidth
    ) / 2}px`;
  }
  
};

calculateNavbarPadding();

window.addEventListener('resize', calculateNavbarPadding);

const setNavbarTopPosition = () => {
  const navbarList = document.querySelector('.navbar__list');
  const header = document.querySelector('.page__header-upper');
  const listItem = document.querySelector('.navbar__item');

  const headerHeight = header.clientHeight;
  const headerPositionTop = parseInt(window.getComputedStyle(header).getPropertyValue('top'));
  const listItemHeight = listItem.clientHeight;

  if(window.innerWidth <= 700) {
    navbarList.style.paddingTop = `${headerHeight + headerPositionTop + listItemHeight / 2}px`;
  } else if (window.innerWidth > 700 && window.innerWidth <= 1023){
    navbarList.style.paddingTop = `${headerPositionTop * 2}px`;
  } else {
    navbarList.style.paddingTop = `initial`;
  }
}

setNavbarTopPosition();

window.addEventListener('resize', setNavbarTopPosition);

const setFirstScreenHeight = () => {
  const header = document.querySelector('.header');
  const textBlock = document.querySelector('.home__text-block');
  const screen = document.querySelector('.home');

  if (window.innerHeight >= screen.clientHeight) {
      screen.style.height = `100vh`;
  } 

  const headerCoords = header.getBoundingClientRect().bottom + window.pageYOffset;
  const textBlockCoords = textBlock.getBoundingClientRect().top + window.pageYOffset;

  if (headerCoords > textBlockCoords) {
    textBlock.style.marginTop = `${header.clientHeight + (headerCoords - textBlockCoords) + 30}px`
  }
}

setFirstScreenHeight();
window.addEventListener('resize', setFirstScreenHeight);
