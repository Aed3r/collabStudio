package tchatche;

import java.util.ArrayList;

public class GestionMessages {

	ArrayList<Message> listeMessages = new ArrayList<>();
	
	public GestionMessages() { }
	
	public void ajouterMsg (String msg, String user, String date) {
		listeMessages.add(new Message(msg, user, date));
	}
	
	public ArrayList<Message> getMsg() {
		return listeMessages;
	}
}