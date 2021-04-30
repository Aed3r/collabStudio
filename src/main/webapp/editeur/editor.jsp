<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
    <!-- TODO: include header -->

    <template id="item-template">
        <div class="soundItem" onclick="selectItem(this)">
            <span class="itemName"></span>
        </div>
    </template>

    <div id="bottomDiv">
        <div id="contentSelector">
            <span id="selectorSpan">Sélection de contenu</span>
        </div>

        <div id="tracksFrame">
        	<%@ include file = "tracks.html" %>
        </div>
    </div>

    <script src="js/editor.js"></script>
</body>

</html>