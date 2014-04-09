/*
	DOM READY
*/

$(function () {

	var showLines = $('.show-grid-lines');

	showLines.children('button').click(function(e) {
		e.preventDefault();
		toggleGridLines();
	});

	function toggleGridLines() {
		var leftPos = 0;
		showLines.children('.line').each(function() {

			var line        = $(this),
				page        = $('#page'),
				height      = page.height(),
				totalWidth  = page.children('.container').first().width(),
				gutterWidth = 10,
				addWidth    = (totalWidth - (gutterWidth * 24)) / 12;

			// Show Lines
			if (!showLines.hasClass('active'))
			{
				line
					.css('left', leftPos)
					.animate({
						height: height,
					}, 500);

				if (line.hasClass('gutter'))
					leftPos += gutterWidth;
				else
					leftPos += addWidth;
			}
			// Hide lines
			else
			{
				line
					.animate({
						height: '0',
					}, 500, function() {
						line.css('left', '0');
					});
			}
			
		});
		showLines.toggleClass('active');
	}

});
