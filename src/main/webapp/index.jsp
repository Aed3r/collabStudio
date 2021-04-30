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

            <h1> Bienvenue sur la page d'acceuil de Collabo_studio</h1>
            <a href="messagerie/messagerie.html"> Messagerie pour discuter pépouse à la bien</a> <br>
            <a href="inscription.jsp"> Inscription par ici mon kiki</a> <br>
            <a href="connexion.jsp"> Connexion du con</a> <br>
            <a href="<%=request.getContextPath()+" /Servlet_Deconnexion "%>">Déconnexion</a>
        </body>

        </html>