<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Initialisations</title>
	</head>
	<body>
		<%
			session.setAttribute("pseudo", request.getAttribute("pseudo"));
		   	response.sendRedirect("tchatche.html");
		%>
	</body>
</html>