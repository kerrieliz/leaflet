
// Create a map using Leaflet that plots all of the earthquakes from your 
// data set based on their longitude and latitude.

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" ;

d3.json(queryUrl, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

// Include popups that provide additional information about the earthquake 
// when a marker is clicked. 
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  console.log(earthquakeData)

  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}


///////////////

// Your data markers should reflect the magnitude of the earthquake in 
// their size and color. Earthquakes with higher magnitudes should appear 
// larger and darker in color. 

// function createMarkers(response) {

//   var magnitude = feature.properties.mag;

//   // Initialize an array  
//   var magMarkers = [];

//   // Loop through the array
//   for (var index = 0; index < magnitude.length; index++) {
//     var magnitude = magnitude[index];

//     // For each mag, create a marker and bind a popup with the name
//     var magMarker = L.marker([magnitude.lat, station.lon])
//       .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + magnitude.magtype + "<h3>");

//     // Add the marker to the array
//     magMarkers.push(magMarker);
//   }

//   createMap(L.layerGroup(magMarkers));
// }

// Create a legend that will provide context for your map data.