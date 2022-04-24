window.addEventListener('DOMContentLoaded', () => {


  "use strict";

  const movieDB = {
    movies: [

    ]
  };



  const ListOfFilms = document.querySelector(`.promo__interactive-list`);
  const NameOfFilm = ListOfFilms.querySelectorAll(`.promo__interactive-item`);




  const ButtonOfDelete = document.createElement(`button`);



  ButtonOfDelete.style.cssText = `
 background-image: url("css/img/trash2.jpg"); background-repeat: no-repeat;
 width: 30px; height: 40px; margin-left: 0px; margin-left: 10px; border: 0; `;



  // функция предназначена для удаления определённого фильма
  (function DeleteFilmFronList() {
    ButtonOfDelete.addEventListener(`click`, () => {



      const input_value = ButtonOfDelete.parentElement.innerHTML;
      let p = 0;

      for (let letter of input_value) {

        if (p == 0) {
          console.log(ButtonOfDelete.parentElement);
          ButtonOfDelete.parentElement.remove();
          movieDB.movies.splice(letter - 1, 1); //данный метод удаляет определённый элемент массива
          Main(); //рекурсия
        }
        p++;
      }
    });

  })()


  // слушатель события предназначен для того,чтобы показать кнопку удаления на конкретном фильме





  ListOfFilms.addEventListener(`mouseout`, () => {

    for (let node of ListOfFilms.childNodes) {

      if (node.className == 'promo__interactive-item') {
        Main('nothing');

      }
    }


  });


  // пушим названия всех фильмов из HTML-структуры
  for (let item of NameOfFilm) {


    for (let node of item.childNodes) {

      movieDB.movies.push(node.data);

    }

  }





  //вызываем функцию Main

  Main('nothing');







  const buttonOfAdd = document.querySelector(`.accept`),
    input = document.querySelector(`.adding__input`);



  // слушатель события предназначен для того,чтобы запушить новое название фильма в список

  buttonOfAdd.addEventListener(`click`, (event) => {
    event.preventDefault();

    if (input.value == '' || input.value == null) {

      alert(`Пожалуйста,введите название фильма!`);

    } else {


      push();
      //НАЧАЛО ФУНКЦИИ
      Main('nothing');

      //КОНЕЦ ФУНКЦИИ

    }

  });


  //  пушим новое название фильма через инпут

  function push() {



    movieDB.movies.push(input.value.toUpperCase());

  }




  function Main(k) {
    ListOfFilms.innerHTML = '';
    //cначала удаляем полностью весь список.Сначала il

    //здесь записываем с этот массив название фильм





    movieDB.movies.sort(); // сортируем весь список фильмов в массиве

    // заполняем список фильмами




    movieDB.movies.forEach((item, j) => {



      //функция ,предназначена для формирования нового списка фильмов на странице
      function NewListOfFilms() {
        const NameOfFilm = item;
        let i = 1;

        let NewNameOfFilm = ' ';

        for (let letter of NameOfFilm) {

          if (letter == ` ` || letter == `-`) {


            NewNameOfFilm = NewNameOfFilm + letter;
            continue;
          } else {

            NewNameOfFilm = NewNameOfFilm + letter;

            if (i == 20) {
              NewNameOfFilm = NewNameOfFilm + `...`;

              break;

            }

          }

          i++;

        }


        return NewNameOfFilm
      }



      ListOfFilms.insertAdjacentHTML(`beforeend`, `<li class="promo__interactive-item">${j+1}.${NewListOfFilms()}
    </li>`);

      if (j === k) {
        const NameOfFilm = ListOfFilms.querySelectorAll(`.promo__interactive-item`);

        NameOfFilm[j].insertAdjacentElement(`beforeend`, ButtonOfDelete);


      }


    });



    const NameOfFilm = ListOfFilms.querySelectorAll(`.promo__interactive-item`);



    NameOfFilm.forEach((item1, k) => {


      item1.addEventListener(`mouseenter`, (CopyMain));


      function CopyMain() {

        Main(k);

      }


    });


  }































  //промо bg нужно очистить и вставить новое


  const Content = document.querySelector(`.promo__content`),
    backstage = Content.querySelectorAll(`.promo__bg`),
    ListOfNewFilm = document.querySelector(`.promo__adv`),
    NewFilmOnRight = ListOfNewFilm.querySelectorAll(`.new_film`),
    Interc = document.querySelector(`.promo__interactive`);

  hideAllWorkSpace();
  showContent();


  // функция, предназначена для полной очистики всего рабочего поля
  function hideAllWorkSpace() {



    // 1 функция
    function hideLeftFilm() {

      for (let node of Content.childNodes) {


        if (node.className == 'rightFilm') {
          node.remove();
        }
      }
    }
    hideLeftFilm();


    // 2 функция
    function hidePromoBg() {

      backstage.forEach(item => {

        item.style.display = 'none';


      });


      NewFilmOnRight.forEach(item1 => {

        item1.classList.remove('new_film_active');


      });





    }
    hidePromoBg();


    // 3 функция
    function hideIntrc() {


      Interc.style.display = "none";

    }

    hideIntrc();

  }



  // функция, предназначена для  отображения контента ,связанным с новыми фильмами 
  // и блоком ,который предназначен для отображения списка любымых фильмов
  function showContent(i = 1, moveFilm = 'Человек-паук') {
    Interc.style.display = "flex";
    backstage[i].style.display = 'block';

    Content.style.cssText = `background-image: url("css/img/${moveFilm}.jpg"); background-repeat: no-repeat;`
    NewFilmOnRight[i].classList.add('new_film_active');
  }




  NewFilmOnRight.forEach((item1, i) => {
    item1.addEventListener(`click`, () => {


      hideAllWorkSpace()

      showContent(i, item1.innerHTML);




    });




  });






















  const LeftButtonFilms = document.querySelector(`.promo__menu-item_films `);



  //Даннный класс предназнчен для формирования списка фильмов

  class Block_Of_Films {



    push_new_film(text1, photoOfMovies) {

      this.text1 = text1;
      this.photoOfMovies = photoOfMovies;
      Content.insertAdjacentHTML(`afterbegin`, `
  
  <div class="rightFilm" style=" display:flex;
  flex-direction: column;  
  justify-content: space-around;
   width:300px; height:400px; margin:100px; font-family: 'Roboto', sans-serif;
   font-weight: 800; font-size: 20px; text-align:center; text-align:bottom; ">

  <div><img class="FigureOfLeftFilm" src="forFilmOnLeft/${photoOfMovies}.jpg " width="90%" height="90%" ></div>
  <div >${text1}</div>
  
   </div>
  
  
  

  `);
    }




  }
  // создаём новые объеты  под фильмы


  const Something_film = new Block_Of_Films();



  LeftButtonFilms.addEventListener(`click`, ForLeftFilms)




  function ForLeftFilms() {

    hideAllWorkSpace()

    Content.style.cssText = ` flex-direction:row; flex-wrap:wrap;`
    Something_film.push_new_film(`Побег из Шоушенка`, `Побег из Шоушенка`);
    Something_film.push_new_film(`Властелин Колец: Две крепости`, `Властелин Колец(Две крепости)`);
    Something_film.push_new_film(`Криминальное чтиво`, `Криминальное чтиво`);
    Something_film.push_new_film(`Интерстеллар`, `Интерстеллар`);
    Something_film.push_new_film(`Отступники`, `Отступники`);
    Something_film.push_new_film(`Тёмный Рыцарь`, `Тёмный Рыцарь`);
    Something_film.push_new_film(`Гладиатор`, `Гладиатор`);
    Something_film.push_new_film(`Джанго освобождённый`, `Джанго освобождённый`);
    Something_film.push_new_film(`Поймай меня, если сможешь`, `Поймай меня, если сможешь`);

  }











































  const LeftButtonSeries = document.querySelector(`.promo__menu-item_series `);



  //Даннный класс предназнчен для формирования списка сериалов

  class Block_Of_Serials extends Block_Of_Films {



    push_new_film(text1, photoOfMovies) {


      this.text1 = text1;
      this.photoOfMovies = photoOfMovies;
      Content.insertAdjacentHTML(`afterbegin`, `
  
  <div class="rightFilm" style=" display:flex;
  flex-direction: column;  
  justify-content: space-around;
   width:300px; height:400px; margin:100px; font-family: 'Roboto', sans-serif;
   font-weight: 800; font-size: 20px; text-align:center; text-align:bottom; ">

  <div><img class="FigureOfLeftSerials"  src="forSerialsOnLeft/${photoOfMovies}.jpg " width="90%" height="90%" ></div>
  <div >${text1}</div>
  
   </div>
  
  
  

  `);
    }




  }
  // создаём новые объеты  под фильмы


  const Something_Series = new Block_Of_Serials();



  LeftButtonSeries.addEventListener(`click`, ForLeftSeries)




  function ForLeftSeries() {

    hideAllWorkSpace()

    Content.style.cssText = ` flex-direction:row; flex-wrap:wrap;`
    Something_Series.push_new_film(`Шерлок`, `Шерлок`);
    Something_Series.push_new_film(`Во все тяжкие`, `Во все тяжкие`);
    Something_Series.push_new_film(`Доктор Хаус`, `Доктор Хаус`);
    Something_Series.push_new_film(`Друзья`, `Друзья`);
    Something_Series.push_new_film(`Игра Престолов`, `Игра Престолов`);
    Something_Series.push_new_film(`Как я встретил вашу маму`, `Как я встретил вашу маму`);
    Something_Series.push_new_film(`Клинника`, `Клинника`);
    Something_Series.push_new_film(`Офис`, `Офис`);
    Something_Series.push_new_film(`Сопрано`, `Сопрано`);

  }







  // для увеличения картинки на фильмах




  Content.addEventListener(`click`, (event) => {
    const target = event.target;

    if (event.target.className == `FigureOfLeftFilm`) {
      hideAllWorkSpace()






      const ValueOfScreenOfFilms = target.attributes.src.nodeValue;
      let newFigireOfFilm = [];


      for (let letter of ValueOfScreenOfFilms ) {



        newFigireOfFilm.push(letter);


      }


      newFigireOfFilm.splice(0, 14);
      newFigireOfFilm.reverse();
      newFigireOfFilm.splice(0, 5);
      newFigireOfFilm.reverse();



      Content.style.cssText = `background-image: url("ForBigFilmOnLeft/${newFigireOfFilm.join('')}.jpg"); background-repeat: no-repeat;`

    }





  });









  // для увеличения картинки на сериалах



  Content.addEventListener(`click`, (event) => {
    const target = event.target;

    if (event.target.className == `FigureOfLeftSerials`) {
      hideAllWorkSpace()






      const ValueOfScreenOfSerials = target.attributes.src.nodeValue;
      let newFigireOfSerials = [];


      for (let letter of ValueOfScreenOfSerials) {



        newFigireOfSerials.push(letter);


      }


      newFigireOfSerials.splice(0, 14);
      newFigireOfSerials.reverse();
      newFigireOfSerials.splice(0, 5);
      newFigireOfSerials.reverse();



      Content.style.cssText = `background-image: url("ForBigSerialsOnLeft/${newFigireOfSerials.join('')}.jpg"); background-repeat: no-repeat;`

    }





  });





























});