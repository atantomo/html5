window.onload = init;

var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

function init() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Oops, no geolocation support");
    }
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;

    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";

    showMap(position.coords);
}

var map;

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);

    var title = "Your Location";
    var content = "You are here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content) {
    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        clickable: true
    };
    var marker = new google.maps.Marker(markerOptions);

    var infoWindowsOptions = {
        content: content,
        position: latlong
    };
    var infoWindow = new google.maps.infoWindow(infoWindowsOptions);

    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map);
    })
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreeToRadians(startCoords.latitude);
    var startLongRads = degreeToRadians(startCoords.longitude);
    var destLatRads = degreeToRadians(destCoords.latitude);
    var destLongRads = degreeToRadians(destCoords.longitude);

    var Radius = 6371; // Radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreeToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    // if (error.code == 0 || error.code == 2) {
    errorMessage = errorMessage + " " + error.message;
    // }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}
