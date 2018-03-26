// Google maps API, get location auto, and populate nearby bars

//firebase connection



//changing view buttons 
$(document).ready(function () {

$("#View2").hide();

$(".btn-secondary").on("click", function(){
    $("#View2").show();
});


  var config = {
    apiKey: "AIzaSyBoggBJpxc3S3k3G-2e93HGdJ4e9kWOhIQ",
    authDomain: "bar-hopper-e4645.firebaseapp.com",
    databaseURL: "https://bar-hopper-e4645.firebaseio.com",
    projectId: "bar-hopper-e4645",
    storageBucket: "",
    messagingSenderId: "45105829466"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
    $("#searchButton").click(function () {        
        if(fullView.className == "open"){
    //don't show game
        fullView.className = "";
        }else{
        fullView.className = "open";
        $("#View1").hide();
  

var map, infoWindow;

function initMap() {
  console.log("foo");
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 14
  });

  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log(pos)
      infoWindow.setPosition(pos);
      infoWindow.setContent('You are HERE');
      infoWindow.open(map);
      map.setCenter(pos);
      const myPlace = pos

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: myPlace,
        radius: 5500,
        type: ['bar']
      }, callback);

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        var infoWindow = new google.maps.InfoWindow({
          map: map
        })
        google.maps.event.addListener(marker, 'click', function () {
          //if (place.opening_hours.open_now) {var open = "Open Now"} else {var open = "Closed"}
          infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Rating: ' + place.rating + '<br>' + (place.opening_hours.open_now ? "Open Now" : "Closed") +
            '<br>' + place.vicinity + '<div id="lyft-web-button-parent"></div>' + '</div>' );
          infoWindow.open(map, this);
          console.log(place);
          console.log(place.name);
          console.log(place.rating);
          console.log(place.vicinity);

          var name = place.name
          var rating= place.rating
          var vicinity= place.vicinity

        database.ref().push({
        name: place.name,
        rating: place.rating,
        vicinity: place.vicinity,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();
      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.rating);
      console.log(sv.vicinity);
      // Change the HTML to reflect
      $("#iw-phone").text(sv.name);
      $("#iw-rating").text(sv.rating);
      $("#iw-address").text(sv.vicinity);
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



        });
      }
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation');
    infoWindow.open(map);
  }
}

//initMap runs after the DOM content is loaded
//document.addEventListener("DOMContentLoaded", initMap);

//Google API key: AIzaSyACdS2nqBDGsYpiAlVFTQR-TNKNGuKgosc
//this is the lyft button info,has been moved temporarily to HTML file

initMap();

}});
    });