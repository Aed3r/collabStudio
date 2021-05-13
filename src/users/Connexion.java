package users;

import javax.servlet.http.HttpServletRequest;
import users.utilisateurs;
import users.tmp_listUsers;

public class Connexion {
	private static final String C_pseudo = "pseudo";
	private static final String C_pass = "mdp";
	
	public utilisateurs connect(HttpServletRequest request) {
		// on récupère les paramètres entrés dans le formulaire
		String pseudo = request.getParameter(C_pseudo);
		String mdp = request.getParameter(C_pass);
		
		//on crée un utilisateur pour comparer
		utilisateurs user = new utilisateurs();
		user.setPseudo(pseudo);
		user.setMdp(mdp);
		
		//if user est dans la base de donnée
		return user;
		
		//else erreur 
	}
}
