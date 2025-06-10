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
export default tabs;
