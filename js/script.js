"use strict";


document.addEventListener("DOMContentLoaded", () =>{
  
  let hours = document.querySelector('#hours');
  let minutes = document.querySelector('#minutes');
  let seconds = document.querySelector('#seconds');


  changeClock();

  let cog = document.querySelector('.cog-wheel');
  let settingsBar = document.querySelector(".settings");
  cog.addEventListener('click', () =>{
      console.log(settingsBar);
      settingsBar.classList.toggle('settings-show');
  });
  
  
  
  // clock user timezone


  let clockId = setTimeout(function tick(){
    changeClock();
    clockId = setTimeout(tick, 1000);
  }, 1000);


  function changeClock(){
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    hours.innerHTML = `${hour < 10 ? '0' + hour: hour}:`;
    minutes.innerHTML = `${minute < 10 ? '0' + minute: minute}:`;
    seconds.innerHTML = `${second < 10 ? '0' +second: second}`;
  }

  // modal

  let modal = document.querySelector('.modal__overlay');

  document.addEventListener('click', (e) =>{
    if(e.target.dataset.modal || e.target.dataset.overlay){
      modal.classList.toggle('hide');
    }
  });

  document.addEventListener('keydown', (e)=>{
    if(!modal.classList.contains('hide') && e.key == 'Escape'){
      modal.classList.toggle('hide');
    }
  });

  document.addEventListener('click', (e) =>{
    if(e.target.dataset.closeModal){
      modal.classList.toggle('hide');
    }
  });
});



