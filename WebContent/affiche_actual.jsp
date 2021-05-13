<%@page import="users.utilisateurs"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Affichage user</title>
</head>
<body>
	<jsp:useBean id="u" class="users.utilisateurs" scope="session"/>
		Votre Login est : <jsp:getProperty name="u" property="pseudo"/><br/>
		Votre mot de passe est : <jsp:getProperty name="u" property="mdp"/><br/>
</body>
</html>