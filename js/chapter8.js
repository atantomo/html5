window.onload = init;

var position = 0;
var playlist;
var video;

function init() {

    a();
}

// canvasApp
function a() {
    playlist = [
        "vid/squirrel.m4v",
        "vid/watermill.m4v"
    ];

    var video = document.getElementById("video");
    video.loop = true;

    video.onended = nextVideo;
    video.src = playlist[position];
    video.load();
    video.play();
}

function nextVideo() {

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
