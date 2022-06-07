import hideAllWorkSpace from "./allclear";

const Folder = document.querySelector(".promo__menu-item_your_love"),
  Heart = document.querySelector(".promo__menu-item_top"),
  Interc = document.querySelector(`.promo__interactive`),
  best = document.querySelector(`.heart`);
const orderButton = document.querySelector(".promo__menu-item_order_ticket");
const ordertickets = document.querySelector(".modal");
const calc = document.querySelector(".calculating");
const buttonCalc = document.querySelector(".promo__menu-item_order_calc");

function menu() {
  Folder.addEventListener("click", () => {
    hideAllWorkSpace();
    Interc.style.display = "flex";
  });

  Heart.addEventListener("click", () => {
    hideAllWorkSpace();
    best.style.display = "flex";
  });

  orderButton.addEventListener("click", () => {
    hideAllWorkSpace();
    ordertickets.style.display = "flex";
  });

  buttonCalc.addEventListener("click", () => {
    hideAllWorkSpace();

    calc.style.display = "flex";
  });
}

export default menu;
