// Create a map using Leaflet that plots all of the earthquakes from your 
// data set based on their longitude and latitude.

// Your data markers should reflect the magnitude of the earthquake in 
// their size and color. Earthquakes with higher magnitudes should appear 
// larger and darker in color. 

// Include popups that provide additional information about the earthquake 
// when a marker is clicked.


// Create a legend that will provide context for your map data.

//////////////////////

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson" ;

d3.json(queryUrl, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {