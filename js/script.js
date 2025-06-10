import tabs from "./modules/tabs";
import modal from "./modules/modal";
import calc from "./modules/calc";
import cards from "./modules/cards";
import form from "./modules/form";
import slider from "./modules/slider";
import timer from "./modules/timer";

document.addEventListener("DOMContentLoaded", () => {
  tabs(
    ".tabcontent",
    ".tabheader__item",
    ".tabheader__items",
    ".tabheader__item_active"
  );
  modal(".modal", "[data-modal]");
  calc();
  cards();
  form("form");
  slider({
    slideSelector: ".offer__slide",
    nextButtonSelector: ".offer__slider-next",
    prevButtonSelector: ".offer__slider-prev",
    currentSelector: "#current",
    totalSelector: "#total",
    wrapperSelector: ".offer__slider-wrapper",
    sliderFieldSelector: ".offer__slider-inner",
  });
  timer(".timer", "2025-07-11");
});
