var itemColors = ["d9ed92", "b5e48c", "99d98c", "76c893", "52b69a", "34a0a4", "168aad", "1a759f", "1e6091", "184e77", '1e6091', '1a759f', '168aad', '34a0a4', '52b69a', '76c893', '99d98c', 'b5e48c'];
var selector = document.getElementById("contentSelector");
var itemTemplate = document.getElementById('item-template').content;
var itemCounter = 0;
var tracksFrame = document.getElementById("tracksFrame");
var track = new LinkedList();
var tracks = document.getElementById("tracks");
var sounds = {};
var soundTitles = {};
var playingStatus = "paused";

//tracksFrame.removeAttribute("src");
//var tracks = tracksFrame.contentWindow.document.getElementById("tracks");

function newItem(id, title) {
    let template = itemTemplate.cloneNode(true);
    let item = template.querySelector(".soundItem");
    let itemSpan = item.querySelector(".itemName");
    let itemID = "item" + id;

    item.setAttribute("id", itemID);
    item.style.backgroundColor = "#" + itemColors[(itemCounter++) % itemColors.length];
    itemSpan.innerHTML = title;
    item.dataset.loaded = "false";

    selector.appendChild(template);
    let newSound = new Audio("/collabStudio/sounds/" + id);
    sounds[itemID] = newSound;
    soundTitles[itemID] = title;
    newSound.addEventListener("canplaythrough", soundLoaded(itemID));

    return template;
}

function soundLoaded(id) {
    let item = document.getElementById(id);
    item.style.backgroundImage = "none";
    item.querySelector(".itemName").style.visibility = "visible";
    item.dataset.loaded = "true";
}

/*
for (let i = 1; i <= 50; i++) {
    newItem(i, "Item " + i);
}*/

var selected = null;

function selectItem(elem) {
    // Si elem est select on le deselect
    if (selected == elem.id) {
        selected = null;
        elem.style.boxShadow = "";
        // On modifie le curseur des tracks
        let children = tracks.children;
        for (let i = 0; i < children.length; i++)
            children[i].style.cursor = "default";
        return;
    }

    // On déselectionne l'elem actuel
    if (selected != null) {
        document.getElementById(selected).style.boxShadow = "";
    } else {
        // On modifie le curseur des tracks
        let children = tracks.children;
        for (let i = 0; i < children.length; i++)
            children[i].style.cursor = "pointer";
    }

    // On selectionne le nouvel item
    selected = elem.id;
    elem.style.boxShadow = "0px 0px 4px 4px " + elem.style.backgroundColor;

    // Si le son est chargé on le li une fois
    if (elem.dataset.loaded == "true") {
        let prog = elem.querySelector(".progression");
        prog.style.transition = "width " + sounds[elem.id].duration + "s linear";
        prog.ontransitionend = () => {
            prog.style.transition = "none";
            elem.classList.remove("activated");
        };
        elem.classList.add("activated");
        sounds[elem.id].play();
    }
}

var currentlyDragged = null;
var draggedOGPos = null;
var draggedOGTrack = null;
var draggedOGNode = null;
var dragMouseOffset = null;

// Vérifie s'il y a la place puis ajoute l'item sélectionné dans l'éditeur à l'endroit du clic
function putItem(e) {
    // Vérifications
    if (currentlyDragged) {
        if (currentlyDragged.style.visibility == "hidden" || e.which != 1) {
            // On rétablie l'emplacement initial
            currentlyDragged.parentElement.removeChild(currentlyDragged);
            document.getElementById(draggedOGTrack).appendChild(currentlyDragged);
            currentlyDragged.style.left = draggedOGPos + "px";
            currentlyDragged.style.visibility = "visible";
        }

        let pos = null;
        if (e.target.className != "trackBody") pos = e.target.offsetLeft + e.layerX - dragMouseOffset;
        else pos = e.layerX - dragMouseOffset;

        // On réajoute le son dans track
        let newNode = track.insert(draggedOGNode.id, {
            time: (pos / getMeasureWidth() * 1000),
            trackID: e.currentTarget.id,
            soundID: draggedOGNode.data.soundID,
            length: draggedOGNode.data.length
        }, compSons);

        // On envoi aux autres utilisateurs
        sendChange("removeSound", draggedOGNode);
        sendChange("addSound", newNode);

        // On réinitialise les valeurs temporaires  
        currentlyDragged.classList.remove("ghost");
        currentlyDragged.style.cursor = "grab";
        currentlyDragged = null;
        draggedOGPos = null;
        draggedOGTrack = null;
        draggedOGNode = null;
        dragMouseOffset = null;
        return;
    }

    if (selected == null || e.target.className != "trackBody") return;

    // On trouve la mesure la plus proche
    let time = Math.floor(e.layerX / getMeasureWidth()) * 1000;
    let trackID = e.currentTarget.id;
    let length = sounds[selected].duration * 1000;

    // On vérifie qu'il n'y est pas de dépassement sur d'autres sons du track
    if (!checkPlacement(time, length, trackID)) return;

    node = track.insert(selected + "-" + time + "-" + trackID, {
        time: time,
        trackID: trackID,
        soundID: selected,
        length: length
    }, compSons);

    // On ajoute le clip dans l'éditeur
    addSound(node);

    // On envoi aux autres utilisateurs
    sendChange("addSound", node);
}

function compSons(node, newNode) {
    return node.data.time < newNode.data.time;
}

// Vérifie qu'un son de longueur 'length' peut être placé sur le track d'identifiant 'trackID' à 'time' ms
function checkPlacement(time, length, trackID) {
    // Avant ou sur 'time'
    let closestBefore = track.getClosestBeforeOrOn((x => x.data.time <= time), (x => x.data.trackID == trackID));
    if (closestBefore && closestBefore.data.time + closestBefore.data.length > time) return false;
    // Après 'time'
    let closestAfter = track.getClosestAfter((x => x.data.time <= time), (x => x.data.trackID == trackID));
    if (closestAfter && time + length > closestAfter.data.time) return false;

    return true;
}

// Ajoute un seul son au track et au temps sélectionné
function addSound(node) {
    let destTrack = document.getElementById(node.data.trackID);
    let soundDiv = document.createElement("div");
    let track1 = document.getElementById("track1");
    let lbl = document.createElement("span");

    soundDiv.id = node.id;
    lbl.innerHTML = soundTitles[node.data.soundID];
    lbl.classList.add("itemName");
    soundDiv.appendChild(lbl);
    soundDiv.style.width = (node.data.length / 1000 * getMeasureWidth()) + "px";
    soundDiv.dataset.duration = (node.data.length / 1000) + "";
    soundDiv.style.left = (node.data.time / 1000 * getMeasureWidth()) + "px";
    soundDiv.dataset.position = (node.data.time / 1000) + "";
    soundDiv.style.height = (track1.clientHeight - 2) + "px";
    soundDiv.style.backgroundColor = document.getElementById(node.data.soundID).style.backgroundColor;
    soundDiv.classList.add("itemInEditor");
    soundDiv.setAttribute("onmousedown", "editorSoundMouseDown(this, event)");
    soundDiv.setAttribute("onmouseup", "editorSoundMouseUp(this, event)");
    soundDiv.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    destTrack.appendChild(soundDiv);
}

// Ajoute les sons définies dans l'objet track
function addTrack() {
    let node = track.head;
    while (node) {
        addSound(node.data.soundID, node.id, node.data.trackID);
        node = node.next;
    }
}

function editorSoundMouseUp(soundDiv, e) {
    if (e.which == 3) {
        // On envoi aux autres utilisateurs
        sendChange("removeSound", track.get(soundDiv.id));

        track.remove(soundDiv.id);
        soundDiv.parentElement.removeChild(soundDiv);
    }
}

function editorSoundMouseDown(soundDiv, e) {
    if (e.which == 1) {
        draggedOGNode = track.get(soundDiv.id);
        track.remove(soundDiv.id);
        soundDiv.classList.add("ghost");
        currentlyDragged = soundDiv;
        draggedOGPos = soundDiv.style.left;
        draggedOGTrack = soundDiv.parentElement.id;
        dragMouseOffset = e.layerX;
        soundDiv.style.cursor = "grabbing";
    }
}

function editorMouseMove(e) {
    if (!currentlyDragged) return;

    let pos = null;
    if (e.target.className != "trackBody") pos = e.target.offsetLeft + e.layerX - dragMouseOffset;
    else pos = e.layerX - dragMouseOffset;

    let time = pos / getMeasureWidth() * 1000;
    let trackID = e.currentTarget.id;

    if (checkPlacement(time, draggedOGNode.data.length, trackID)) {
        if (currentlyDragged.parentElement.id != trackID) {
            currentlyDragged.parentElement.removeChild(currentlyDragged);
            document.getElementById(trackID).appendChild(currentlyDragged);
        }
        currentlyDragged.style.left = pos + "px";
        currentlyDragged.style.visibility = "visible";
    } else {
        currentlyDragged.style.visibility = "hidden";
    }
}

var currentlyPlaying = [];
var lastTimeout = null;

// Joue un son de la continuité de sons
function playSound (node, doContinue, start = 0) {
    if (playingStatus == "playing") {
        let clip = sounds[node.data.soundID];

        clip.currentTime = start / 1000;

        clip.play();
        currentlyPlaying.push(node.data.soundID);
        setTimeout(function(id) { currentlyPlaying.splice(currentlyPlaying.indexOf(id), 1); }, node.data.length - start, node.data.soundID);

        if (doContinue && node.next) 
            lastTimeout = setTimeout(playSound, node.next.data.time - node.data.time - start, node.next, true);
    }
}

function clearCurrentlyPlaying() {
    // On arrête les sons en cours de lecture
    clearTimeout(lastTimeout);
    currentlyPlaying.forEach(soundID => {
        sounds[soundID].pause();
    });
    currentlyPlaying = [];
}

// Lance ou pause la lecture suivant la position du marqueur
function playTrack(markerMoved = false) {
    if (markerMoved) {
        if (playingStatus == "playing") {
            clearCurrentlyPlaying();
            playingStatus = "paused";
            stopMarqueur();
        } else return;
    }

    switch (playingStatus) {
        case "paused":
            let node = track.head;
            let posMarker = getPosMarker() / getMeasureWidth() * 1000; // Position du marqueur
            let oldest = null;

            // On change l'état de lecture
            document.getElementById("playBtn").style.display = "none";
            document.getElementById("pauseBtn").style.display = "block";
            playingStatus = "playing";
            lancerMarqueur();

            // On cherche le première son se trouvant sur le marqueur et on lance ceux se trouvant également dessus
            while (node) {
                if (node.data.time < posMarker && node.data.time + node.data.length > posMarker) {
                    if (oldest == null || oldest.data.time+oldest.data.length < node.data.time+node.data.length) {
                        if (oldest) playSound(oldest, false, oldest.data.time + oldest.data.length - posMarker);
                        oldest = node;
                    } else {
                        playSound(node, false, node.data.time + node.data.length - posMarker);
                    }
                }

                node = node.next;
            }

            // On lance la chaîne de lecture à partir du premier son à lire
            if (oldest != null) playSound(oldest, true, oldest.data.time + oldest.data.length - posMarker);
            else {
                let next = track.getClosestAfter((x => x.data.time <= posMarker));
                if (next) setTimeout(playSound, next.data.time - posMarker, next, true);
            }

            break;

        case "playing":
            // On change l'état de lecture
            document.getElementById("playBtn").style.display = "block";
            document.getElementById("pauseBtn").style.display = "none";
            playingStatus = "paused";
            stopMarqueur();

            clearCurrentlyPlaying();
            break;
        
        default:
            break;
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code === "Space") playTrack();
});

/* Messagerie */

var unread = 0;

function toggleMessagerie() {
    let messagerie = document.getElementById("messagerie");

    if (!messagerie.dataset.expanded || messagerie.dataset.expanded == "false") {
        messagerie.dataset.expanded = "true";
        messagerie.style.top = "74%";
        document.getElementById("msgrHeader").innerHTML = "Messagerie";
        unread = 0;
    } else {
        messagerie.dataset.expanded = "false";
        messagerie.style.top = "100%";
    }
}

function envoyerMsg() {
    let entree = document.getElementById("entreeMsg");
    let msg = entree.value.trim();

    if (msg != "") {
        sendMsg(msg);
        afficherMsg(msg);
        entree.value = "";
    }
}

function afficherMsg (msg) {
    let affichageMsg = document.getElementById("affichageMsg");
    let messagerie = document.getElementById("messagerie");
    let currentDate = new Date();

    affichageMsg.innerHTML += "<b>[" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + "]</b> " + msg + "<br>";

    if (!messagerie.dataset.expanded || messagerie.dataset.expanded == "false") {
        unread++;
        document.getElementById("msgrHeader").innerHTML = "Messagerie (" + unread + ")";
    }
}

let input = document.getElementById("entreeMsg");

input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("envoyerMsg").click();
  }
}); 