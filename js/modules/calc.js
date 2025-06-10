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
export default calc;
