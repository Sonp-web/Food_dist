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
});
