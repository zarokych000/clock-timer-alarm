"use strict";

let cog = document.querySelector('.cog-wheel');
let settingsBar = document.querySelector(".settings");
cog.addEventListener('click', () =>{
    console.log(settingsBar);
    settingsBar.classList.toggle('settings-show');
});