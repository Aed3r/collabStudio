package users;

import users.tmp_listUsers;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Servlet_liste extends HttpServlet {
	public void doGet( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException{
		//String liste;
		//liste = request.getParameter("listofuser");
		String liste;
		liste = request.getParameter("listofuser");
		request.setAttribute("liste", liste);
		
		this.getServletContext().getRequestDispatcher("/result.jsp").forward(request, response);
		
	}
	
	public void doPost( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException{
		//Remplacer par l'ajout dans la base de données
		String nom = request.getParameter("nom");
		String prenom = request.getParameter("prenom");
		String pseudo = request.getParameter("pseudo");
		String mdp = request.getParameter("mdp");
		
		request.setAttribute("nom", nom);
		request.setAttribute("prenom", prenom);
		request.setAttribute("pseudo", pseudo);
		request.setAttribute("mdp", mdp);
		//Remplacer par l'ajout dans la base de données
		
		this.getServletContext().getRequestDispatcher("/result.jsp").forward(request, response);
	}
}
