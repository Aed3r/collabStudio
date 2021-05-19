<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Connexion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="styles/connexion.css">
        <script src="script/connexion.js" async defer></script>
    </head>
    <body onresize="alignBox()">
        <div id="background">
            <div id="colors"></div>
            <%@ include file = "header.jsp" %>
            <div id="mainDiv">
                <h2 id="greet">Welcome Back !</h2>
                <h4 id="contentQuestion">Veuillez entrer vos identifiants</h4>
    
                <div id="namePicker">
                    <span id="erreur">Ces identifiants sont incorrects !</span>
                    <form method="post" action="Servlet_Connexion" id="form">
                        <input id="pseudo" type="text" placeholder="Pseudo" name="pseudo" maxlength="60" />
                        <input id="motdepasse" type="password" placeholder="Mot de Passe" name="motdepasse" maxlength="20" />
                        <a href="inscription.jsp">S'inscrire</a> 
                        <input type="button" onclick="verifierEntree()" value="Connexion"/>
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