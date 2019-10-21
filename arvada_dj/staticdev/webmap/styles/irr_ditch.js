 var style_irr_ditch = function(feature, resolution) {
     var labelText = "";
 
     if (feature.get("name") !== null && resolution < 5) {
         labelText = String(feature.get("name"));
     }
 
     return [new ol.style.Style({
                 stroke: new ol.style.Stroke({
                                         color: 'rgba(200, 19 ,200, 1.0)',
                                         lineDash: null, lineCap: 'square',
                                         lineDash: [5,10], 
                                         lineJoin: 'bevel', width: 4}),

        stroke: new ol.style.Stroke({color: 'rgba(200,19,200,1.0)', lineDash: [5,10], lineCap: 'round', lineJoin: 'round', width: 4}),
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
