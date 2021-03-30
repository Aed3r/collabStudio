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
