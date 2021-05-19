<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <title>CollabStudio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/editor.css">
    </head>

    <body>
        <%@ include file = "header.html" %>
        <span id="nomUtilisateur">${sessionScope.pseudo}</span>

        <template id="item-template">
            <div class="soundItem" onclick="selectItem(this)">
                <span class="itemName"></span>
                <div class="progression"></div>
            </div>
        </template>

        <div id="mainDiv">
            <div id="leftDiv">
                <div id="playBtn" onclick="playTrack()"></div>
                <div id="pauseBtn" onclick="playTrack()"></div>
                <div id="contentWrap">
                    <span id="selectorSpan">Sélection de contenu</span>
                    <div id="contentSelector"></div>
                    <div id="fileUploadMask">
                        <input type="file" id="soundAdder" multiple="true" onchange="fileUpload(this)" accept="audio/mpeg3"/>
                    </div>
                </div>
            </div>

            <div id="tracksFrame">
                <%@ include file = "tracks.html" %>
            </div>

            <div id="messagerie">
                <span id="msgrHeader" onclick="toggleMessagerie()">Messagerie</span>
                <div id="affichageMsg"></div>
                <div id="saisie">
                    <input type="text" id="entreeMsg" />
                    <input type="button" id="envoyerMsg" value="Envoyer" onclick="envoyerMsg()"/>
                </div>
            </div>
        </div>

        <script src="js/network.js"></script>
        <script src="js/linkedList.js"></script>
        <script src="js/editor.js"></script>
    </body>

    </html>