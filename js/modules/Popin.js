

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


export default Popin;