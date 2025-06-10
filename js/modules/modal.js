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
export default modal;
export { closeModal };
