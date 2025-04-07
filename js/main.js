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


	document.addEventListener("DOMContentLoaded", () => {

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

})(jQuery);


