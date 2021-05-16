package messagerie;

import java.util.ArrayList;

/**
 * Classe qui gère des Messages de la classe Message, fournit une liste de Messages
 */
public class GestionMessages {

	ArrayList<Message> listeMessages = new ArrayList<>();
	
	public GestionMessages() { }
	
	/**
     * Méthode qui permet d'ajouter un message à la liste de messages
     * @param msg Le texte du message envoyé par l'utilisateur
     * @param user Le pseudo de l'utilisateur qui a envoyé le message
     * @param date La date d'envoi du message
     */
	public void ajouterMsg (String msg, String user, String date) {
		listeMessages.add(new Message(msg, user, date));
	}
	
	/**
     * Méthode qui retourne la liste de messages
     * @return La liste de messages
     */
	public ArrayList<Message> getMsg() {
		return listeMessages;
	}
}
