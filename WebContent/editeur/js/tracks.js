var secondsToShow = 30;
var nbPistes = 500;
var xMarker = 0;
var colLimites = 'darkslategray';
var colMarqueur = 'crimson';
var tailleMarqueur = 10; // px
var distanceFadeIn = 100; // px
var minZoom = 10;
var maxZoom = 60;
var fps = 30;

// Crée un nouveau div servant de piste
function newTrack(id) {
    let template = trackTemplate.cloneNode(true);

    template.querySelector(".track").setAttribute("id", "track" + id);
    template.querySelector(".trackID").innerHTML = "Track " + id;
    template.querySelector(".trackBody").setAttribute("id", "trackBody" + id);
    template.querySelector(".slider").value = 100;

    return template;
}

// Crée toutes les pistes initiales
var tracks = document.getElementById("tracks");
let trackTemplate = document.getElementById('track-template').content;
for (let i = 1; i <= nbPistes; i++) {
    var track = newTrack(i);
    tracks.appendChild(track);
}

var topDiv = document.getElementById("top");
var cornerDiv = document.getElementById("corner");

// Met en place l'affichage des temps et mesures ainsi que les ombres
function drawMeasures() {
    let xScroll = tracks.scrollLeft; // Pixels verticales défilé
    let yScroll = tracks.scrollTop; // Pixels horizontales défilé
    let measureWidth = getMeasureWidth();
    let timeKeepHeight = topDiv.clientHeight;

    // Activation/désactivation de l'ombre verticale
    document.getElementById("ombreH").style.opacity = Math.min(yScroll / distanceFadeIn, 1);

    // Activation/désactivation de l'ombre horizontale
    document.getElementById("ombreV").style.opacity = Math.min(xScroll / distanceFadeIn, 1);

    // Dessine les mesures sur les pistes visibles suivant le défilement horizontal
    var start = measureWidth - Math.floor(xScroll % measureWidth);

    let ctx = tracksCanvas.getContext('2d');
    ctx.clearRect(0, 0, tracksCanvas.width, tracksCanvas.height);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = colLimites;
    ctx.fillStyle = colLimites;
    ctx.font = '10px Open Sans';

    let txtDist = 0;

    for (let x = start; x < tracksCanvas.width - 20; x += measureWidth) {
        // lignes
        ctx.moveTo(x, timeKeepHeight);
        ctx.lineTo(x, tracksCanvas.height);

        // temps
        let sec = Math.round((x + xScroll) / measureWidth);
        let min = Math.floor(sec / 60);
        sec = Math.round(sec % 60);

        let txt = "";
        if (min < 10) txt += "0";
        txt += min;
        txt += ":";
        if (sec < 10) txt += "0";
        txt += sec;

        txtDist -= measureWidth;

        if (txtDist < 0) {
            ctx.fillText(txt, x - ctx.measureText(txt).width / 2, timeKeepHeight - 5, measureWidth);
            txtDist += ctx.measureText(txt).width;
        }
    }
    ctx.stroke();

    // On affiche le marqueur
    drawMarker();
}

/* Redéssine tout après avoir modifié les tailles des éléments */
function changeZoom() {
    let percent = document.getElementById("zoomLevel").value;
    secondsToShow = minZoom + (maxZoom - minZoom) * percent / 100;
    drawMeasures();
    document.querySelectorAll(".itemInEditor").forEach(element => {
        element.style.width = (parseInt(element.dataset.duration * getMeasureWidth())) + "px";
        element.style.left = (parseInt(element.dataset.position * getMeasureWidth())) + "px";
    });
}

/* Marqueur de début de lecture */

// Trace le marqueur
function drawMarker() {
    let xScroll = tracks.scrollLeft; // Pixels verticales défilé
    let timeKeepHeight = topDiv.clientHeight;

    // On vérifie qu'il est visible
    if (xMarker < xScroll - tailleMarqueur / 2 || xMarker > xScroll + document.body.clientWidth + tailleMarqueur / 2) return;

    let ctx = tracksCanvas.getContext('2d');

    // Tête
    ctx.fillStyle = colMarqueur;
    ctx.beginPath();
    ctx.moveTo(xMarker - xScroll, timeKeepHeight);
    ctx.lineTo(xMarker - xScroll - tailleMarqueur / 2, timeKeepHeight - tailleMarqueur / 2);
    ctx.lineTo(xMarker - xScroll - tailleMarqueur / 2, timeKeepHeight - tailleMarqueur);
    ctx.lineTo(xMarker - xScroll + tailleMarqueur / 2, timeKeepHeight - tailleMarqueur);
    ctx.lineTo(xMarker - xScroll + tailleMarqueur / 2, timeKeepHeight - tailleMarqueur / 2);
    ctx.closePath();
    ctx.fill();

    // Queue
    ctx.strokeStyle = colMarqueur;
    ctx.beginPath();
    ctx.moveTo(xMarker - xScroll, timeKeepHeight);
    ctx.lineTo(xMarker - xScroll, tracksCanvas.height);
    ctx.stroke();
}

// Met à jour le marqueur à partir d'un évenement
function updateMarker(e) {
    if (e.srcElement.id == "top") {
        xMarker = e.layerX + tracks.scrollLeft - cornerDiv.clientWidth;
        if (xMarker < 0) xMarker = 0;
        drawMeasures();
        playTrack(true);
    }
}



document.getElementById("zoomLevel").addEventListener('input', changeZoom, false);

// On place le marqueur au clic simple
topDiv.addEventListener("click", function(e) {
    updateMarker(e);
}, false);

var markerDragged = false;

// On suit la souris lors d'un clic + drag
topDiv.addEventListener("mousedown", function() {
    markerDragged = true;
}, false);

document.addEventListener("mousemove", function(e) {
    if (markerDragged) updateMarker(e);
}, false);

document.addEventListener("mouseup", function() {
    markerDragged = false;
}, false);

var timeoutID = null;
var correctionTimeoutID = null;
var correctionStarted = false;
var startingTime = null;
var correction = null;

// Lance le marqueur de position lors de la lecture
function lancerMarqueur() {
    let avance = getMeasureWidth() / fps;

    if (correction) avance += correction;

    if (!correctionStarted) {
        correctionStarted = true;
        setTimeout(correctMarker, 1000);
        startingTime = xMarker;
    }

    timeoutID = setTimeout(lancerMarqueur, 1000 / fps);

    xMarker += avance;
    drawMeasures();
}

function correctMarker() {
    if (correctionStarted) {
        startingTime += getMeasureWidth();
        correction = (startingTime - xMarker) / fps;
        xMarker = startingTime;
        correctionTimeoutID = setTimeout(correctMarker, 1000);
    }
}

function stopMarqueur() {
    if (timeoutID) clearTimeout(timeoutID);
    if (correctionTimeoutID) clearTimeout(correctionTimeoutID);
    correctionStarted = false;
    correction = null;
}

/* Canvas */

// On initialise la résolution du canvas
var tracksCanvas = document.getElementById("tracksCanvas");

// https://stackoverflow.com/a/15666143
var PIXEL_RATIO = (function() {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

function initCanvas() {
    let ratio = PIXEL_RATIO;
    tracksCanvas.width = tracksCanvas.clientWidth * ratio;
    tracksCanvas.height = tracksCanvas.clientHeight * ratio;
    tracksCanvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);

    // On trace les premières mesures
    drawMeasures();

    // On place le marqueur
    drawMarker();
}

initCanvas();

window.addEventListener("resize", initCanvas);

/* Slider de volume */

function setSliderPos(slider, pos) {
    let range = slider.parentElement.querySelector(".slider");

    range.value = pos;
}

/* Fonction get / set */

function getMeasureWidth() {
    return Math.round(tracksCanvas.clientWidth / secondsToShow);
}

function getNbPistes() {
    return nbPistes;
}

function getPosMarker() {
    return xMarker;
}

function getTrackVolume(trackID) {
    return document.getElementById(trackID).parentElement.querySelector(".slider").value;
}