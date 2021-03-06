"use strict";

function checkCookies() {
  var cookieHtml = "\n    <div class=\"cookie show\" id=\"cookie\">\n        <div class=\"container\">\n            <div class=\"cookie__container\">\n                <div class=\"cookie__text\">\n                    \u0414\u043B\u044F \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441\u0430\u0439\u0442\u0430 \u0438 \u0435\u0433\u043E \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C\u0438 \u043C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0444\u0430\u0439\u043B\u044B cookie. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0443 \u0441 \u0441\u0430\u0439\u0442\u043E\u043C, \u0412\u044B&nbsp;\u0440\u0430\u0437\u0440\u0435\u0448\u0430\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 cookie-\u0444\u0430\u0439\u043B\u043E\u0432. \u0412\u044B \u0432\u0441\u0435\u0433\u0434\u0430 \u043C\u043E\u0436\u0435\u0442\u0435 \u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0444\u0430\u0439\u043B\u044B cookie \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u0412\u0430\u0448\u0435\u0433\u043E \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430.\n                </div>\n                <div class=\"cookie__button\">\n                    \u041F\u0440\u0438\u043D\u044F\u0442\u044C\n                </div>\n            </div>\n        </div>\n    </div>\n    ";
  var cookieDate = localStorage.getItem('cookieDate');
  var cookieNotification = null;
  var cookieBtn = null; // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы

  if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {
    document.body.insertAdjacentHTML('beforeend', cookieHtml);
    cookieNotification = document.getElementById('cookie');
    cookieBtn = cookieNotification.querySelector('.cookie__button'); // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX

    cookieBtn.addEventListener('click', function () {
      localStorage.setItem('cookieDate', Date.now());
      cookieNotification.classList.remove('show');
    });
  }
}

checkCookies();
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

function validateEmail(email) {
  var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
}

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;

    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
      i = new_value.indexOf("_");

      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }

      var reg = matrix.substr(0, this.value.length).replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});
document.querySelectorAll('.validate-form').forEach(function (item) {
  var elementForm = item.querySelectorAll('.required');
  var buttonElement = item.querySelector('.popup__button');
  elementForm.forEach(function (item) {
    if (item.getAttribute('type') === 'checkbox') {
      item.addEventListener('change', function () {
        checkFields(elementForm, buttonElement);
      });
    } else {
      item.addEventListener('input', function () {
        checkFields(elementForm, buttonElement);
      });
    }
  });
});

function checkFields(arrElements, btn) {
  var err = false;
  arrElements.forEach(function (item) {
    if (item.getAttribute('type') === 'checkbox' && !item.checked) {
      err = true;
    } else if (item.getAttribute('type') === 'text' && item.classList.contains('email-validate')) {
      if (!validateEmail(item.value)) err = true;
    } else if (item.value.length === 0) {
      err = true;
    }
  });

  if (err) {
    btn.setAttribute('disabled', true);
  } else {
    btn.removeAttribute('disabled');
  }
}

var pdfLinksArray = document.querySelectorAll('[data-document-src]');
pdfLinksArray.forEach(function (item) {
  var url = 'https://docs.google.com/viewerng/viewer?url=' + window.location.href + item.getAttribute('data-document-src') + '&embedded=true';
  item.setAttribute('href', url);
});
"use strict";

document.querySelectorAll("a[href^='#'").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    var href = this.getAttribute("href").substring(1);
    var scrollTarget = document.getElementById(href);
    if (!scrollTarget) return;
    var topOffset = document.querySelector(".header").offsetHeight + 20; // const topOffset = 0; // если не нужен отступ сверху

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
      }, (index + 1) * 250);
    });
    window.removeEventListener('scroll', animateSteps);
  }
}

window.addEventListener('scroll', animateSteps);