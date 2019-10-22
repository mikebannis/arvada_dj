/*
https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=arvada_swmp:mp_question&outputFormat=application/json&srsname=EPSG:3857
*/
var wms_layers = [];

///////////////////////////////////////////
// Questions layer
///////////////////////////////////////////
var questionSource = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:mp_question&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_mp_question = new ol.layer.Vector({
    source: questionSource,
    declutter: false,
    style: function (feature, resolution) {
        var _status = feature.get('status');
        var numResponses = feature.get('num_responses');
        if (_status == 'closed' ) { 
            // Closed, don't display
            return;
        } else if (numResponses == 0 || _status == 'help') {
            // no responses, or needs more info, bright white icon    
            return [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(35,35,35,1.0)',
                    lineDash: null,
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(202,52,167,0.3)'
                }),
            }),
            new ol.style.Style({
                image: new ol.style.Icon({
                    src: '/static/webmap/styles/legend/question-24.png'
                }),
            })];
        } else {
            // Has a response, dark icon
            return [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(35,35,35,1.0)',
                    lineDash: null,
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(202,52,167,0.3)'
                }),
            }),
            new ol.style.Style({
                image: new ol.style.Icon({
                    src: '/static/webmap/styles/legend/question-24-dark.png'
                }),
            })];
        }
    },
    title: '<img src="/static/webmap/styles/legend/question-24.png"> Question',
    short_title: 'Question'
});

lyr_mp_question.set('fieldAliases', {
    'text': 'Text',
});
lyr_mp_question.set('fieldImages', {
    'text': 'TextEdit',
});
lyr_mp_question.set('fieldLabels', {
    'text': 'inline label',
});


///////////////////////////////////////////
// Assumptions layer
///////////////////////////////////////////
var assumptionSource = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:mp_assumption&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_mp_assumption = new ol.layer.Vector({
    source: assumptionSource,
    declutter: false,
    style: function (feature, resolution) {
        var _status = feature.get('status');
        var numResponses = feature.get('num_responses');
        if (_status == 'closed' ) { 
            // Closed, don't display
            return;
        } else if (numResponses == 0 || _status == 'help') {
            // Needs attention, use bright icon 
            return new ol.style.Style({
                image: new ol.style.Icon({
                    src: '/static/webmap/styles/legend/flag-24.png'
                }),
            });
        } else {
            // Already responded to, use dark icon
            return new ol.style.Style({
                image: new ol.style.Icon({
                    src: '/static/webmap/styles/legend/flag-24_dark.png'
                }),
            });
        }
    },
    title: '<img src="/static/webmap/styles/legend/flag-24.png"> Assumption',
    short_title: 'Assumption'
});

lyr_mp_assumption.set('fieldAliases', {
    'text': 'Text',
});
lyr_mp_assumption.set('fieldImages', {
    'text': 'TextEdit',
});
lyr_mp_assumption.set('fieldLabels', {
    'text': 'inline label',
});

///////////////////////////////////////////
// Comments layer
///////////////////////////////////////////
//var commentSource = new ol.source.Vector();
var commentSource = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             //'request=GetFeature&typeName=arvada_swmp:mp_comment&outputFormat=' +
             'request=GetFeature&typeName=arvada_swmp:comment_comment&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_mp_comment = new ol.layer.Vector({
    source: commentSource,
    declutter: false,
    style: function (feature, resolution) {
        var _status = feature.get('status');
        var numResponses = feature.get('num_responses');
        if (_status == 'closed' ) { 
            // Closed, don't display
            return;
        } else if (numResponses == 0 || _status == 'help') {
            //#console.log(feature.get('comment_text') + ' WHITE'+numResponses);
            return new ol.style.Style({
                image: new ol.style.Icon({
                    src: '/static/webmap/styles/legend/35px_comment_bubble.png'
                }),
            });
        } else {
            //console.log(feature.get('comment_text') + ' DARK'+numResponses);
            return new ol.style.Style({
                image: new ol.style.Icon({
                    src: '/static/webmap/styles/legend/35px_comment_bubble_dark.png'
                }),
            });
        }
    },
    title: '<img src="/static/webmap/styles/legend/20px_comment_bubble.png"> Comment',
    short_title: 'Comment'
});

/*lyr_mp_comment.set('fieldAliases', {
    'sqmi': 'sqmi',
});
lyr_mp_comment.set('fieldImages', {
    'sqmi': 'TextEdit',
});
lyr_mp_comment.set('fieldLabels', {
    'sqmi': 'inline label',
});*/

///////////////////////////////////////////
// Arvada city boundary
///////////////////////////////////////////
var jsonSource_ArvadaBoundary_0 = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:arvada_drcog_boundary&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_ArvadaBoundary_0 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_ArvadaBoundary_0,
    style: style_ArvadaBoundary_0,
    title: '<img src="/static/webmap/styles/legend/arvadaBoundary.png"> Arvada Boundary'

});

lyr_ArvadaBoundary_0.setVisible(true);
/*lyr_ArvadaBoundary_0.set('fieldAliases', {
    'city': 'city',
    'sqmi': 'sqmi',
});
lyr_ArvadaBoundary_0.set('fieldImages', {
    'city': 'TextEdit',
    'sqmi': 'TextEdit',
});
lyr_ArvadaBoundary_0.set('fieldLabels', {
    'city': 'inline label',
    'sqmi': 'inline label',
});*/
lyr_ArvadaBoundary_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

///////////////////////////////////////////
// SW Irrigation Pipes
///////////////////////////////////////////
var jsonSource_irr_gravity_main = new ol.source.Vector({
    attributions: '<a href="">City of Arvada</a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:irr_gravity_main&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_irr_gravity_main = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_irr_gravity_main,
    //style: style_arvada_swmpswIrrigationPipe_0,
    style: style_irr_gravity_main,
    title: '<img src="/static/webmap/styles/legend/irr_gravity_main.png"> Irrigation Gravity Main'
});

lyr_irr_gravity_main.set('fieldAliases', {
    'featuretype': 'Type',
    'material': 'Material',
    'diameter': 'Diameter',
    'diameterte': 'Description',
    'mainshape': 'Shape',
    'pipelength': 'Length',
    'ownedby': 'Owned By',
});
lyr_irr_gravity_main.set('fieldImages', {
    'featuretype': 'Type',
    'material': 'Material',
    'diameter': 'Diameter',
    'diameterte': 'Dimensions',
    'mainshape': 'Shape',
    'pipelength': 'Length',
    'ownedby': 'Owned By',
});

lyr_irr_gravity_main.set('fieldLabels', {
    'featuretype': 'inline label',
    'material': 'inline label',
    'diameter': 'inline label',
    'diameterte': 'inline label',
    'mainshape': 'inline label',
    'pipelength': 'inline label',
    'ownedby': 'inline label',
});
lyr_irr_gravity_main.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

///////////////////////////////////////////
// SW Irrigation Ditches
///////////////////////////////////////////
var jsonSource_irr_ditch = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:irr_ditch&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_irr_ditch = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_irr_ditch,
    //style: style_irr_ditch,
    style: style_irr_ditch,
    title: '<img src="/static/webmap/styles/legend/irr_ditch.png"> SW Irrigation Ditch'
});

lyr_irr_ditch.set('fieldAliases', {
    'name': 'Name',
    'featuretyp': 'Type',
});

lyr_irr_ditch.set('fieldImages', {
    'name': 'TextEdit',
    'featuretyp': 'Type',
});

lyr_irr_ditch.set('fieldLabels', {
    'name': 'inline label',
    'featuretyp': 'inline label',
});

lyr_irr_ditch.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

///////////////////////////////////////////
// Detention
///////////////////////////////////////////
var jsonSource_sw_detention = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:sw_detention&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_sw_detention = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_sw_detention,
    style: style_sw_detention,
    title: '<img src="/static/webmap/styles/legend/sw_detention.png"> Public Detention<br />' +
           '<img src="/static/webmap/styles/legend/sw_detention_private.png"> Private Detention'

});

lyr_sw_detention.set('fieldAliases', {
    'assetid': 'ID',
    'pondtype': 'Type',
    'outfall': 'Outfall',
    'notes': 'Notes',
    'ownedby': 'Owned By',
    'comments': 'Comments',
});
lyr_sw_detention.set('fieldImages', {
    'assetid': 'ID',
    'pondtype': 'Type',
    'outfall': 'Outfall',
    'notes': 'Notes',
    'ownedby': 'Owned By',
    'comments': 'Comments',
});
lyr_sw_detention.set('fieldLabels', {
    'assetid': 'inline label',
    'pondtype': 'inline label',
    'outfall': 'inline label',
    'notes': 'inline label',
    'ownedby': 'inline label',
    'comments': 'inline label',
});

lyr_sw_detention.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

///////////////////////////////////////////
// SW Manhole
///////////////////////////////////////////
var jsonSource_sw_manhole = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:sw_manhole&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_sw_manhole = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_sw_manhole,
    style: style_sw_manhole,
    title: '<img src="/static/webmap/styles/legend/sw_manhole.png"> Manhole'
});

lyr_sw_manhole.set('fieldAliases', {
    'assetid': 'ID',
    'outfallloc': 'Outfall',
    'ownedby': 'Owned By',
    'comments': 'Comments',
});
lyr_sw_manhole.set('fieldImages', {
    'assetid': 'ID',
    'outfallloc': 'Outfall',
    'ownedby': 'Owned By',
    'comments': 'Comments',
});
lyr_sw_manhole.set('fieldLabels', {
    'assetid': 'inline label',
    'outfallloc': 'inline label',
    'ownedby': 'inline label',
    'comments': 'inline label',
});

///////////////////////////////////////////
// SW Culverts
///////////////////////////////////////////
var jsonSource_sw_culvert = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:sw_culvert&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',

});

var lyr_sw_culvert = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_sw_culvert,
    //style: style_sw_culvert,
    style: style_sw_culvert,
    title: '<img src="/static/webmap/styles/legend/sw_culvert.png"> Culvert'
});
lyr_sw_culvert.set('fieldAliases', {
    'featuretype': 'Type',
    'diametertext': 'Description',
    'material': 'Material',
    'comments': 'Comments',
    'mainshape': 'Shape',
    'pipelength': 'Length',
});
lyr_sw_culvert.set('fieldImages', {
    'featuretype': 'TextEdit',
    'diametertext': 'TextEdit',
    'material': 'TextEdit',
    'comments': 'TextEdit',
    'mainshape': 'TextEdit',
    'pipelength': 'TextEdit',
});
lyr_sw_culvert.set('fieldLabels', {
    'featuretype': 'inline label',
    'diametertext': 'inline label',
    'material': 'inline label',
    'comments': 'inline label',
    'mainshape': 'inline label',
    'pipelength': 'inline label',
});
lyr_sw_culvert.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

///////////////////////////////////////////
// SW gravity mains
///////////////////////////////////////////
var jsonSource_sw_gravity_main = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:sw_gravity_main&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_sw_gravity_main = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_sw_gravity_main,
    //style: style_sw_gravity_main,
    style: style_sw_gravity_main,
    title: '<img src="/static/webmap/styles/legend/sw_gravity_main.png"> Storm Sewer'
});
lyr_sw_gravity_main.set('fieldAliases', {
    'featuretyp': 'Type',
    'diameterte': 'Description',
    'material': 'Material',
    'diameter': 'Diameter',
    'mainshape': 'Shape',
    'pipelength': 'Length',
});
lyr_sw_gravity_main.set('fieldImages', {
    'featuretyp': 'TextEdit',
    'diameterte': 'TextEdit',
    'material': 'TextEdit',
    'diameter': 'TextEdit',
    'mainshape': 'TextEdit',
    'pipelength': 'TextEdit',
});
lyr_sw_gravity_main.set('fieldLabels', {
    'featuretyp': 'inline label',
    'diameterte': 'inline label',
    'material': 'inline label',
    'diameter': 'inline label',
    'mainshape': 'inline label',
    'pipelength': 'inline label',
});
lyr_sw_gravity_main.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

///////////////////////////////////////////
// SW ditches
///////////////////////////////////////////
var jsonSource_sw_storm_ditch = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:sw_storm_ditch&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_sw_storm_ditch = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_sw_storm_ditch,
    style: style_sw_storm_ditch,
    title: '<img src="/static/webmap/styles/legend/sw_storm_ditch.png"> Storm Ditch'
});
lyr_sw_storm_ditch.set('fieldAliases', {
    'featuretyp': 'Type',
    'diameterte': 'Description',
    'material': 'Material',
    'diameter': 'Diameter',
    'mainshape': 'Shape',
    'pipelength': 'Length',
});
lyr_sw_storm_ditch.set('fieldImages', {
    'featuretyp': 'TextEdit',
    'diameterte': 'TextEdit',
    'material': 'TextEdit',
    'diameter': 'TextEdit',
    'mainshape': 'TextEdit',
    'pipelength': 'TextEdit',
});
lyr_sw_storm_ditch.set('fieldLabels', {
    'featuretyp': 'inline label',
    'diameterte': 'inline label',
    'material': 'inline label',
    'diameter': 'inline label',
    'mainshape': 'inline label',
    'pipelength': 'inline label',
});
lyr_sw_storm_ditch.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

//////////////////////////////////////////////
// Major Collection Basins
/////////////////////////////////////////////
var jsonSource_MajorOutfallBasins_0 = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:mp_watersheds&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});
var lyr_MajorOutfallBasins_0 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_MajorOutfallBasins_0,
    style: style_MajorOutfallBasins_0,
    title: '<img src="/static/webmap/styles/legend/major_collection_basins.PNG"> Major Collection Basin'
});
lyr_MajorOutfallBasins_0.setVisible(false);
lyr_MajorOutfallBasins_0.set('fieldAliases', {
    'Area_ac': 'Area [ac]', 'DP_ID' : 'ID', 'Basin' : 'Basin'
});
lyr_MajorOutfallBasins_0.set('fieldImages', {
    'Area_ac': 'TextEdit', 'DP_ID' : 'TextEdit','Basin' : 'TextEdit'
});
lyr_MajorOutfallBasins_0.set('fieldLabels', {
    'Area_ac': 'inline label', 'DP_ID' : 'inline label', 'Basin' : 'inline label'
});
lyr_MajorOutfallBasins_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
//////////////////////////////////////////////
// SubBasins
/////////////////////////////////////////////
/*
var jsonSource_MP_Sub_Basins_0= new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:mp_sub_basins&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});
var lyr_SubBasins_0 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_MP_Sub_Basins_0,
    style: style_MP_Sub_Basins_0,
    title: '<img src="/static/webmap/styles/legend/major_collection_basins.PNG"> Sub Basins'
});
lyr_SubBasins_0.setVisible(false);
lyr_SubBasins_0.set('fieldAliases', {
    'Area_ac': 'Area [ac]', 'DP_ID' : 'ID', 'Basin' : 'Basin'
});
lyr_SubBasins_0.set('fieldImages', {
    'Area_ac': 'TextEdit', 'DP_ID' : 'TextEdit','Basin' : 'TextEdit'
});
lyr_SubBasins_0.set('fieldLabels', {
    'Area_ac': 'inline label', 'DP_ID' : 'inline label', 'Basin' : 'inline label'
});
lyr_SubBasins_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
*/
///////////////////////////////////////////////
//centroid lines
//////////////////////////////////////////////

var jsonSource_arvada_OutfallToCentroid = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:mp_mcb_loading&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});
var lyr_arvada_OutfallToCentroid = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_arvada_OutfallToCentroid,
    style: style_mp_mcb_loading,
    title: '<img src="/static/webmap/styles/legend/mp_mcb_loading.PNG"> Loading Lines'
});
lyr_arvada_OutfallToCentroid.setVisible(false);


//////////////////////////////////////////////
// Major watersheds
/////////////////////////////////////////////
var jsonSource_MajorWatersheds_0 = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:major_watersheds&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});
var lyr_MajorWatersheds_0 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_MajorWatersheds_0,
    style: style_MajorWatersheds_0,
    title: "Watershed"
});

lyr_MajorWatersheds_0.set('fieldAliases', {
    'udfcd_nam': 'Name',
});
lyr_MajorWatersheds_0.set('fieldImages', {
    'udfcd_nam': 'TextEdit',
});
lyr_MajorWatersheds_0.set('fieldLabels', {
    'udfcd_nam': 'header label',
});
lyr_MajorWatersheds_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

//////////////////////////////////////////////
// Arvada Creeks
/////////////////////////////////////////////
var jsonSource_arvada_swmpcreeks_4 = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:creeks&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_arvada_swmpcreeks_4 = new ol.layer.Vector({
    //declutter: true,
    source: jsonSource_arvada_swmpcreeks_4,
    //style: style_arvada_swmpcreeks_4,
    style: creekStyle,
    title: '<img src="/static/webmap/styles/legend/creeks.png"> River/Creek'
});

lyr_arvada_swmpcreeks_4.set('fieldAliases', {
    'NAME': 'Name',
});

lyr_arvada_swmpcreeks_4.set('fieldImages', {
    'NAME': 'TextEdit',
});
lyr_arvada_swmpcreeks_4.set('fieldLabels', {
    'NAME': 'header label',
});

//////////////////////////////////////////////
// Storm sewer inlets
/////////////////////////////////////////////
var jsonSource_sw_inlet = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:sw_inlet&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',

});

var lyr_sw_inlet = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_sw_inlet,
    //style: style_sw_inlet,
    style: style_sw_inlet,
    title: '<img src="/static/webmap/styles/legend/sw_inlet.png"> Inlet'
});

lyr_sw_inlet.set('fieldAliases', {
    'nodetype': 'Inlet Type',
    'outfallloc': 'Outfall',
    'accesstype': 'Access Type',
});

lyr_sw_inlet.set('fieldImages', {
    'nodetype': 'Inlet Type',
    'outfallloc': 'Outfall',
    'accesstype': 'Access Type',
});

lyr_sw_inlet.set('fieldLabels', {
    'nodetype': 'inline label',
    'outfallloc': 'inline label',
    'accesstype': 'inline label',
});

//////////////////////////////////////////////
// Design Points
/////////////////////////////////////////////
var jsonSource_arvada_designPoint_0 = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:dp_locations&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',

});

var lyr_arvada_designPoint_0 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_arvada_designPoint_0,
    //style: style_arvada_designPoint_0,
    style: designPoint,
    title: '<img src="/static/webmap/styles/legend/designPt.PNG"> Design Point'
});
lyr_arvada_designPoint_0.setVisible(false)
lyr_arvada_designPoint_0.set('fieldAliases', {
    'dp_id': 'ID',
});

lyr_arvada_designPoint_0.set('fieldImages', {
    'dp_id': 'TextEdit',
});
lyr_arvada_designPoint_0.set('fieldLabels', {
    'dp_id': 'header label',
});

//////////////////////////////////////////////
// Site visit photos
/////////////////////////////////////////////
var jsonSource_mp_picture = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:mp_picture&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',

});

var lyr_mp_picture = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_mp_picture,
    style: style_mp_picture,
    title: '<img src="/static/webmap/styles/legend/mp_picture.png"> Photos'
});

lyr_mp_picture.set('fieldAliases', {
    'name': 'Photo',
    'date': 'Date',
    'time': 'Time',
    'author': 'Author',
    'comment': 'Comment',
});

lyr_mp_picture.set('fieldImages', {
    'name': 'Photo',
    'date': 'TextEdit',
    'time': 'TextEdit',
    'author': 'TextEdit',
    'comment': 'TextEdit',
});

lyr_mp_picture.set('fieldLabels', {
    'name': 'photo',
    'date': 'inline label',
    'time': 'inline label',
    'author': 'inline label',
    'comment': 'inline label',
});

//////////////////////////////////////////////
// SW Irrigation Manholes
/////////////////////////////////////////////
var jsonSource_irr_manhole = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:irr_manhole&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',

});

var lyr_irr_manhole = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_irr_manhole,
    //style: style_arvada_designPoint_0,
    style: irr_manhole,
    title: '<img src="/static/webmap/styles/legend/irr_manhole.png"> Irrigation Manhole'
});
lyr_irr_manhole.setVisible(false)
lyr_irr_manhole.set('fieldAliases', {
    'assetid': 'Name',
});

lyr_irr_manhole.set('fieldImages', {
    'assetid': 'TextEdit',
});
lyr_irr_manhole.set('fieldLabels', {
    'assetid': 'header label',
});

//////////////////////////////////////////////
// Storm Sewer Outfall
/////////////////////////////////////////////
var jsonSource_sw_outfall = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:sw_outfall&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',

});

var lyr_sw_outfall  = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_sw_outfall ,
    //style: style_arvada_swmpswPipeEnd_1,
    style: sw_outfall ,
    title: '<img src="/static/webmap/styles/legend/sw_outfall.png"> SW Outfall'
});
lyr_sw_outfall.setVisible(false)
lyr_sw_outfall.set('fieldAliases', {
    'assetid': 'Name',
});

lyr_sw_outfall.set('fieldImages', {
    'assetid': 'TextEdit',
});
lyr_sw_outfall.set('fieldLabels', {
    'assetid': 'header label',
});

//////////////////////////////////////////////
// Storm sewer pipe end
/////////////////////////////////////////////
var jsonSource_sw_pipe_out = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:sw_pipe_out&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_sw_pipe_out = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_sw_pipe_out,
    style: style_sw_pipe_out,
    title: '<img src="/static/webmap/styles/legend/sw_pipe_out.png"> Pipe End'
});

lyr_sw_pipe_out.set('fieldAliases', {
    'outfallloc': 'ID',
    'status': 'Status',
});

lyr_sw_pipe_out.set('fieldImages', {
    'outfallloc': 'TextEdit',
    'status': 'TextEdit',
});

lyr_sw_pipe_out.set('fieldLabels', {
    'outfallloc': 'inline label',
    'status': 'inline label',
});

//////////////////////////////////////////////
// draft flow paths
/////////////////////////////////////////////
var jsonSource_draft_Flow_Paths_0 = new ol.source.Vector({
    attributions: '<a href=""></a>',
    format: new ol.format.GeoJSON(),
    url: function(extent) {
        return 'https://riverproject.co:8443/geoserver/arvada_swmp/wfs?service=WFS&version=1.1.0&' +
             'request=GetFeature&typeName=arvada_swmp:draft_Flow_Paths&outputFormat=' +
             'application/json&srsname=EPSG:3857'
        },
    crossOrigin: 'anonymous',
});

var lyr_draft_Flow_Paths_0 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_draft_Flow_Paths_0,
    //style: style_draft_Flow_Paths_0,
    style: flowPathStyle,
    title: '<img src="/static/webmap/styles/legend/draftFlowPaths.png"> Surface Flow'
});


////////////////////////////
// Aerials
//////////////////////////
var lyr_GoogleHybrid_1 = new ol.layer.Tile({
    'title': 'Google Hybrid',
    'type': 'base',
    'opacity': 0.6,


    source: new ol.source.XYZ({
        attributions: '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
        url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
    })
});

var lyr_GoogleTerrain_0 = new ol.layer.Tile({
    'title': 'Google Terrain',
    'type': 'base',
    'opacity': 0.7,
    source: new ol.source.XYZ({
        attributions: '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data Â©2015 Google</a>',
        url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
    })
});

lyr_sw_outfall.setVisible(false)
lyr_irr_manhole.setVisible(false)
lyr_sw_gravity_main.setVisible(false);
lyr_GoogleHybrid_1.setVisible(true);
lyr_MajorWatersheds_0.setVisible(false);
lyr_mp_picture.setVisible(false);

lyr_arvada_OutfallToCentroid.setVisible(false);
lyr_sw_gravity_main.setVisible(false);
lyr_sw_pipe_out.setVisible(false);
lyr_sw_culvert.setVisible(false);
lyr_sw_detention.setVisible(false);
lyr_sw_manhole.setVisible(false);
lyr_sw_storm_ditch.setVisible(false);

lyr_sw_inlet.setVisible(false);
lyr_arvada_swmpcreeks_4.setVisible(true);

lyr_draft_Flow_Paths_0.setVisible(false);
lyr_irr_gravity_main.setVisible(false);
lyr_irr_ditch.setVisible(false);

// Layer groups
var group_sw = new ol.layer.Group({
    layers: [
                lyr_sw_detention,
                lyr_sw_culvert,
                lyr_sw_storm_ditch,
                lyr_sw_gravity_main,
                lyr_sw_pipe_out,
                lyr_sw_inlet,
                lyr_sw_manhole,
                lyr_sw_outfall,
            ],
    title: "Stormwater Infrastructure"
});

var group_sw_irrigation = new ol.layer.Group({
    layers: [
                lyr_irr_ditch,
                lyr_irr_gravity_main,
                lyr_irr_manhole,
            ],
    title: "Irrigation Infrastructure"
});

var group_Hydrolo = new ol.layer.Group({
    layers:[
                lyr_draft_Flow_Paths_0,
                lyr_MajorOutfallBasins_0,
                //lyr_SubBasins_0,
                lyr_arvada_OutfallToCentroid,
                lyr_arvada_designPoint_0],
    title: "Hydrology"
});

var layersList = [  lyr_GoogleTerrain_0, lyr_GoogleHybrid_1,
                    lyr_ArvadaBoundary_0,
                    lyr_MajorWatersheds_0, lyr_arvada_swmpcreeks_4,
                    group_sw_irrigation, group_sw,
                //    lyr_mp_picture,

                    lyr_draft_Flow_Paths_0,lyr_arvada_OutfallToCentroid,
                    lyr_MajorOutfallBasins_0,
                    lyr_arvada_designPoint_0,
                    lyr_mp_comment,
                    lyr_mp_question,
                    lyr_mp_assumption ];
