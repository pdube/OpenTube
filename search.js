/* 
    Document   : search
    Created on : 6-Apr-2013, 3:31:13 PM
    Author     : patrick dube
    Description:
        search
*/
function loadVideo(playerUrl, autoplay) {
    swfobject.embedSWF(
            playerUrl + '&rel=1&border=0&fs=1&autoplay=' +
            (autoplay ? 1 : 0), 'player', '1100', '700', '9.0.0', false,
            false, {allowfullscreen: 'true'});
}

function showMyVideos2(data) {
    var feed = data.feed;
    var entries = feed.entry || [];
    var html = ['<ul class="videos">'];
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t.substr(0, 20);
        var thumbnailUrl = entries[i].media$group.media$thumbnail[0].url;
        var playerUrl = entries[i].media$group.media$content[0].url;
        html.push('<li onclick="loadVideo(\'', playerUrl, '\', true)">',
                '<span class="titlec">', title, '...</span><br /><img src="',
                thumbnailUrl, '" width="130" height="97"/>', '</span></li>');
    }
    html.push('</ul><br style="clear: left;"/>');
    document.getElementById('videos2').innerHTML = html.join('');
//    if (entries.length > 0) {
//        loadVideo(entries[0].media$group.media$content[0].url, false);
//    }
}

function search() {
    var t = document.getElementById("test");
    t.parentNode.removeChild(t);
    var element = document.createElement("script");
    element.type = "text/javascript";
    element.id = "test";
    element.src= 'http://gdata.youtube.com/feeds/api/videos?alt=json-in-script&callback=showMyVideos2&max-results=10&q='+encodeURIComponent(document.getElementById('s').value);
    document.body.appendChild(element); 
}
function enter(e){
        if(e.keyCode === 13){
            search();
            return true;
        }
        return false;
}

