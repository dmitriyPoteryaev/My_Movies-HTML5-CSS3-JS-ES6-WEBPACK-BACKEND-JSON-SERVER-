function calc() {
  // всё что связано с калькулятором

  const result = document.querySelector(".calculating__result span");

  let typeofFilm,
    quantityPlace = 0,
    quantityCombo = 0,
    comboFood;

  if (localStorage.getItem("comboFood")) {
    comboFood = localStorage.getItem("comboFood");
  } else {
    comboFood = 0;

    comboFood = localStorage.setItem("comboFood", 0);
  }

  if (localStorage.getItem("typeofFilm")) {
    typeofFilm = localStorage.getItem("typeofFilm");
  } else {
    comboFood = 0;

    typeofFilm = localStorage.setItem("typeofFilm", "new");
  }

  function initLocalStorage(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("typeofFilm")) {
        elem.classList.add(activeClass);
      }

      if (
        elem.getAttribute("data-ratio") === localStorage.getItem("comboFood")
      ) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalStorage("#typeFilm div", "calculating__choose-item_active");
  initLocalStorage(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function calcTotal() {
    if (typeofFilm === "old") {
      // 500-сумма за билет на старый фильм

      result.textContent = 500 * quantityPlace + quantityCombo * comboFood;
    } else {
      // 800-сумма за билет на старый фильм
      result.textContent = 800 * quantityPlace + quantityCombo * comboFood;
    }

    if (
      typeof typeofFilm === "null" ||
      typeof quantityPlace === "null" ||
      typeof quantityCombo === "null" ||
      !typeof comboFood === "null"
    ) {
      result.textContent = "0";
      return;
    }
  }

  calcTotal();

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-ratio")) {
          comboFood = +event.target.getAttribute("data-ratio");

          localStorage.setItem(
            "comboFood",
            +event.target.getAttribute("data-ratio")
          );
        } else {
          typeofFilm = event.target.getAttribute("id");

          localStorage.setItem("typeofFilm", event.target.getAttribute("id"));
        }

        console.log(comboFood, typeofFilm);

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });
        event.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }
  getStaticInformation("#typeFilm", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", (event) => {
      if (input.value.match(/\D/g)) {
        input.style.border = "10px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "place":
          quantityPlace = +input.value;
          if (quantityPlace % 2 !== 0 || quantityPlace % 2 !== 5) {
            quantityPlace = +Math.ceil(input.value);
          }
          break;
        case "combo":
          quantityCombo = +input.value;
          if (quantityCombo % 2 !== 0 || quantityCombo % 2 !== 5) {
            quantityCombo = +Math.ceil(input.value);
          }
          break;
      }

      calcTotal();
    });
  }
  getDynamicInformation("#place");
  getDynamicInformation("#combo");
}

export default calc;
