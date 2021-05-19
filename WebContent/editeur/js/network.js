var ws = null;

function connectToWebsocket() {
    let node = null;
    ws = new WebSocket(document.location.origin.replace(/^http(.*)/, "ws$1") + "/collabStudio/wsHandler");

    ws.onopen = function() {
        // On récupère les données du projet
        if (typeof projectName !== 'undefined') requestData(projectName, userName);
    };
    ws.onclose = function() {
        console.log("Connection au serveur fermé !");
    };
    ws.onmessage = function(event) {
        let m = JSON.parse(event.data);

        switch (m.action) {
            case "newFiles":
                m.data.forEach(file => {
                    newItem(file[0], file[1]);
                });
                break;

            case "addSound":
                node = m.node;
                track.insert(node.id, node.data, compSons);
                addSound(node);
                break;

            case "removeSound":
                node = m.node;
                track.remove(node.id);
                document.getElementById(node.data.trackID).removeChild(document.getElementById(node.id));
                break;

            case "msg":
                afficherMsg(m.msg);
                break;

            case "loadTrack":
                console.log("preparing track");
                prepareNewTrack(m.track);
                if (soundsLoaded) loadTrack();
                break;

            case "loadSounds":
                console.log("loading sounds");
                loadSounds(m.data);
                break;

            default:
                break;
        }
    };

    // ws.send(..)
}

connectToWebsocket();

async function fileUpload(elem) {
    let formData = new FormData();

    Array.from(elem.files).forEach(file => {
        formData.append("files", file);
    });

    formData.append("projectID", getProjectName());

    const ctrl = new AbortController(); // timeout
    setTimeout(() => ctrl.abort(), 5000);

    try {
        let r = await fetch('/collabStudio/FileUpload', { method: "POST", body: formData, signal: ctrl.signal });
        console.log('HTTP response code:', r.status);
    } catch (e) {
        document.getElementById("fileUploadMask").style.backgroundImage = "url(data/img/close.svg)";
    }
}

function sendChange(action, node) {
    let packet = { "action": action, "node": node };

    ws.send(JSON.stringify(packet));
}

function sendMsg(msg) {
    let packet = { "action": "msg", "msg": msg };

    ws.send(JSON.stringify(packet));
}

function sendTrack(track, projectID) {
    let packet = { "action": "saveTrack", "track": JSON.stringify(track), "projectID": projectID };

    ws.send(JSON.stringify(packet));
}

function newProject(nom, userName) {
    let packet = { "action": "newProject", "nom": nom, "userName": userName };

    ws.send(JSON.stringify(packet));
}

function requestData(projectID, userID) {
    let packet = { "action": "requestData", "project": projectID, "username": userID };

    ws.send(JSON.stringify(packet));
}

function addUserToProj(user, projectID) {
    let packet = { "action": "addUser", "project": projectID, "username": user };

    ws.send(JSON.stringify(packet));
}