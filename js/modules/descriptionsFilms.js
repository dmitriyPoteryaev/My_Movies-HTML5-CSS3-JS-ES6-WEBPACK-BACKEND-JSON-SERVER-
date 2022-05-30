


import hideAllWorkSpace from './allclear';
import {getResource} from '../servieces/Getservieces';


const Content = document.querySelector(`.promo__content`),
backstage = Content.querySelector(`.promo__bg`),
Descr=document.querySelector(`.promo__allabout`);






function descriptionsFilms(){

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
   
   
   
   


}



export default descriptionsFilms;