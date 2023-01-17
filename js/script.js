document.addEventListener("DOMContentLoaded", function(){
    
    var trazilica = document.getElementById("trazilica");
    var pjesmePoNazivu = document.getElementById("pjesmeponazivu");

    trazilica.addEventListener("keyup", function(){
        var termin = trazilica.value;
        if(termin.trim() != ""){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    var nazivPjesme, nazivIzvodaca;
                    var podaci = "<ul>";
                    var jsonData = JSON.parse(this.responseText);
                    if (jsonData == "") {
                        podaci += "<h3>Nije pronađena niti jedna pjesma.</h3>";
                    } else {
                        for(let i = 0; i < jsonData.length; i++){
                            nazivPjesme = jsonData[i].nazivPjesme;
                            nazivIzvodaca = jsonData[i].nazivIzvodaca;
                            podaci += "<li>" + nazivPjesme + " - " + nazivIzvodaca + "</li>";
                        }
                    }
                    podaci += "</ul>";
                    pjesmePoNazivu.innerHTML = podaci;
                }
            }
            xhttp.open("GET", `http://frodo.ess.hr/algebra/ispit-js/pjesme-json.php?pojam=${termin}`, true);
            xhttp.send();
        } 
        else{
            pjesmePoNazivu.innerHTML = "";
        }
    });
});