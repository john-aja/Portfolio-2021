// 'use strict'


// Typing name /////////////////////////////////////////////////////////////////


var typed = new Typed('.know-1', {
    strings: ["front end developer"],
    typeSpeed: 30,
    startDelay: 1300,
    backSpeed: 40,
    loop: false,
    onComplete: function (self) {
        self.cursor.remove()
    }
});

var typed = new Typed('.know-2', {
    strings: ["website desginer"],
    typeSpeed: 50,
    startDelay: 2300,
    backSpeed: 35,
    loop: false,
    onComplete: function (self) {
        self.cursor.remove()
    }
});

var typed = new Typed('.know-3', {
    strings: ["and graphics desginer"],
    typeSpeed: 40,
    startDelay: 3400,
    backSpeed: 25,
    loop: false,
    onComplete: function (self) {
        self.cursor.remove()
    }
});



//  MODAL SECTION /////////////////////////////////////////////////////////////

const menuOpenBtn = document.querySelector('.menu-button');
const menuCloseBtn = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal-section');
const overlay = document.querySelector('.overlay');

const menuItems = document.querySelector('.menu-items');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function (e) {
    e.preventDefault();
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

menuOpenBtn.addEventListener('click', openModal);
menuCloseBtn.addEventListener('click', closeModal);
menuItems.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);




//  Projects View  /////////////////////////////////////////////////////////////


let section = document.querySelector('.wrapper_intro');

let scrollableSection = document.getElementsByClassName('parallax')[0];
scrollableSection.addEventListener('scroll', function (e) {
    let value = e.target.scrollTop - 5;
    section.style.clipPath = "circle(" + value + "px at center center)";
});



//  Designs Gallery ///////////////////////////////////////////////////////////

var galleryCenter = document.getElementById('galleryCenter');
var count = 0;

function detectswipe(el, func) {
    swipe_det = new Object();
    swipe_det.sX = 0;
    swipe_det.sY = 0;
    swipe_det.eX = 0;
    swipe_det.eY = 0;
    var min_x = -50 //min x swipe for horizontal swipe
    var max_x = -20; //max x difference for vertical swipe
    var min_y = 40; //min y swipe for vertical swipe
    var max_y = 50; //max y difference for horizontal swipe
    var direc = "";
    ele = document.getElementById(el);
    ele.addEventListener('touchstart', function (e) {
        var t = e.touches[0];
        swipe_det.sX = t.screenX;
        swipe_det.sY = t.screenY;
    }, false);
    ele.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX;
        swipe_det.eY = t.screenY;
    }, false);
    ele.addEventListener('touchend', function (e) {
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
            if (swipe_det.eX > swipe_det.sX) direc = "r";
            else direc = "l";
        }
        //vertical detection
        if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
            if (swipe_det.eY > swipe_det.sY) direc = "d";
            else direc = "u";
        }

        if (direc != "") {
            if (typeof func == 'function') func(el, direc);
        }
        direc = "";
    }, false);
}


const galleryPage = galleryCenter.addEventListener('wheel', scrollGallery);
detectswipe('galleryCenter', scrollGallery);

function scrollGallery(event, direction) {

    if (event.deltaY < 0 || direction == 'r') {
        count -= 10;

        // galleryCenter.style.transform = 'translate(-50%, -50%) perspective(1000px) rotateY(' + count + 'deg)';
    } else if (event.deltaY > 0 || direction == 'l') {
        count += 10;
    }
    galleryCenter.style.transform = 'translate(-50%, -50%) perspective(1000px) rotateY(' + count + 'deg)'
}

// preventing page scroll with jquery //

$('aside').on('mousewheel', function (e) {

    var e0 = e.originalEvent;
    var delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += (delta < 0 ? 0 : 0) * 30;
    e.preventDefault();
});





//  Resume Download Button //////////////////////////////////////////

const downloadBtn = document.querySelector('.download_btn');

downloadBtn.onmousemove = function (e) {
    const x = e.pageX - downloadBtn.offsetLeft;
    const y = e.pageY - downloadBtn.offsetTop;

    downloadBtn.style.setProperty('--x', x + 'px');
    downloadBtn.style.setProperty('--y', y + 'px');
}




//  Reveal section on scroll ////////////////////////////////////////////

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    else if (window.innerWidth < 600) {
        document.querySelector('#about_section').classList.remove('section-hidden');
        document.querySelector('.section-3').classList.remove('section-hidden');
        document.querySelector('.section-5').classList.remove('section-hidden');
    };
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.40,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
});






// Fading  out non targetted links//////////////////////////////////////////////

const menu = document.querySelector('.home_links');

const fadeOutOther = function (e, opacity) {
    if (e.target.classList.contains('link')) {
        const link = e.target;
        const sibiling = link.closest('.home_links').querySelectorAll('.link');

        sibiling.forEach(el => {
            if (el !== link) el.style.opacity = opacity;
        });
    };
}


menu.addEventListener('mouseover', function (e) {
    fadeOutOther(e, 0.5);
});

menu.addEventListener('mouseout', function (e) {
    fadeOutOther(e, 1);
});



//  Smooth Scrolling ////////////////////////////////////////////////////////////

document.querySelector('.home_links').addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        });
    }
});




document.querySelector('.menu-items').addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('l_link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        });
    }
});



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

//  Floating buttong Back to Top ///////////////////////////////////////////////////////////////////////

const floatingBtn = document.querySelector('.floating_btn');
const scrollValue = window.scrollY;


window.addEventListener('scroll', function () {
    floatingBtn.classList.toggle('active', window.scrollY > 600);
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};