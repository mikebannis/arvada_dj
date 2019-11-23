var ol_popup_container = document.getElementById('popup');
var ol_popup_content = document.getElementById('popup-content');
var ol_popup_closer = document.getElementById('popup-closer');

ol_popup_closer.onclick = function() {
    ol_popup_container.style.display = 'none';
    ol_popup_closer.blur();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: ol_popup_container
});

var expandedAttribution = new ol.control.Attribution({
    collapsible: false
});

var map = new ol.Map({
    controls: ol.control.defaults({attribution:false}).extend([
        expandedAttribution
    ]),
    target: document.getElementById('map'),
    //renderer: 'canvas',
    renderer: 'webgl',
    overlays: [overlayPopup],
    layers: layersList,
    view: new ol.View({
         maxZoom: 28, minZoom: 1
    })
});

var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: "Layers"});
map.addControl(layerSwitcher);
//layerSwitcher.hidePanel = function() {};
//layerSwitcher.showPanel();

// from https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

//  layerSwitcher autohide is current touchy on desktop, but works okay on mobile
//  The two lines in the if statement prevent autohide
if (! isMobileDevice()) {
    layerSwitcher.hidePanel = function() {};
    layerSwitcher.showPanel();
}


map.getView().fit([-11718813.433208, 4834111.577271, -11689450.943048, 4849416.786264], map.getSize());

var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}


var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

/*
 * Add text box and submit/cancel buttons to question/etc.
 */
var openReplyForm = function(objectType, commentId) {
    // remove reply button
    var replyButton = document.getElementById('reply-button');
    //replyButton.parentNode.removeChild(replyButton);
    replyButton.style.display = 'none';

    // add response text box and buttons
    var popUp = document.getElementById('popup-content');
    var replyCode = document.createElement('div');
    replyCode.id = 'reply-code';
    replyCode.innerHTML = `<div>
                             <textarea id="reply-txt-area" row="4" cols="30"></textarea>
                           </div>
                           <div class="cmt-buttons">
                    <button type="button" onclick="cancelReply()">Cancel</button>
                    <button type="button" onclick="saveReply('${objectType}', 
                                                    ${commentId})">Save</button>
                           </div>`;
    popUp.firstChild.appendChild(replyCode);
};

/*
 * Close comment item so it is no longer visible on map
 */
var closeCommItem = function(objectType, itemId) {
    if(!confirm(`Close ${objectType}? It will no longer be visible on the map.`)) {
        return;
    }
    alert('asdkfaj');
    return;

    // --------------------------------------------------------------------------------------
    // Everything below here needs to be updated!!!!!
    xhr = new XMLHttpRequest();
    //xhr.open('POST', 'https://mikebannister.co/comments/');
    xhr.open('POST', '/responses/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("X-CSRFToken", `${csrfToken}`);
    //xhr.setRequestHeader("csrfmiddlewaretoken", "${csrfToken}");

    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) {
            alert(`The ${objectType} has been closed.`);
            // Update pop-up w/ new comment
            return;
            const responseDiv = document.getElementById('response-div');
            if (responseDiv !== null) { 
                responseDiv.parentNode.removeChild(responseDiv);
            }
            addResponses(objectType, commentId);
            // Update layer so icon has correct color
            switch(objectType) {
                case 'comment':
                    commentSource.clear();
                    break;
                case 'assumption':
                    assumptionSource.clear();
                    break;replyText
                case 'question':
                    questionSource.clear();
                    sleep(3000).then(createQuestionPoints);
            }
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status + ' ' + xhr.statusText +
                  '\n' + xhr.getAllResponseHeaders() + '\n' + xhr.responseText);
            console.log(xhr.responseText);
        }
    };

    var body = JSON.stringify({
        "target_type": objectType,
        "target_id": commentId,
        "status": "closed"
    });
    xhr.send(body);

    // Clean up
    /*var replyCode = document.getElementById('reply-code');
    replyCode.parentNode.removeChild(replyCode);
    var replyButton = document.getElementById('reply-button');
    replyButton.style.display = 'block';*/
}

/**
 * Return UTC date time string in local date/time
 */
var prettyTime = function(timeStamp) {
    ts = new Date(timeStamp);
    return ts.toLocaleDateString() + ' ' + ts.toLocaleTimeString();
}

/*
 * Remove reply text area and buttons
 */
var cancelReply = function () {
    var replyCode = document.getElementById('reply-code');
    replyCode.parentNode.removeChild(replyCode);
    var replyButton = document.getElementById('reply-button');
    replyButton.style.display = 'block';
}

/**
 * Save reply and send to Django
 */
var saveReply = function (objectType, commentId) {
    const replyText = document.getElementById('reply-txt-area').value.replace(/\n/g, " ");
    if (replyText == '') {
        alert('Please enter a response in the text box or press cancel if' +
                ' you do not want to create a response');
        return;
    }

    xhr = new XMLHttpRequest();
    //xhr.open('POST', 'https://mikebannister.co/comments/');
    xhr.open('POST', '/responses/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("X-CSRFToken", `${csrfToken}`);
    //xhr.setRequestHeader("csrfmiddlewaretoken", "${csrfToken}");

    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) {
            alert('Thank you for your response!');
            // Update pop-up w/ new comment
            const responseDiv = document.getElementById('response-div');
            if (responseDiv !== null) { 
                responseDiv.parentNode.removeChild(responseDiv);
            }
            addResponses(objectType, commentId);
            // Update layer so icon has correct color
            switch(objectType) {
                case 'comment':
                    commentSource.clear();
                    break;
                case 'assumption':
                    assumptionSource.clear();
                    break;
                case 'question':
                    questionSource.clear();
                    sleep(3000).then(createQuestionPoints);
            }
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status + ' ' + xhr.statusText +
                  '\n' + xhr.getAllResponseHeaders() + '\n' + xhr.responseText);
            console.log(xhr.responseText);
        }
    };

    var body = JSON.stringify({
        "target_type": objectType,
        "target_id": commentId,
        "text": replyText
    });
    xhr.send(body);

    // Clean up
    var replyCode = document.getElementById('reply-code');
    replyCode.parentNode.removeChild(replyCode);
    var replyButton = document.getElementById('reply-button');
    replyButton.style.display = 'block';
}

/**
 * Get all responses for comment and add to popup
 *
 * @paam objects_type (str) - type of object to get responses for:
 *                              'question', 'assumption', or 'comment'
 * @param objects_id (int) - object id to get responses for
 */
var addResponses = function(object_type, object_id) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', '/responses-by-object/' + object_type + '/' + object_id + '/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("X-CSRFToken", `${csrfToken}`);
    xhr.onload = function() {
        var data = JSON.parse(this.response);
        var popUp = document.getElementById('popup-content');
        var responses = document.createElement('div');
        responses.id = 'response-div';
        var responsesHTML = '';
        if (xhr.status >= 200 &&  xhr.status < 400) {
            data.forEach(function(response, index) {
                var timeStamp = prettyTime(response.time_stamp);
                responsesHTML += 
                    `<div class="response-div">
                      <div class="response-author">
                        ${response.author_name} 
                      </div>
                      <div class="response-date"> 
                          ${timeStamp}
                      </div>
                      <div class="response-txt">
                        ${response.text}
                      </div>
                    </div>`;
            })   
            if (responsesHTML != '') {  
                responses.innerHTML = '<div class="response-header"> Replies: </div>' +
                                      responsesHTML;
                popUp.firstChild.appendChild(responses);
            }
        } else {
            /*responses.innerHTML += 'Replies failed to load. Returned status of ' + 
                              xhr.status + ' ' + xhr.statusText + '\n' + 
                              xhr.getAllResponseHeaders() + '\n' + xhr.responseText;*/
            console.log(xhr.responseText);
        }
    };
    xhr.send();
};

/**
 * Handle (most) viewing-data clicks on map: gis-data, comments, questions, etc.
 * Comments are created using code in comments.js
 */
var onSingleClick = function(evt) {
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var currentFeature;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
    var commentFlag = false;

    /*
     * Comments/questions/assumptions
     */
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        var layerTitle = layer.get('short_title');
        if (layerTitle == 'Comment' || layerTitle == 'Assumption' || 
            layerTitle == 'Question') {
            commentFlag = true;
            if (doComment) {
                // Creating a comments, abort and let the other handler handle it
                // TODO: I think if(doComment) should be at the start of onSingleClick
                return;
            } else {
                layerTitle = layerTitle.toLowerCase(); 
                switch(layerTitle) {
                    case 'comment':
                        var id = feature.getId().split('.')[1];
                        var authorName = feature.get('author');
                        var text = feature.get('comment_text');
                        var status = feature.get('status');
                        var timeStamp = prettyTime(feature.get('time_stamp'));
                        popupText =
                            `<div class="cmt-div">
                              <div class="cmt-author">
                                ${authorName}
                              </div>
                              <div class="cmt-date">
                                ${timeStamp}
                              </div>
                              <div class="cmt-txt">
                                ${text}
                              </div>
                            </div>`;
                        break;

                    case 'assumption':
                        var id = feature.getId().split('.')[1];
                        var authorName = 'RESPEC';
                        var text = feature.get('text');
                        var status = feature.get('status');
                        // const timeStamp = feature.get('time_stamp');
                        popupText =
                            `<div class="cmt-div">
                              <div class="cmt-author">
                                ${authorName} assumes:
                              </div>
                              <div class="cmt-txt">
                                ${text}
                              </div>
                            </div>`;
                        break;

                    case 'question':
                        var id = feature.getId().split('.')[1];
                        var authorName = 'RESPEC';
                        var text = feature.get('text');
                        var status = feature.get('status');
                        // const timeStamp = feature.get('time_stamp');
                        popupText =
                            `<div class="cmt-div">
                              <div class="cmt-author">
                                ${authorName}
                              </div>
                              <div class="cmt-txt">
                                ${text}
                              </div>
                            </div>`;
                        break;
                }
                // Get responses
                addResponses(layerTitle, id);
                if (userGroup=='RESPEC') {
                popupText += `<button type="button" id="close-button" 
                              onclick="closeCommItem('${layerTitle}', ${id})">Close ${layerTitle}</button>`
                }
                popupText += `<button type="button" id="reply-button" 
                              onclick="openReplyForm('${layerTitle}', ${id})">Reply</button>`
                overlayPopup.setPosition(coord);
                ol_popup_content.innerHTML = popupText;
                ol_popup_container.style.display = 'block';        
                return;
            }
        }
    });
    if (commentFlag) {
        return;
    }

    /*
     * All other features (not comments)
     */
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        // Skip layers handled above. In theory we should never get here, but it 
        // happens occasionally
        var layerTitle = layer.get('short_title');
        if (layerTitle == 'Comment' || layerTitle == 'Assumption' || 
            layerTitle == 'Question') {
            return;
        }   

        if (feature instanceof ol.Feature) {
            // See if there are any non hidden fields
            var doPopup = false;
            for (k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] != "Hidden") {
                    doPopup = true;
                }
            }
            currentFeature = feature;
            clusteredFeatures = feature.get("features");
            var clusterFeature;
            // check if features are clustered
            if (typeof clusteredFeatures !== "undefined") {
                // Try to grab key order from layer, if not use order from GeoServer
                currentFeatureKeys = layer.get('fieldKeys');
                if (currentFeatureKeys === undefined) {
                    currentFeatureKeys = currentFeature.getKeys();
                };
                if (doPopup) {
                    for(var n=0; n<clusteredFeatures.length; n++) {
                        clusterFeature = clusteredFeatures[n];
                        currentFeatureKeys = clusterFeature.getKeys();
                        popupText += '<li><table>' 
                        popupText += '<tr><td><h3 style="margin-bottom: 5px;margin-top: 5px">' + 
                                    layer.values_.title + '</h3></td></tr>';
                        for (var i=0; i<currentFeatureKeys.length; i++) {
                            if (currentFeatureKeys[i] != 'geometry') {
                                var fieldLabel = layer.get('fieldLabels')[currentFeatureKeys[i]];
                                if (fieldLabel != 'inline label' && fieldLabel != 'header label' && fieldLabel != 'photo') {
                                    continue; // Skip unlabeled attributes
                                }

                                popupField = '';
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                    popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                } else {
                                    popupField += '<td colspan="2">';
                                }

                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                    popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + 
                                                    ':</strong><br />';
                                }

                                if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                    popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? 
                                                Autolinker.link(String(clusterFeature.get(currentFeatureKeys[i]))) + 
                                                    '</td>' : '');
                                } else {
                                    var temp = (clusterFeature.get(currentFeatureKeys[i]) != null ? 
                                            '<img src="images/' + 
                                            clusterFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  
                                                    + '" /></td>' : '');
                                    popupField += temp;
                                }
                                popupText += '<tr>' + popupField + '</tr>';
                            }
                        } 
                        popupText += '</table></li>';    
                    }
                }

            } else {  ///// This is the common case
                // Try to grab key order from layer, if not use order from GeoServer
                currentFeatureKeys = layer.get('fieldKeys');
                if (currentFeatureKeys === undefined) {
                    currentFeatureKeys = currentFeature.getKeys();
                };
                //console.log(currentFeatureKeys);
                if (doPopup) {
                    popupText += '<li><table>';
                    popupText += '<tr><td><h3 style="margin-bottom: 5px;margin-top: 5px">' + 
                                    layer.values_.title + '</h3></td></tr>';
                    for (var i=0; i<currentFeatureKeys.length; i++) {
                        if (currentFeatureKeys[i] != 'geometry') {
                            var fieldLabel = layer.get('fieldLabels')[currentFeatureKeys[i]];
                            if (fieldLabel != 'inline label' && fieldLabel != 'header label' && 
                                                                            fieldLabel != 'photo') {
                                continue; // Skip unlabeled attributes
                            }
                            popupField = '';
                            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + 
                                                ':</th><td>';
                            } else {
                                popupField += '<td colspan="2">';
                            }
                            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + 
                                            ':</strong><br />';
                            }
                            if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                //console.log('not photo2', currentFeatureKeys[i]);
                                popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? 
                                              Autolinker.link(String(currentFeature.get(currentFeatureKeys[i]))) +
                                              '</td>' : '');
                            } else {
                                var photo_loc = 'images/' + currentFeature.get(currentFeatureKeys[i]).trim();
                                var temp = (currentFeature.get(currentFeatureKeys[i]) != null ? 
                                    '<a href="' + photo_loc + '"><img src="' + photo_loc +
                                    '" width="400px" /></a></td>' : '');
                                console.log('photo2', temp);
                                popupField += temp;
                            }
                            popupText += '<tr>' + popupField + '</tr>';
                        }
                    }
                    popupText += '</table>';
                }
            }
        }
    }, {hitTolerance: 8});

    // Close popup text or set to nothing
    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
   
    /* 
    var viewProjection = map.getView().getProjection();
    var viewResolution = map.getView().getResolution();
    for (i = 0; i < wms_layers.length; i++) {
        if (wms_layers[i][1]) {
            var url = wms_layers[i][0].getSource().getGetFeatureInfoUrl(
                evt.coordinate, viewResolution, viewProjection,
                {
                    'INFO_FORMAT': 'text/html',
                });
            if (url) {
                popupText = popupText + '<iframe style="width:100%;height:110px;border:0px;" id="iframe" seamless src="' + url + '"></iframe>';
            }
        }
    } */

    // Show the popup if it has contents
    if (popupText) {
        overlayPopup.setPosition(coord);
        ol_popup_content.innerHTML = popupText;
        ol_popup_container.style.display = 'block';        
    } else {
        ol_popup_container.style.display = 'none';
        ol_popup_closer.blur();
    }
};

map.on('singleclick', function(evt) {
    onSingleClick(evt);
});

var attribution = document.getElementsByClassName('ol-attribution')[0];
var attributionList = attribution.getElementsByTagName('ul')[0];
var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
var qgis2webAttribution = document.createElement('li');
qgis2webAttribution.innerHTML = '<a href="https://github.com/tomchadwin/qgis2web">qgis2web</a>';
attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);

// Sleep function
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * Create points to be used for quetions feature icons
 */
var createQuestionPoints = function() {
    var feats = questionSource.getFeatures();
    feats.forEach(function (feature, i) {
        var geomPoint = feature.getGeometry().getInteriorPoint();
        var featureInteriorPoint = new ol.Feature({
          geometry: geomPoint,
          name: "Interior point"
        });
        // Set id and properties for new points
        featureInteriorPoint.setId('ip_' + feature.getId());
        const props = feature.getProperties();
        const newProps = { text: props.text, status: props.status, num_responses: props.num_responses };
        //const newProps = Object.assign(feature.getProperties());
        featureInteriorPoint.setProperties(newProps);
        questionSource.addFeature(featureInteriorPoint);
    });
}

/**
 * Create points for question mark icons on question polygons. The 3 second delay
 * is to allow the data to load via WMS first. This is a hack and should be tied
 * to the data being fully loaded, but sleeping 3 seconds works for now
 * This probably will NOT work if the question layer is turned off by default
 */
sleep(3000).then(createQuestionPoints);

/**
 * Open welcome popup
 */
if (isMobileDevice()) { 
    overlayPopup.setPosition([-11715148.79924472,4830254.33419547]);
} else {
    overlayPopup.setPosition([-11704299.32898235,4840925.25233708]);
}   
ol_popup_content.innerHTML = 
`<h3> Welcome! </h3>
 <p> Responses can now be directly added to comments, questions and assumptions. 
 Icons now change color to indicate status. Light colored icons 
 (<img style="height: 16px" src="/static/webmap/styles/legend/35px_comment_bubble.png">/
 <img style="height: 16px" src="/static/webmap/styles/legend/question-24.png">/
<img style="height: 16px" src="/static/webmap/styles/legend/flag-24.png">) indicate items that have
not been responded to, or that need more information. Dark colored icons
 (<img style="height: 16px" src="/static/webmap/styles/legend/35px_comment_bubble_dark.png">/
 <img style="height: 16px" src="/static/webmap/styles/legend/question-24-dark.png">/
<img style="height: 16px" src="/static/webmap/styles/legend/flag-24_dark.png">) indicate items that 
have been responded to.</p>
<p><b>Update (10/24/19):</b> Subcatchments can be viewed by turning on the 
<i>Subcatchment</i> layer. </p>
<h4>Thank you,</h4> 
<h4>Your RESPEC Team</h4> `
ol_popup_container.style.display = 'block';        
