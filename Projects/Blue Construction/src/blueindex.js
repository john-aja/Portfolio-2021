'use strict'

const menuBtn = document.querySelector('.menu_btn');
const menuOption = document.querySelector('.menu_options');
const overlay = document.querySelector('.overlay');
const menuOptions = document.querySelectorAll('.menu_options a');

menuBtn.addEventListener('click', () => {
    menuOption.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
});

overlay.addEventListener('click', () => {
    menuOption.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
});


menuOptions.forEach(btn => btn.addEventListener('click', () => {
    menuOption.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}))