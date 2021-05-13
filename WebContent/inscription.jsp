<%@page import="users.utilisateurs"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<jsp:useBean id="listofuser" class="users.tmp_listUsers" scope="application"></jsp:useBean>

<c:if test="${ not empty param.nom and not empty  param.prenom and not empty  param.mdp and not empty  param.pseudo }">
	<jsp:useBean id="newU" class="users.utilisateurs" ></jsp:useBean>
	<c:set target="${newU}" property="nom" value="${ param.nom }" />
	<c:set target="${newU}" property="prenom" value="${ param.prenom }" />
	<c:set target="${newU}" property="mdp" value="${ param.mdp }" />
	<c:set target="${newU}" property="pseudo" value="${ param.pseudo }" />
	<% listofuser.add(newU);%>
</c:if>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>New User</title>
</head>
<body>
	<form action="Servlet_liste" method="post" >
		<label for="t1">Nom</label> : <input type="text" name="nom" id="t1" />
		<br/>
		<label for="t2">Prénom </label> : <input type="text" name="prenom" id="t2" />
		<br/>
		<label for="t3">Pseudo </label> : <input type="text" name="pseudo" id="t3" />
		<br/>
		<label for="t4">Password </label> : <input type="password" name="mdp" id="t4" />
		<br/>
		<button type="submit">Ajouter !</button>
	</form>
</body>
</html>


