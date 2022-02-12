const mouseCursor = document.querySelector('.cursor');
const images = document.querySelectorAll('.lop');
const home = document.querySelector('.navi');

window.addEventListener('mousemove', cursor);

function cursor(e) {
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}

home.addEventListener('mouseover', function () {
    mouseCursor.classList.add('pointer_grow-home')
})
home.addEventListener('mouseleave', function () {
    mouseCursor.classList.remove('pointer_grow-home')
})

images.forEach(image => {
    image.addEventListener('mouseleave', function () {
        mouseCursor.classList.remove('pointer_grow')
    })
    image.addEventListener('mouseover', function () {
        mouseCursor.classList.add('pointer_grow')
    })
})



const buttons = document.querySelectorAll('.pol');
buttons.forEach(image => {
    image.onclick = () => {
        document.querySelector('.popup_image').style.display = 'block';
        document.querySelector('.popup_image img').src = image.getAttribute('src');
        document.querySelector('.overlay').classList.remove('hidden');

    }
});

document.querySelector('.popup_image span').onclick = () => {
    document.querySelector('.popup_image').style.display = 'none';
    document.querySelector('.overlay').classList.add('hidden');
}

document.querySelector('.overlay').onclick = () => {
    document.querySelector('.popup_image').style.display = 'none';
    document.querySelector('.overlay').classList.add('hidden');
}


const preloader = document.querySelector('.loader');
const pstLoader = document.querySelector('.loading')

window.addEventListener('load', function () {
    preloader.style.display = 'none';
    pstLoader.style.display = 'none';
})



//  Changing Theme Color ////////////////////////////////////////////////////////////////////////////////////

const themeBtns = document.querySelector('.style_switcher');
const darkThemeBtn = document.querySelector('.dark_btn');
const lightThemeBtn = document.querySelector('.light_btn');

lightThemeBtn.addEventListener('click', function () {
    document.body.classList.add('light_theme');
    lightThemeBtn.classList.add('active-teal');
    darkThemeBtn.classList.remove('active')
})

darkThemeBtn.addEventListener('click', function () {
    document.body.classList.remove('light_theme');
    darkThemeBtn.classList.add('active');
    lightThemeBtn.classList.remove('active-teal')
})