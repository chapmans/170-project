'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	var cur;
	$('.place').click(function(e) {
		var curIcon = $(this).find('.open-down');
		console.log($(this).find('.open-down'));
		if (cur && cur.th == this) {
			if (curIcon.hasClass('icon-uniF48B')) {
				curIcon.removeClass('icon-uniF48B').addClass('icon-uniF48A');
			}
			else if (curIcon.hasClass('icon-uniF48A')) {
				curIcon.removeClass('icon-uniF48A').addClass('icon-uniF48B');
			}
			cur.slideToggle();
		}
		else {
			cur = $(this).children('.more-info');
			cur.th = this;
			cur.slideDown();
			curIcon.removeClass('icon-uniF48B').addClass('icon-uniF48A');
		}
	});
});