"use strict";


  // clock user timezone
  
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
  
  
  let clockId = setTimeout(function tick(){
    changeClock();
    clockId = setTimeout(tick, 1000);
  }, 1000);


  function changeClock(){
    if(!hours){
      return;
    }
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    hours.innerHTML = `${hour < 10 ? '0' + hour: hour}:`;
    minutes.innerHTML = `${minute < 10 ? '0' + minute: minute}:`;
    seconds.innerHTML = `${second < 10 ? '0' +second: second}`;
    return {
      date,
      second
    };
  }

  // modal

  let modal = document.querySelector('.modal__overlay');
  let alarmModal = document.querySelector('.modal__overlay-alarm');
  let audio;
  // settings modal toggler
  function toggleModal(){
    modal.classList.toggle('hide');
  }

  // click on set alarm button || on gray overlay
  document.addEventListener('click', (e) =>{
    if(e.target.dataset.modal || e.target.dataset.overlay){
      toggleModal();
    } else if(e.target.dataset.overlayAlarm){
      closeAlarmModal();
    }
  });

  // keydown escape when modal or overlay modal is open
  document.addEventListener('keydown', (e)=>{
    if(!modal.classList.contains('hide') && e.key == 'Escape'){
      toggleModal();
    } else if(!alarmModal.classList.contains('hide') && e.key == "Escape"){
      closeAlarmModal();
    }
  });
  // click on right crist on modal or cancel button
  document.addEventListener('click', (e) =>{
    if(e.target.dataset.closeModal){
      toggleModal();
    }
  });

  // alarm(modal) + countdown
  
  let alarmHours = document.querySelector('#set-hours');
  let alarmMinutes = document.querySelector('#set-minutes');

  let settedTime = document.querySelector('#time-alarm');
  const countdownHours = document.querySelector('#countdown-hours');
  const countdownMinutes = document.querySelector('#countdown-minutes');
  const countdownSeconds = document.querySelector('#countdown-seconds');

  const bottomPanel = document.querySelector('.list-of-alarm');
  const test = document.querySelector('.set-btn');


  let newDate;
  let countdownId;

  function countDown(){
    let diff = ( +newDate - +changeClock().date);
    let cdhours = Math.floor(diff / (60 * 60 * 1000) % 24);
    let cdminutes = Math.floor(diff / (60 * 1000) % 60);
    let cdseconds = Math.floor(diff / (1000) % 60) ;

    if(diff > 0){
      countdownHours.innerHTML =`${cdhours < 10 ? "0" + cdhours : cdhours}:`;
      countdownMinutes.innerHTML = `${cdminutes < 10 ? "0" + cdminutes : cdminutes}:`;
      countdownSeconds.innerHTML = `${cdseconds < 10 ? "0" + cdseconds : cdseconds}`;
    } else {
      console.log('gone');
      countdownHours.innerHTML =`00:`;
      countdownMinutes.innerHTML = `00:`;
      countdownSeconds.innerHTML = `00`;
    }

    countdownId = setTimeout(countDown, 1000);
  }

  function setAlarm(){
      return new Promise(function(resolve, reject){
        let date = new Date();

        newDate = new Date((+date + ((+alarmHours.value) * 60 * 60 * 1000) +
        ((+alarmMinutes.value) * 60 * 1000) + ((60 - changeClock().second )* 1000)));
  
        settedTime.innerHTML = `
        ${newDate.getHours() < 10 ? "0" + newDate.getHours() :
        newDate.getHours()}:${newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes()}`;
        
        togglebottompanel();
        setTimeout(() => openAlarmModal(), (+newDate - date));
        resolve();
      });
    } 

  // 
  document.addEventListener('click', (e) =>{
    if(e.target.dataset.setAlarm){
      setAlarm().then(() =>{
        if(countdownId){
          clearTimeout(countdownId);
        }
        countdownId = setTimeout(countDown);
      });
      toggleModal();
    }
  });

  document.addEventListener('click', (e) =>{
    if(e.target.classList.contains('test-btn')){
      toggleModal();
      openAlarmModal();
    }
  });

  function openAlarmModal(){
    console.log('Тррр тррр');
    alarmModal.classList.remove('hide');
    playAudio();
    clearTimeout(countdownId);
  }

  function closeAlarmModal(){
    alarmModal.classList.add('hide');
    stopAudio();
    clearTimeout(countdownId);
  }

  function playAudio(){
    audio = new Audio('../audio/alarm-sound.mp3');
    audio.loop = true;
    audio.play();
  }

  function stopAudio(){
    audio.pause();
  }

  function togglebottompanel(){
    bottomPanel.classList.toggle('hide');
  }





