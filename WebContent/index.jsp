<%@page import="users.utilisateurs"%>
    <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <!DOCTYPE html>
        <html>

        <head>
            <meta charset="UTF-8">
            <title>Index</title>
        </head>

        <body>

            <p>
                <% 
            String name =  (String) request.getAttribute("nom");
	 		String firstname = (String) request.getAttribute("prenom");
	 		String pseudo = (String) request.getAttribute("pseudo");
            out.println("Bonjour " + pseudo + "(" + name + " " + firstname + ")");
            %>
            </p>

            <h1> Bienvenue sur la page d'acceuil de Collab studio</h1>
            <a href="messagerie/tchatche.html"> Messagerie </a> <br>
            <a href="inscription.jsp"> Inscription </a> <br>
            <a href="connexion.jsp"> Connexion </a> <br>
            <a href="<%=request.getContextPath()+"/Servlet_Deconnexion"%>">Deconnexion</a>
        </body>

        </html>