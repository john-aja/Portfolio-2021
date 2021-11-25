const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const slidesIcon = document.querySelectorAll('.slide-icon');

const numberOfSlides = slides.length;
let slideNumber = 0;


nextBtn.addEventListener('click', () => {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    })
    slidesIcon.forEach((slideIcon) => {
        slideIcon.classList.remove('active');
    });

    slideNumber++;

    if (slideNumber > (numberOfSlides - 1)) {
        slideNumber = 0;
    }
    console.log(slideNumber)

    slides[slideNumber].classList.add('active');
    slidesIcon[slideNumber].classList.add('active');
})


prevBtn.addEventListener('click', () => {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    })
    slidesIcon.forEach((slideIcon) => {
        slideIcon.classList.remove('active');
    });

    slideNumber--;

    if (slideNumber < 0) {
        slideNumber = numberOfSlides - 1;
    }
    console.log(slideNumber)

    slides[slideNumber].classList.add('active');
    slidesIcon[slideNumber].classList.add('active');
})


let playSlider;

let repeater = () => {
    playSlider = setInterval(function () {

        slides.forEach((slide) => {
            slide.classList.remove('active');
        })
        slidesIcon.forEach((slideIcon) => {
            slideIcon.classList.remove('active');
        });

        slideNumber++;

        if (slideNumber > (numberOfSlides - 1)) {
            slideNumber = 0;
        }
        console.log(slideNumber)

        slides[slideNumber].classList.add('active');
        slidesIcon[slideNumber].classList.add('active');
    }, 7000);
}

repeater();

slider.addEventListener('mouseover', () => {
    clearInterval(playSlider);
})

slider.addEventListener('mouseout', () => {
    repeater();
})




let currentSlide = 1;


var manualNav = function (manual) {
    slides.forEach((slide) => {
        slide.classList.remove('active');

        slidesIcon.forEach((btn) => {
            btn.classList.remove('active');
        });
    });
    slides[manual].classList.add('active');
    slidesIcon[manual].classList.add('active');
}

slidesIcon.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        manualNav(i);
        currentSlide = i;
    });
});



const preloader = document.querySelector('.loader');
const pstLoader = document.querySelector('.loading');
const navigationDot = document.querySelector('.navigation-visibility')

window.addEventListener('load', function () {
    preloader.style.display = 'none';
    pstLoader.style.display = 'none';
    navigationDot.style.visibility = 'visible';
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