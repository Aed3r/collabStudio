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
    tracks.appendChild(newTrack(i + 1));
}

// On initialise la résolution des canvas
var cWidth = document.querySelector(".trackBody").clientWidth;
var cHeight = document.querySelector(".track").clientHeight;
document.querySelectorAll(".trackCanvas").forEach(canvas => {
    canvas.width = cWidth;
    canvas.height = cHeight;
});

var headersOnLeft = true; // Flag tenant compte si on se trouve au début des pistes

// Met en place l'affichage des temps et mesures
function drawMeasures() {
    var xScroll = tracks.scrollTop;
    var yScroll = tracks.scrollLeft; // Pixels horizontales défilé
    var oneSecWidth = document.querySelector(".trackBody").clientWidth / 30;

    // Activation/désactivation de l'ombre
    if (yScroll > 0 && headersOnLeft) {
        // On affiche l'ombre
        headersOnLeft = false;
        document.querySelectorAll(".trackHeader").forEach(header => {
            header.style.boxShadow = "10px 20px 30px darkslategray";
        });
    } else if (yScroll == 0 && !headersOnLeft) {
        // On enlève l'ombre
        headersOnLeft = true;
        document.querySelectorAll(".trackHeader").forEach(header => {
            header.style.boxShadow = "";
        });
    }

    var start = (yScroll + document.querySelector(".trackHeader").clientWidth + oneSecWidth) % oneSecWidth;
    // Dessine les mesures sur la piste suivant le défilement horizontal
    document.querySelectorAll(".trackCanvas").forEach(canvas => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 3;

        for (var x = start; x < canvas.width - 20; x += oneSecWidth) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
        }
        ctx.stroke();
    });
}

// On trace les premières mesures
drawMeasures();