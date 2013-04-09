/* 
 Document   : search
 Created on : 6-Apr-2013, 3:31:13 PM
 Author     : patrick dube
 Description:
 search
 */

function loadVideo(playerUrl,videoId, autoplay) {
    swfobject.embedSWF(
            playerUrl + '&rel=1&border=0&fs=1&enablejsapi=1&playerapiid=ytplayer&autoplay=' +
            (autoplay ? 1 : 0), 'player', '1100', '700', '9.0.0', false,
            false, {allowfullscreen: 'true',allowScriptAccess:'always'});
   $.getScript(videoId+'?v=2&alt=json-in-script&callback=info');
   onYouTubePlayerReady();
    
}

function onYouTubePlayerReady() {
  var ytplayer = document.getElementById("player");
  ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
}

function onytplayerStateChange(newState) {
   if(newState ===0){
       var list = document.getElementById('q');
       var playerUrl = list.getElementsByTagName('li')[0].getAttribute("id");
       loadVideo(playerUrl, playerUrl, true); //change playerUrl to videoId
       remove(playerUrl);
   }
}


function showMyVideos2(data) {
    var feed = data.feed;
    var entries = feed.entry || [];
    var html = ['<ul class="videos">'];
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t.substr(0, 20);
        var thumbnailUrl = entry.media$group.media$thumbnail[0].url;

        var playerUrl = entry.media$group.media$content[0].url;
        var videoId= entry.id.$t;
        html.push('<li onclick="enqueue(\'',playerUrl,'\',\'',videoId,'\')">',
                '<span class="titlec">', title, '...</span><br /><img src="',
                thumbnailUrl, '" width="130" height="97"/>', '</span></li>');
    }
    html.push('</ul><br style="clear: left;"/>');
    document.getElementById('videos2').innerHTML = html.join('');
//    if (entries.length > 0) {
//        loadVideo(entries[0].media$group.media$content[0].url, false);
//    }
}

function enqueue(playerUrl,videoId){
    document.getElementById('q').innerHTML += '<li id=\''+playerUrl+'\' onclick="loadVideo(\''+ playerUrl+ '\',\''+videoId+'\', true);remove(\''+playerUrl+'\');"><img src="opentube2.jpg" width="130" height="97"/></li>';
}

function remove(url){
    var t = document.getElementById(url);
    t.parentNode.removeChild(t);
}

function info(data){
    var description = data.entry.media$group.media$description.$t;
    document.getElementById('description').innerHTML=description;
    
}

function search() {
    var t = document.getElementById("test");
    t.parentNode.removeChild(t);
    var element = document.createElement("script");
    element.type = "text/javascript";
    element.id = "test";
    element.src = 'http://gdata.youtube.com/feeds/api/videos?alt=json-in-script&callback=showMyVideos2&max-results=10&q=' + encodeURIComponent(document.getElementById('s').value);
    document.body.appendChild(element);
}
function enter(e) {
    if (e.keyCode === 13) {
        search();
        return true;
    }
    return false;
}

