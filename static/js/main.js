"use strict";

function popupClose() {
  document.querySelectorAll('.popup').forEach(function (item) {
    item.classList.remove('active');
  });
  document.body.classList.remove('no-scroll');
}

function popupOpen(selector) {
  var popup = document.querySelector(selector);

  if (popup) {
    popup.classList.add('active');
    document.body.classList.add('no-scroll');
  }
}

document.querySelectorAll('.popup__close').forEach(function (item) {
  item.addEventListener('click', popupClose);
});
document.querySelectorAll('.popup').forEach(function (item) {
  item.addEventListener('click', function (e) {
    if (item === e.target) {
      popupClose();
    }
  });
});
document.querySelectorAll('[data-popup-open]').forEach(function (item) {
  item.addEventListener('click', function () {
    var popupSelector = "." + item.dataset.popupOpen;
    popupOpen(popupSelector);
  });
});
document.querySelector('.header__menu').addEventListener('click', function () {
  document.querySelector('.mobile-menu').classList.toggle('active');
});
document.querySelectorAll('.mobile-close').forEach(function (item) {
  item.addEventListener('click', function () {
    document.querySelector('.mobile-menu').classList.remove('active');
  });
});
"use strict";

document.querySelectorAll("a[href^='#'").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    var href = this.getAttribute("href").substring(1);
    var scrollTarget = document.getElementById(href);
    if (!scrollTarget) return;
    var topOffset = document.querySelector(".header").offsetHeight; // const topOffset = 0; // если не нужен отступ сверху

    var elementPosition = scrollTarget.getBoundingClientRect().top;
    var offsetPosition = elementPosition - topOffset;
    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});
window.addEventListener('scroll', function () {
  var scrollTop = getBodyScrollTop();

  if (scrollTop > 0) {
    document.querySelector('.header').classList.add('scrolled');
  } else {
    document.querySelector('.header').classList.remove('scrolled');
  }
});

function getBodyScrollTop() {
  return self.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body && document.body.scrollTop;
}

var stepsElement = document.querySelector('.steps');
var stepElementOffsetTop = 0;

if (stepsElement) {
  stepElementOffsetTop = stepsElement.offsetTop + 200;
}

function animateSteps() {
  if (getBodyScrollTop() + window.innerHeight > stepElementOffsetTop) {
    stepsElement.querySelectorAll('.hidden').forEach(function (item, index) {
      setTimeout(function () {
        item.classList.remove('hidden');
      }, (index + 1) * 500);
    });
    window.removeEventListener('scroll', animateSteps);
  }
}

window.addEventListener('scroll', animateSteps);