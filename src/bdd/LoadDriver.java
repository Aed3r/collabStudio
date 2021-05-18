package bdd;
import java.sql.*;

/**
 * Classe qui charge le Driver et se Connecte a la base de donnée
 */
public class LoadDriver {
	private final String driver = "com.mysql.jdbc.Driver";
    private final String serverName = "localhost";
    private final String mydatabase = "mydb";
    private final String url = "jdbc:mysql://" + serverName + "/" + mydatabase; 
    private final String id = "root";
    private final String pwd = "DragonBall74";

    Connection c = null;
    Statement s;
    ResultSet r = null;
    int nbLignes;
    
    public LoadDriver() {
    	try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            System.out.println("Instance créée");
        } catch (Exception ex) {
            // handle the error
        	System.out.println(ex);
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

    public boolean reqSQL (String query, char type) {
        if (type == 'm') {
            try {
                nbLignes = s.executeUpdate(query);
                return true;
            } catch (SQLException e) {
                System.out.println("Probleme lors de l'éxecution de la update \"" + query + "\": " + e.getLocalizedMessage());
                return false;
            }
        } else if (type == 's') {
            try {
                r = s.executeQuery(query);
                return true;
            } catch (SQLException e) {
                System.out.println("Probleme lors de l'éxecution de la query \"" + query + "\": " + e.getLocalizedMessage());
                return false;
            }
        } else return false;
    }
}