package users;

public class utilisateurs {
	
	private String nom;
	private String prenom;
	private String mdp;
	private String pseudo;
	
	public utilisateurs() {
	}
	
	public utilisateurs(String mdp, String pseudo) {
		this();
		this.mdp = mdp;
		this.pseudo = pseudo;
	}
	
	public utilisateurs(String nom, String prenom, String mdp, String pseudo) {
		this();
		this.nom = nom;
		this.prenom = prenom;
		this.mdp = mdp;
		this.pseudo = pseudo;
	}
	
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getMdp() {
		return mdp;
	}
	public void setMdp(String mdp) {
		this.mdp = mdp;
	}
	public String getPseudo() {
		return pseudo;
	}
	public void setPseudo(String pseudo) {
		this.pseudo = pseudo;
	}
}