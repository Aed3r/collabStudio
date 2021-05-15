package bdd;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

// Notice, do not import com.mysql.jdbc.*
// or you will have problems!

public class LoadDriver {
    public static void main(String[] args) {
        try {
            // The newInstance() call is a work around for some
            // broken Java implementations

            Class.forName("com.mysql.jdbc.Driver").newInstance();
            System.out.println("Instance créée");
        } catch (Exception ex) {
            // handle the error
        	System.out.println(ex);
        }
        
        Connection conn = null;
        try {
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