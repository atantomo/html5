window.onload = init;

function init() {

    // localStorage["sticky_0"] = "love";
    // localStorage["sticky_1"] = "faith";
    a();
}

// postIt
function a() {

    var addButton = document.getElementById("add_button");
    addButton.onclick = createSticky;

    var clearButton = document.getElementById("clear_button");
    clearButton.onclick = clearStorage;

    var stickiesArray;
    refresh();

    function refresh() {
        var stickies = document.getElementById("stickies");
        stickies.innerHTML = "";

        stickiesArray = getStickiesArray();

        // for (var i = 0; i < stickiesArray.length; i++) {
        for (var key in stickiesArray) {
            // var key = stickiesArray.key(i);
            // var value = localStorage.getItem(key);
            // addStickyToDOM(value);
            if (stickiesArray.hasOwnProperty(key)) {
                addStickyToDOM(key, stickiesArray[key]);
            }
        }
    }

    function getStickiesArray() {
        var stickiesString = localStorage["stickiesArray"];
        if (!stickiesString) {
            var emptyArray = {};
            localStorage["stickiesArray"] = JSON.stringify(emptyArray);
            return emptyArray;
        } else {
            return JSON.parse(stickiesString);
        }
    }

    function addStickyToDOM(key, sticky) {
        var stickiesEl = document.getElementById("stickies");
        var stickyEl = document.createElement("li");
        stickyEl.setAttribute("id", key);
        stickyEl.style.backgroundColor = sticky.color;

        var span = document.createElement("span");
        span.setAttribute("class", "sticky");
        span.innerHTML = sticky.text;

        stickyEl.appendChild(span);
        stickiesEl.appendChild(stickyEl);

        stickyEl.onclick = deleteSticky;
    }

    function createSticky() {
        var textField = document.getElementById("note_text");
        var text = textField.value;
        textField.value = "";

        var colorSelect = document.getElementById("note_color");
        var color = colorSelect.value;

        var sticky = {
            "text": text,
            "color": color
        };

        var currentDate = new Date();
        var time = currentDate.getTime();
        var key = "sticky_" + time;

        stickiesArray[key] = sticky;

        localStorage["stickiesArray"] = JSON.stringify(stickiesArray);

        addStickyToDOM(key, sticky);
    }

    function deleteSticky(e) {

        var element = e.target;
        while (element.tagName.toLowerCase() != "li") {
            element = element.parentNode;
        }
        var key = element.id;

        delete stickiesArray[key];
        localStorage["stickiesArray"] = JSON.stringify(stickiesArray);
        refresh();
    }

    function clearStorage() {
        localStorage.clear();
        refresh();
    }
}

//  If you substitute the global variable sessionStorage everywhere you’ve used localStorage then your items are stored only during the browser session. So, as soon as that session is over (in other words, the user closes the browser window), the items in storage are removed.
