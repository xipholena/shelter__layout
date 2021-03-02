'use strict';

/* eslint-env jquery */

const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');

const transformHandler = () => {
  burger.classList.toggle('burger--active');
  navbar.classList.toggle('navbar--active');
};

burger.addEventListener('click', transformHandler);

const clickOnItemHandler = (e) => {
  const item = e.target.closest('.navbar__item');

  if (!item || !navbar.contains(item)) {
    return;
  }
  navbar.classList.remove('navbar--active');
  burger.classList.remove('burger--active');
};

navbar.addEventListener('click', clickOnItemHandler);

let maxSlides;
const quantityHandler = () => {
  if (window.innerWidth >= 1201) {
    maxSlides = 3;
  }

  if (window.innerWidth < 1200) {
    maxSlides = 2;
  }

  if (window.innerWidth < 800) {
    maxSlides = 1;
  }
};

quantityHandler();
window.addEventListener('resize', quantityHandler);

$(document).ready(function() {
  $('.slider__wrapper').bxSlider({
    slideSelector: '.slider__slide',
    nextSelector: '.slider__control-next',
    prevSelector: '.slider__control-prev',
    pager: false,
    wrapperClass: 'slider__wrapper',
    minSlides: 1,
    maxSlides: maxSlides,
    slideWidth: 270,
    slideMargin: 50,
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
    const navbar2 = document.querySelector('.navbar');
    const container = document.querySelector('.container');

    navbar2.style.paddingLeft = `${(
      window.innerWidth - container.clientWidth
    ) / 2}px`;
  }
};

calculateNavbarPadding();

window.addEventListener('resize', calculateNavbarPadding);
