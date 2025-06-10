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
export default slider;
