a();

// pingPongMessage
function pingPongMessage() {
    onmessage = pingPong;

    function pingPong(event) {
        if (event.data == "ping") {
            console.log("aaaa");
            postMessage("pong");
        }
    }
}

// randomMessage
function randomMessage() {
    var quotes = [
        "Thank you",
        "ありがとうございます",
        "謝謝",
        "Terima kasih"
    ];
    var index = Math.floor(Math.random() * quotes.length);
    postMessage(quotes[index]);
}

// mandel
function a() {
    importScripts("workerlib.js");
    onmessage = function(task) {
        var workerResult = computeRow(task.data);
        postMessage(workerResult);
    }
}
// importScripts("http://bigscience.org/nuclear.js")
