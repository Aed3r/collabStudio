package editeur;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value="/wsHandler")
public class WebSocketHandler {
	static List<Session> sessions = new ArrayList<>();
	
	@OnOpen 
	public void open(Session session) {
		sessions.add(session);
		
		/*
		try {
			session.getBasicRemote().sendText("yo");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		*/
	}
	
	@OnClose
	public void close(Session session) {
		sessions.remove(session);
	}
	
	@OnError
	public void onError(Throwable t) {
		t.printStackTrace();
		System.err.println(t.getMessage());
	}
	
	@OnMessage
	public void onMessage(Session session, String message) {

	}
	
	static void sendNewFilesUpdate (List<List<String>> newFiles) {	
		String res = "{\"action\":\"newFiles\", \"data\":[";
		int i;
		
		for (i = 0; i < newFiles.get(0).size()-1; i++) {
			res += "[\"" + newFiles.get(0).get(i) + "\", \"" + newFiles.get(1).get(i) + "\"], ";
		}
		res += "[\"" + newFiles.get(0).get(i) + "\", \"" + newFiles.get(1).get(i) + "\"]]}";
				
		for (Session s : sessions) {
			try {
				s.getBasicRemote().sendText(res);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
