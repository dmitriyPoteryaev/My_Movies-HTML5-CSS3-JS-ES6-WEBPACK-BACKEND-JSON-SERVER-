


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


  export default  hideAllWorkSpace;