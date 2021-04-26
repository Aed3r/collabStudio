package users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Servlet_Connexion extends HttpServlet {
	public void doGet( HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.getServletContext().getRequestDispatcher("/connexion.jsp").forward(request, response);
	}
	
	public void doPost( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {	
		Connexion co = new  Connexion();
		
		//on récupère l'utilisateur renvoyé par Connexion.java
		utilisateurs user = co.connect(request);
		
		//on crée une session pour l'utilisateur
		HttpSession session = request.getSession();
		session.setAttribute("sessionU", user);
		
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
