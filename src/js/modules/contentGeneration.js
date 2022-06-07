import hideAllWorkSpace from "./allclear";
import {
  getResource
} from "../servieces/Getservieces";

const LeftButtonFilms = document.querySelector(`.promo__heart__film `),
  Content = document.querySelector(`.promo__content`),
  CenterofContent = document.querySelector(`.Center`),
  HeadaringForSortFilms = document.querySelector(`.SortOfContentFilms`);

function contentGeneration() {
  const allCheckFilms = [];

  const allCheckSerials = [];

  //Даннный класс предназнчен для формирования списка фильмов

  class Block_Of_Films {
    constructor(category, text, photoOfMovies, WayforFigure) {
      this.text = text;

      this.photoOfMovies = photoOfMovies;

      this.WayforFigure = WayforFigure;
      this.category = category;
    }

    push_new_film(category, text, photoOfMovies, WayforFigure) {
      this.text = text;
      this.photoOfMovies = photoOfMovies;
      this.WayforFigure = WayforFigure;
      Content.insertAdjacentHTML(
        `beforeend`,
        `
  
  <div class="rightFilm" style=" display:flex;
  flex-direction: column;  
 justify-content:space-around;
  align-self:center;
 
   width:300px; height:600px; margin:100px;font-family: 'Roboto', sans-serif;
   font-weight: 800; font-size: 20px; text-align:center; text-align:bottom; ">

  <div style=" margin:0px; padding:0px"><img class="FigureOfLeft${category}" src="${WayforFigure}/${photoOfMovies}.jpg " width=300px height=500px ></div>
  <div style=" width=300px; height=100px; margin:0px ; padding:0px" >${text}</div>
  
   </div>
  
  
  

  `
      );
    }
  }
  // создаём новые объекты  под фильмы
  // Инстантс

  const Something_film = new Block_Of_Films();

  LeftButtonFilms.addEventListener(`click`, ForLeftFilms);

  function ForLeftFilms(NameofGenre) {
    hideAllWorkSpace();

    Content.style.cssText = `display:flex; flex-direction:row; flex-wrap:wrap;justify-content:center;  align-items:center;`;

    getResource("http://localhost:3000/JSONObjectForFilm").then((data) => {
      if (allCheckFilms.length == 0 || NameofGenre == "[object PointerEvent]") {
        data.forEach(({
          moveFilm,
          genre,
          title,
          descr,
          IMDb,
          kinopoisk
        }) => {
          Something_film.push_new_film(
            `Film`,
            title,
            moveFilm,
            `forFilmOnLeft`
          );
        });
      } else {
        console.log(NameofGenre);
        console.log("Перечисление жанров фильма началось");
        data.forEach(({
          moveFilm,
          genre,
          title,
          descr,
          IMDb,
          kinopoisk
        }) => {
          const arrOfGenre = genre.split(";");

          const booleanListOfGenre = [];

          allCheckFilms.forEach((item, i) => {
            booleanListOfGenre.push(arrOfGenre.includes(item));
          });
          const res = booleanListOfGenre.reduce(
            (current, sum) => current && sum,
            "true"
          );

          if (res) {
            Something_film.push_new_film(
              `Film`,
              title,
              moveFilm,
              `forFilmOnLeft`
            );
          }
        });
        console.log("Перечисление жанров фильма закончилось");
      }
    });
  }

  // ПРО СЕРИАЛЫ

  const LeftButtonSeries = document.querySelector(`.promo__heart__serials `);

  //Даннный класс предназнчен для формирования списка сериалов

  class Block_Of_Serials extends Block_Of_Films {}
  // создаём новые объеты  под сериалы

  const Something_Series = new Block_Of_Serials();

  LeftButtonSeries.addEventListener(`click`, ForLeftSeries);

  function ForLeftSeries(NameofGenre) {
    hideAllWorkSpace();

    Content.style.cssText = `display:flex; flex-direction:row; flex-wrap:wrap;justify-content:center;  align-items:center;`;

    getResource("http://localhost:3000/JSONObjectForSerilas").then((data) => {
      if (
        allCheckSerials.length == 0 ||
        NameofGenre == "[object PointerEvent]"
      ) {
        data.forEach(({
          moveFilm,
          genre,
          title,
          descr,
          IMDb,
          kinopoisk
        }) => {
          Something_film.push_new_film(
            `Serials`,
            title,
            moveFilm,
            `forSerialsOnLeft`
          );
        });
      } else {
        console.log(NameofGenre);
        console.log("Перечисление жанров фильма началось");
        data.forEach(({
          moveFilm,
          genre,
          title,
          descr,
          IMDb,
          kinopoisk
        }) => {
          const arrOfGenre = genre.split(";");

          const booleanListOfGenre = [];

          allCheckFilms.forEach((item, i) => {
            booleanListOfGenre.push(arrOfGenre.includes(item));
          });
          const res = booleanListOfGenre.reduce(
            (current, sum) => current && sum,
            "true"
          );

          if (res) {
            Something_film.push_new_film(
              `Serials`,
              title,
              moveFilm,
              `forSerialsOnLeft`
            );
          }
        });
        console.log("Перечисление жанров фильма закончилось");
      }
    });
  }

  //  ДЛЯ НОВЫХ ФИЛЬМОВ

  const LeftButtonNewFilm = document.querySelector(`.promo__heart__new `);

  //Даннный класс предназнчен для формирования списка для новых фильмов

  class Block_Of_NewFilm extends Block_Of_Films {}
  // создаём новые объеты  под сериалы

  const Something_NewFilm = new Block_Of_Serials();

  LeftButtonNewFilm.addEventListener(`click`, ForLeftNewFilm);

  function ForLeftNewFilm() {
    hideAllWorkSpace();

    Content.style.cssText = `display:flex; flex-direction:row; flex-wrap:wrap;  `;

    getResource(" http://localhost:3000/JSONObjectForNewFilm").then((data) => {
      data.forEach(({
        moveFilm,
        genre,
        title,
        descr,
        IMDb,
        kinopoisk
      }) => {
        Something_NewFilm.push_new_film(
          `NewFilm`,
          title,
          moveFilm,
          `forNewFilmonLeft`
        );
      });
    });
  }

  // фильтрация

  const SortFilms = document.querySelector(".SortFilms"),
    SortSerials = document.querySelector(".SortSerials"),
    blockForSortFilms = document.querySelector(".ForSortFilms"),
    blockForSortSerials = document.querySelector(".ForSortSerials");

  const AllGenres = [
    "Аниме",
    "Биографический",
    "Боевик",
    "Вестерн",
    "Военный",
    "Детектив",
    "Детский",
    "Документальный",
    "Драма",
    "История",
    "Кинокомикс",
    "Комедия",
    "Мелодрама",
    "Мистика",
    "Мюзикл",
    "Приключения",
    "Спорт",
    "Триллер",
    "Ужасы",
    "Фантастика",
    "Фэнтези",
    "Криминал",
  ];

  const showSortFilm = (gener) => {
    ForLeftFilms(gener);
    ForLeftSeries(gener);

    SortFilms.innerHTML = "";
    CenterofContent.style.display = "none";

    blockForSortFilms.style.cssText = `display:flex; flex-direction:column; justify-content: center; align-content: center;`;
    HeadaringForSortFilms.style.display = "block";
    HeadaringForSortFilms.innerHTML = "Фильтрация для фильмов и сериалов";
    SortFilms.style.display = "flex";

    AllGenres.forEach((item) => {
      if (allCheckFilms.some((item1) => item1 === item)) {
        SortFilms.insertAdjacentHTML(
          "beforeend",
          ` 

<label class="container">${item}<input id="checkbox" type="checkbox" checked="checked"> 

</label>

`
        );
      } else {
        SortFilms.insertAdjacentHTML(
          "beforeend",
          ` 

<label class="container">${item}<input id="checkbox" type="checkbox" >

</label>

`
        );
      }
    });

    const checkbox = document.querySelectorAll("#checkbox");

    checkbox.forEach((item) => {
      item.addEventListener("change", () => {
        if (item.checked == true) {
          allCheckFilms.push(item.previousSibling.data);
          allCheckSerials.push(item.previousSibling.data);
          showSortFilm(item.previousSibling.data);
        } else {
          let index = allCheckFilms.indexOf(item.previousSibling.data);
          allCheckFilms.splice(index, 1);
          allCheckSerials.splice(index, 1);
          showSortFilm(item.previousSibling.data);
        }
      });
    });
  };
  showSortFilm();
}

export default contentGeneration;