function handleNoGeolocation() {
	alert('Your browser does not support geolocation.')
}

function init() {
	if(navigator.geolocation) {
		window.directionsDisplay = new google.maps.DirectionsRenderer();

		if(window.setMap === true) {
			window.map = new google.maps.Map(document.getElementById('map_panel'), {
				zoom: 7,
				content: "Location found using HTML5."
			});
			window.directionsDisplay.setMap(map);
		}

		if(window.setDirections === true) {
			//window.directionsDisplay.setPanel(document.getElementById('directions_panel'));
		}

		navigator.geolocation.getCurrentPosition(renderDisplay, handleNoGeolocation, {}); 
	} else {
		handleNoGeolocation();
	}
}

function renderDisplay(pos) {
	var currentLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	var destination = "8657 Villa La Jolla Dr, La Jolla, CA 92037"; // TODO make it a param... how? since js script can't access {{}} params
	var request = {
		origin: currentLocation, 
		destination: destination,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	var directionsService = new google.maps.DirectionsService();
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			window.directionsDisplay.setDirections(response);
 		}

		var route = response.routes[0].legs[0];

		var appendString = '<h4>Start from: ' + route.start_address + '</h4><ol>';
		for (var i = 0; i < route.steps.length; i++) {
			appendString += '<li>' + route.steps[i].instructions + '</li>';
		}
		appendString += '</ol><h4>End at: ' + route.end_address + '</h4>';

		$('#directions').append(appendString);
	});

	window.setMap = false;
	window.setDirections = false;
}