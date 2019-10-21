 var creekStyle = function(feature, resolution) {
     var labelText = "";
 
     if (feature.get("NAME") !== null) {
         labelText = String(feature.get("NAME"));
     }
 
     return [new ol.style.Style({
                 stroke: new ol.style.Stroke({
                                         color: 'rgba(0,0,255,1.0)',
                                         lineDash: null, lineCap: 'square',
                                         lineJoin: 'bevel', width: 3}),
                 text: new ol.style.Text({
                                         text: labelText,
                                         font: "15.0px \'.SF NS Text\', sans-serif",
                                         //maxAngle: 0,
                                         placement: 'line',
                                         fill: new ol.style.Fill({
                                             color: "white"}),
                                         stroke: new ol.style.Stroke({
                                                                 color: "blue",
                                                                 width: 2,}),
                                         //overflow: true,
                 }),
     })];
 };
/*
var size = 0;
var placement = 'point';

var style_arvada_swmpcreeks_4 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = ""
    var labelText = "";
    size = 0;
    var labelFont = "13.0px \'MS Shell Dlg 2\', sans-serif";
    var labelFill = "rgba(0, 0, 0, 1)";
    var bufferColor = "#ffffff";
    var bufferWidth = 1.0;
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'line';
    if (feature.get("NAME") !== null) {
        labelText = String(feature.get("NAME"));
    }
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(22,108,200,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'round', width: 2}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    }),new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(84,81,255,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 1}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    }),new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(126,63,0,1.0)', lineDash: [10,5,1,5,1,5], lineCap: 'square', lineJoin: 'bevel', width: 0}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];

    return style;
};*/
