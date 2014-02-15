function handleNoGeolocation() {
	alert('Your browser does not support geolocation.')
}

function getGeolocation(callback) {
	if(navigator.geolocation)
		navigator.geolocation.getCurrentPosition(callback, handleNoGeolocation, {}); 
	else
		handleNoGeolocation();
}

function init() {
	getGeolocation(renderDisplay);
}

function getCurrentLocation(pos) {
	var currentLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	return currentLocation;
}

function setDistanceToHelper(end, elementId, pos) {
	var request = {
		origin: getCurrentLocation(pos),
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	var directionsService = new google.maps.DirectionsService();
	directionsService.route(request, function(response, status) {
		var element = document.getElementById(elementId);
		var distance = response.routes[0].legs[0].distance.text;
		element.innerText = distance;
	});
}

function setDistanceTo(destination, elementId) {
	getGeolocation(function(response) {
	    setDistanceToHelper(destination, elementId, response);
	});
}

function renderDisplay(pos) {
	renderer = new google.maps.DirectionsRenderer();
	map = new google.maps.Map(document.getElementById('map_panel'), {
		zoom: 7,
		content: "Location found using HTML5."
	});
	renderer.setMap(map);

	//var currentLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	var destination = document.getElementById("place-address").innerText;
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