/*
 * Code to track and display user location
 */
const geolocateSource = new ol.source.Vector();
const geolocateLayer = new ol.layer.Vector({
    source: geolocateSource,
});
const geolocateStyle =  new ol.style.Style({
    // fill for accuracy circle
    fill: new ol.style.Fill({
        color: 'rgba(0, 0, 255, 0.2)'
    }),
    // position icon
    image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
            color: '#3399CC'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2
        })
    }),
});
geolocateLayer.setStyle(geolocateStyle);

var geoClickFlag = false; // Has the user clicked the geolocate button recently?

map.addLayer(geolocateLayer);

// watch and update user location
var geolocate = function() {
    navigator.geolocation.watchPosition(function(pos) {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        const accuracy = ol.geom.Polygon.circular(coords, pos.coords.accuracy);
        geolocateSource.clear(true);
        geolocateSource.addFeatures([
          new ol.Feature(accuracy.transform('EPSG:4326', map.getView().getProjection())),
          new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coords)))
        ]); 

        // Update location if the button just got clicked
        if (geoClickFlag) {
            geoClickFlag = false;
            map.getView().fit(geolocateSource.getExtent(), {
                maxZoom: 18,
                duration: 500
            });
        }
    }, function(error) {
        alert(`Warning: ${error.message}`);
    }, {
        enableHighAccuracy: true
    });
}

// Button to locate user
const locate = document.createElement('div');
locate.className = 'ol-control ol-unselectable locate';
locate.innerHTML = '<button title="Locate me">◎</button>';
locate.addEventListener('click', function() {
  geoClickFlag = true;
  geolocate();
});

map.addControl(new ol.control.Control({
  element: locate
}));
