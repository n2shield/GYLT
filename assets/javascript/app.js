// Google maps API, get location auto, and populate nearby bars
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
    infowWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation');
    infoWindow.open(map);
  }
}

//initMap runs after the DOM content is loaded
document.addEventListener("DOMContentLoaded", initMap);

//Lyft button
var OPTIONS = {
  scriptSrc: 'assets/javascript/lyftWebButton.min.js',
  namespace: '',
  clientId: 'JKrQDs6Aj6nW',
  clientToken: 'Nsc3BgxD6rn0s609/ys38bQEC9Jkth22EGr+zBuhJc9e52Bp8fhpe0x50CKCHKHramijmxeYv5TSwPLyNZiZxchVrGMVIp+DklCWuX7dktWknyMiQOixLPs=',
  location: {
    pickup: {}, 
    destination: {
      latitude: myPlace.pos.lat,
      longitude: myPlace.pos.lng,
    },
  },
  parentElement: document.getElementById('lyft-web-button-parent'),
  queryParams: {
    credits: ''
  },
  theme: 'multicolor large',
};
(function(t) {
  var n = this.window,
  e = this.document;
  n.lyftInstanceIndex = n.lyftInstanceIndex || 0;
  var a = t.parentElement,
  c = e.createElement("script");
  c.async = !0, c.onload = function() {
  n.lyftInstanceIndex++;
  var e = t.namespace ? "lyftWebButton" + t.namespace + n.lyftInstanceIndex : "lyftWebButton" + n.lyftInstanceIndex;
  n[e] = n.lyftWebButton, t.objectName = e, n[e].initialize(t)
}, c.src = t.scriptSrc, a.insertBefore(c, a.childNodes[0])
}).call(this, OPTIONS);

