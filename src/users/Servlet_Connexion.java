package users;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import bdd.LoadDriver;


/**
 * Classe héritant de HttpServlet, Servlet qui permet la connexion de l'utilisateur, en lui créeant une session
 */
@WebServlet("/Servlet_Connexion")
public class Servlet_Connexion extends HttpServlet {
	/**
     * Méthode dans le cas d'un accès par la méthode "Get", redirection vers la jsp de connexion
     * @param request La requête reçue par la Servlet
     * @param response La réponse envoyée par la Servlet
     */
	public void doGet( HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.getServletContext().getRequestDispatcher("/connexion.jsp").forward(request, response);
	}
	
	/**
     * Méthode dans le cas d'un accès par la méthode "Post", appel de Connexion(), création d'une session, puis renvoie au menu principal
     * @param request La requête reçue par la Servlet
     * @param response La réponse envoyée par la Servlet
     */
	public void doPost( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {	
		Connexion co = new  Connexion();
		
		// on récupère les paramètres entrés dans le formulaire
		String pseudo = request.getParameter("pseudo");
		String mdp = request.getParameter("mdp");
				
		//on crée un utilisateur pour comparer
		utilisateurs user = new utilisateurs();
		user.setPseudo(pseudo);
		user.setMdp(mdp);
				
		//if user est dans la base de donnée
		//On vérifie que l'utilisateur existe
		LoadDriver d = new LoadDriver();
		ResultSet res = d.reqSQL("SELECT pseudo, mot_de_passe FROM Utilisateurs WHERE pseudo=\"" + user.getPseudo() + "\" AND nom=\""+ user.getMdp() + "\";");
				
		try {
			if(res.getString("pseudo") == pseudo && res.getString("mot_de_passe") == mdp) {
				//on crée une session pour l'utilisateur
				HttpSession session = request.getSession();
				session.setAttribute("sessionU", user);
				session.setAttribute("pseudo", user.getPseudo());
				
				//request.setAttribute("co", co);
				request.setAttribute("user", user);
				request.setAttribute("nom", user.getNom());
				request.setAttribute("prenom", user.getPrenom());
				request.setAttribute("pseudo", user.getPseudo());
				request.setAttribute("mdp", user.getMdp());
				
				//renvoie à connexion.jsp
				this.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
			}
		}catch (SQLException e){
			System.out.println(e.toString());
		}
			d.close();
				
		//Si on arrive ici c'est que ce n'est pas bon
		//this.getServletContext().getRequestDispatcher("/connexion.jsp").forward(request, response);
		response.sendRedirect("/collabStudio/connexion.jsp#erreur");
		//on récupère l'utilisateur renvoyé par Connexion.java
		//utilisateurs user = co.connect(request);
	}
}
