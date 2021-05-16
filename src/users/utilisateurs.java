package users;

/**
 * Classe utilisateur, permet de gérer les différents utilisateurs
 */
public class utilisateurs {
	
	private String nom;
	private String prenom;
	private String mdp;
	private String pseudo;
	
	public utilisateurs() {
	}
	
	/**
     * Méthode pour créer un utilisateurs
     * @param mdp le mot de passe
     * @param pseudo le pseudo choisi
     * @return l'utilisateur crée
     */
	public utilisateurs(String mdp, String pseudo) {
		this();
		this.mdp = mdp;
		this.pseudo = pseudo;
	}
	
	/**
     * Méthode pour créer un utilisateurs
     * @param nom le nom de l'utilisateur
     * @param prenom le prénom de l'utilisateur
     * @param mdp le mot de passe
     * @param pseudo le pseudo choisi
     * @return l'utilisateur crée
     */
	public utilisateurs(String nom, String prenom, String mdp, String pseudo) {
		this();
		this.nom = nom;
		this.prenom = prenom;
		this.mdp = mdp;
		this.pseudo = pseudo;
	}
	
	/**
     * Méthode pour récupérer le nom d'un utilisateur
     * @return le nom de l'utilisateur
     */
	public String getNom() {
		return nom;
	}
	
	/**
     * Méthode pour modifier le nom d'un utilisateur
     */
	public void setNom(String nom) {
		this.nom = nom;
	}
	
	/**
     * Méthode pour récupérer le prénom d'un utilisateur
     * @return le prénom de l'utilisateur
     */
	public String getPrenom() {
		return prenom;
	}
	
	/**
     * Méthode pour modifier le prénom d'un utilisateur
     */
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	
	/**
     * Méthode pour récupérer le mot de passe d'un utilisateur
     * @return le mot de passe de l'utilisateur
     */
	public String getMdp() {
		return mdp;
	}
	
	/**
     * Méthode pour modifier le mot de passe d'un utilisateur
     */
	public void setMdp(String mdp) {
		this.mdp = mdp;
	}
	
	/**
     * Méthode pour récupérer le pseudo d'un utilisateur
     * @return le pseudo de l'utilisateur
     */
	public String getPseudo() {
		return pseudo;
	}
	
	/**
     * Méthode pour modifier le pseudo d'un utilisateur
     */
	public void setPseudo(String pseudo) {
		this.pseudo = pseudo;
	}
}