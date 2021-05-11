var itemColors = ["d9ed92", "b5e48c", "99d98c", "76c893", "52b69a", "34a0a4", "168aad", "1a759f", "1e6091", "184e77", '1e6091', '1a759f', '168aad', '34a0a4', '52b69a', '76c893', '99d98c', 'b5e48c'];
var selector = document.getElementById("contentSelector");
var itemTemplate = document.getElementById('item-template').content;
var itemCounter = 0;
var tracksFrame = document.getElementById("tracksFrame");
var track = {};

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

var selected = null

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
    measureWidth = getMeasureWidth();

    // On trouve la mesure la plus proche
    time = e.layerX / measureWidth;
    console.log(time);
}