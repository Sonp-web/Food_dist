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
    modalClose = document.querySelector(".modal__close"),
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
    if (e.target == modal) {
      closeModal();
    }
  });
  modalClose.addEventListener("click", closeModal);
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
  new Card(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих \n овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной \n ценой и высоким качеством!',
    229,
    ".menu__field .container",
    ".menu__item"
  ).render();

  new Card(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но\n и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода\n в ресторан!",
    550,
    ".menu__field .container",
    ".menu__item"
  ).render();

  new Card(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие\nпродуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное\n количество белков за счет тофу и импортных вегетарианских стейков.",
    430,
    ".menu__field .container"
  ).render();

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "loading",
    sucsess: "thanks",
    failure: "(",
  };

  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader("Content-type", "multipart/form-data");
      const formData = new FormData(form);

      request.send(formData);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.sucsess;
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
});
