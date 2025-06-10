/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  // Calculator

  const result = document.querySelector(".calculating__result span");

  let sex = localStorage.getItem("sex")
      ? localStorage.getItem("sex")
      : "female",
    height,
    weight,
    age,
    ratio = localStorage.getItem("ratio")
      ? localStorage.getItem("ratio")
      : 1.375;

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      console.log(sex, height, weight, age, ratio);
      result.textContent = "____";
      return;
    }
    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }
  calcTotal();

  function getStaticInfo(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    document.querySelector(parentSelector).addEventListener("click", (e) => {
      if (e.target.getAttribute("data-ratio")) {
        ratio = +e.target.getAttribute("data-ratio");
        localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
      } else if (e.target.parentElement.id === "gender") {
        sex = e.target.getAttribute("id");
        localStorage.setItem("sex", e.target.getAttribute("id"));
      }
      if (e.target.classList.contains("calculating__choose-item")) {
        elements.forEach((item) => {
          item.classList.remove(activeClass);
          e.target.classList.add(activeClass);
        });
      }

      calcTotal();
    });
  }
  getStaticInfo("#gender", "calculating__choose-item_active");
  getStaticInfo(".calculating__choose_big", "calculating__choose-item_active");

  refreshCalc("#gender");
  refreshCalc(".calculating__choose_big");

  function getDinamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }
  getDinamicInfo("#height");
  getDinamicInfo("#weight");
  getDinamicInfo("#age");

  function refreshCalc(selector) {
    const items = [...document.querySelector(selector).children];
    items.forEach((item) => {
      if (item.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        item.classList.add("calculating__choose-item_active");
      } else if (item.id === localStorage.getItem("sex")) {
        item.classList.add("calculating__choose-item_active");
      } else {
        item.classList.remove("calculating__choose-item_active");
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  //cards

  class Card {
    constructor(src, alt, title, descr, price, parent, ...classes) {
      (this.src = src),
        (this.alt = alt),
        (this.title = title),
        (this.descr = descr);
      (this.price = price),
        (this.parent = document.querySelector(parent)),
        (this.classes = classes);
    }
    render() {
      if (this.classes.length == 0) {
        this.classes = [".menu__item"];
      }
      const card = document.createElement("div");
      this.classes.forEach((item) => {
        card.classList.add(item.slice(1));
      });
      card.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
      this.parent.append(card);
    }
  }
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then((data) =>
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new Card(img, altimg, title, descr, price, ".menu .container").render();
    })
  );
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "icons/spinner.svg",
    sucsess: "thanks",
    failure: "(",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin:0 auto;`;
      form.insertAdjacentElement("afterend", statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.sucsess);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    document.body.overflow = "hidden";

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
    </div>
    `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(function () {
      thanksModal.remove();
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 2000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.toggle("show");
  document.body.style.overflow = "";
}
function modal(modalSelector, triggerSelector) {
  //Modal

  const modal = document.querySelector(modalSelector),
    modalOpen = document.querySelectorAll(triggerSelector),
    modalTimerId = setTimeout(openModal, 10000);

  function openModal() {
    const modal = document.querySelector(modalSelector);

    document.body.style.overflow = "hidden";
    modal.classList.toggle("show");
    clearInterval(modalTimerId);
  }

  modalOpen.forEach((item) => {
    item.addEventListener("click", () => {
      openModal();
    });
  });
  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  function showModalInFooter() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalInFooter);
    }
  }
  window.addEventListener("scroll", showModalInFooter);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  slideSelector,
  nextButtonSelector,
  prevButtonSelector,
  currentSelector,
  totalSelector,
  wrapperSelector,
  sliderFieldSelector,
}) {
  //Slider

  const sliders = document.querySelectorAll(slideSelector),
    current = document.querySelector(currentSelector),
    nextButton = document.querySelector(nextButtonSelector),
    sliderWrapper = document.querySelector(wrapperSelector),
    sliderField = document.querySelector(sliderFieldSelector),
    width = window.getComputedStyle(sliderWrapper).width,
    prevButton = document.querySelector(prevButtonSelector);

  let currentValue = 1,
    offset = 0;

  sliderField.style.width = sliders.length * 100 + "%";
  sliderField.style.display = "flex";
  sliderField.style.transition = "0.5s all";

  sliderWrapper.style.overflow = "hidden";

  showCurrentSlider();
  document.querySelector(totalSelector).textContent =
    sliders.length < 10 ? `0${sliders.length}` : sliders.length;

  sliders.forEach((item) => {
    item.style.width = width;
  });

  nextButton.addEventListener("click", () => {
    showCurrentSlider("+");
    if (offset === parseInt(width) * (sliders.length - 1)) {
      offset = 0;
    } else {
      offset = parseInt(width) * (currentValue - 1);
    }
    sliderField.style.transform = `translateX(-${offset}px)`;
  });
  prevButton.addEventListener("click", () => {
    showCurrentSlider("-");
    if (offset === 0) {
      offset = parseInt(width) * (sliders.length - 1);
    } else {
      offset = parseInt(width) * (currentValue - 1);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;
  });

  function showCurrentSlider(str = "") {
    if (str == "+") {
      currentValue = currentValue === sliders.length ? 1 : currentValue + 1;
    } else if (str == "-") {
      currentValue = currentValue === 1 ? 4 : currentValue - 1;
    }
    showCurrentDot();
    current.textContent = currentValue < 10 ? `0${currentValue}` : currentValue;
  }

  const dotsWrapper = document.createElement("div"),
    slide = document.querySelector(".offer__slider");

  dotsWrapper.classList.add("carousel-indicators");
  slide.append(dotsWrapper);
  slide.style.position = "relative";

  for (let i = 0; i < sliders.length; i++) {
    let dot = document.createElement("div");

    dot.classList.add("dot");
    dotsWrapper.append(dot);
  }

  showCurrentDot();

  function showCurrentDot() {
    let dots = document.querySelectorAll(".dot");
    dots.forEach((item, index) => {
      if (index === currentValue - 1) {
        item.classList.add("dot-active");
      } else {
        item.classList.remove("dot-active");
      }
    });
  }
  dotsWrapper.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("dot")) {
      document.querySelectorAll(".dot").forEach((item, index) => {
        if (e.target == item) {
          currentValue = index + 1;
          showCurrentSlider();
          offset = parseInt(width) * index;
          sliderField.style.transform = `translateX(-${offset}px)`;
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(
  tabsSelector,
  tabsHeadersSelector,
  headerWrapperSelector,
  activetabHeaderActiveSelector
) {
  const tabs = document.querySelectorAll(tabsSelector),
    headers = document.querySelectorAll(tabsHeadersSelector),
    header__wrapper = document.querySelector(headerWrapperSelector);

  hideAllTabs();
  showTab(0);

  header__wrapper.addEventListener("click", (e) => {
    e.preventDefault();

    headers.forEach((item, i) => {
      if (e.target && e.target == item) {
        document
          .querySelector(activetabHeaderActiveSelector)
          .classList.remove(activetabHeaderActiveSelector.slice(1));

        hideAllTabs();
        showTab(i);
      }
    });
  });

  function hideAllTabs() {
    tabs.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
    });
  }
  function showTab(i) {
    tabs[i].classList.add("show");
    tabs[i].classList.remove("hide");
    headers[i].classList.add(activetabHeaderActiveSelector.slice(1));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadlines) {
  //Timer

  const deadline = deadlines;

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    }
    days = Math.floor(t / (1000 * 60 * 60 * 24));
    hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((t / 1000 / 60) % 60);
    seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t <= 0) timeInterval.clearInterval();
    }
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else return num;
  }
  setClock(id, deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (URL, data) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: data,
  });
  return await res.json();
};
const getResource = async (url) => {
  return await axios.get(url);
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








document.addEventListener("DOMContentLoaded", () => {
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
    ".tabcontent",
    ".tabheader__item",
    ".tabheader__items",
    ".tabheader__item_active"
  );
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])(".modal", "[data-modal]");
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])("form");
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    slideSelector: ".offer__slide",
    nextButtonSelector: ".offer__slider-next",
    prevButtonSelector: ".offer__slider-prev",
    currentSelector: "#current",
    totalSelector: "#total",
    wrapperSelector: ".offer__slider-wrapper",
    sliderFieldSelector: ".offer__slider-inner",
  });
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])(".timer", "2025-07-11");
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map