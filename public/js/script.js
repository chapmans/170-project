'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	
	// Category page dropdown
	var cur;
	$('.place').click(function(e) {
		var curIcon = $(this).find('.open-down');
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

	// Load more
	var category = $('.cat-name').text();
	var num = 1;
	var source   = '<li class="place"><div class="name"><a class="next" href="/places/{{../category}}/{{index}}">GO</a><a class="open-down icon-uniF48B"></a><div class="title">{{place}}</div><div class="info">{{direction}} {{distance}} mi</div></div><div class="more-info"><div class="rating"><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star-half"></span></div><div class="hours">Todays hours: {{hours.friday.[0]}} - {{hours.friday.[1]}}</div><div class="site"><a href="{{site}}">{{site}}</a></div><div class="payment">{{#if payment}}Accepts credit cards{{else}}Cash only{{/if}}</div></div></li>';
	var template = Handlebars.compile(source);

	$('.more a').click(function(e) {
		e.preventDefault();
		$.get('/loadmore', {name: category, start: num}, function(data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				data[i].category = category;
				data[i].index = i;
				var html = template(data[i]);
				$('#places').append(html);
			}
			if (!data[0].hasNext) {
				$('.more').hide();
			}
			num++;
		});
	});

});