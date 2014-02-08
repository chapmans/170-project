function initializeMap() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(foundLocation, handleNoGeolocation, {}); 
	} else {
		handleNoGeolocation(false);
	}
}

function foundLocation(pos) {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 7,
		content: "Location found using HTML5."
	});

	var directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('panel'));

	var destination = "8657 Villa La Jolla Dr, La Jolla, CA 92037"; // TODO make it a param
	var currentLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	var request = {
		origin: currentLocation, 
		destination: destination,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	var directionsService = new google.maps.DirectionsService();
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}

function handleNoGeolocation(errorFlag) {
	return;
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}

	var mapOptions = {
		map: map,
		position: new google.maps.LatLng(60, 105),
		content: content
	};

	var infowindow = new google.maps.InfoWindow(mapOptions);
	map.setCenter(mapOptions.position);
}
