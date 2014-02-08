function handleNoGeolocation() {
	alert('Your browser does not support geolocation.')
}
function initMap() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setMap, handleNoGeolocation, {}); 
	} else {
		handleNoGeolocation();
	}
}

function initDirections() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setDirections, handleNoGeolocation, {}); 
	} else {
		handleNoGeolocation();
	}	
}

function setMap(pos) {
	var map = new google.maps.Map(document.getElementById('panel'), {
		zoom: 7,
		content: "Location found using HTML5."
	});

	var directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	renderDisplay(directionsDisplay, pos);
}

function setDirections(pos) {
	var directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setPanel(document.getElementById('panel'));
	renderDisplay(directionsDisplay, pos);
}

function renderDisplay(directionsDisplay, pos) {
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
			directionsDisplay.setDirections(response);
		}
	});
}