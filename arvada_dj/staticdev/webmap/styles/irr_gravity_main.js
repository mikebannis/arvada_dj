 var style_irr_gravity_main = function(feature, resolution) {
     var labelText = "";
 
     if (feature.get("diameterte") !== null) {
         labelText = String(feature.get("diameterte"));
     }
 
     return [new ol.style.Style({
                 stroke: new ol.style.Stroke({
                                         color: 'rgba(200,29,255,1.0)',
                                         lineDash: null, lineCap: 'square',
                                         lineJoin: 'bevel', width: 3}),
                 text: new ol.style.Text({
                                         text: labelText,
                                         font: "bold 14.0px \'.SF NS Text\', sans-serif",
                                         //maxAngle: 0,
                                         placement: 'line',
                                         fill: new ol.style.Fill({
                                             color: "black"}),
                                         stroke: new ol.style.Stroke({
                                                                 color: "white",
                                                                 width: 2,}),
                 }),
     })];
};

/*
var size = 0;
var placement = 'point';

var style_SWIrrigationDitch_0 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = ""
    var labelText = "";
    size = 0;
    var labelFont = "bold 15.0px \'.SF NS Text\', sans-serif";
    var labelFill = "rgba(0, 0, 0, 1)";
    var bufferColor = "#fdccf9";
    var bufferWidth = 2;
    var textAlign = "center";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'line';
    if (feature.get("new_name") !== null) {
        labelText = String(feature.get("new_name"));
    }
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(225,16,240,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 3}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];

    return style;
};*/
