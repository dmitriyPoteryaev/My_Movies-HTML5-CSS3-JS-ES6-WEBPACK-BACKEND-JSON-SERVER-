"use strict"






const  InputForcinema   =document.querySelector(`.cinemaNearbyWithYou`),
BlockOfCinemd  =document.querySelector(`.ListOfcinema`),
forms = document.querySelector(`form`);


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
