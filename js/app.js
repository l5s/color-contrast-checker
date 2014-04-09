/*
	APP OBJECT
*/

var appJS = ( function() {

	// PRIVATE
	var _jsDirPath = 'js/';

	// PUBLIC
	return {
		init: function() {

			librariesJS.init();
			pluginsJS.init();
			yepNope.init();

			// Load common Javascript
			$.ajax({ url: appJS.getJSPath() + 'app/common.js', async: false });

			return true;
		},
		getJSPath: function() {
			return _jsDirPath;
		}
	};

})();

/*
	LIBRARIES
*/

var librariesJS = ( function() {

	return {
		init: function() {
			$.ajax({ url: appJS.getJSPath() + 'lib/modernizr-2.6.2.js', async: false });
		}
	};

})();

/*
	PLUGINS
*/

var pluginsJS = ( function() {

	return {
		init: function() {
			$.ajax({ url: appJS.getJSPath() + 'plugins/jquery.validate.1.11.1.min.js', async: false });
			$.ajax({ url: appJS.getJSPath() + 'plugins/jquery-l5-color-contrast-1.0.js', async: false });
			$.ajax({ url: appJS.getJSPath() + 'plugins/jquery-l5-carousel-3.2.js', async: false });
			$.ajax({ url: appJS.getJSPath() + 'plugins/jquery-l5-overlay-3.7.js', async: false });
			$.ajax({ url: appJS.getJSPath() + 'plugins/jquery-l5-collapsible-3.0.js', async: false });
		}
	};

})();

/*
	CONDITIONAL JAVASCRIPT
*/

var yepNope = ( function() {

	return {
		init: function() {
			yepnope({
				test: $('form.validate').length,
				yep : appJS.getJSPath() + 'app/validation.js'
			});
			yepnope({
				test: $('.show-grid-lines').length,
				yep : appJS.getJSPath() + 'app/show-grid-lines.js'
			});
			yepnope({
				test: $('ul.palette').length,
				yep : appJS.getJSPath() + 'app/color-contrast-chart.js'
			});
		}
	};

})();

/*
	INITIALIZE APP
*/

$(function() {
	appJS.init();
});
