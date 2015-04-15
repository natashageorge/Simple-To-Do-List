function findLocation() {
    navigator.geolocation.getCurrentPosition(sendLocation,locationError);
}


//.getCurrentPosition() is now calling sendLocation as a middleman, but have you actually written that function? How might it receive the position as a parameter, then determine which Todo object is being considered and call getLocation(), sending it both the position and Todo object?

  //  Then, how might getLocation update the .latitude and .longitude properties in that Todo object, save the item, and update it on screen by showing the coordinates between the "done" span and the person's name? But, wait! Are you generating a span between the "done" span and name where those coordinates can be shown for each item?

//Don't forget you also need to display the map at those coordinates when a Todo object is generated.

//Reloading the page is triplicating results. Have you made sure that the items are only being loaded by one call to the right function?

  //  How might every new search replace the old search results, instead of stacking them?


function getLocation(position, todoItem) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    if (!map) {
        showMap(latitude, longitude);
    }
    addMarker(latitude, longitude);
}



//add marker
function addMarker(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat,long);
    var markerOptions = {
        position: googleLatLong,
        map: map,
        title: "Where I thought about doing the task."
    }
    var marker = new google.maps.Marker(markerOptions);
}

function showMap(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat,long);
    var mapOptions = {
        zoom: 12,
        center: googleLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
    map.panTo(googleLatLong);
}

function locationError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage += " " + error.message;
    }
    console.log(errorMessage);
    alert(errorMessage);
}