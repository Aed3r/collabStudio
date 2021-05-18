package users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


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
		
		//on récupère l'utilisateur renvoyé par Connexion.java
		utilisateurs user = co.connect(request);
		
		if(user.getNom() == "-1") {
			this.getServletContext().getRequestDispatcher("/connexion.jsp#erreur").forward(request, response);
		}
		
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
		
		//
	}
}
