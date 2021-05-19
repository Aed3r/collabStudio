<%@page import="users.utilisateurs"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="bdd.Projects"%>
<%@page import="java.util.ArrayList" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Index</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Teko:wght@500&display=swap" rel="stylesheet"> 
        <link rel="stylesheet" href="styles/index.css">
        <script src="script/index.js" async defer></script>
    </head>

    <body>
        <% if (session.getAttribute("pseudo") == null) {
            response.sendRedirect("/collabStudio/acceuil.html");
        }%>

        <div id="back"></div>

        <%@ include file = "header.jsp" %>
        
        <h1>Bienvenue ${ sessionScope.pseudo }.</h1>
        <h3>Sélectionnez ou créez un projet</h3>
        
        <div id="items">
            <% 
            Projects p = new Projects((String) session.getAttribute("pseudo"));
            ArrayList<String> listName = p.getListName();
            for(int i=0; i < listName.size(); i++){ %>
                <div class="item" id="<%=listName.get(i)%>" onclick="ouvrir('<%=listName.get(i)%>');""><%=listName.get(i)%></div>
            <%}%>
            <div class="item" id="addProject" onclick="document.location.pathname = '/collabStudio/editeur/newProject.jsp'"></div>
        </div>
    </body>

</html>