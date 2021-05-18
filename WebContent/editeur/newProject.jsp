<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Connexion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/newProject.css">
        <script src="js/newProject.js" async defer></script>
        <script src="js/network.js" async defer></script>
    </head>
    <body onresize="alignBox()">
        <div id="background">
            <div id="colors"></div>
            <%@ include file = "header.html" %>
            <div id="mainDiv">
                <h2 id="greet">Créer un nouveau projet</h2>
                <h4 id="contentQuestion">Veuillez entrer un nom de projet</h4>
    
                <div id="namePicker">
                    <input id="nom" type="text" placeholder="Nom de projet" maxlength="60" />
                    <input type="button" onclick="verifierEntree()" value="Créer"/>
                    <input type="button" onclick="document.location.pathname = '/collabStudio'" value="Retour"/>
                </div>
            </div>
        </div>
    </body>
</html>