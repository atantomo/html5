window.onload = init;

function init() {

    var fido = {
        name: "Fido",
        weight: 40,
        breed: "Mixed",
        loves: ["walks", "fetching balls"]
    };
    var jsonString = JSON.stringify(fido);
    // alert(jsonString);
    var prop;
    for (prop in fido) {
        console.log(prop);
        if (prop == "name") {
            console.log(fido[prop]);
        }
    }

    var p = document.getElementById("pi");
    console.log(p.childElementCount);
}

var dog = new Dog("Love", "Fairy", "100.1");
//dog.bark();

console.log(location);
console.log(document.URL);

function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    this.bark = function() {
        if (this.weight > 25) {
            alert(this.name + " says Woof!");
        } else {
            alert(this.name + " says Yip!");
        }
    }
}

// window
// ==========
// properties:
// document
// location = contains URL
// onload
// status
// ==========
// methods:
// alert
// prompt
// open
// close
// setTimeout
// setInterval

// document
// ==========
// properties:
// domain
// title
// URL = URL
// ==========
// methods:
// getElementById
// getElementsByTagName
// getElementsByClassName

// ul (HTML tag)
// ==========
// properties:
// innerHTML
// childElementCount
// firstChild
// ==========
// methods:
// appendChild
// insertBefore
