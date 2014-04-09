// Avoid 'console' errors in browsers that lack a console.
(function() {
	var method;
	var noop = function noop() {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

/*
	GLOBALS
*/

var smallScreen = false;

/*
	RESPONSIVE
*/

// Test for media query support
if ( Modernizr.mq('only all') ) {

	$(function () {

		var smallScreenToggles = $('#page'),
			procedureSteps     = $('.procedure-step'),
			resizeDelay;

		function browserResize () {

			if ( Modernizr.mq('only screen and (max-width: 767px)') ) {
				if ( ! smallScreen ) {
					smallScreen = true;
					if ( ! smallScreenToggles.data('l5-collapsibleMenu') ) {
						// Initialize collapsible drawers
						smallScreenToggles.collapsibleMenu({ head: '.bobshouse:not(".drawer") > .block > .container > p.title', collapsible : '.content' });
						procedureSteps.collapsibleMenu({ head: '> .title', collapsible : '.content' });
					}
				}
			} else if ( smallScreen !== false ) {
				smallScreen = false;
				if ( smallScreenToggles.data('l5-collapsibleMenu') ) {
					// Remove collapsible drawers
					smallScreenToggles.collapsibleMenu('destroy');
					procedureSteps.collapsibleMenu('destroy');
				}
			}
		}

		// Initialize
		browserResize();

		$(window).resize(function() {
			// Clear unactualized timeout
			clearTimeout(resizeDelay);
			resizeDelay = setTimeout(function () {
				browserResize();
			}, 200);
		});

	});

}

/*
	DOM READY
*/

$(function () {

	

});

/*
	IMAGES LOADED
*/

$(window).bind('load', function() {

	
	
});
