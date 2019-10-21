var style_mp_mcb_loading= function(feature, resolution) {
    var labelText = "";

    if (feature.get("dp_id") !== null ) {
        labelText = String(feature.get("dp_id"));
    }

    return [new ol.style.Style({
                stroke: new ol.style.Stroke({
                                        color: 'red',
                                        lineDash: null, lineCap: 'square',
                                        lineJoin: 'bevel', width: 2,lineDash: [5,10]}),
                text: new ol.style.Text({
                                        text: labelText,
                                        font: "15.0px \'.SF NS Text\', sans-serif",
                                        //maxAngle: 0,
                                        placement: 'line',
                                        fill: new ol.style.Fill({
                                            color: "rgba(0, 0, 0, 1)"}),
                                        stroke: new ol.style.Stroke({
                                                                color: "blue",
                                                                width: 1,}),
                }),
    })];
};


/*var size = 0;
var placement = 'point';

var style_arvada_swmpswIrrigationPipe_0 = function(feature, resolution){
   var context = {
       feature: feature,
       variables: {}
   };
   var value = ""
   var labelText = "";
   size = 0;
   var labelFont = "bold 15.0px \'MS Shell Dlg 2\', sans-serif";
   var labelFill = "rgba(0, 0, 0, 1)";
   var bufferColor = "#fdccf9";
   var bufferWidth = 2.5;
   var textAlign = "left";
   var offsetX = 8;
   var offsetY = 3;
   var placement = 'line';
   if (feature.get("diametertext") !== null && resolution < 5) {
       labelText = String(feature.get("diametertext"));
   }
   var style = [ new ol.style.Style({
       stroke: new ol.style.Stroke({color: 'rgba(200,19,200,1.0)', lineDash: [5,10], lineCap: 'round', lineJoin: 'round', width: 4}),
       text: createTextStyle(feature, resolution, labelText, labelFont,
                             labelFill, placement, bufferColor,
                             bufferWidth)
   })];

   return style;
};*/
