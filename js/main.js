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

   // Show the navigation bar
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#navbar-options').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();

	// More navigation bar
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

	// Show the options in the navigation bar 
	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});

	// Navigation bar shows nicely when scrolling
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

	// Something with the animations.
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-object').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animate-objectd') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-object.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animate-objectd');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animate-objectd');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animate-objectd');
							} else {
								el.addClass('fadeInUp animate-objectd');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

})(jQuery);

