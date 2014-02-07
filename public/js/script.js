'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	var cur;
	$('.open-down').click(function() {
		if (cur && cur.th != this) { cur.slideUp(); }
		cur = $(this).parents().children('.more-info');
		cur.th = this;
		cur.slideDown();
	});
});