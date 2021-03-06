package editeur;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import java.sql.*;
import bdd.LoadDriver;

/**
 * Reçoit les fichiers transmis depuis l'éditeur, les stock puis lance WebSocketHandler.sendNewFilesUpdate() qui informe les utilisateurs des nouveaux fichiers
 */
@WebServlet("/FileUpload")
@MultipartConfig
public class FileUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static File uploadsFolder = null;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FileUpload() {
        super();
        uploadsFolder = getUploadsFolder();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    String projectID = request.getParameter("projectID");
	    List<Part> fileParts = request.getParts().stream().filter(part -> "files".equals(part.getName()) && part.getSize() > 0).collect(Collectors.toList());
		List<List<String>> newFiles = new ArrayList<>();
		newFiles.add(new ArrayList<>());
		newFiles.add(new ArrayList<>());
	    
	    for (Part filePart : fileParts) {
	        String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString(); // MSIE fix.
	        File destination = File.createTempFile("snd", fileName, uploadsFolder);
	        
	        try (InputStream fileContent = filePart.getInputStream()) {
	        	Files.copy(fileContent, destination.toPath(), StandardCopyOption.REPLACE_EXISTING);
	        }
	        
	        newFiles.get(0).add(destination.getName());
	        newFiles.get(1).add(fileName);
	        
	        // Enregistrer dans db : (projectID, destination.name)
			LoadDriver d = new LoadDriver();

			if(d.upSQL("INSERT INTO sons(son, nom) VALUES (\""+destination.getName()+"\", \""+fileName+"\");")) {
				System.out.println("INSERTION OK");
			} else {
				System.out.println("Problème requete INSERT SON");
			}

			int idSon = -1;
			ResultSet res = d.reqSQL("SELECT id FROM sons WHERE son =\"" + destination.getName() + "\"");
			try {
				if (res.next()) {
					idSon = res.getInt("id");
				}
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
				return;
			}
			
			int idProjet = -1;
			res = d.reqSQL("SELECT id FROM musique WHERE titre LIKE \"" + projectID + "\"");
			try {
				if (res.next()) {
					idProjet = res.getInt("id");
				}
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
				return;
			}


			if (idSon != -1 && idProjet != -1) {
				if(d.upSQL("INSERT INTO musique_sons(musique_id, son_id) VALUES (\""+idProjet+"\",\"" + idSon + "\");")) {
					System.out.println("LINK REUSSI");
				} else {
					System.out.println("Problème requete INSERT MUSIQUE_SON");
				}
			} else {
				System.err.println("Problème d'insertion dans la table sons ");
			}

			d.close();
	    }
	    

	    WebSocketHandler.sendNewFilesUpdate(newFiles);
	}
	
	protected static File getUploadsFolder() {
		if (uploadsFolder == null) {
			uploadsFolder = new File(System.getProperty("user.home"), "collabStudioUploads");
	        if (!uploadsFolder.exists()) uploadsFolder.mkdir();
		}
		return uploadsFolder;
	}
}
