 'use strict'

 const btnsOpenModal = document.querySelectorAll(".btn--open-modal");
 const btnCloseModal = document.querySelector(".btn--close-modal");
 const modal = document.querySelector(".modal");
 const overlay = document.querySelector(".overlay");
 const nav = document.querySelector(".nav");
 const btnNext = document.querySelector(".btn-next");



 //  Modal Window
 const openModal = function (e) {
     e.preventDefault();
     modal.classList.remove('hidden');
     overlay.classList.remove('hidden');
 };

 const closeModal = function () {
     modal.classList.add('hidden');
     overlay.classList.add('hidden');
 };


 btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
 btnCloseModal.addEventListener('click', closeModal);
 overlay.addEventListener('click', closeModal);
 btnNext.addEventListener('click', closeModal);

 document.addEventListener('keydown', function (e) {
     if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
         closeModal();
     }
 })


 //  Scrolling for learn more button //

 const btnScrollTo = document.querySelector('.btn--scroll-to');
 const section1 = document.querySelector('#section--2');

 btnScrollTo.addEventListener('click', function (e) {
     const s1coords = section1.getBoundingClientRect();

     // old Model for scrolling //
     // window.scrollTo({
     //     left: s1coords.left + window.pageXOffset,
     //     top: s1coords.top + window.pageYOffset,
     //     behaviour: 'smooth',
     // });

     section1.scrollIntoView({
         behavior: 'smooth'
     });
 });


 //  Page Navigation //

 // document.querySelectorAll('.feature').forEach(function (el) {
 //     el.addEventListener('click', function (e) {
 //         e.preventDefault();
 //         const id = this.getAttribute('href');
 //         document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
 //     });
 // });


 // delegation method for page navigation//

 document.querySelector('.menu-links').addEventListener('click', function (e) {
     e.preventDefault();

     if (e.target.classList.contains('feature')) {
         const id = e.target.getAttribute('href');
         document.querySelector(id).scrollIntoView({
             behavior: 'smooth'
         });
     }
 });


 // TRAVELLERS VIEW FUNCTION//

 const tabs = document.querySelectorAll('.btn-1');
 const tabsContainer = document.querySelector('.btns');
 const tabsContent = document.querySelectorAll('.operations__content');

 tabsContainer.addEventListener('click', function (e) {
     const clicked = e.target.closest('.btn-1');
     if (!clicked) return;

     // removing active classes //

     tabs.forEach(t => t.classList.remove('operations__tab--active'));
     tabsContent.forEach(c => c.classList.remove('operations__content--active'));
     clicked.classList.add('operations__tab--active');

     // activate content area //
     document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

 });



 // FADING OUT THE NON TARGETTED MENU LINKS//

 const menu = document.querySelector('.menu-links');

 const fadeOutOther = function (e, opacity) {
     if (e.target.classList.contains('feature')) {
         const link = e.target;
         const sibiling = link.closest('.menu-links').querySelectorAll('.feature');

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


 //  STICKY NAVIGATION //

 // const initialCoords = section1.getBoundingClientRect();

 // window.addEventListener('scroll', function (e) {
 //     if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
 //     else nav.classList.remove('sticky');
 // });


 //  Sticky navigation with intersection method //

 const header = document.querySelector('.section-1');

 const stickyNav = function (entries) {
     const [entry] = entries;

     if (!entry.isIntersecting) nav.classList.add('sticky');
     else nav.classList.remove('sticky');
 };

 const headerObserver = new IntersectionObserver(stickyNav, {
     root: null,
     threshold: 0,
     rootMargin: '-90px',
 });

 headerObserver.observe(header);


 // REVEAL SECTION //

 const allSections = document.querySelectorAll('.section');

 const revealSection = function (entries, observer) {
     const [entry] = entries;

     if (!entry.isIntersecting) return;
     entry.target.classList.remove('section-hidden');
     observer.unobserve(entry.target);
 };

 const sectionObserver = new IntersectionObserver(revealSection, {
     root: null,
     threshold: 0.10,
 });

 allSections.forEach(function (section) {
     sectionObserver.observe(section);
     section.classList.add('section-hidden');
 })


 //  LAZY LOADING IMAGES //

 const imageTarget = document.querySelectorAll('img[data-src]');

 const loadImg = function (entries, observer) {
     const [entry] = entries;

     if (!entry.isIntersecting) return;

     // replace src with data src
     entry.target.src = entry.target.dataset.src;
     entry.target.addEventListener('load', function () {
         entry.target.classList.remove('lazy-img');
     });
     observer.unobserve(entry.target);
 };

 const imgObserver = new IntersectionObserver(loadImg, {
     root: null,
     threshold: 0.2,
 });

 imageTarget.forEach(img => imgObserver.observe(img));


 //  TESTIMONIAL SLIDER FUNCTION //

 const slides = document.querySelectorAll('.slide');
 const btnLft = document.querySelector('.slider__btn--left');
 const btnRgt = document.querySelector('.slider__btn--right');
 const dotContainer = document.querySelector('.dots');


 let curSlide = 0;
 const maxSlide = slides.length;

 const createDots = function () {
     slides.forEach(function (_, i) {
         dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
     });
 };
 createDots();

 const activateDot = function (slide) {
     document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
     document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
 };

 activateDot(0);

 const goToSlide = function (slide) {
     slides.forEach(
         (s, i) => (s.style.transform = `translateX(${150 * (i - slide)}%)`)
     );
 };
 goToSlide(0);

 const nextSlide = function () {
     if (curSlide === maxSlide - 1) {
         curSlide = 0;
     } else {
         curSlide++;
     }
     goToSlide(curSlide);
     activateDot(curSlide);
 }

 const prevSlide = function () {
     if (curSlide === 0) {
         curSlide = maxSlide;
     } else {
         curSlide--;
         goToSlide(curSlide);
         activateDot(curSlide);
     }
 };

 btnRgt.addEventListener('click', nextSlide);

 btnLft.addEventListener('click', prevSlide);

 document.addEventListener('keydown', function (e) {
     if (e.key === 'ArrowLeft') prevSlide();
     if (e.key === 'ArrowRight') nextSlide();
 });

 dotContainer.addEventListener('click', function (e) {
     if (e.target.classList.contains('dots__dot')) {
         const {
             slide
         } = e.target.dataset;
         goToSlide(slide);
         activateDot(slide);
     };
 });



 // Menu box section //////////////////////////////////////////////////////

 const menuSectionBtn = document.querySelector('.menu-btn-icon');
 const menuSectionBox = document.querySelector('.menu-section-box')
 const menuSectionClose = document.querySelector('.menu-section-close')
 const menuBoxLink = document.querySelectorAll('.menu-box-link')

 menuSectionBtn.addEventListener('click', function () {
     menuSectionBox.classList.remove('hidden')
 })

 menuSectionClose.addEventListener('click', function () {
     menuSectionBox.classList.add('hidden')
 })

 menuBoxLink.forEach(link => {
     link.addEventListener('click', function () {
         menuSectionBox.classList.add('hidden')
     })
 })