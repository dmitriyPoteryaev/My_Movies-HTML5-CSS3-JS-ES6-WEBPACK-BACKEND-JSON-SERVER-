window.addEventListener('DOMContentLoaded', () => {

 


  "use strict";
  
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
  
  
   





  const LeftButtonFilms = document.querySelector(`.promo__heart__film `);

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




  getResource('http://localhost:3000/JSONObjectForListLoveFilms').then((data)=>{
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





  
  




  // удалям с помощью данной функции рабочее пространство

  const Content = document.querySelector(`.promo__content`),
  backstage = Content.querySelector(`.promo__bg`),
  ListOfNewFilm = document.querySelector(`.promo__adv`),
  Interc = document.querySelector(`.promo__interactive`),
  Descr=document.querySelector(`.promo__allabout`),
  best=document.querySelector(`.heart`),
  HeadaringForSortFilms=document.querySelector(`.SortOfContentFilms`),
  HeadaringForSortSerails=document.querySelector(`.SortOfContentSerails`),
  CenterofContent=document.querySelector(`.Center`);



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











  // Навигация по левому меню




  const Folder= document.querySelector('.promo__menu-item_your_love'),
 Heart= document.querySelector('.promo__menu-item_top');


Folder.addEventListener('click',() =>{
  hideAllWorkSpace()
  Interc.style.display="flex";


});




Heart.addEventListener('click',() =>{
  hideAllWorkSpace()
  best.style.display="flex";


});

















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

const json = JSON.stringify(Object.fromEntries(formData.entries()));



      PostData('http://localhost:3000/JSONObjectForListLoveFilms', json)
      .then( data=>{

        pushSome();
        AllmovieDb.push(data);
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



    movieDb.push(input.value);
    

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

   
    hideAllWorkSpace()



    Content.style.cssText = `display:flex; flex-direction:row; flex-wrap:wrap;justify-content:center;  align-items:center;`


    getResource('http://localhost:3000/JSONObjectForFilm').then((data)=> {


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

    hideAllWorkSpace()

    Content.style.cssText = `display:flex; flex-direction:row; flex-wrap:wrap;justify-content:center;  align-items:center;`

 

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


getResource('http://localhost:3000/JSONObjectForSerilas').then((data)=> {

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

    hideAllWorkSpace()

    Content.style.cssText = `display:flex; flex-direction:row; flex-wrap:wrap;  `


    getResource(' http://localhost:3000/JSONObjectForNewFilm').then((data)=> {
      data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})    =>   {
      Something_NewFilm.push_new_film(`NewFilm`,  title, moveFilm,`forNewFilmonLeft`)
      
    })
  

  })

}




 


  

  const genreOfSomeThing =document.querySelector('.promo__genre'),
 titleOfSomeThing =document.querySelector('.promo__title'),
 descrOfSomeThing =document.querySelector('.promo__descr'),
 ratingOfSomeThing =document.querySelector('.promo__ratings'); 
 







const ShowAllAbouFilm=(moveFilm,genre,title,descr,IMDb,kinopoisk)=>{
  hideAllWorkSpace();

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
      hideAllWorkSpace()
  






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


        getResource(' http://localhost:3000/JSONObjectForNewFilm').then((data)=> {
          data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})   =>   {
      if(moveFilm===newFigireOfFilm.join('')){

        ShowAllAbouFilm(moveFilm, genre, title, descr, IMDb, kinopoisk)

      }
      })
    })
    }
      else{
        getResource(' http://localhost:3000/JSONObjectForSerilas').then((data)=> {
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


      console.log(newFigireOfFilm.join(''));

      getResource(' http://localhost:3000/JSONObjectForFilm').then((data)=> {

        data.forEach(({moveFilm, genre, title, descr, IMDb, kinopoisk})   =>   {
      if(moveFilm===newFigireOfFilm.join('')){

        ShowAllAbouFilm(moveFilm, genre, title, descr, IMDb, kinopoisk)

      }
      })
    
    })


    }





  });





















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
  HeadaringForSortFilms.innerHTML = 'Фильтрация для фильмов';
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

 




















});