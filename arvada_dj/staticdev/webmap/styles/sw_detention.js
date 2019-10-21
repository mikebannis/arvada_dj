var style_sw_detention = function(feature, resolution){
    var trans = '0.3';
    var ownedBy = feature.get("ownedby");
    if (ownedBy == null) {
        ownedBy = "Arvada";
    }
    if (ownedBy == "Arvada") {
        var color = 'rgba(0,16,230,' + trans + ')';
    } else {
        var color = 'rgba(255,0,0,' + trans + ')';
    }

    //var pattern = new ol.style.FillPattern();
    size = 0;
    var labelFont = "10px, sans-serif";
    var labelFill = "rgba(0, 0, 0, 1)";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'point';
   
    var style = [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgba(35,35,35,1.0)',
                lineDash: null,
                lineCap: 'butt',
                lineJoin: 'miter',
                width: 1
            }),
            fill: new ol.style.Fill({
                color: color
                //color: 'rgba(73,16,230,' + trans + ')'
            }),
        
        })];

    return style;
};
