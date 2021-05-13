package messagerie;

public class Message {
	private String message;
	private String user;
	private String date;
	private final int NUM_MESSAGE;
	private static int nbMessages = 0;
	
	public Message (String msg, String user, String date) {
		this.message = msg;
		this.user = user;
		this.date = date;
		nbMessages++;
		NUM_MESSAGE = nbMessages;
	}
	
	public String getMessage() { return message; }
	
	public int getNum() { return NUM_MESSAGE; }
	
	public String getUser() { return user; }
	
	public String getDate() { return date; }
}
