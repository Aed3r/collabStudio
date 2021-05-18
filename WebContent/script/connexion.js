// Place la div principale verticalement
function alignBox() {
    var box = document.getElementById("mainDiv");
    mainDiv.style.marginTop = Math.round(window.innerHeight / 2 - box.clientHeight / 2) + 'px';
}

// Met à jour l'emplacement de la div principale lors de redimensionnement
window.addEventListener("load", function() {
    alignBox();
});

// Place la div principale verticalement
function alignBox() {
    var box = document.getElementById("mainDiv");
    mainDiv.style.marginTop = Math.round(window.innerHeight / 2 - box.clientHeight / 2) + 'px';
}

// Met à jour l'emplacement de la div principale lors de redimensionnement
window.addEventListener("load", function() {
    alignBox();
});

function verifierEntree() {
    let pseudo = document.getElementById("pseudo");
    let mdp = document.getElementById("motdepasse");

    // Vérifie si le nomp est valide
    if (isNullOrWhitespace(pseudo.value) || isNullOrWhitespace(mdp.value)) {
        if (isNullOrWhitespace(pseudo.value)) {
            pseudo.classList.add("invalidEntry");
            pseudo.value = "";
        }

        if (isNullOrWhitespace(mdp.value)) {
            mdp.classList.add("invalidEntry");
            mdp.value = "";
        }
        
        return;
    }

    document.getElementById("form").submit();
}

// Vérifie si un chaîne de caractères est vide
// https://stackoverflow.com/a/5559461
function isNullOrWhitespace(input) {

    if (typeof input === 'undefined' || input == null) return true;

    return input.replace(/\s/g, '').length < 1;
}