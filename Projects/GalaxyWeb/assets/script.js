console.log("Hello world!");

const myName = 'Ram';
const h1 = document.querySelector(".hero-section");
console.log(myName);
console.log(h1);




const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
console.log(currentYear);
yearEl.textContent = currentYear;




const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener('click', function() {
	headerEl.classList.toggle('nav-open');
});



/////////////////// Smooth Scrolling animation //////////////////////////


const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function(link){
	link.addEventListener('click', function(e){
		e.preventDefault();
		const href = link.getAttribute("href")
		console.log(href);

///scroll back to top///

	if (href === "#")
	window.scrollTo({
		top:0,
		behavior: "smooth",
	});


/// scroll to other link ///
	if (href !== "#" && href.startsWith("#")) {
		const sectionEl = document.querySelector(href);
		sectionEl.scrollIntoView({behavior:"smooth"});
	}

	// close mobile nav //

	if(link.classList.contains('main-nav-link'))
		headerEl.classList.toggle('nav-open');	
	});
	});
