package messagerie;

/**
 * Classe qui fournit les Messages
 */
public class Message {
	private String message;
	private String user;
	private String date;
	private final int NUM_MESSAGE;
	private static int nbMessages = 0;
	
	/**
     * Méthode qui permet de créer un message
     * @param msg Le texte du message envoyé par l'utilisateur
     * @param user Le pseudo de l'utilisateur qui a envoyé le message
     * @param date La date d'envoi du message
     */
	public Message (String msg, String user, String date) {
		this.message = msg;
		this.user = user;
		this.date = date;
		nbMessages++;
		NUM_MESSAGE = nbMessages;
	}
	
	/**
     * Méthode pour récupérer un message
     * @return Le message
     */
	public String getMessage() { return message; }
	
	/**
     * Méthode pour récupérer le numéro du message
     * @return Le numéro du message
     */
	public int getNum() { return NUM_MESSAGE; }
	
	/**
     * Méthode pour récupérer l'utilisateur
     * @return Le pseudo de l'utilisateur
     */
	public String getUser() { return user; }
	
	/**
     * Méthode pour récupérer la date d'envoie du message
     * @return La date d'envoie du message
     */
	public String getDate() { return date; }
}
