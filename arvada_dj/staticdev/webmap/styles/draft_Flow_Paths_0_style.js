var flowPathStyle = function(feature, resolution) {
    var styles = [];
    /*styles.push(new ol.style.Style({
                stroke: new ol.style.Stroke({
                                        color: 'white',
                                        lineDash: null, lineCap: 'square',
                                        lineJoin: 'bevel', width: 3.5}),
    }));*/
    styles.push(new ol.style.Style({
                stroke: new ol.style.Stroke({
                                        color: 'rgba(100,100,100,1.0)',
                                        lineDash: null, lineCap: 'square',
                                        lineJoin: 'bevel', width: 2}),
    }));
    /*
     * Draw arrows heads on each segment. The below code was mostly taken from:
     * https://stackoverflow.com/questions/41606206/draw-arrow-without-using-any-image-
     * in-openlayers3/41614892
     */
    /*var whiteStroke = new ol.style.Stroke({color: 'white', lineDash: null, 
                                      lineCap: 'square', lineJoin: 'bevel', width: 3.5});*/
    var grayStroke = new ol.style.Stroke({color: 'rgba(100,100,100,1.0)', lineDash: null, 
                                      lineCap: 'square', lineJoin: 'bevel', width: 2});

    var g = feature.getGeometry().getLineStrings()[0];

    g.forEachSegment(function (start, end) {
        var dx = end[0] - start[0];
        var dy = end[1] - start[1];
        var rotation = Math.atan2(dy, dx);
        var arrowLength = 7;
        var lineStr1 = new ol.geom.LineString([end, [end[0] - arrowLength, end[1] + 
                                                arrowLength]]);
        lineStr1.rotate(rotation, end);
        var lineStr2 = new ol.geom.LineString([end, [end[0] - arrowLength, end[1] - 
                                                arrowLength]]);
        lineStr2.rotate(rotation, end);

/*        styles.push(new ol.style.Style({
            geometry: lineStr1,
            stroke: whiteStroke,
        }));
        styles.push(new ol.style.Style({
            geometry: lineStr2,
            stroke: whiteStroke
        }));*/
        styles.push(new ol.style.Style({
            geometry: lineStr1,
            stroke: grayStroke,
        }));
        styles.push(new ol.style.Style({
            geometry: lineStr2,
            stroke: grayStroke
        }));
    });
    return styles;
};

/*
var size = 0;
var placement = 'point';

var style_draft_Flow_Paths_0 = function(feature, resolution){
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
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'line';
    if ("" !== null) {
        labelText = String("");
    }
    var geometry = feature.getGeometry();
    
    var stroke = new ol.style.Stroke({color: 'rgba(100,100,100,1.0)', lineDash: null, lineCap: 'square', 
                                    lineJoin: 'bevel', width: 2});
    var styles = [ new ol.style.Style({
        stroke: stroke,
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor, bufferWidth)
        }),
        new ol.style.Style({ text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor, bufferWidth)
    })];
 
    /*
     * Draw arrows heads on each segment. The below code was mostly taken from:
     * https://stackoverflow.com/questions/41606206/draw-arrow-without-using-any-image-in-openlayers3/41614892
    var g = geometry.getLineStrings()[0];
    g.forEachSegment(function (start, end) {
        var dx = end[0] - start[0];
        var dy = end[1] - start[1];
        var rotation = Math.atan2(dy, dx);
        var arrowLength = 7;
        var lineStr1 = new ol.geom.LineString([end, [end[0] - arrowLength, end[1] + arrowLength]]);
        lineStr1.rotate(rotation, end);
        var lineStr2 = new ol.geom.LineString([end, [end[0] - arrowLength, end[1] - arrowLength]]);
        lineStr2.rotate(rotation, end);

        styles.push(new ol.style.Style({
            geometry: lineStr1,
            stroke: stroke
        }));
        styles.push(new ol.style.Style({
            geometry: lineStr2,
            stroke: stroke
        }));
    });

    return styles;
};*/
