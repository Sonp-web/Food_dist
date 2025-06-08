document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabcontent"),
    headers = document.querySelectorAll(".tabheader__item"),
    header__wrapper = document.querySelector(".tabheader__items");

  hideAllTabs();
  showTab(0);

  header__wrapper.addEventListener("click", (e) => {
    e.preventDefault();

    headers.forEach((item, i) => {
      if (e.target && e.target == item) {
        document
          .querySelector(".tabheader__item_active")
          .classList.remove("tabheader__item_active");

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
    headers[i].classList.add("tabheader__item_active");
  }

  //Timer

  const deadline = "2025-07-11";

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
  setClock(".timer", deadline);

  //Modal

  const modal = document.querySelector(".modal"),
    modalOpen = document.querySelectorAll("[data-modal]"),
    modalTimerId = setTimeout(openModal, 10000);

  function openModal() {
    document.body.style.overflow = "hidden";
    modal.classList.toggle("show");
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.toggle("show");
    document.body.style.overflow = "";
  }

  modalOpen.forEach((item) => {
    item.addEventListener("click", () => {
      openModal();
    });
  });
  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      closeModal();
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

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "icons/spinner.svg",
    sucsess: "thanks",
    failure: "(",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (URL, data) => {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: data,
    });
    return await res.json();
  };

  axios.get("http://localhost:3000/menu").then((data) =>
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new Card(img, altimg, title, descr, price, ".menu .container").render();
    })
  );

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

      postData("http://localhost:3000/requests", json)
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
      closeModal();
    }, 2000);
  }

  //Slider

  const sliders = document.querySelectorAll(".offer__slide"),
    current = document.querySelector("#current"),
    nextButton = document.querySelector(".offer__slider-next"),
    sliderWrapper = document.querySelector(".offer__slider-wrapper"),
    sliderField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(sliderWrapper).width,
    prevButton = document.querySelector(".offer__slider-prev");

  let currentValue = 1,
    offset = 0;

  sliderField.style.width = sliders.length * 100 + "%";
  sliderField.style.display = "flex";
  sliderField.style.transition = "0.5s all";

  sliderWrapper.style.overflow = "hidden";

  showCurrentSlider();
  document.querySelector("#total").textContent =
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

  //Navigation Slider

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
});
