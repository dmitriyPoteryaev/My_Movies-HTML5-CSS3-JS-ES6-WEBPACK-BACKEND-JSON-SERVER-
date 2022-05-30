/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/Lovefilms.js":
/*!*********************************!*\
  !*** ./js/modules/Lovefilms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _servieces_Postservieces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../servieces/Postservieces */ "./js/servieces/Postservieces.js");
/* harmony import */ var _servieces_Getservieces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../servieces/Getservieces */ "./js/servieces/Getservieces.js");






const message ={

    loading:'Загрузка...',
    
    successofadd:'Cпасибо, что выбрали наш сайт! Ваш фильм успешно добавлен в список фильмов!',

    successofdelete:'Cпасибо, что выбрали наш сайт! Ваш фильм успешно удалили из списка!',
    
    failure:'Что пошло не так..'
    
    
    
    }
 

    const movieDb=[

      
    ];
    const AllmovieDb=[

      
    ];
  

function Lovefilms(){
    
  (0,_servieces_Getservieces__WEBPACK_IMPORTED_MODULE_1__.getResource)('http://localhost:3000/JSONObjectForListLoveFilms').then((data)=>{
    console.log(data)
  //   movieDb.splice(0,movieDb.length-1);
  //  AllmovieDb.splice(0,movieDb.length-1);
   
  data.forEach((film)=> movieDb.push(film.LoveFilm.toUpperCase()))

  data.forEach((item)=> 


  AllmovieDb.push({

  LoveFilm: item.LoveFilm.toUpperCase(),
  id:item.id

 })
  )
  console.log(AllmovieDb)
  
  Main('nothing');

})




 const forms = document.querySelector(`form`);

// функция связана  с 


// Попытка реализации DELETE-запроса
  const DeleteData = async (url,id)=>{


    const res = await fetch(url+'/'+id,{
    
      method:"DELETE",
              
              
      headers:{
      
        "Content-type" : "application/json"
      
      }
    
    
    
    });
    
    
    return await res.json();
    }


// Логика работы с любимыми фильмами пользователя 





const ListOfFilms = document.querySelector(`.promo__interactive-list`);
const NameOfFilm = ListOfFilms.querySelectorAll(`.promo__interactive-item`);




const ButtonOfDelete = document.createElement(`button`);



ButtonOfDelete.style.cssText = `
background-image: url("css/img/trash2.jpg"); background-repeat: no-repeat;
width: 30px; height: 40px; margin-left: 0px; margin-left: 10px; border: 0; `;



// функция предназначена для удаления определённого фильма
function DeleteFilmFronList(form) {
  ButtonOfDelete.addEventListener(`click`, () => {

    let first_time=true;
    const input_value = ButtonOfDelete.parentElement.innerHTML;
    let p = 0;
  
    for (let letter of input_value) {

      if (p == 0) {
        const Number_moviesDb=letter-1;
        const Name_moviesDb=movieDb[Number_moviesDb];
        console.log(Name_moviesDb);
        console.log(movieDb);
        console.log(AllmovieDb);


        
        AllmovieDb.forEach((element,j) => {

if(element.LoveFilm==Name_moviesDb&&first_time){

first_time=false;
console.log(element.id);


DeleteData('http://localhost:3000/JSONObjectForListLoveFilms',element.id).then( data=>{
const CurrentStatus = document.createElement(`div`);

console.log(data);
CurrentStatus.classList.add(`blockofmodal`);
CurrentStatus.textContent =message.loading;
form.append(CurrentStatus);
AllmovieDb.splice(j, 1);
ButtonOfDelete.parentElement.remove();
      
movieDb.splice(letter - 1, 1); //данный метод удаляет определённый элемент массива

Main('nothing'); //рекурсия

     CurrentStatus.textContent =message.successofdelete;
     form.append(CurrentStatus);
     // затем очищаем форму
     form.reset();
     // и удаляем уведомления по отправке формы
     setTimeout(()=>{
 
 
         CurrentStatus.remove();
 
     },4000)

}).catch(()=>{

 CurrentStatus.textContent =message.failure;
     form.append(CurrentStatus);
     form.reset();
     setTimeout(()=>{
 
 
         CurrentStatus.remove();
 
     },4000)


}).finally(()=>{
 forms.reset();


})


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

    if (node.className == 'promo__interactive-item') {
      Main('nothing');

    }
  }


});


// пушим названия всех фильмов из HTML-структуры














const buttonOfAdd = document.querySelector(`.accept`),
  input = document.querySelector(`.adding__input`);



// слушатель события предназначен для того,чтобы запушить новое название фильма в список


function bindPostData(form){

  
buttonOfAdd.addEventListener(`click`, (event) => {
  
  event.preventDefault();
  if (input.value == '' || input.value == null|| input.value == ' '|| input.value == '  '|| input.value == '   '|| input.value == '    '|| input.value == '     '|| input.value ==  '     ') {

    alert(`Пожалуйста,введите название фильма!`);

  } else {




  
const CurrentStatus = document.createElement(`div`);

CurrentStatus.classList.add(`blockofmodal`);
CurrentStatus.textContent =message.loading;
form.append(CurrentStatus);


const formData = new FormData(form);


console.log('Форм Дата-',formData);

// для того чтобы преобразовать из обычного объекта в JSON нужно использовать JSON.stringify
// 
const json = JSON.stringify(Object.fromEntries(formData.entries()));



    (0,_servieces_Postservieces__WEBPACK_IMPORTED_MODULE_0__.PostData)('http://localhost:3000/JSONObjectForListLoveFilms', json)
    .then( data=>{

      pushSome();
      
      AllmovieDb.push({

        LoveFilm: data.LoveFilm.toUpperCase(),
        id:data.id
      
       });
      console.log(AllmovieDb);
      Main('nothing');
    
     

     
 
      console.log('AllmovieDb-',AllmovieDb);
     
      
     
      

           CurrentStatus.textContent =message.successofadd;
           form.append(CurrentStatus);
           // затем очищаем форму
           form.reset();
           // и удаляем уведомления по отправке формы
           setTimeout(()=>{
       
       
               CurrentStatus.remove();
               
       
           },4000)

     }).catch(()=>{

       CurrentStatus.textContent =message.failure;
           form.append(CurrentStatus);
           form.reset();
           setTimeout(()=>{
       
       
               CurrentStatus.remove();
       
           },4000)


     }).finally(()=>{
       form.reset();

      
     })





  }

});

}

bindPostData(forms);

//  пушим новое название фильма через инпут

function pushSome() {



  movieDb.push(input.value.toUpperCase());
  

}




function Main(k) {
  ListOfFilms.innerHTML = '';
  //cначала удаляем полностью весь список.Сначала il

  //здесь записываем с этот массив название фильм



// сортируем весь список фильмов в массиве

  // заполняем список фильмами




  movieDb.sort().forEach((item1, j) => {



    //функция ,предназначена для формирования нового списка фильмов на странице
    function NewListOfFilms() {
      const NameOfFilm = item1;
      let i = 1;

      let NewNameOfFilm = ' ';

      for (let letter of NameOfFilm) {

        if (letter == ` ` || letter == `-`|| letter == `;`|| letter == `:`|| letter == `.`|| letter == `,`|| letter == `!`|| letter == `?`) {


          NewNameOfFilm = NewNameOfFilm + letter;
          continue;
        } else {


          if (i == 21) {
            NewNameOfFilm = NewNameOfFilm + `...`;

            break;

          }
          if(i==1)
          NewNameOfFilm = NewNameOfFilm + letter.toUpperCase();
          else{
            NewNameOfFilm = NewNameOfFilm + letter.toLowerCase();
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




}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lovefilms);

/***/ }),

/***/ "./js/modules/Popin.js":
/*!*****************************!*\
  !*** ./js/modules/Popin.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


  const Content = document.querySelector(`.promo__content`);

function Popin(){

 // модальное окно(pop in)(Для компьютера)



 const LeftMenu = document.querySelector(`.promo__menu`),
 buttoForLeftMenu=document.querySelector(`.PopUpForPromoMenu`);





 buttoForLeftMenu.addEventListener(`click`,() =>{


  // данные методы нужны,чтобы при клике  показать модальное окно(Меню)
  // И не скролить страницу
  // Когда мы обратно нажимаем на меню-->модальное окно убирается и мы можем скролить страницу
  LeftMenu.classList.toggle(`ForShowBlock`);



 });


 function ForLeftMenu(){

  LeftMenu.classList.remove(`ForShowBlock`);
 


 };


 Content.addEventListener(`click`,() =>{
  ForLeftMenu();


 });



 document.addEventListener(`keydown`,(event) =>{


  if(event.code==="Escape"){
    ForLeftMenu();
}

 });



}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popin);

/***/ }),

/***/ "./js/modules/allclear.js":
/*!********************************!*\
  !*** ./js/modules/allclear.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });



  const Content = document.querySelector(`.promo__content`),
  backstage = Content.querySelector(`.promo__bg`),
  Interc = document.querySelector(`.promo__interactive`),
  Descr=document.querySelector(`.promo__allabout`),
  best=document.querySelector(`.heart`),
  CenterofContent=document.querySelector(`.Center`),
  descrOfSomeThing =document.querySelector('.promo__descr'),
  blockForSortFilms= document.querySelector('.ForSortFilms'),
  blockForSortSerials= document.querySelector('.ForSortSerials'),

 ordertickets= document.querySelector('.modal'),
 calc= document.querySelector('.calculating');








  // удалям с помощью данной функции рабочее пространство



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


      backstage.style.display = 'none';
      Descr.style.display = 'none';
      descrOfSomeThing.style.display = 'none';
      best.style.display = 'none';
      blockForSortFilms.style.display = 'none';
      blockForSortSerials.style.display = 'none';

      // calc and orderticket
      ordertickets.style.display = 'none';
      calc.style.display = 'none';
      

      };



    hidePromoBg();


    // 3 функция
    function hideIntrc() {


      Interc.style.display = "none";

    }

    hideIntrc();

    // 4 функция
    function disblc() {


      Content.style.cssText = `display:block`
    }
    disblc();

    // 5 функция
   
    CenterofContent.style.display  = 'flex';

  
  }


  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hideAllWorkSpace);

/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });



function calc(){

   
    
// всё что связано с калькулятором


const result = document.querySelector('.calculating__result span');


let typeofFilm,quantityPlace=0, quantityCombo=0,comboFood;


if(localStorage.getItem('comboFood')){


  comboFood =localStorage.getItem('comboFood');


}else{
  comboFood=0;

  comboFood =localStorage.setItem('comboFood', 0);

}



if(localStorage.getItem('typeofFilm')){


  typeofFilm =localStorage.getItem('typeofFilm');


}else{
  comboFood=0;

  typeofFilm =localStorage.setItem('typeofFilm', 'new');

}







function initLocalStorage(selector,activeClass){


  const elements =document.querySelectorAll(selector)
 
  elements.forEach((elem)=>{

    elem.classList.remove(activeClass);
if(elem.getAttribute('id')===localStorage.getItem('typeofFilm')){


  elem.classList.add(activeClass);
}


if(elem.getAttribute('data-ratio')===localStorage.getItem('comboFood')){


  elem.classList.add(activeClass);
}


  })




}

initLocalStorage('#typeFilm div','calculating__choose-item_active');
initLocalStorage('.calculating__choose_big div','calculating__choose-item_active');


function calcTotal(){
  if(typeofFilm==='old'){
    // 500-сумма за билет на старый фильм
 
    result.textContent=500*quantityPlace+quantityCombo*comboFood;
   

 
  
  }else{
  


    
  // 800-сумма за билет на старый фильм
    result.textContent=800*quantityPlace+quantityCombo*comboFood;
  
 
  
  }
  
  
  
if(typeof(typeofFilm)==='null'||typeof(quantityPlace)==='null'||typeof(quantityCombo)==='null'||!typeof(comboFood)==='null'){

  result.textContent='0';
  return;

}

}




calcTotal()


function getStaticInformation(parentSelector,activeClass){

const elements = document.querySelectorAll(`${parentSelector} div`);



elements.forEach((elem)=>{

  elem.addEventListener('click',(event)=>{
    if(event.target.getAttribute('data-ratio')){
    
      comboFood= +event.target.getAttribute('data-ratio');
      
      localStorage.setItem('comboFood', +event.target.getAttribute('data-ratio'));
    }else{
    
    
      typeofFilm = event.target.getAttribute('id');

      localStorage.setItem('typeofFilm', event.target.getAttribute('id'));
    
    }
    
    console.log(comboFood,typeofFilm);
    
    elements.forEach(elem =>{
    
    
      elem.classList.remove(activeClass);
    
    })
    event.target.classList.add(activeClass);
    
    calcTotal()
    });
})




}
getStaticInformation('#typeFilm','calculating__choose-item_active')
getStaticInformation('.calculating__choose_big','calculating__choose-item_active')



function getDynamicInformation(selector){

 
  const input =document.querySelector(selector);
  
  input.addEventListener('input',(event)=>{


    if(input.value.match(/\D/g)){

      input.style.border='10px solid red';
    }else{
     
      input.style.border='none';
    }
  

    switch(input.getAttribute('id')){

case 'place':

  quantityPlace= +input.value;
  if(quantityPlace%2!==0||quantityPlace%2!==5){

    quantityPlace=+Math.ceil(input.value);
  }
  break;
  case 'combo':

    quantityCombo= +input.value;
    if(quantityCombo%2!==0||quantityCombo%2!==5){

      quantityCombo=+Math.ceil(input.value);
    }
  break;





    }
  
    calcTotal()
  });

  
  }
  getDynamicInformation('#place');
  getDynamicInformation('#combo');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/contentGeneration.js":
/*!*****************************************!*\
  !*** ./js/modules/contentGeneration.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _allclear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./allclear */ "./js/modules/allclear.js");
/* harmony import */ var _servieces_Getservieces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../servieces/Getservieces */ "./js/servieces/Getservieces.js");




  const LeftButtonFilms = document.querySelector(`.promo__heart__film `),
 Content = document.querySelector(`.promo__content`),
 CenterofContent=document.querySelector(`.Center`),
 HeadaringForSortFilms=document.querySelector(`.SortOfContentFilms`);


function contentGeneration(){


    
  const allCheckFilms=[];

  const  allCheckSerials=[];





  //Даннный класс предназнчен для формирования списка фильмов

  class Block_Of_Films {


    constructor(category,text, photoOfMovies,WayforFigure){

this.text=text;

this.photoOfMovies=photoOfMovies;

this.WayforFigure=WayforFigure;
this.category=category;


    }



    push_new_film(category,text, photoOfMovies,WayforFigure) {

      this.text = text;
      this.photoOfMovies = photoOfMovies;
      this.WayforFigure = WayforFigure;
      Content.insertAdjacentHTML(`beforeend`, `
  
  <div class="rightFilm" style=" display:flex;
  flex-direction: column;  
 justify-content:space-around;
  align-self:center;
 
   width:300px; height:600px; margin:100px;font-family: 'Roboto', sans-serif;
   font-weight: 800; font-size: 20px; text-align:center; text-align:bottom; ">

  <div style=" margin:0px; padding:0px"><img class="FigureOfLeft${category}" src="${WayforFigure}/${photoOfMovies}.jpg " width=300px height=500px ></div>
  <div style=" width=300px; height=100px; margin:0px ; padding:0px" >${text}</div>
  
   </div>
  
  
  

  `);
    }




  }
  // создаём новые объекты  под фильмы
  // Инстантс


  const Something_film = new Block_Of_Films();



  LeftButtonFilms.addEventListener(`click`, ForLeftFilms)




  function ForLeftFilms(NameofGenre) {

   
    ;(0,_allclear__WEBPACK_IMPORTED_MODULE_0__["default"])()



    Content.style.cssText = `display:flex; flex-direction:row; flex-wrap:wrap;justify-content:center;  align-items:center;`


    ;(0,_servieces_Getservieces__WEBPACK_IMPORTED_MODULE_1__.getResource)('http://localhost:3000/JSONObjectForFilm').then((data)=> {


      if(allCheckFilms.length==0||NameofGenre=='[object PointerEvent]'){
       
    data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})    =>   {
      Something_film.push_new_film(`Film`,  title, moveFilm,`forFilmOnLeft`)
      
    })

  
  }
   

    else{
      
      console.log(NameofGenre);
      console.log("Перечисление жанров фильма началось");
      data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})    =>   {

       const arrOfGenre= genre.split(';');

       const booleanListOfGenre=[]

       allCheckFilms.forEach((item,i)=>{booleanListOfGenre.push(arrOfGenre.includes(item)) })
       const res=booleanListOfGenre.reduce((current,sum)=>current&&sum,'true')

        

        if(res){

          Something_film.push_new_film(`Film`,  title, moveFilm,`forFilmOnLeft`)

        }
     

      
      
    })
    console.log("Перечисление жанров фильма закончилось");

    }
 

  })


 

  }










// ПРО СЕРИАЛЫ




  const LeftButtonSeries = document.querySelector(`.promo__heart__serials `);



  //Даннный класс предназнчен для формирования списка сериалов

  class Block_Of_Serials extends Block_Of_Films {



  }
  // создаём новые объеты  под сериалы


  const Something_Series = new Block_Of_Serials();



  LeftButtonSeries.addEventListener(`click`, ForLeftSeries)




  function ForLeftSeries(NameofGenre) {

    ;(0,_allclear__WEBPACK_IMPORTED_MODULE_0__["default"])()

    Content.style.cssText = `display:flex; flex-direction:row; flex-wrap:wrap;justify-content:center;  align-items:center;`

 



;(0,_servieces_Getservieces__WEBPACK_IMPORTED_MODULE_1__.getResource)('http://localhost:3000/JSONObjectForSerilas').then((data)=> {

  if(allCheckSerials.length==0||NameofGenre=='[object PointerEvent]'){

    

data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})    =>   {
  Something_film.push_new_film(`Serials`,  title, moveFilm,`forSerialsOnLeft`)
  
})


}


else{
  
  console.log(NameofGenre);
  console.log("Перечисление жанров фильма началось");
  data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})    =>   {

   const arrOfGenre= genre.split(';');

   const booleanListOfGenre=[]

   allCheckFilms.forEach((item,i)=>{booleanListOfGenre.push(arrOfGenre.includes(item)) })
   const res=booleanListOfGenre.reduce((current,sum)=>current&&sum,'true')

    

    if(res){

      Something_film.push_new_film(`Serials`,  title, moveFilm,`forSerialsOnLeft`)

    }
    
  
  
})
console.log("Перечисление жанров фильма закончилось");

}


})





 }





//  ДЛЯ НОВЫХ ФИЛЬМОВ


  const LeftButtonNewFilm = document.querySelector(`.promo__heart__new `);






  //Даннный класс предназнчен для формирования списка для новых фильмов

  class Block_Of_NewFilm extends Block_Of_Films {



  }
  // создаём новые объеты  под сериалы


  const Something_NewFilm = new Block_Of_Serials();



  LeftButtonNewFilm.addEventListener(`click`, ForLeftNewFilm)




  function ForLeftNewFilm() {

    ;(0,_allclear__WEBPACK_IMPORTED_MODULE_0__["default"])()

    Content.style.cssText = `display:flex; flex-direction:row; flex-wrap:wrap;  `


    ;(0,_servieces_Getservieces__WEBPACK_IMPORTED_MODULE_1__.getResource)(' http://localhost:3000/JSONObjectForNewFilm').then((data)=> {
      data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})    =>   {
      Something_NewFilm.push_new_film(`NewFilm`,  title, moveFilm,`forNewFilmonLeft`)
      
    })
  

  })

}





 


// фильтрация





const SortFilms = document.querySelector('.SortFilms'),
SortSerials = document.querySelector('.SortSerials'),
blockForSortFilms= document.querySelector('.ForSortFilms'),
blockForSortSerials= document.querySelector('.ForSortSerials');


const AllGenres=[


  'Аниме',
  'Биографический',
  'Боевик',
 'Вестерн',
  'Военный',
  'Детектив',
  'Детский',
  'Документальный',
  'Драма',
  'История',
  'Кинокомикс',
  'Комедия',
  'Мелодрама',
  'Мистика',
  'Мюзикл',
  'Приключения',
  'Спорт',
  'Триллер',
  'Ужасы',
  'Фантастика',
  'Фэнтези',
  'Криминал'
]






const showSortFilm=(gener)=>{

 

  ForLeftFilms(gener);
  ForLeftSeries(gener);

  SortFilms.innerHTML='';
  CenterofContent.style.display = 'none';
  

 
  blockForSortFilms.style.cssText = `display:flex; flex-direction:column; justify-content: center; align-content: center;`
  HeadaringForSortFilms.style.display = 'block';
  HeadaringForSortFilms.innerHTML = 'Фильтрация для фильмов и сериалов';
  SortFilms.style.display = 'flex';


  AllGenres.forEach((item)=>{

  
if(allCheckFilms.some((item1)=>item1===item)){
  SortFilms.insertAdjacentHTML('beforeend', ` 

<label class="container">${item}<input id="checkbox" type="checkbox" checked="checked"> 

</label>

`);
}
else{
  SortFilms.insertAdjacentHTML('beforeend', ` 

<label class="container">${item}<input id="checkbox" type="checkbox" >

</label>

`);
}
})
  



const checkbox = document.querySelectorAll('#checkbox');

checkbox.forEach((item)=>{item.addEventListener('change',()=>{

if(item.checked==true){

  

  

  
  allCheckFilms.push(item.previousSibling.data);
  allCheckSerials.push(item.previousSibling.data);
  showSortFilm( item.previousSibling.data);
 
}
else{

  let index = allCheckFilms.indexOf(item.previousSibling.data);
  allCheckFilms.splice(index, 1);
  allCheckSerials.splice(index, 1);
  showSortFilm( item.previousSibling.data);


}

})
})
}
showSortFilm()

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (contentGeneration);

/***/ }),

/***/ "./js/modules/descriptionsFilms.js":
/*!*****************************************!*\
  !*** ./js/modules/descriptionsFilms.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _allclear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./allclear */ "./js/modules/allclear.js");
/* harmony import */ var _servieces_Getservieces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../servieces/Getservieces */ "./js/servieces/Getservieces.js");







const Content = document.querySelector(`.promo__content`),
backstage = Content.querySelector(`.promo__bg`),
Descr=document.querySelector(`.promo__allabout`);






function descriptionsFilms(){

    const genreOfSomeThing =document.querySelector('.promo__genre'),
    titleOfSomeThing =document.querySelector('.promo__title'),
    descrOfSomeThing =document.querySelector('.promo__descr'),
    ratingOfSomeThing =document.querySelector('.promo__ratings'); 
    
   
   
   
   
   
   
   
   const ShowAllAbouFilm=(moveFilm,genre,title,descr,IMDb,kinopoisk)=>{
     (0,_allclear__WEBPACK_IMPORTED_MODULE_0__["default"])();
   
     backstage.style.display = 'block';
     descrOfSomeThing.style.display = 'block';
     Descr.style.display = 'block';
     backstage.style.cssText=`background-image: url("AllContent/${moveFilm}.jpg"); background-repeat: no-repeat; background-size: 450px 600px; `
     titleOfSomeThing.innerHTML=`${title}`;
     genreOfSomeThing.innerHTML=`${genre}`;
     descrOfSomeThing.innerHTML=`${descr}`;
     ratingOfSomeThing.innerHTML=`IMDb:${IMDb}, Кинопоиск:${kinopoisk}`;
   
     
   
   }
   
   // Для новинок и сериалов
   
     Content.addEventListener(`click`, (event) => {
       const target = event.target;
   
       if (target.className == `FigureOfLeftNewFilm` || target.className == `FigureOfLeftSerials`) {
         (0,_allclear__WEBPACK_IMPORTED_MODULE_0__["default"])()
     
   
   
   
   
   
   
         const ValueOfScreenOfFilms = target.attributes.src.nodeValue;
         let newFigireOfFilm = [];
   
   
         for (let letter of ValueOfScreenOfFilms ) {
   
   
   
           newFigireOfFilm.push(letter);
   
   
         }
   
   
         newFigireOfFilm.splice(0, 17);
         newFigireOfFilm.reverse();
         newFigireOfFilm.splice(0, 5);
         newFigireOfFilm.reverse();
   
   
         console.log(newFigireOfFilm.join(''));
   
   
   
         if(target.className  == `FigureOfLeftNewFilm`){
   
   
           (0,_servieces_Getservieces__WEBPACK_IMPORTED_MODULE_1__.getResource)(' http://localhost:3000/JSONObjectForNewFilm').then((data)=> {
             data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})   =>   {
         if(moveFilm===newFigireOfFilm.join('')){
   
           ShowAllAbouFilm(moveFilm, genre, title, descr, IMDb, kinopoisk)
   
         }
         })
       })
       }
         else{
           (0,_servieces_Getservieces__WEBPACK_IMPORTED_MODULE_1__.getResource)(' http://localhost:3000/JSONObjectForSerilas').then((data)=> {
             data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})   =>   {
             if(moveFilm===newFigireOfFilm.join('')){
       
               ShowAllAbouFilm(moveFilm, genre, title, descr, IMDb, kinopoisk)
       
             }
             })
   
         })
       
         
       }
   
       }
   
   
   
   
   
     });
   
   // Для фильмов
   
     Content.addEventListener(`click`, (event) => {
       const target = event.target;
   
       if (event.target.className == `FigureOfLeftFilm`) {
         (0,_allclear__WEBPACK_IMPORTED_MODULE_0__["default"])()
     
   
   
   
   
   
   
         const ValueOfScreenOfFilms = target.attributes.src.nodeValue;
         let newFigireOfFilm = [];
   
   
         for (let letter of ValueOfScreenOfFilms ) {
   
   
   
           newFigireOfFilm.push(letter);
   
   
         }
   
   
         newFigireOfFilm.splice(0, 14);
         newFigireOfFilm.reverse();
         newFigireOfFilm.splice(0, 5);
         newFigireOfFilm.reverse();
   
   
         console.log(newFigireOfFilm.join(''));
   
         (0,_servieces_Getservieces__WEBPACK_IMPORTED_MODULE_1__.getResource)(' http://localhost:3000/JSONObjectForFilm').then((data)=> {
   
           data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})   =>   {
         if(moveFilm===newFigireOfFilm.join('')){
   
           ShowAllAbouFilm(moveFilm, genre, title, descr, IMDb, kinopoisk)
   
         }
         })
       
       })
   
   
       }
   
   
   
   
   
     });
   
   
   
   


}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (descriptionsFilms);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _allclear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./allclear */ "./js/modules/allclear.js");



 const Folder= document.querySelector('.promo__menu-item_your_love'),
 Heart= document.querySelector('.promo__menu-item_top'),

 Interc = document.querySelector(`.promo__interactive`),

 best=document.querySelector(`.heart`);
 const orderButton= document.querySelector('.promo__menu-item_order_ticket');
 const ordertickets= document.querySelector('.modal');
 const calc= document.querySelector('.calculating');
 const buttonCalc=document.querySelector('.promo__menu-item_order_calc');


function menu(){

    Folder.addEventListener('click',() =>{
        (0,_allclear__WEBPACK_IMPORTED_MODULE_0__["default"])()
        Interc.style.display="flex";
      
      
      });
      
      
      
      
      Heart.addEventListener('click',() =>{
        (0,_allclear__WEBPACK_IMPORTED_MODULE_0__["default"])()
        best.style.display="flex";
      
      
      });

      orderButton.addEventListener('click',() =>{
        (0,_allclear__WEBPACK_IMPORTED_MODULE_0__["default"])()
        ordertickets.style.display="flex";
        
      
      });

      buttonCalc.addEventListener('click',() =>{

        (0,_allclear__WEBPACK_IMPORTED_MODULE_0__["default"])()

        calc.style.display="flex";
      });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });




function modalorder(){


const  InputForcinema   =document.querySelector(`.cinemaNearbyWithYou`),
BlockOfCinemd  =document.querySelector(`.ListOfcinema`),
forms = document.querySelector(`.modal form`);


// fetch('http://localhost:3000/menu').then(data=>data.json()).then(res=>console.log(res));

const message ={

loading:'Загрузка...',

success:'Cпасибо! Скоро мы с Вами свяжемся',

failure:'Что пошло не так..'



}






InputForcinema.addEventListener(`click`,()=>{


    BlockOfCinemd.classList.toggle(`show`);




});







// функция ,связанная с POST-запросами


const PostData = async (url,data)=>{


const res = await fetch(url,{

  method:"POST",
          
          
  headers:{
  
    "Content-type" : "application/json"
  
  },
  
  body:data



});


return await res.json();
}





// функция ,связанная с GET-запросами
const getResource = async (url)=>{


  const res = await fetch(url)


// Ранее,когда мы использовали XMLHttpRequest мы могли отслеживать текущее состояние ответа от сервера(response)
// fetch напрямую данными методами не обладает .Он может отследить ошибку только по отключённому интернет-соединению
// Как же тогда можно отслежить ответ от сервера ,если он отрицательный?

if(!res.ok){


 throw new Error(`Could not fetch ${url}, status:${res.status}`);
}


  
  return await res.json();
  }




// основная функция

function bindPostData(form){

    form.addEventListener(`submit`,(event)=>{


        event.preventDefault();
const CurrentStatus = document.createElement(`div`);

CurrentStatus.classList.add(`blockofmodal`);
CurrentStatus.textContent =message.loading;
form.append(CurrentStatus);


        



       
     

// FormData-это специальный объект ,который позволяет нам сформировать все данные 
// ,которые пользовать написал в Input'ах
// как и json.Данный объект создаём формат ключ--->значение
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));


                  PostData(' http://localhost:3000/requests', json)
                 .then( data=>{

                   console.log(data);
                        CurrentStatus.textContent =message.success;
                        form.append(CurrentStatus);
                        // затем очищаем форму
                        form.reset();
                        // и удаляем уведомления по отправке формы
                        setTimeout(()=>{
                    
                    
                            CurrentStatus.remove();
                    
                        },2000)

                  }).catch(()=>{

                    CurrentStatus.textContent =message.failure;
                        form.append(CurrentStatus);
                        form.reset();
                        setTimeout(()=>{
                    
                    
                            CurrentStatus.remove();
                    
                        },2000)


                  }).finally(()=>{
                    form.reset();


                  })






   







    })






}
bindPostData(forms);


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalorder);



/***/ }),

/***/ "./js/servieces/Getservieces.js":
/*!**************************************!*\
  !*** ./js/servieces/Getservieces.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
// Взаимодейтсвие с backом.back-end запросы.Fetch
const getResource = async (url)=>{


    const res = await fetch(url)
  
  
  // Ранее,когда мы использовали XMLHttpRequest мы могли отслеживать текущее состояние ответа от сервера(response)
  // fetch напрямую данными методами не обладает .Он может отследить ошибку только по отключённому интернет-соединению
  // Как же тогда можно отслежить ответ от сервера ,если он отрицательный?
  
  if(!res.ok){
  
  
   throw new Error(`Could not fetch ${url}, status:${res.status}`);
  }
  
  
    
    return await res.json();
    }


    

/***/ }),

/***/ "./js/servieces/Postservieces.js":
/*!***************************************!*\
  !*** ./js/servieces/Postservieces.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostData": () => (/* binding */ PostData)
/* harmony export */ });



const PostData = async (url,data)=>{


    const res = await fetch(url,{
    
      method:"POST",
              
              
      headers:{
      
        "Content-type" : "application/json"
      
      },
      
      body:data
    
    
    
    });
    
    
    return await res.json();
    }

    

    

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Lovefilms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Lovefilms */ "./js/modules/Lovefilms.js");
/* harmony import */ var _modules_descriptionsFilms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/descriptionsFilms */ "./js/modules/descriptionsFilms.js");
/* harmony import */ var _modules_Popin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Popin */ "./js/modules/Popin.js");
/* harmony import */ var _modules_contentGeneration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/contentGeneration */ "./js/modules/contentGeneration.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

















window.addEventListener('DOMContentLoaded', () => {


  
  "use strict";

 









  // удалям с помощью данной функции рабочее пространство

 





  // Навигация по левому меню


  (0,_modules_menu__WEBPACK_IMPORTED_MODULE_4__["default"])();

 


(0,_modules_Lovefilms__WEBPACK_IMPORTED_MODULE_0__["default"])();



(0,_modules_descriptionsFilms__WEBPACK_IMPORTED_MODULE_1__["default"])();


(0,_modules_Popin__WEBPACK_IMPORTED_MODULE_2__["default"])();

(0,_modules_contentGeneration__WEBPACK_IMPORTED_MODULE_3__["default"])();

  
(0,_modules_modal__WEBPACK_IMPORTED_MODULE_5__["default"])();

(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();



});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map