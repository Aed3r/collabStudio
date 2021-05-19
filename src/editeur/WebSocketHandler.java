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

import bdd.LoadDriver;
import java.sql.*;

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
		LoadDriver d = new LoadDriver();
		switch((String) json.get("action")) {
			case "saveTrack":
				String track = (String) json.get("track");
				String projectID = (String) json.get("projectID");
								
				//On enregistre dans la DB
				PreparedStatement stmt = d.getPrep("UPDATE musique SET track=? WHERE titre LIKE \"" + projectID + "\";");
				try {
					stmt.setString(1, track);
					stmt.execute();
				} catch (SQLException e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				}
				d.close();
				break;
			case "newProject":
				String nom = (String) json.get("nom");
				String userName = (String) json.get("userName");
				// Enregistrer dans db
				
				ResultSet res = d.reqSQL("SELECT id FROM Utilisateurs WHERE pseudo=\"" + userName + "\"");
				int uid = -1;
				try {
					if (res.next()) {
						uid = res.getInt("id");
					}
				} catch (SQLException e1) {
					e1.printStackTrace();
					return;
				}

				if (uid != -1) {
					if(d.upSQL("INSERT INTO musique(uid, titre) VALUES (\""+uid+"\",\"" + nom + "\");")){
						System.out.println("Inscription réussie");
					}else{
						System.out.println("Problème requete inscription");
					}
				}
				d.close();
				break;
			case "requestData":
				String pID = (String) json.get("project");
				String user = (String) json.get("username");
				
				// Envoyer sons
				List<List<String>> newFiles = new ArrayList<>();
				newFiles.add(new ArrayList<>());
				newFiles.add(new ArrayList<>());
				ResultSet sons_id = d.reqSQL("SELECT * FROM sons WHERE id IN (SELECT son_id FROM musique_sons WHERE musique_id IN (SELECT id FROM musique WHERE titre LIKE '"+pID+"'));");
				if (sons_id != null) {
					try {
						while(sons_id.next()){
							//Recupere le son ici
							newFiles.get(0).add(sons_id.getString("son"));
					        newFiles.get(1).add(sons_id.getString("nom"));
						}
					} catch (SQLException e1) {
						e1.printStackTrace();
					}
				}
				
				sendFiles(newFiles, session);

				// Envoyer track
				ResultSet morceau = d.reqSQL("SELECT track FROM musique WHERE titre LIKE '"+pID+"';");
				if (morceau != null) {
					try {
						if(morceau.next()) {
							//recuperer track ici
							sendTrackUpdate(morceau.getString("track"), session);
						}
					} catch (SQLException e1) {
						e1.printStackTrace();
					}
				}
				
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
	
	static void sendFiles (List<List<String>> newFiles, Session s) {	
		String res = "{\"action\":\"loadSounds\", \"data\":[";
		int i;
		
		for (i = 0; i < newFiles.get(0).size()-1; i++) {
			res += "[\"" + newFiles.get(0).get(i) + "\", \"" + newFiles.get(1).get(i) + "\"], ";
		}
		res += "[\"" + newFiles.get(0).get(i) + "\", \"" + newFiles.get(1).get(i) + "\"]]}";
				
		try {
			s.getBasicRemote().sendText(res);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	static void sendTrackUpdate (String track, Session s) {
		String res = "{\"action\":\"loadTrack\", \"track\":" + track + "}";
		
		try {
			s.getBasicRemote().sendText(res);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
