'use strict';

var cur, last, startTime;

var weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	// Category page dropdown

	$('.adp').css('color', '#ababab');
	$('.adp-table').css('color', '#ababab');
	$('.adp-list').css('color', '#ababab');

	// Load more
	var category = $('.cat-name').text();
	var num = 1;
	var source   = '<li class="place"><a class="next place-link" id="{{uid}}" href="/places/' + category + '/{{uid}}">GO</a><div class="name">' +
									'<a class="open-down icon-uniF48B"></a><div class="title">{{place}}</div>' +
									'</div><div class="more-info"><div class="rating">{{rating}}</div>' +
									'<div class="hours"></div><div class="site">' +
									'<a href="{{site}}">{{site}}</a></div>'+
									'<div class="payment">{{#if payment}}Accepts credit cards{{else}}Cash only{{/if}}</div></div></li>';
	//var source   = '<li class="place"><div class="name"><a class="next" href="/places/{{category}}/{{index}}">GO</a><a class="open-down icon-uniF48B"></a><div class="title">{{place}}</div><div class="info" id="info-{{uid}}"><script>setDistanceTo("{{address}}", "info-{{uid}}");</script></div></div><div class="more-info"><div class="rating"><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star-half"></span></div><div class="hours">Today\'s hours: {{hours.friday.[0]}} - {{hours.friday.[1]}}</div><div class="site"><a href="{{site}}">{{site}}</a></div><div class="payment">{{#if payment}}Accepts credit cards{{else}}Cash only{{/if}}</div></div></li>';
	var template = Handlebars.compile(source);
	var counter = 0;
	var cLongitude, cLatitude;

	var ajaxObj = {
			data: {
				lon: function() { return cLongitude},
				lat: function() { return cLatitude},
				cat: category,
				start: function() { return counter; }
			},
			success: function(data) {
				$.each(data, function(i, d) {
					var html = $(template(d));
					html.appendTo('#places');
					html.find('.name').on('click', placeClick);
					html.find('.place-link').on('click', clickAnalytics);
					setDirectionAndDistanceTo(d.address, function(datax) {
						html.find('.name').append('<div class="info">' + datax + '</div>');
					});

					// ratings
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

					// hours
					var isOpen = calculateOpen(d);
					var opentimes = calculateOpenTime(d);
					$('.hours').last().html(((isOpen) ? "open" : "closed") + opentimes);
				});
				counter += 4;
				if (!data[0].hasNext) {
					$('.more').hide();
				}
				if (!startTime) {
					startTime = new Date().getTime();
				}
			}
	}

	getGeolocation(function(pos) {
		cLongitude = pos.coords.longitude;
		cLatitude = pos.coords.latitude;
		if (location.href.match(/category/g)) {
			$.ajax('/loadcat', ajaxObj);
		}
	});

	if ($('#map-panel').length) {
		google.maps.event.addDomListener(window, 'load', function() {
			setDisplayTo($('#address').text(), 'map-panel');
		});
	}
	
	if ($('#map-all-stores-panel').length) {
		google.maps.event.addDomListener(window, 'load', function() {
			var places = $.ajax({
				url: "/loadplaces?cat=" + $('.cat-name').text(),
				dataType: 'json',
				success: function(places) {
					setMultipleDestinationsTo(places, $('.cat-name').text(), 'map-all-stores-panel');
				}
			});
		});
	}

	if ($('.is-multipage').text() == false) $('.more').hide();

	$('.more a').click(function(e) {
		e.preventDefault();
		$.ajax('/loadcat', ajaxObj);
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

	$('.dir-link').click(function(e) {
		e.preventDefault();
		var start = getParameterByName('time');
		var cc = getParameterByName('cc');
		if (start) {
			var sTime = Number(start);
			var eTime = new Date().getTime();
			var duration = eTime - sTime;
			console.log('from-category' + cc);
			ga('send', 'timing', 'from-category' + cc, 'to-directions', duration, $('.uid').text());
		}
		location.href = $(this).attr('href');
	});

	var date = new Date();
	var today = weekday[date.getDay()];
	$('.' + today).css({fontWeight: 'bold'});

	if ($('#store-hrs').length) {
		var store = JSON.parse($('#store-hrs').text());
		console.log(store);
		var isOpen = calculateOpen(store);
		var opentimes = calculateOpenTime(store);
		$('#store-hrs').html(((isOpen) ? "open" : "closed") + opentimes);
		$('#store-hrs').show();
	}

	// flag button

	$('#flag').click(function(e) {
		var fader = '<div class="fader"></div>';
		var $fader = $(fader);
		var flagHTML = '<div id="flag-popup"><button type="button" id="fbut" class="close" aria-hidden="true">&times;</button>' +
									'<div class="act"><p>Do you want to flag this page?</p><button class="ok btn">Yes, this is not a mom and pop ' +
									'store.</button><button class="xx btn">No, I clicked this on accident.</button></div></div>';
		var $flagHTML = $(flagHTML);
		$fader.appendTo('body');
		$flagHTML.appendTo('body');
		$('.close, .fader, .xx').click(function(e) {
			$fader.remove();
			$flagHTML.remove();
		})
		$('.ok').click(function(e) {
			var replacedText = '<p>Thanks for reporting this place! We\'ll look into it.</p>'
			$('.act').html(replacedText);
		});
	});

});


function clickAnalytics(e) {
  e.preventDefault();
	var place = $(this).attr('id');
	ga('send', 'event', 'place', 'click', place);
	var clickedCat = ($('#cat2').length) ? "2" : "1";
	var loc = $(this).attr('href') + "?time=" + startTime;
	if ($('.cat-name').text() == 'coffee' || $('.cat-name').text() == 'desserts')
		loc += "&cc=" + clickedCat;
	location.href = loc;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function placeClick(e) {
	var curIcon = $(this).parent().find('.open-down');
	if (cur) {
		if (cur.ic.get(0) == curIcon.get(0)) { // same button pressed
			if (cur.ic.hasClass('icon-uniF48B')) cur.ic.removeClass('icon-uniF48B').addClass('icon-uniF48A');
			else if (cur.ic.hasClass('icon-uniF48A')) cur.ic.removeClass('icon-uniF48A').addClass('icon-uniF48B');
			cur.slideToggle();
		} else { //different button
			cur.ic.removeClass('icon-uniF48A').addClass('icon-uniF48B');
			cur.slideUp();
			cur = $(this).siblings('.more-info');
			cur.ic = curIcon;
			cur.slideDown();
			curIcon.removeClass('icon-uniF48B').addClass('icon-uniF48A');
		}
	} else {
		cur = $(this).siblings('.more-info');
		cur.ic = curIcon;
		cur.slideDown();
		curIcon.removeClass('icon-uniF48B').addClass('icon-uniF48A');
	}
}



function timeformat(time) { // form: 6:00p, 12:00a, etc.
	var ampm = time.charAt(time.length - 1);
	var hour = Number(time.slice(0, time.indexOf(':')));
	if (ampm == 'p') hour += 12;
	var min = time.slice(time.indexOf(':') + 1, time.length - 1);
	return hour + ":" + min + ":" + "00";
}

function calculateOpen(store) {
	var date = new Date();
	var today = weekday[date.getDay()];
	var time = date.getTime();
	var storetime = store.hours[today];
	var open = false;
	var curDate = date.getFullYear() + "-" + ((date.getMonth().toString().length == 1) ? "0" : "") + date.getMonth() + "-" + ((date.getMonth().toString().length == 1) ? "0" : "") + date.getDate();
	var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
	var tmDate = tomorrow.getFullYear() + "-" + ((date.getMonth().toString().length == 1) ? "0" : "") + tomorrow.getMonth() + "-" + ((date.getMonth().toString().length == 1) ? "0" : "") + tomorrow.getDate();
	if (storetime[0] == '24h') return true;
	else if (storetime[0] == '0h') return false;
	else {
		for (var i = 0; i < storetime.length; i+=2) {
			/* var opentime = Date.parse(curDate + "T" + timeformat(storetime[i]));
			var closetime = Date.parse(curDate + "T" + timeformat(storetime[i+1]));
			if (storetime[i+1].slice(-1) == 'a') closetime = Date.parse(tmDate + "T" + timeformat(storetime[i+1]));
			console.log(time.toString());
			console.log(opentime.toString());
			console.log(closetime.toString()); */
			var opentime = Date.parse(date.toDateString() + " " + timeformat(storetime[i]));
			var closetime = Date.parse(date.toDateString() + " " + timeformat(storetime[i+1]));
			if (storetime[i+1].slice(-1) == 'a') closetime = Date.parse(tomorrow.toDateString() + " " + timeformat(storetime[i+1]));
			if (time > opentime && time < closetime) return true;
		}
		return false;
	}
}

function calculateOpenTime(store) {
	var date = new Date();
	var today = weekday[date.getDay()];
	var storetime = store.hours[today];
	if (storetime[0] == '24h') return " (24 hours)";
	else if (storetime[0] == '0h') return " (not open today)";
	else {
		var str = " (hours today: ";
		for (var i = 0; i < storetime.length; i+=2) {
			var opentime = storetime[i];
			var closetime = storetime[i+1];
			if (i > 0) str += "; ";
			str += opentime + " - " + closetime;
		}
		str += ")";
		return str;
	}
}