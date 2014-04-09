/*
	FORM VALIDATION DEFAULTS
*/

// Set form validation messages
$.extend($.validator.messages, {
		required: 'Invalid',
		email: 'Email Address Invalid'
});

// Form validation properties
$.validator.setDefaults({
	errorElement: 'label',
	onfocusout: function(element) { $(element).valid(); },
	onclick: function(element) { $(element).valid(); },
	invalidHandler: function(event, validator) {
		var errors = validator.numberOfInvalids(),
			form   = $(validator.currentForm),
			box    = form.find('.error-message');
		if (errors) {
			var message = errors == 1 ? 'You missed 1 field. It has been highlighted' : 'You missed ' + errors + ' fields. They have been highlighted';
			// If error message already exists
			if (box.length > 0) {
				box.children('p').text(message);
			}
			else {
				form.prepend('<div class="error-message"><p>' + message + '</p></div>');
			}
		} else {
			box.remove();
		}
	},
	errorPlacement: function(error, element) {
		// No inline errors
		if (element.parents('form').hasClass('no-inline-errors'))
		{
			return false;
		}
		// Stacked Fields
		else if (element.parents('.field').hasClass('stack'))
		{
			// Radio buttons and checkboxes
			if (element.is(':radio') || element.is(':checkbox'))
			{
				element.parents('.field').children('label:first').append(error.addClass('multi'));
			}
			else
			{
				element.prev('label').after(error);
			}
		}
		// Default Fields
		else
		{
			// Radio buttons and checkboxes
			if (element.is(':radio') || element.is(':checkbox'))
			{
				element.parents('.field').children('label:first').append(error.addClass('multi'));
			}
			// Input with no label
			else if (element.hasClass('no-label'))
			{
				element.parent().append(error);
			}
			else
			{
				element.parent('.field').append(error);
			}
		}
	},
	submitHandler: function(form) {
		$(form).hide();
		var loading = $('<div class="loading"><span class="animation"></span></div>').insertAfter(form);
		if ($(form).hasClass('no-submit'))
			return false;
		form.submit();
	}
});

/*
	DOM READY
*/

$(function () {

	/*
		FORMS
	*/
	
	$('form.validate').each(function() {
		var form = $(this);
		var validator = form.validate();
		// Reset form
		$('button[type=reset]',form).click(function() {
			$(validator.currentForm).find('.error-message').remove();
			validator.resetForm();console.log($(this));
		});
	});

});
