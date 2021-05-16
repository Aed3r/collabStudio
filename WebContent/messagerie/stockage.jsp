<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Stockage</title>
	</head>
	<body>
		<%@page import="java.util.Date"%>
		<%@page import="java.util.Locale"%>
		<%@page import="java.text.SimpleDateFormat"%>
		<%@page import="messagerie.Message"%>
	
		<jsp:useBean id="listeMessages" class="messagerie.GestionMessages" scope="application"></jsp:useBean>
		<%
			String message = request.getParameter("message");
			String pseudo = (String) session.getAttribute("pseudo");
			SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:SS", Locale.US);//FRANCE);
			listeMessages.ajouterMsg(message, pseudo, dateFormat.format(new Date()));
			response.sendRedirect("messagerie.html");
		%>
	</body>
</html>