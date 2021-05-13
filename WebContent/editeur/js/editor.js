var itemColors = ["d9ed92", "b5e48c", "99d98c", "76c893", "52b69a", "34a0a4", "168aad", "1a759f", "1e6091", "184e77", '1e6091', '1a759f', '168aad', '34a0a4', '52b69a', '76c893', '99d98c', 'b5e48c'];
var selector = document.getElementById("contentSelector");
var itemTemplate = document.getElementById('item-template').content;
var itemCounter = 0;
var tracksFrame = document.getElementById("tracksFrame");
var track = new LinkedList();

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
        return;
    }

    // On déselectionne l'elem actuel
    if (selected != null) {
        document.getElementById(selected).style.boxShadow = "";
    }

    // On selectionne le nouvel item
    selected = elem.id;
    elem.style.boxShadow = "0px 0px 4px 4px " + elem.style.backgroundColor;
}

function putItem(e) {
    let measureWidth = getMeasureWidth();
    let tracks = document.getElementById("tracks");
    let cornerDiv = document.getElementById("corner");
    let track1 = document.getElementById("track1");

    // Position du clic sur le canvas
    let posX = e.layerX - cornerDiv.clientWidth;
    let posY = e.layerY;

    // On trouve la mesure la plus proche
    let time = Math.floor(posX / measureWidth) * 1000;
    let trackID = Math.ceil(posY / track1.clientHeight);
    
    track.insert(time, {trackID: trackID, sound: selected});
}

/*
    let canvasX = e.layerX - tracks.scrollLeft - cornerDiv.clientWidth;
    let canvasY = e.layerY - tracks.scrollTop + cornerDiv.clientHeight;

    // On trouve la mesure la plus proche
    let time = Math.floor(canvasX / measureWidth);
    let track = Math.floor(canvasY / track1.clientHeight);
    console.log(time);

    ctx = document.getElementById("tracksCanvas").getContext('2d');
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(time*measureWidth-20, track*track1.clientHeight-20);
    ctx.lineTo(time*measureWidth+20, track*track1.clientHeight+20);
    ctx.moveTo(time*measureWidth-20, track*track1.clientHeight+20);
    ctx.lineTo(time*measureWidth+20, track*track1.clientHeight-20);
    ctx.stroke();
    */