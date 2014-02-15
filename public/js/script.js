'use strict';

var cur;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	//$.getScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true');
	//$.getScript('/js/map.js');
	
	// Category page dropdown
	$('.place').click(placeClick);

	$('.adp').css('color', '#ababab');
	$('.adp-table').css('color', '#ababab');
	$('.adp-list').css('color', '#ababab');

	// Load more
	var category = $('.cat-name').text();
	var num = 1;
	//var source   = '<li class="place"><div class="name"><a class="next" href="/places/{{category}}/{{index}}">GO</a><a class="open-down icon-uniF48B"></a><div class="title">{{place}}</div><div class="info">{{direction}} {{distance}} mi</div></div><div class="more-info"><div class="rating"><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star-half"></span></div><div class="hours">Today\'s hours: {{hours.friday.[0]}} - {{hours.friday.[1]}}</div><div class="site"><a href="{{site}}">{{site}}</a></div><div class="payment">{{#if payment}}Accepts credit cards{{else}}Cash only{{/if}}</div></div></li>';
	var source   = '<li class="place"><div class="name"><a class="next" href="/places/{{category}}/{{index}}">GO</a><a class="open-down icon-uniF48B"></a><div class="title">{{place}}</div><div class="info" id="info-{{place}}"><script>setDistanceTo("{{address}}", "info-{{place}}");</script></div></div><div class="more-info"><div class="rating"><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star-half"></span></div><div class="hours">Today\'s hours: {{hours.friday.[0]}} - {{hours.friday.[1]}}</div><div class="site"><a href="{{site}}">{{site}}</a></div><div class="payment">{{#if payment}}Accepts credit cards{{else}}Cash only{{/if}}</div></div></li>';
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
				$('.place').last().on('click', placeClick);
			}
			if (!data[0].hasNext) {
				$('.more').hide();
			}
			num++;
		});
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