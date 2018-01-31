// LOGIN

var zaposleniBaza = "http://services.odata.org/V3/Northwind/Northwind.svc/Orders?$expand=Order_Details&$format=json";
var sviZaposleni = [];

function getServiceData(url,username, password) {

        try {
        var result;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        result = JSON.parse(xmlhttp.response);
                    }
                    else {
                        return false;
                    }
                }
            }
            xmlhttp.open("GET", url, false, username, password);
            xmlhttp.send();
            return result;
        }
        catch (err) {
            return err;
        }
}


function dajZaposlene() {
    sviZaposleni = getServiceData(zaposleniBaza).value;
}

dajZaposlene();


function novaStrana() {
    window.open('porudzbine.html', '_self', false);
}


function login() {
    var ime = document.getElementById('ime').value;
    var pass = document.getElementById('pass').value;
    var poruka = document.getElementById('poruka');

    var userOk = false;

    for (var i in sviZaposleni) {
        if (ime == sviZaposleni[i].CustomerID && pass == sviZaposleni[i].CustomerID) {
            userOk = true;
        }
    }

    if (userOk == false) {
        poruka.innerHTML = "Pogresno ime ili lozinka!";
        return;
    } else {
        sessionStorage.setItem("userOk", true);
        novaStrana();
    }
}



// LOGIN ON ENTER PRESS

var inputIme = document.getElementById("ime");
var inputPass = document.getElementById("pass");

inputIme.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btnLogin").click();
    }
});


inputPass.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btnLogin").click();
    }
});





// KONVERTOR


var valutaLink = "https://blockchain.info/tobtc?currency=";

var rezultat = document.getElementById('rezultat');

var vrednostLink = "&value=";

konvertuj();


function konvertuj() {

    var selektovanaValuta = document.getElementById('selectValuta').value;
    var inputIznos = document.getElementById('inputIznos').valueAsNumber;
    var ceoLink = valutaLink + selektovanaValuta + vrednostLink + inputIznos;

    var service = getServiceData(ceoLink);

    rezultat.innerHTML = service;

}



// smooth scroll

$(document).ready(function() {
      $('a').on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();

          var hash = this.hash;

          $('html, body').animate({
              scrollTop: $(hash).offset().top
          }, 800, function() {
            window.location.hash = hash;
          });
        }
      });
});
