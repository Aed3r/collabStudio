var itemColors = ["d9ed92", "b5e48c", "99d98c", "76c893", "52b69a", "34a0a4", "168aad", "1a759f", "1e6091", "184e77", '1e6091', '1a759f', '168aad', '34a0a4', '52b69a', '76c893', '99d98c', 'b5e48c'];
var selector = document.getElementById("contentSelector");
var itemTemplate = document.getElementById('item-template').content;
var itemCounter = 0;
var tracksFrame = document.getElementById("tracksFrame");
var track = new LinkedList();
var tracks = document.getElementById("tracks");

//tracksFrame.removeAttribute("src");
//var tracks = tracksFrame.contentWindow.document.getElementById("tracks");

function newItem(id, title) {
    let template = itemTemplate.cloneNode(true);
    let item = template.querySelector(".soundItem");
    let itemSpan = item.querySelector(".itemName");

    item.setAttribute("id", "item" + id);
    item.style.backgroundColor = "#" + itemColors[(itemCounter++) % itemColors.length];
    itemSpan.innerHTML = title;

    return template;
}

for (let i = 1; i <= 50; i++) {
    selector.appendChild(newItem(i, "Item " + i));
}

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

        // On réajoute le son dans track
        track.insert(draggedOGNode.id, {
            time: (e.layerX / getMeasureWidth() * 1000),
            trackID: draggedOGNode.data.trackID,
            soundID: draggedOGNode.data.soundID,
            length: draggedOGNode.data.length
        }, compSons);

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
    let length = 2000;

    // On vérifie qu'il n'y est pas de dépassement sur d'autres sons du track
    if (!checkPlacement(time, length, trackID)) return;

    node = track.insert(selected + "-" + time + "-" + trackID, {
        time: time,
        trackID: trackID,
        soundID: selected,
        length: length
    }, compSons);
    addSound(node);
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

    soundDiv.id = node.id;
    soundDiv.style.width = (node.data.length / 1000 * getMeasureWidth()) + "px"; // TODO: à changer
    soundDiv.style.left = (node.data.time / 1000 * getMeasureWidth()) + "px";
    soundDiv.style.height = (track1.clientHeight - 2) + "px";
    soundDiv.style.backgroundColor = "red"; // TODO: à changer
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