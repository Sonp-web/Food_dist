import { getResource, postData } from "../services/services";

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
  getResource("http://localhost:3000/menu").then((data) =>
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new Card(img, altimg, title, descr, price, ".menu .container").render();
    })
  );
}
export default cards;
