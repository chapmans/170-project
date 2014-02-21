'use strict';

var cur;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	// Category page dropdown
	$('.place .name').click(placeClick);

	$('.adp').css('color', '#ababab');
	$('.adp-table').css('color', '#ababab');
	$('.adp-list').css('color', '#ababab');

	// Load more
	var category = $('.cat-name').text();
	var num = 1;
	var source   = '<li class="place"><a class="next" href="/places/{{category}}/{{index}}">GO</a><div class="name">' +
									'<a class="open-down icon-uniF48B"></a><div class="title">{{place}}</div><div class="info">' +
									'{{direction}} {{distance}} mi</div></div><div class="more-info"><div class="rating">{{rating}}</div>' +
									'<div class="hours">Today\'s hours: {{hours.friday.[0]}} - {{hours.friday.[1]}}</div><div class="site">' +
									'<a href="{{site}}">{{site}}</a></div>'+
									'<div class="payment">{{#if payment}}Accepts credit cards{{else}}Cash only{{/if}}</div></div></li>';
	//var source   = '<li class="place"><div class="name"><a class="next" href="/places/{{category}}/{{index}}">GO</a><a class="open-down icon-uniF48B"></a><div class="title">{{place}}</div><div class="info" id="info-{{uid}}"><script>setDistanceTo("{{address}}", "info-{{uid}}");</script></div></div><div class="more-info"><div class="rating"><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star-half"></span></div><div class="hours">Today\'s hours: {{hours.friday.[0]}} - {{hours.friday.[1]}}</div><div class="site"><a href="{{site}}">{{site}}</a></div><div class="payment">{{#if payment}}Accepts credit cards{{else}}Cash only{{/if}}</div></div></li>';
	var template = Handlebars.compile(source);

	if ($('.is-multipage').text() == false) $('.more').hide();

	$('.more a').click(function(e) {
		e.preventDefault();
		$.get('/loadmore', {name: category, start: num}, function(data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				data[i].category = category;
				data[i].index = num*4 + i;
				var html = template(data[i]);
				$('#places').append(html);
				$('.place .name').last().on('click', placeClick);
				$('.place').last().find('.rating').each(function() {
					var rating = Number($(this).text());
					var stars = "";
					while (rating > 0.6) {
						stars += '<span class="icon-star"></span>';
						rating -= 1;
					}
					if (rating < 0.6 && rating > 0.4) {
						stars += '<span class="icon-star-half"></span>';
					}
					$(this).html(stars);
				});
			}
			if (!data[0].hasNext) {
				$('.more').hide();
			}
			num++;
		});
	});

	$('.rating').each(function() {
		var rating = Number($(this).text());
		var stars = "";
		while (rating > 0.6) {
			stars += '<span class="icon-star"></span>';
			rating -= 1;
		}
		if (rating < 0.6 && rating > 0.4) {
			stars += '<span class="icon-star-half"></span>';
		}
		$(this).html(stars);
	});
});

function placeClick(e) {
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
}