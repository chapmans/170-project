// --------------------------------------------------------
// Functions used in other files
// --------------------------------------------------------

//function removeInvalidChars(str) {
	//return str.replace(/\W/g, '');
//}

function setDisplayTo(destination, elementId) {
	getGeolocation(function(pos) {
		renderDisplay(destination, elementId, pos);
	});
}

function setDirectionAndDistanceTo(destination, elementId) {
	getGeolocation(function(response) {
	    setDirectionAndDistanceToHelper(destination, elementId, response);
	});
}

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

function setDirectionAndDistanceToHelper(end, elementId, pos) {
	var request = {
		origin: getCurrentLocation(pos),
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	var directionsService = new google.maps.DirectionsService();
	directionsService.route(request, function(response, status) {
		var element = document.getElementById(elementId);
		var distance = response.routes[0].legs[0].distance.text;
		var start_location = response.routes[0].legs[0].start_location;
		var end_location = response.routes[0].legs[0].end_location;
		var direction = getDirection(start_location, end_location);
		element.innerText = direction + " " + distance;
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