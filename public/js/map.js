// --------------------------------------------------------
// Functions used in other files
// --------------------------------------------------------

//function removeInvalidChars(str) {
	//return str.replace(/\W/g, '');
//}

// --------------------------------------------------------
// Helper functions
// --------------------------------------------------------

function handleNoGeolocation() {
	alert('Your browser does not support geolocation.')
}

function getGeolocation(callback) {
	if(navigator.geolocation)
		navigator.geolocation.getCurrentPosition(callback, handleNoGeolocation, {}); 
	else
		handleNoGeolocation();
}

function getCurrentLocation(pos) {
	var currentLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	return currentLocation;
}

function getLatLng(place) {
	// TODO: latitude and longitude are flipped in json?
	var latlng = new google.maps.LatLng(place.longitude, place.latitude);
	return latlng;
}

///////////////////////////////////////////////////////////////////////////////

function setMultipleDestinationsTo(places, category, elementId) {
	getGeolocation(function(pos) {
		renderMultipleDestinationMap(places, category, elementId, pos);
	});
}

function renderMultipleDestinationMap(places, category, elementId, pos) {
	console.log(getLatLng(places[0]));
	map = new google.maps.Map(document.getElementById(elementId), {
		zoom: 10,
		center: getCurrentLocation(pos),
		content: 'Location found using HTML5.'
	});

	for(var i = 0; i < places.length; i++) {
		var marker = new google.maps.Marker({
			position: getLatLng(places[i]),
			map: map,
			title: places[i].place
		});

		var category = category;
		var place = places[i];

		renderDestination(places[i], map, category, marker);
	}
	if (!startTime) {
		startTime = new Date().getTime();
	}
}

function renderDestination(place, map, category, marker) {
	console.log("in renderdestination");
	google.maps.event.addListener(marker, 'click', function() {
		console.log("clicked marker");
		var url = "/places/" + category + "/" + place.uid;

		var rating = Number(place.rating);
		var stars = '<div class="stars">';
		var isOpen = calculateOpen(place);
		var opentimes = calculateOpenTime(place);
		var opentext = '<div class="open">' + ((isOpen) ? "open" : "closed") + opentimes+ "</div>";
		while (rating > 0.6) {
			stars += '<span class="icon-star"></span>';
			rating -= 1;
		}
		if (rating < 0.6 && rating > 0.4) {
			stars += '<span class="icon-star-half"></span>';
		}
		stars += '</div>';

		var addedString = '<div class="place"><a class="place-link" id="'+ place.uid + '" href="' + url + '">' + 
			place.place + '</a>' + opentext + stars + '</div>';
		var $addedString = $(addedString);
		$addedString.find('.place-link').on('click', clickAnalytics);

		var infowindow = new google.maps.InfoWindow({
			content: $addedString[0]
		});
    infowindow.open(map,marker);
	});
}

///////////////////////////////////////////////////////////////////////////////

function setDisplayTo(destination, elementId) {
	getGeolocation(function(pos) {
		renderDisplay(destination, elementId, pos);
	});
}

function renderDisplay(destination, elementId, pos) {
	renderer = new google.maps.DirectionsRenderer();
	map = new google.maps.Map(document.getElementById(elementId), {
		zoom: 7,
		content: "Location found using HTML5."
	});
	renderer.setMap(map);

	var request = {
		origin: getCurrentLocation(pos), 
		destination: destination,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	var directionsService = new google.maps.DirectionsService();
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			renderer.setDirections(response);
 		}

		var route = response.routes[0].legs[0];

		var appendString = '<h4>Start from: ' + route.start_address + '</h4><ol>';
		for (var i = 0; i < route.steps.length; i++) {
			appendString += '<li>' + route.steps[i].instructions + '</li>';
		}
		appendString += '</ol><h4>End at: ' + route.end_address + '</h4>';

		$('#directions').append(appendString);
	});
}

///////////////////////////////////////////////////////////////////////////////

function setDirectionAndDistanceTo(destination, callback) {
	getGeolocation(function(response) {
			setDirectionAndDistanceToHelper(destination, response, callback);
	});
}

function getDirection(start, end) {
	var lat = 'd';
	var lng = 'e';
	if(end[lat] > start[lat]) { // north
		if(end[lng] > start[lng]) { // east
			return 'northeast';
		} else { // west
			return 'northwest';
		}
	} else { // south
		if(end[lng] > start[lng]) { // east
			return 'southeast';
		} else { // west
			return 'southwest';
		}
	}
}

function setDirectionAndDistanceToHelper(end, pos, callback) {
	var request = {
		origin: getCurrentLocation(pos),
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	var directionsService = new google.maps.DirectionsService();
	directionsService.route(request, function(response, status) {
		var distance = response.routes[0].legs[0].distance.text;
		var start_location = response.routes[0].legs[0].start_location;
		var end_location = response.routes[0].legs[0].end_location;
		var direction = getDirection(start_location, end_location);
		var time = response.routes[0].legs[0].duration.text;
		callback(direction + " " + distance + " (" + time + ")");
	});
}

///////////////////////////////////////////////////////////////////////////////

function setDistanceMagnitudeTo(destination, elementId) {
	getGeolocation(function(response) {
			setDirectionMagnitudeHelper(destination, elementId, response);
	});
}

function setDirectionMagnitudeHelper(end, elementId, pos) {
	var current_loc_latitude = pos.coords.latitude;
	var current_loc_longitude = pos.coords.longitude;

	var request = {
		origin: getCurrentLocation(pos),
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	var directionsService = new google.maps.DirectionsService();
	directionsService.route(request, function(response, status) {
		var element = document.getElementById(elementId);

		var start_latitude = response.routes[0].legs[0].start_location['d'];
		var start_longitude = response.routes[0].legs[0].start_location['e'];

		var end_latitude = response.routes[0].legs[0].end_location['d'];
		var end_longitude = response.routes[0].legs[0].end_location['e'];

		element.innerText = getDistanceMagnitude(start_latitude, start_longitude, end_latitude, end_longitude);
	});
}

function getDistanceMagnitude(start_latitude, start_longitude, end_latitude, end_longitude) {
	var magnitude_start = sqrt((start_latitude * start_latitude) + (start_longitude * start_longitude));
	var magnitude_end = sqrt((end_latitude * end_latitude) + (end_longitude * end_longitude));

	return abs(magnitude_end - magnitude_start);
}

///////////////////////////////////////////////////////////////////////////////
