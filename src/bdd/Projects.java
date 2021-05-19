package bdd;
import java.sql.*;
import java.util.ArrayList;

public class Projects{
    ArrayList<Integer> projectsid = new ArrayList<Integer>();
    ArrayList<String> projectsName = new ArrayList<String>();
    
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
	        ResultSet pro = d.reqSQL("SELECT id, titre FROM musique WHERE uid="+uid+";");
	        try {
	            while(pro.next()){
	                projectsid.add(pro.getInt("id"));
	                projectsName.add(pro.getString("titre"));
	            }
	        } catch (SQLException e1) {
	            e1.printStackTrace();
	        }
        }
        d.close();
    }

    public ArrayList<Integer> getListId(){
        return projectsid;
    }

    public ArrayList<String> getListName(){
        return projectsName;
    }
}