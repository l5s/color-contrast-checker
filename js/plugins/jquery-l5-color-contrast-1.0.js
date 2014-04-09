(function($) {

	$.widget('l5.color_contrast_checker', {

		// Default options
		options: {
			
			colorList : 'ul.palette',
			tableClass : '.tile .color-contrast',
			tablePlacement : 'ul.palette',
			tableToggleClass: 'show-all',
			
			// Callbacks
			init : function () {}
			
		},
		// Set up the widget
		_create: function() {

			/*
				RGB TO HEX
			*/

			function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16);}
			function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16);}
			function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16);}
			function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h;}

			function getHexValues(h) {
				var rVal, gVal, bVal, returnVal;

				rVal = hexToR(h);
				gVal = hexToG(h);
				bVal = hexToB(h);
				returnVal = {R:rVal, G:gVal, B:bVal};
				return returnVal;
			}

			/*
				LUMINANCE FORMULA
			*/

			function luminanace(r, g, b) {
				var a = [r,g,b].map(function(v) {
					v /= 255;
					return (v <= 0.03928) ?
						v / 12.92 :
					Math.pow( ((v+0.055)/1.055), 2.4 );
				});
				return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
			}

			/*
				Build the table
			*/

			var contrast_checker  = this,
				palette           = contrast_checker.options.colorList,
				colors            = [],
				contrastTable     = $('<table></table>').addClass(contrast_checker.options.tableClass.replace(/\./g,'')),
				contrastTableHead = $('<thead></thead>'),
				contrastTableBody = $('<tbody></tbody>'),
				contrastTableFoot = $('<tfoot></tfoot>');

			// Add white and black
			colors.push({ hex: '#ffffff', color: 'white', textColor: '#666666' });
			colors.push({ hex: '#000000', color: 'black', textColor: '#000000' });

			$('> li', palette).each(function() {

				var i     = $(this),
					hex   = i.find('.hex').text(),
					color = i.find('small').text().replace(/\s+/g, '-').toLowerCase();

				colors.push({
					hex: hex,
					color: color,
					textColor: hex
				});

			});

			function buildTableHead()
			{
				var html;
				$(colors).each(function (i, row) {
					$(row).each(function (j, col) {
						html += '<th style="color: ' + colors[i].textColor + ';">' + colors[i].hex + '</th>';
					});
				});
				contrastTableHead.append('<tr><th>Color</th>' + html + '</tr>');
			}

			function buildTableBody()
			{
				var html,
					num = 0;

				for (var i = 0; i < colors.length; i++)
				{
					for (var j = 0; j < colors.length; j++)
					{
						html += '<td style="color: ' + colors[num].hex + '; background-color:' + colors[j].hex + ';">' + colors[num].hex + '</td>';
					}
					contrastTableBody.append('<tr><td style="color: ' + colors[num].textColor +';">' + colors[num].hex + '</td>' + html + '</tr>');
					html = '';
					num++;
				}
			}

			function buildTableFoot()
			{
				contrastTableFoot.append('<tr><td colspan="4"><button class="toggle">Toggle Fade</button></td></tr>');
			}

			// Build the table...
			buildTableHead();
			buildTableBody();
			buildTableFoot();

			// Glue the table together...
			contrastTable.append(contrastTableHead);
			contrastTable.append(contrastTableBody);
			contrastTable.append(contrastTableFoot);

			// Place table on page
			contrastTable.insertAfter(contrast_checker.options.tablePlacement);


			/*
				Designate passing colors
			*/

			$('table.color-contrast').each(function() {

				var table = $(this);

				// Grab each row that needs checked
				$('> tbody > tr', table).each(function() {

					var row = $(this);

					// Grab each cell that needs checked
					$('> td:not(:first)', row).each(function() {

						var cell       = $(this),
							background = cell.css('background-color'),
							foreground = cell.css('color'),

							// Background colors
							backgroundColors = background.substring(background.indexOf('(') + 1, background.lastIndexOf(')')).split(/,\s*/),
							backgroundRed    = backgroundColors[0],
							backgroundGreen  = backgroundColors[1],
							backgroundBlue   = backgroundColors[2],

							// Foreground colors
							foregroundColors = foreground.substring(foreground.indexOf('(') + 1, foreground.lastIndexOf(')')).split(/,\s*/),
							foregroundRed    = foregroundColors[0],
							foregroundGreen  = foregroundColors[1],
							foregroundBlue   = foregroundColors[2];

							// Ratio formula
							contrastRatio = ((luminanace(backgroundRed, backgroundGreen, backgroundBlue) + 0.05) / (luminanace(foregroundRed, foregroundGreen, foregroundBlue) + 0.05));

						// Place ratio in cell
						cell.text(Math.round(contrastRatio * 100) / 100);

						// Mark cells with ratios that pass
						if (contrastRatio >= 3 || contrastRatio <= 0.33)
							cell.addClass('pass');

						// Designate white backgrounds
						if (background === 'rgb(255, 255, 255)')
							cell.addClass('on-white');
						
					});

				});

				// Toggle fade
				var button = table.children('tfoot').find('button.toggle');

				button.click(function(e) {console.log('test');
					e.preventDefault();
					table.toggleClass('show-all');
				});

			});

		}
 
	});

}(jQuery));
