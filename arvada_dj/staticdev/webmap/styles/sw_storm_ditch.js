 var style_sw_storm_ditch = function(feature, resolution) {
     var labelText = "";
 
     if (feature.get("name") !== null && resolution < 5) {
         labelText = String(feature.get("name"));
     }
 
     return [new ol.style.Style({
                stroke: new ol.style.Stroke({
                                         color: 'black',
                                         lineDash: null, lineCap: 'square',
                                         lineDash: [5,10], 
                                         lineJoin: 'bevel', width: 2}),
                text: new ol.style.Text({
                                         text: labelText,
                                         font: "bold 15.0px \'.SF NS Text\', sans-serif",
                                         //maxAngle: 0,
                                         placement: 'line',
                                         fill: new ol.style.Fill({
                                             color: "rgba(0, 0, 0, 1)"}),
                                         stroke: new ol.style.Stroke({
                                                                 color: "#ffffff",
                                                                 width: 2,}),
                 }),
     })];
 };
