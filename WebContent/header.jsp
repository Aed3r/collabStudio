<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Teko:wght@500&display=swap" rel="stylesheet"> 
        <link rel="stylesheet" href="styles/header.css">
    </head>

    <body>
        <div id="header">
            <div id="logo" onclick="document.location.pathname = '/collabStudio'">
                <span id="logo1">collab</span><span id="logo2">STUDIO</span>
            </div>
            <% if (session.getAttribute("pseudo") != null) {%>
                <a href="<%=request.getContextPath()+'/Servlet_Deconnexion'%>">Déconnexion</a>
            <%}%>
        </div>
    </body>
</html>