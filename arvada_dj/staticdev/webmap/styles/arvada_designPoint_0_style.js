/*
var designPoint= function(feature, resolution) {
    var labelText = "";

    if (feature.get("dp_id") !== null ) {
        labelText = String(feature.get("dp_id"));
    }

    return [new ol.style.Style({
                image: new ol.style.RegularShape({
                    fill: new ol.style.Fill({color: 'white'}),
                    stroke: new ol.style.Stroke({color: 'black', width: 0.7}),
                    points: 3,
                    radius: 10,}),
                text: new ol.style.Text({
                                        text: labelText,
                                        font: "12.0px \'.SF NS Text\', sans-serif",
                                        //maxAngle: 0,
                                        placement: 'point',
                                        fill: new ol.style.Fill({
                                            color: "rgba(0, 0, 0, 1)"}),
                                        stroke: new ol.style.Stroke({
                                                                color: "black",
                                                                width: 1,}),
                }),
    })];
};
*/


var designPoint = new ol.style.Style({
            image: new ol.style.RegularShape({
                fill: new ol.style.Fill({color: 'white'}),
                stroke: new ol.style.Stroke({color: 'black', width: 0.7}),
                points: 3,
                radius: 10,
            })
 });

/*
var size = 0;
var placement = 'point';

var style_arvada_designPoint_0  = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = ""
    var labelText = "";
    size = 0;
    var labelFont = "10px, sans-serif";
    var labelFill = "rgba(0, 0, 0, 1)";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX =0 ;
    var offsetY = 0;
    var placement = 'point';
    if ("" !== null) {
        labelText = String("");
    }
    var style = [ new ol.style.Style({
        image: new ol.style.RegularShape({radius: 8.0 + size, points: 3,
            stroke: new ol.style.Stroke({color: 'rgba(128,17,25,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}), fill: new ol.style.Fill({color: 'rgba(219,30,42,1.0)'})}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];

    return style;
};*/
