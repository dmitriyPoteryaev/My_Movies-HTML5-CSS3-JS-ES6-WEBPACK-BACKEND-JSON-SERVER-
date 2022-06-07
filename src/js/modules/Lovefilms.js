import { PostData } from "../servieces/Postservieces";
import { getResource } from "../servieces/Getservieces";



const message = {
  loading: "Загрузка...",

  successofadd:
    "Cпасибо, что выбрали наш сайт! Ваш фильм успешно добавлен в список фильмов!",

  successofdelete:
    "Cпасибо, что выбрали наш сайт! Ваш фильм успешно удалили из списка!",

  failure: "Что пошло не так..",
};

const movieDb = [];
const AllmovieDb = [];

function Lovefilms(trash) {
  getResource("http://localhost:3000/JSONObjectForListLoveFilms").then(
    (data) => {
      console.log(data);
      //   movieDb.splice(0,movieDb.length-1);
      //  AllmovieDb.splice(0,movieDb.length-1);

      data.forEach((film) => movieDb.push(film.LoveFilm.toUpperCase()));

      data.forEach((item) =>
        AllmovieDb.push({
          LoveFilm: item.LoveFilm.toUpperCase(),
          id: item.id,
        })
      );
      console.log(AllmovieDb);

      Main("nothing");
    }
  );

  const forms = document.querySelector(`form`);

  // функция связана  с

  // Попытка реализации DELETE-запроса
  const DeleteData = async (url, id) => {
    const res = await fetch(url + "/" + id, {
      method: "DELETE",

      headers: {
        "Content-type": "application/json",
      },
    });

    return await res.json();
  };

  // Логика работы с любимыми фильмами пользователя

  const ListOfFilms = document.querySelector(`.promo__interactive-list`);
  const NameOfFilm = ListOfFilms.querySelectorAll(`.promo__interactive-item`);

  const ButtonOfDelete = document.createElement(`button`);

  ButtonOfDelete.style.cssText = `
background-image: url(${trash}); background-repeat: no-repeat;
width: 30px; height: 40px; margin-left: 0px; margin-left: 10px; border: 0; `;

  // функция предназначена для удаления определённого фильма
  function DeleteFilmFronList(form) {
    ButtonOfDelete.addEventListener(`click`, () => {
      let first_time = true;
      const input_value = ButtonOfDelete.parentElement.innerHTML;
      let p = 0;

      for (let letter of input_value) {
        if (p == 0) {
          const Number_moviesDb = letter - 1;
          const Name_moviesDb = movieDb[Number_moviesDb];
          console.log(Name_moviesDb);
          console.log(movieDb);
          console.log(AllmovieDb);

          AllmovieDb.forEach((element, j) => {
            if (element.LoveFilm == Name_moviesDb && first_time) {
              first_time = false;
              console.log(element.id);

              DeleteData(
                "http://localhost:3000/JSONObjectForListLoveFilms",
                element.id
              )
                .then((data) => {
                  const CurrentStatus = document.createElement(`div`);

                  console.log(data);
                  CurrentStatus.classList.add(`blockofmodal`);
                  CurrentStatus.textContent = message.loading;
                  form.append(CurrentStatus);
                  AllmovieDb.splice(j, 1);
                  ButtonOfDelete.parentElement.remove();

                  movieDb.splice(letter - 1, 1); //данный метод удаляет определённый элемент массива

                  Main("nothing"); //рекурсия

                  CurrentStatus.textContent = message.successofdelete;
                  form.append(CurrentStatus);
                  // затем очищаем форму
                  form.reset();
                  // и удаляем уведомления по отправке формы
                  setTimeout(() => {
                    CurrentStatus.remove();
                  }, 4000);
                })
                .catch(() => {
                  CurrentStatus.textContent = message.failure;
                  form.append(CurrentStatus);
                  form.reset();
                  setTimeout(() => {
                    CurrentStatus.remove();
                  }, 4000);
                })
                .finally(() => {
                  forms.reset();
                });
            }
          });
        }
        p++;
      }
    });
  }
  DeleteFilmFronList(forms);

  // слушатель события предназначен для того,чтобы показать кнопку удаления на конкретном фильме

  ListOfFilms.addEventListener(`mouseout`, () => {
    for (let node of ListOfFilms.childNodes) {
      if (node.className == "promo__interactive-item") {
        Main("nothing");
      }
    }
  });

  // пушим названия всех фильмов из HTML-структуры

  const buttonOfAdd = document.querySelector(`.accept`),
    input = document.querySelector(`.adding__input`);

  // слушатель события предназначен для того,чтобы запушить новое название фильма в список

  function bindPostData(form) {
    buttonOfAdd.addEventListener(`click`, (event) => {
      event.preventDefault();
      if (
        input.value == "" ||
        input.value == null ||
        input.value == " " ||
        input.value == "  " ||
        input.value == "   " ||
        input.value == "    " ||
        input.value == "     " ||
        input.value == "     "
      ) {
        alert(`Пожалуйста,введите название фильма!`);
      } else {
        const CurrentStatus = document.createElement(`div`);

        CurrentStatus.classList.add(`blockofmodal`);
        CurrentStatus.textContent = message.loading;
        form.append(CurrentStatus);

        const formData = new FormData(form);

        console.log("Форм Дата-", formData);

        // для того чтобы преобразовать из обычного объекта в JSON нужно использовать JSON.stringify
        //
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        PostData("http://localhost:3000/JSONObjectForListLoveFilms", json)
          .then((data) => {
            pushSome();

            AllmovieDb.push({
              LoveFilm: data.LoveFilm.toUpperCase(),
              id: data.id,
            });
            console.log(AllmovieDb);
            Main("nothing");

            console.log("AllmovieDb-", AllmovieDb);

            CurrentStatus.textContent = message.successofadd;
            form.append(CurrentStatus);
            // затем очищаем форму
            form.reset();
            // и удаляем уведомления по отправке формы
            setTimeout(() => {
              CurrentStatus.remove();
            }, 4000);
          })
          .catch(() => {
            CurrentStatus.textContent = message.failure;
            form.append(CurrentStatus);
            form.reset();
            setTimeout(() => {
              CurrentStatus.remove();
            }, 4000);
          })
          .finally(() => {
            form.reset();
          });
      }
    });
  }

  bindPostData(forms);

  //  пушим новое название фильма через инпут

  function pushSome() {
    movieDb.push(input.value.toUpperCase());
  }

  function Main(k) {
    ListOfFilms.innerHTML = "";
    //cначала удаляем полностью весь список.Сначала il

    //здесь записываем с этот массив название фильм

    // сортируем весь список фильмов в массиве

    // заполняем список фильмами

    movieDb.sort().forEach((item1, j) => {
      //функция ,предназначена для формирования нового списка фильмов на странице
      function NewListOfFilms() {
        const NameOfFilm = item1;
        let i = 1;

        let NewNameOfFilm = " ";

        for (let letter of NameOfFilm) {
          if (
            letter == ` ` ||
            letter == `-` ||
            letter == `;` ||
            letter == `:` ||
            letter == `.` ||
            letter == `,` ||
            letter == `!` ||
            letter == `?`
          ) {
            NewNameOfFilm = NewNameOfFilm + letter;
            continue;
          } else {
            if (i == 21) {
              NewNameOfFilm = NewNameOfFilm + `...`;

              break;
            }
            if (i == 1) NewNameOfFilm = NewNameOfFilm + letter.toUpperCase();
            else {
              NewNameOfFilm = NewNameOfFilm + letter.toLowerCase();
            }
          }

          i++;
        }

        return NewNameOfFilm;
      }

      ListOfFilms.insertAdjacentHTML(
        `beforeend`,
        `<li class="promo__interactive-item">${j + 1}.${NewListOfFilms()}
  </li>`
      );

      if (j === k) {
        const NameOfFilm = ListOfFilms.querySelectorAll(
          `.promo__interactive-item`
        );

        NameOfFilm[j].insertAdjacentElement(`beforeend`, ButtonOfDelete);
      }
    });

    const NameOfFilm = ListOfFilms.querySelectorAll(`.promo__interactive-item`);

    NameOfFilm.forEach((item1, k) => {
      item1.addEventListener(`mouseenter`, CopyMain);

      function CopyMain() {
        Main(k);
      }
    });
  }
}
export default Lovefilms;
