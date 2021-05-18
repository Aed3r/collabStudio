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
		
		// on récupère les paramètres entrés dans le formulaire
		String pseudo = request.getParameter("pseudo");
		String mdp = request.getParameter("motdepasse");
		
		
		//on crée un utilisateur pour comparer
		utilisateurs user = new utilisateurs();
		user.setPseudo(pseudo);
		user.setMdp(mdp);
		
		//if user est dans la base de donnée
		//On vérifie que l'utilisateur existe
		LoadDriver d = new LoadDriver();
		ResultSet res = d.reqSQL("SELECT pseudo, mot_de_passe, nom, prenom FROM Utilisateurs WHERE pseudo=\"" + user.getPseudo() + "\" AND mot_de_passe=\""+ user.getMdp() + "\";");
		try {
			res.next();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
	
		try {
			if(res.getString("pseudo").equals(pseudo) && res.getString("mot_de_passe").equals(mdp)) {
				//on crée une session pour l'utilisateur
				HttpSession session = request.getSession();
				session.setAttribute("sessionU", user);
				session.setAttribute("pseudo", user.getPseudo());
				
				request.setAttribute("user", user);
				request.setAttribute("nom", res.getString("nom"));
				request.setAttribute("prenom", res.getString("prenom"));
				request.setAttribute("pseudo", user.getPseudo());
				request.setAttribute("mdp", user.getMdp());
				request.setAttribute("session", session);
				
				//renvoie à connexion.jsp
				this.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
				System.out.println("connecté");
			}
		} catch (SQLException e){
			System.out.println(e.toString());
			response.sendRedirect("/collabStudio/connexion.jsp#erreur");
		}
		d.close();
				
		//on récupère l'utilisateur renvoyé par Connexion.java
		//utilisateurs user = co.connect(request);
	}
}
