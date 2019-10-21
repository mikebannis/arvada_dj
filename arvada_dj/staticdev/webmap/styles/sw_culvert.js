var style_sw_culvert= function(feature, resolution) {
    var labelText = "";

    if (feature.get("diametertext") !== null && resolution < 3) {
        labelText = String(feature.get("diametertext"));
    }

    return [new ol.style.Style({
                stroke: new ol.style.Stroke({
                                        color: 'yellow',
                                        lineDash: null, lineCap: 'square',
                                        lineJoin: 'bevel', width: 2}),
                text: new ol.style.Text({
                                        text: labelText,
                                        font: "bold 15.0px \'.SF NS Text\', sans-serif",
                                        //maxAngle: 0,
                                        placement: 'line',
                                        fill: new ol.style.Fill({
                                            color: "rgba(0, 0, 0, 1)"}),
                                        stroke: new ol.style.Stroke({
                                                                color: "yellow",
                                                                width: 3,}),
                }),
    })];
};

/*var size = 0;
var placement = 'point';

var style_arvada_swmpstormmain_0 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = ""
    var labelText = "";
    size = 0;
    var labelFont = "bold 15.0px \'.SF NS Text\', sans-serif";
    var labelFill = "rgba(0, 0, 0, 1)";
    var bufferColor = "#ffffff";
    var bufferWidth = 2;
    var textAlign = "center";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'line';
    if (feature.get("DIAMETERTEXT") !== null && resolution < 3) {
        labelText = String(feature.get("DIAMETERTEXT"));
    }
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 2}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];

    return style;
};*/
