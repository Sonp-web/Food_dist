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
});
