// On récupère le nom de l'utilisateur
var userName = document.getElementById("nomUtilisateur").textContent;

if (userName == "") document.location.pathname = '/collabStudio';

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
    let nom = document.getElementById("nom");

    // Vérifie si le nomp est valide
    if (isNullOrWhitespace(nom.value)) {
        nom.classList.add("invalidEntry");
        nom.value = "";
        return;
    }

    newProject(nom.value, userName);
    let endUrl = window.location.origin + '/collabStudio/editeur/editor.jsp#' + nom.value;
    document.location.href = endUrl;
}

// Vérifie si un chaîne de caractères est vide
// https://stackoverflow.com/a/5559461
function isNullOrWhitespace(input) {

    if (typeof input === 'undefined' || input == null) return true;

    return input.replace(/\s/g, '').length < 1;
}