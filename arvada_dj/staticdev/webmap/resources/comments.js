/* 
 Create comments. Comments are displayed by teh pop-up code in qgis2web
*/
// actively creating comment flag
var doComment = false;

// Allow the user to modify comment positions
var modify = new ol.interaction.Modify({ source: commentSource });

// Button to create comment
const commentDiv = document.createElement('div');
commentDiv.className = 'ol-control ol-unselectable comment';
commentDiv.innerHTML = '<button title="Add comment"><img src="/static/webmap/styles/legend/20px_comment_bubble.png"></button>';
commentDiv.addEventListener('click', function() {
    if (doComment) {
        doComment = false;
        //map.removeInteraction(draw);
        map.removeInteraction(modify);
        document.getElementById("map").style.cursor = "default";
    } else {
        doComment = true;
        map.addInteraction(modify);
        document.getElementById("map").style.cursor = "crosshair";
  /*      draw = new ol.interaction.Draw({
            source: commentSource,
            type: 'Point',
        });
        map.addInteraction(draw);*/
    }
});

map.addControl(new ol.control.Control({
  element: commentDiv
}));

var commentCoord;
// Open new comment popup
map.on('singleclick', function(evt){
    //alert(evt.coordinate);
    if (!doComment) {
        return;
    }
    /*var latLong = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    var ptLat     = latLong[1];
    var ptLong    = latLong[0];*/
    commentCoord = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    //alert('commentCoord:' + commentCoord);
    //tempCommentGeo = new ol.geom.Point(evt.coordinate);

    popupText =`<div class="cmt-div">
                  <h3>Create new comment</h3>
                  <div>
                    <textarea id="cmt-txt-area" row="4" cols="30"></textarea>
                  </div>
                  <div class="cmt-buttons">
                    <button type="button" onclick="cancelComment()">Cancel</button>
                    <button type="button" onclick="saveComment()">Save</button>
                  </div>
                </div>`;
                  //<b>Your Name:</b><input id="cmt-user-name"></input>
    overlayPopup.setPosition(evt.coordinate);
    ol_popup_content.innerHTML = popupText;
                ol_popup_container.style.display = 'block';

    //var pixel = map.getEventPixel(evt.originalEvent);
    //var coord = evt.coordinate;
    //map.removeInteraction(draw);
});

var saveComment = function() {
    // Save comment created in pop up

    // Get lat long
    //  Example wkt: "POINT (-105.20123183727266 39.7520402777356)"
    const wkt = 'POINT ('+ commentCoord[0] + ' ' + commentCoord[1] + ')';
    
    // Remove newlines from text so it doesn't break API
    const commentText = document.getElementById('cmt-txt-area').value.replace(/\n/g, " ");

    if (commentText == '') {
        alert('Please enter a comment in the text box or press cancel if' +
                ' you do not want to create a comment');
        return;
    }

    xhr = new XMLHttpRequest();
    //xhr.open('POST', 'https://mikebannister.co/comments/');
    xhr.open('POST', '/comments/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("X-CSRFToken", `${csrfToken}`);
    //xhr.setRequestHeader("csrfmiddlewaretoken", "${csrfToken}");

    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) {
            //alert('the below line still isn\'t working!');
            commentSource.clear();
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status + ' ' + xhr.statusText +
                  '\n' + xhr.getAllResponseHeaders() + '\n' + xhr.responseText);
            console.log(xhr.responseText);
        }
    };

    /**
     * owner is complete arbitrary and set by django for logged in user
     * author and status should be removed from this list, as well.
     */
    var body = JSON.stringify({
        "owner": 9999,
        "author": "Not used, remove from post api",
        "comment_text": commentText,
        "geom": wkt,
        "status": "unread"
    });
    xhr.send(body);

    // Done, clean up 
    ol_popup_container.style.display = 'none';
    doComment = false;
    map.removeInteraction(modify);
    document.getElementById("map").style.cursor = "default";
}

var cancelComment = function() {
    ol_popup_container.style.display = 'none';

    doComment = false;
    map.removeInteraction(modify);
    document.getElementById("map").style.cursor = "default";
}

var maxCommentId = function() {
    var maxId = 0;
    var comments = commentSource.getFeatures();
    for (var i = 0, ii = comments.length; i < ii; i++) {
        if (comments[i].get('fid') > maxId) {
            maxId = comments[i].get('fid');
        }
    }
    return maxId;
};

// Delete comment
var removeComment = function(id) {
    //alert('tried to remove comment ' + id);
    var comments = commentSource.getFeatures();
    for (var i = 0, ii = comments.length; i < ii; i++) {
        if (comments[i].get('id') == id) {
            var found = comments[i];
            break;
        }
    }
    //alert('found comment' + found.get('id'));
    commentSource.removeFeature(found);
    ol_popup_container.style.display = 'none';
};

// Get an element's distance from the top of the page
// https://gomakethings.com/get-distances-to-the-top-of-the-document-with-native-javascript/
var getElemDistance = function ( elem ) {
    var location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location : 0;
};
