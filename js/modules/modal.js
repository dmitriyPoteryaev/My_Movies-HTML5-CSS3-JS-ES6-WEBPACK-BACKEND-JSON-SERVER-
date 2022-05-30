



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

export default modalorder;

