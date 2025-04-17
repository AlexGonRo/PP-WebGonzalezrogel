(function($) {

	"use strict";

    // This one is for resizing the picture at the beginning
	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// Smooth scrolling to whatever element we click on the navigation bar.
	// Thanks to this function, we achieve two things: 1. We moved 70 pixels top of the section we chose, which looks nicer.
	// 2. It takes 500 milliseconds to move to wherever we click, which gives us more time than the default behaviour.
	var onePageClick = function() {
		$(document).on('click', '#navbar-options a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};
	onePageClick();

	// Navigation bar shows nicely when scrolling
	//  It does not show up for the first 350 pixels, then it pops-up.
	//	It also looks nicer when we are at the top, not taking the space of the first section
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.js-navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

})(jQuery);

// Make the elements fade in when you scroll down enough
document.addEventListener("blogEntriesLoaded", () => {	// This listener is waiting for an event of the section builders

	// Use Intersection Observer to determine if objects are within the viewport
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate__animated');
			entry.target.classList.add('animate__fadeInUp');
			entry.target.classList.add('animate__faster');
			entry.target.classList.remove("animate-object");
			observer.unobserve(entry.target);
			return;
		}
		});
	});

	// Get all the elements with the .animate class applied
	const allAnimatedElements = document.querySelectorAll('.animate-object');

	// Add the observer to each of those elements
	allAnimatedElements.forEach((element) => observer.observe(element));

}); 

// Some validations for my forms
const constraints = {
	emailSenderName: {
		presence: {allowEmpty: false}
	},
	emailSenderMail: {
		presence: {allowEmpty: false},
		email: true
	},
	emailSubject: {
		presence: {allowEmpty: false}
	},
	emailBody: {
		presence: {allowEmpty: false}
	}
};
const form = document.getElementById('contact-form');

form.addEventListener('submit', function (event) {
	const formValues = {
		emailSenderName: form.elements.emailSenderName.value,
		emailSenderMail: form.elements.emailSenderMail.value,
		emailSubject: form.elements.emailSubject.value,
		emailBody: form.elements.emailBody.value
	};

	const errors = validate(formValues, constraints); /*External library*/

	if (errors) {
		event.preventDefault();
		const errorMessage = Object
			.values(errors)
			.map(function (fieldValues) {
				return fieldValues.join(', ')
			})
			.join("\n");

		alert(errorMessage);
	}
}, false);

function onRecaptchaSuccess () {
	document.getElementById('contact-form').submit()
}

////////////////
// Go to top buttom
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";	// I need this one so the button does not show up the first time you load the page
	mybutton.classList.add('animate__fadeInUp');
	mybutton.classList.remove("animate__fadeOutDown");
  } else {
	if (mybutton.classList.contains('animate__fadeInUp')) {
		mybutton.classList.add('animate__fadeOutDown');
		mybutton.classList.remove("animate__fadeInUp");
	}
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



