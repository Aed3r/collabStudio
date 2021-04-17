var tracks = document.getElementById("tracks");
var trackTemplate = document.getElementById('track-template').content;
var canvases = []

// Crée un nouveau div servant de piste
function newTrack(id) {
    let template = trackTemplate.cloneNode(true);

    template.querySelector(".track").setAttribute("id", "track" + id);
    template.querySelector(".trackID").innerHTML = "Track " + id;

    return template;
}

// Crée toutes les pistes initiales
for (let i = 0; i < 500; i++) {
    var track = newTrack(i + 1);
    canvases.push(track.querySelector(".trackCanvas"));
    tracks.appendChild(track);
}

// On initialise la résolution des canvas
var cWidth = document.querySelector(".trackBody").clientWidth;
var cHeight = document.querySelector(".track").clientHeight;
canvases.forEach(canvas => {
    canvas.width = cWidth;
    canvas.height = cHeight;
});

var headersOnLeft = true; // Flag tenant compte si on se trouve au début des pistes

// Met en place l'affichage des temps et mesures
function drawMeasures() {
    var xScroll = tracks.scrollLeft; // Pixels verticales défilé
    var yScroll = tracks.scrollTop; // Pixels horizontales défilé
    var oneSecWidth = Math.floor(document.querySelector(".trackBody").clientWidth / 30);
    var trackHeight = document.querySelector(".track").clientHeight;

    // Activation/désactivation de l'ombre
    if (xScroll > 0 && headersOnLeft) {
        // On affiche l'ombre
        headersOnLeft = false;
        document.querySelectorAll(".trackHeader").forEach(header => {
            header.style.boxShadow = "10px 20px 30px darkslategray";
        });
    } else if (xScroll == 0 && !headersOnLeft) {
        // On enlève l'ombre
        headersOnLeft = true;
        document.querySelectorAll(".trackHeader").forEach(header => {
            header.style.boxShadow = "";
        });
    }

    var start = oneSecWidth - Math.floor(xScroll % oneSecWidth);
    console.log(yScroll + " " + trackHeight + " " + document.body.clientHeight + " " + Math.floor(yScroll / trackHeight) + " " + Math.ceil((yScroll + document.body.clientHeight) / trackHeight));
    // Dessine les mesures sur la piste suivant le défilement horizontal
    for (let i = Math.floor(yScroll / trackHeight); i < Math.ceil((yScroll + document.body.clientHeight) / trackHeight); i++) {
        const ctx = canvases[i].getContext('2d');
        ctx.clearRect(0, 0, canvases[i].width, trackHeight);
        ctx.beginPath();
        ctx.lineWidth = 3;

        for (var x = start; x < canvases[i].width - 20; x += oneSecWidth) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, trackHeight);
        }
        ctx.stroke();
    }
}

// On trace les premières mesures
drawMeasures();