package bdd;
import java.sql.*;

/**
 * Classe qui charge le Driver et se Connecte a la base de donnée
 */
public class LoadDriver {
	private final String driver = "com.mysql.jdbc.Driver";
    private final String serverName = "localhost";
    private final String mydatabase = "collabStudio";
    private final String url = "jdbc:mysql://" + serverName + "/" + mydatabase; 
    private final String id = "admin";
    private final String pwd = "scotty2206";

    Connection c = null;
    Statement s;
    ResultSet r = null;
    int nbLignes;
    
    public LoadDriver() {
    	try {
			Class.forName(driver);
			System.out.println("Driver ok!");
		} catch (ClassNotFoundException e) {
			System.err.println("Problème de driver! " + e.getMessage());
            System.exit(0);
		}

        try {
            c = DriverManager.getConnection(url, id, pwd);
            System.out.println("Connexion ok!");

            try {
                s = c.createStatement();
                System.out.println("Création statement ok!");
            } catch (SQLException e) { 
                System.out.println("Probleme de création de statement: " + e.getLocalizedMessage()); 
                System.exit(0);
            }
        } catch (Exception e) {
            System.err.println("Probleme de connexion! " + e.getLocalizedMessage());
            System.exit(0);
        }
    }
    
    public void close () {
        try {
            s.close();
            c.close();
        } catch (Exception e) {
            System.err.println("Probleme de fermeture de la connexion! " + e.getLocalizedMessage());
            System.exit(0);
        }
    }

    public Boolean upSQL (String query) {        
            try {
                nbLignes = s.executeUpdate(query);
                return true;
            } catch (SQLException e) {
                System.out.println("Probleme lors de l'éxecution de la update \"" + query + "\": " + e.getLocalizedMessage());
                return false;
            }
    }
    
    public ResultSet reqSQL(String query) {
    	try {
    		ResultSet res = s.executeQuery(query);
    		return res;
    	}catch (SQLException e) {
            System.out.println("Probleme lors de l'éxecution de la query \"" + query + "\": " + e.getLocalizedMessage());
            return null;
        }
    }
    
    public PreparedStatement getPrep (String query) {
    	try {
			PreparedStatement stmt = c.prepareStatement(query);
			return stmt;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
    }
}