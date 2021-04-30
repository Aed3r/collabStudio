<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Affichage</title>
    </head>

    <body>
        <%@page import="messagerie.Message"%>
            <%@page import="java.util.List"%>
                <jsp:useBean id="listeMessages" class="messagerie.GestionMessages" scope="application"></jsp:useBean>

                <h1>Bonjour ${sessionScope.sessionU.pseudo}</h1>
                <% for (Message msg : listeMessages.getMsg()) { %>
                    <%="[" + msg.getDate() + "] " + msg.getUser() + " : " + msg.getMessage() + "<br>"%>
                        <% } %>
    </body>

    </html>