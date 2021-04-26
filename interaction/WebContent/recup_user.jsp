<%@page import="users.utilisateurs"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<jsp:useBean id="u" class="users.utilisateurs" scope="session"/>
<jsp:setProperty name="u" property="pseudo" param="login"/>
<jsp:setProperty name="u" property="mdp" param="password"/>
<jsp:forward page="infos_user.jsp"  />  