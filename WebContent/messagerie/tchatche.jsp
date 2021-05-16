<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Tchatche</title>
	</head>
	<body>
		<%
			request.setCharacterEncoding("UTF-8");
			response.setHeader("Refresh", this.getInitParameter("nRefresh"));
		
			if (request.getParameter("message") != null) {%>
				<jsp:include page="stockage.jsp"></jsp:include>
			<%}%>
		<jsp:forward page="affichage.jsp"></jsp:forward>
	</body>
</html>