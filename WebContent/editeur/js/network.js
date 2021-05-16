function connectToWebsocket() {
    let ws = new WebSocket(document.location.origin.replace(/^http(.*)/, "ws$1") + "/collabStudio/wsHandler");

    ws.onopen = function() {};
    ws.onclose = function() {};
    ws.onmessage = function(event) {
        let m = JSON.parse(event.data);

        switch (m.action) {
            case "newFiles":
                m.data.forEach(file => {
                    newItem(file[0], file[1]);
                });
                break;

            default:
                break;
        }
    };

    // ws.send(..)
}

connectToWebsocket();

async function fileUpload(elem) {
    //let user = { name: 'john', age: 34 };
    let formData = new FormData();

    Array.from(elem.files).forEach(file => {
        formData.append("files", file);
    });

    //formData.append("user", JSON.stringify(user));

    const ctrl = new AbortController() // timeout
    setTimeout(() => ctrl.abort(), 5000);

    try {
        let r = await fetch('/collabStudio/FileUpload', { method: "POST", body: formData, signal: ctrl.signal });
        console.log('HTTP response code:', r.status);
    } catch (e) {
        document.getElementById("fileUploadMask").style.backgroundImage = "url(data/img/close.svg)";
    }
}