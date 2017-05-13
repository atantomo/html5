window.onload = init;

var lastReportTime = 0;

function init() {

    a();
}

// retrieveXHTML
function retrieveXHTML() {

    var updateSalesXHTML = function(responseText) {
        var salesDiv = document.getElementById("sales");
        var sales = JSON.parse(responseText);

        for (var i = 0; i < sales.length; i++) {
            var sale = sales[i];
            var div = document.createElement("div");
            div.setAttribute("class", "saleItem");
            div.innerHTML = sale.title + " sold " + sale.id + " gumballs";
            salesDiv.appendChild(div);
        }
    };

    var url = "https://jsonplaceholder.typicode.com/posts/";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
        if (request.status == 200) {
            updateSalesXHTML(request.responseText);
        }
    };
    request.send(null);
}

// retrieveJsonP
function a() {

    var updateJsonPScript = function() {

        var url = "http://gumball.wickedlysmart.com" +
            "?callback=updateSalesJsonP" +
            "&lastreporttime=" + lastReportTime +
            "&random=" + (new Date()).getTime();

        var script = document.createElement("script");
        script.setAttribute("id", "jsonP");
        script.setAttribute("src", url);

        var oldScript = document.getElementById("jsonP");
        if (oldScript) {
            // jsonPDiv.parentNode.removeChild(jsonPDiv);
            document.head.replaceChild(script, oldScript);
        } else {
            document.head.appendChild(script);
        }
    }
    updateJsonPScript();
    window.setInterval(updateJsonPScript, 5000);
}

function updateSalesJsonP(responseText) {
    var salesDiv = document.getElementById("sales");
    var sales = responseText;
    //salesDiv.innerHTML = "";

    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }
    var len = sales.length;
    if (len > 0) {
        lastReportTime = sales[len - 1].time;
    }
}

// Luckily there is an easy and old-as-the-Web cure for this. All we do is add a random number onto the end of the URL, and then the browser is tricked into thinking it’s a new URL the browser’s never seen before
