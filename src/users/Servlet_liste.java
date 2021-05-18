package users;

import users.tmp_listUsers;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import bdd.LoadDriver;

/**
 * Classe héritant de HttpServlet, Servlet qui permet de gérer une liste d'utilisateurs, et d'inscrire des utilisateurs
 */
@WebServlet("/Servlet_liste")
public class Servlet_liste extends HttpServlet {
	/**
     * Méthode dans le cas d'un accès par la méthode "Get", récupération de la liste
     * @param request La requête reçue par la Servlet
     * @param response La réponse envoyée par la Servlet
     */
	public void doGet( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException{
		String liste;
		liste = request.getParameter("listofuser");
		request.setAttribute("liste", liste);
		
		this.getServletContext().getRequestDispatcher("/result.jsp").forward(request, response);
		
	}
	
	/**
     * Méthode dans le cas d'un accès par la méthode "Post", récupération des paramètres de requêtes
     * @param request La requête reçue par la Servlet
     * @param response La réponse envoyée par la Servlet
     */
	public void doPost( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException{
		String nom = request.getParameter("nom");
		String prenom = request.getParameter("prenom");
		String pseudo = request.getParameter("pseudo");
		String mdp = request.getParameter("mdp");
		
		request.setAttribute("nom", nom);
		request.setAttribute("prenom", prenom);
		request.setAttribute("pseudo", pseudo);
		request.setAttribute("mdp", mdp);
		
		//Le mettre dans la base de donnée
		LoadDriver d = new LoadDriver();
		d.reqSQL("INSERT INTO Utilisateurs(pseudo, mot_de_passe, nom, prenom) VALUES (" + pseudo +","+ mdp +","+ nom +", "+ prenom+ ");", 's');
		
		this.getServletContext().getRequestDispatcher("/result.jsp").forward(request, response);
	}
}
