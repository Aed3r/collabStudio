var tracks = document.getElementById("tracks");
var trackTemplate = document.getElementById('track-template').content;

// Crée un nouveau div servant de piste
function newTrack(id) {
    let template = trackTemplate.cloneNode(true);

    template.querySelector(".track").setAttribute("id", "track" + id);
    template.querySelector(".trackID").innerHTML = "Track " + id;

    return template;
}

// Crée toutes les pistes initiales
for (i = 0; i < 500; i++) {
    document.createElement("div");
    tracks.appendChild(newTrack(i+1));
}

// Met en place l'affichage des temps et mesures

var headersOnLeft = true; // Flag tenant compte si on se trouve au début des pistes
function drawMeasures() {
    yPos = tracks.scrollLeft; // Pixels horizontales défilé

    // Activation/désactivation de l'ombre
    if (yPos > 0 && headersOnLeft) {
        // On affiche l'ombre
        headersOnLeft = false;
        document.querySelectorAll(".trackHeader").forEach(header => {
            header.style.boxShadow = "10px 20px 30px darkslategray";
        });
    } else if (yPos == 0 && !headersOnLeft) {
        // On enlève l'ombre
        headersOnLeft = true;
        document.querySelectorAll(".trackHeader").forEach(header => {
            header.style.boxShadow = "";
        });
    }
    
    // Dessine les mesures sur la piste suivant le défilement horizontal
    document.querySelectorAll(".trackCanvas").forEach(canvas => {
        const ctx = canvas.getContext('2d');

        for (i = 0; i < )
    });
}