package bdd;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

// ssh -L 8081:webetu:3306 am04482t@mira2.univ-st-etienne.fr pour le tunel VPN

/**
 * Classe qui charge le Driver et se Connecte a la base de donnée
 */
public class LoadDriver {
    public static void main(String[] args) {
        try {
            /*On crée une instance du driver pour pouvoir se connecter a la BDD distante*/
            Class.forName("com.mysql.jdbc.Driver").getDeclaredConstructor().newInstance();
            System.out.println("Instance créée");
        } catch (Exception ex) {
            // handle the error
        	System.out.println(ex);
        }
        
        Connection conn = null;
        try {
            /*On se connecte ensuite a la bdd distante grace au tunnel ssh*/
            conn =
               DriverManager.getConnection("jdbc:mysql://localhost:8081/am04482t",
                                           "am04482t", "HQR2DFBY");

            // Do something with the Connection
        } catch (SQLException ex) {
            // handle any errors
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }
        
        
        System.out.println("Fin");
    }
}