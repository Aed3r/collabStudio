<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Inscription</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="styles/connexion.css">
        <script src="script/inscription.js" async defer></script>
    </head>
    <body onresize="alignBox()">
        <div id="background">
            <div id="colors"></div>
            <div id="mainDiv">
                <h2 id="greet">Bienvenue</h2>
                <h4 id="contentQuestion">Veuillez entrer vos identifiants</h4>
    
                <div id="namePicker">
					<form action="Servlet_liste" method="post" id="form">
						<input type="text" name="nom" id="nom" placeholder="Nom"/>
						<input type="text" name="prenom" id="prenom" placeholder="Prénom"/>
						<input type="text" name="pseudo" id="pseudo" placeholder="Pseudo"/>
						<input type="password" name="mdp" id="mdp" placeholder="Mot de passe"/>
						<input type="button" onclick="verifierEntree()" value="S'inscrire"/>
					</form>
                </div>

                <%-- Vérification de la présence d'un objet utilisateur en session --%>
                <c:if test="${!empty sessionScope.sessionU}">
                    <jsp:forward page="index.jsp"></jsp:forward>
                </c:if>
            </div>
        </div>
    </body>
</html>

