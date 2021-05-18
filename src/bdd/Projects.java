package bdd;
import java.sql.*;
import java.util.ArrayList;

public class Projects{
    ArrayList<Integer> projectsid = new ArrayList<Integer>();
    ArrayList<String> projectsName = new ArrayList<String>();
    public Projects(int uid){
        LoadDriver d = new LoadDriver();

        ResultSet pro = d.reqSQL("SELECT id, titre FROM musique WHERE uid="+uid+";");
        try {
            while(pro.next()){
                projectsid.add(pro.getInt("id"));
                projectsName.add(pro.getString("titre"));
            }
        } catch (SQLException e1) {
            e1.printStackTrace();
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