package users;

import java.util.ArrayList;

public class tmp_listUsers extends ArrayList {
	private ArrayList<utilisateurs> l = new ArrayList<utilisateurs>();
	public tmp_listUsers() {}
	
	public ArrayList<utilisateurs> getListe () {
		return this;
	}
	
	public void setListe(ArrayList<utilisateurs> liste) {
		l = liste;
	}
	
	public boolean existe(String pseudo) {
		System.out.println("taille " + this.size());
		for (int i = 0; i < l.size(); i++) {
			System.out.println(l.get(i).getPseudo());
			System.out.println(pseudo);
			if (l.get(i).getPseudo().equals(pseudo)) return true;
		}
		return false;
	}
}
