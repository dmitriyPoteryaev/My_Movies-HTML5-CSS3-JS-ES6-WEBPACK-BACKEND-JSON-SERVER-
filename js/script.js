

import Lovefilms from './modules/Lovefilms';


import DescrFilms from './modules/descriptionsFilms';

import Popin from './modules/Popin';

import contentGeneration from './modules/contentGeneration';
import menu from './modules/menu';

import modalorder from './modules/modal';
import calc from './modules/calc';



window.addEventListener('DOMContentLoaded', () => {


  
  "use strict";

 









  // удалям с помощью данной функции рабочее пространство

 





  // Навигация по левому меню


  menu();

 


Lovefilms();



DescrFilms();


Popin();

contentGeneration();

  
modalorder();

calc();



});