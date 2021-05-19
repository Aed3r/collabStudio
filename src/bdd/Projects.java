package bdd;
import java.sql.*;
import java.util.ArrayList;

/**
 * Permet de récuperer les ID de tous les projets auquel un utilisateur participe
 */
public class Projects{
    ArrayList<Integer> projectsid = new ArrayList<Integer>();
    ArrayList<String> projectsName = new ArrayList<String>();
    
    /**
     * Constructeur de la classe
     * @param name Le pseudo de l'utilisateur dont on veux recup les Projets
     */
    public Projects(String name){
        LoadDriver d = new LoadDriver();
        int uid = -1;

        ResultSet res = d.reqSQL("SELECT id FROM Utilisateurs WHERE pseudo=\"" + name + "\"");
        try {
            if(res.next()) {
            	uid = res.getInt("id");
            }
        } catch (SQLException e1) {
            e1.printStackTrace();
            return;
        }
        
        if (uid != -1) {
            //On récupère les id des projets que l'utilisateur possède
	        ResultSet pro = d.reqSQL("SELECT id, titre FROM musique WHERE uid="+uid+";");
	        try {
	            while(pro.next()){
	                projectsid.add(pro.getInt("id"));
	            }
	        } catch (SQLException e1) {
	            e1.printStackTrace();
	        }
            //Puis ceux auquels l'utilisateur participe seulement
            ResultSet Participe = d.reqSQL("SELECT projectID FROM userProjects WHERE userID="+uid+";");
            try{
                while(Participe.next()){
                    if(!projectsid.contains(Participe.getInt("projectID"))){
                    	projectsid.add(Participe.getInt("projectID"));
                    }
                }
            }catch (SQLException e1) {
	            e1.printStackTrace();
	        }
            //Et enfin on recupère tout les noms associés
            ResultSet ProName;
            for(int i = 0; i < projectsid.size(); i++){
                ProName = d.reqSQL("SELECT titre FROM musique WHERE id="+projectsid.get(i)+";");
                try{
                    if(ProName.next()) {
                        projectsName.add(ProName.getString("titre"));
                    }
                }catch (SQLException e1) {
                    e1.printStackTrace();
                }
            }
        }


        d.close();
    }

    /**
     * @return ArrayList<Integer> Contenant les ID des projets de l'utilisateur
     */
    public ArrayList<Integer> getListId(){
        return projectsid;
    }

    /**
     * @return ArrayList<Integer> Contenant les nom des projets de l'utilisateur
     */
    public ArrayList<String> getListName(){
        return projectsName;
    }
}