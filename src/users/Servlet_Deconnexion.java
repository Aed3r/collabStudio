package users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Classe héritant de HttpServlet, Servlet qui permet la déconnexion de l'utilisateur, en invalidant sa session
 */
@WebServlet("/Servlet_Deconnexion")
public class Servlet_Deconnexion extends HttpServlet {
	/**
     * Méthode dans le cas d'un accès par la méthode "Get", invalidation de la session et redirection vers le menu d'acceuil
     * @param request La requête reçue par la Servlet
     * @param response La réponse envoyée par la Servlet
     */
	public void doGet( HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		session.invalidate();
		response.sendRedirect("acceuil.html");
	}
	
	public void doPost( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {	
		
	}
}
