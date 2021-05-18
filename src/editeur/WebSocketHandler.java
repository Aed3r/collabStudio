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
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;
import org.json.simple.parser.JSONParser;

/**
 * Maintient les connections WebSocket lors de l'utilisation de l'éditeur et permet d'informer les utilisateurs de nouveaux fichiers
 */
@ServerEndpoint(value="/wsHandler")
public class WebSocketHandler {
	static List<Session> sessions = new ArrayList<>();
	
	@OnOpen 
	public void open(Session session) {
		sessions.add(session);
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
		JSONParser parser = new JSONParser();
		Object obj = null;
		
		try{
			obj = parser.parse(message);
		} catch(ParseException pe) {
			System.out.println(pe);
		}
		
		JSONObject json = (JSONObject) obj;
		
		switch((String) json.get("action")) {
			case "saveTrack":
				String track = (String) json.get("track");
				// Enregistrer dans db
				break;
			case "newProject":
				String nom = (String) json.get("nom");
				// Enregistrer dans db
				break;
			default:
				for (Session s : sessions) {
					if (s != session) {
						try {
							s.getBasicRemote().sendText(message);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
				break;
		}
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
