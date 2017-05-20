window.onload = init;

var position = 0;
var playlist;
var video;

function init() {

    a();
}

// simpleVid
function simpleVid() {
    playlist = [
        "vid/squirrel",
        "vid/watermill"
    ];

    var video = document.getElementById("video");

    video.addEventListener("ended", nextVideo, false);
    video.src = playlist[position] + getFormatExtension();
    video.load();
    video.play();

    function nextVideo() {
        position += 1;
        if (position >= playlist.length) {
            position = 0;
        }
        video.src = playlist[position] + getFormatExtension();
        video.load();
        video.play();
    }

    function getFormatExtension() {
        if (video.canPlayType("video/mp4") != "") {
            return ".m4v"; // ".mp4";
        } else if (video.canPlayType("video/webm") != "") {
            return ".m4v"; // ".webm";
        } else if (video.canPlayType("video/ogg") != "") {
            return ".m4v"; // "ogv";
        }
    }

}

function getFormatExtension() {
    var video = document.getElementById("video");
    if (video.canPlayType("video/mp4") != "") {
        return ".m4v"; // ".mp4";
    } else if (video.canPlayType("video/webm") != "") {
        return ".m4v"; // ".webm";
    } else if (video.canPlayType("video/ogg") != "") {
        return ".m4v"; // "ogv";
    }
}

// completeVid
function a() {

    playlist = [
        "vid/squirrel",
        "vid/watermill"
    ];

    var effectFunction = null;

    var video = document.getElementById("video");
    video.src = playlist[0] + getFormatExtension();
    video.load();

    video.addEventListener("play", processFrame, false);
    video.addEventListener("ended", endedHandler, false);
    video.addEventListener("error", errorHandler, false);

    var controlLinks = document.querySelectorAll("a.control");
    for (var i = 0; i < controlLinks.length; i++) {
        controlLinks[i].onclick = handleControl;
    }

    var effectLinks = document.querySelectorAll("a.effect");
    for (var i = 0; i < effectLinks.length; i++) {
        effectLinks[i].onclick = setEffect;
    }

    var videoLinks = document.querySelectorAll("a.videoSelection");
    for (var i = 0; i < videoLinks.length; i++) {
        videoLinks[i].onclick = setVideo;
    }

    pushUnpushButtons("video1", []);
    pushUnpushButtons("normal", []);


    function handleControl(e) {
        var id = e.target.getAttribute("id");

        if (id == "play") {
            pushUnpushButtons("play", ["pause"]);
            if (video.ended) {
                video.load();
            }
            video.play();

        } else if (id == "pause") {
            pushUnpushButtons("pause", ["play"]);
            video.pause();

        } else if (id == "loop") {
            if (isButtonPushed("loop")) {
                pushUnpushButtons("", ["loop"]);
            } else {
                pushUnpushButtons("loop", []);
            }
            video.loop = !video.loop;

        } else if (id == "mute") {
            if (isButtonPushed("mute")) {
                pushUnpushButtons("", ["mute"]);
            } else {
                pushUnpushButtons("mute", []);
            }
            video.muted = !video.muted;

        }
    }

    function setEffect(e) {
        var id = e.target.getAttribute("id");

        if (id == "normal") {
            pushUnpushButtons("normal", ["western", "noir", "scifi"]);
            effectFunction = null;

        } else if (id == "western") {
            pushUnpushButtons("western", ["normal", "noir", "scifi"]);
            effectFunction = western;

        } else if (id == "noir") {
            pushUnpushButtons("noir", ["normal", "western", "scifi"]);
            effectFunction = noir;

        } else if (id == "scifi") {
            pushUnpushButtons("scifi", ["normal", "western", "noir"]);
            effectFunction = scifi;

        }
    }

    function setVideo(e) {
        var id = e.target.getAttribute("id");

        if (id == "video1") {
            pushUnpushButtons("video1", ["video2"]);
            video.src = playlist[0] + getFormatExtension();
            video.load();
            video.play();

        } else if (id == "video2") {
            pushUnpushButtons("video2", ["video1"]);
            video.src = playlist[1] + getFormatExtension();
            video.load();
            video.play();

        }
    }

    function pushUnpushButtons(idToPush, idArrayToUnpush) {
        if (idToPush != "") {
            var anchor = document.getElementById(idToPush);
            var theClass = anchor.getAttribute("class");
            if (!theClass.indexOf("selected") >= 0) {
                theClass = theClass + " selected";
                anchor.setAttribute("class", theClass);
                // var newImage = "url(images/" + idToPush + "pressed.png)";
                // anchor.style.backgroundImage = newImage;
            }
        }

        for (var i = 0; i < idArrayToUnpush.length; i++) {
            anchor = document.getElementById(idArrayToUnpush[i]);
            theClass = anchor.getAttribute("class");
            if (theClass.indexOf("selected") >= 0) {
                theClass = theClass.replace("selected", "");
                anchor.setAttribute("class", theClass);
                // anchor.style.backgroundImage = "";
            }
        }
    }

    function isButtonPushed(id) {
        var anchor = document.getElementById(id);
        var theClass = anchor.getAttribute("class");
        return (theClass.indexOf("selected") >= 0);
    }

    function endedHandler() {
        pushUnpushButtons("", ["play"]);
    }

    function errorHandler() {
        if (video.error) {
            video.poster = "img/flower_small.jpg";
            alert(video.error.code);
        }
    }

    function processFrame() {
        if (video.paused || video.ended) {
            return;
        }
        var bufferCanvas = document.getElementById("buffer");
        var displayCanvas = document.getElementById("display");

        var buffer = bufferCanvas.getContext("2d");
        var display = displayCanvas.getContext("2d");

        var scaledWidth = video.videoWidth * bufferCanvas.height / video.videoHeight;
        var scaledHeight = bufferCanvas.height;

        buffer.drawImage(video, (bufferCanvas.width - scaledWidth) / 2, (bufferCanvas.height - scaledHeight) / 2, scaledWidth, scaledHeight);
        var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);

        var length = frame.data.length / 4;

        for (var i = 0; i < length; i++) {
            var r = frame.data[i * 4 + 0];
            var g = frame.data[i * 4 + 1];
            var b = frame.data[i * 4 + 2];
            if (effectFunction) {
                effectFunction(i, r, g, b, frame.data);
            }
        }
        display.putImageData(frame, 0, 0);
        setTimeout(processFrame, 0);
    }

    function noir(pos, r, g, b, data) {
        var brightness = (3 * r + 4 * g + b) >>> 3;
        if (brightness < 0) brightness = 0;
        data[pos * 4 + 0] = brightness;
        data[pos * 4 + 1] = brightness;
        data[pos * 4 + 2] = brightness;
    }

    function western(pos, r, g, b, data) {
        var brightness = (3 * r + 4 * g + b) >>> 3;
        data[pos * 4 + 0] = brightness + 40;
        data[pos * 4 + 1] = brightness + 20;
        data[pos * 4 + 2] = brightness - 20;
    }

    function scifi(pos, r, g, b, data) {
        var offset = pos * 4;
        data[offset] = Math.round(255 - r);
        data[offset] = Math.round(255 - g);
        data[offset] = Math.round(255 - b);
    }
}

// The container is the file format that’s used to package up the video, audio and metadata information. Common container formats include: MP4, WebM, Ogg and Flash Video.
//
// The codec is the software used to encode and decode a specific encoding of video or audio. Popular web codecs include: H.264, VP8, Theora, AAC, and Vorbis.
//
// The browser decides what video it can decode and not all browser makers agree, so if you want to support everyone, you need multiple encodings.

// Properties:
//
// videoWidth
// loop
// videoHeight
// muted
// currentTime
// paused
// duration
// readyState
// ended
// seeking
// error
// volume
//
// Events:
//
// play
// abort
// pause
// waiting
// progress
// loadeddata
// error
// loadedmetadata
// timeupdate
// volumechange
// ended
