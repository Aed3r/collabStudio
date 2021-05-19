<%@page import="users.utilisateurs"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Index</title>
    </head>

    <body>
        <%@ include file = "header.jsp" %>

        <% if (session.getAttribute("pseudo") == null) {
            response.sendRedirect("/collabStudio/acceuil.html");
        }%>
        
        <h1>Bienvenue ${ sessionScope.pseudo }.</h1>
        <!--
        <p>
        <% 
        String name =  (String) request.getAttribute("nom");
        String firstname = (String) request.getAttribute("prenom");
        String pseudo = (String) request.getAttribute("pseudo");
        out.println("Bonjour " + pseudo + "(" + name + " " + firstname + ")");
        %>
        </p>
        -->
        
        

    </body>

</html>