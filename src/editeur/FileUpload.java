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

/**
 * Reçoit les fichiers transmis depuis l'éditeur, les stock puis lance WebSocketHandler.sendNewFilesUpdate() qui informe les utilisateurs des nouveaux fichiers
 */
@WebServlet("/FileUpload")
@MultipartConfig
public class FileUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static File uploadsFolder;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FileUpload() {
        super();
        uploadsFolder = new File(System.getProperty("user.home"), "collabStudioUploads");
        if (!uploadsFolder.exists()) uploadsFolder.mkdir();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    //String description = request.getParameter("user");
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
	    }
	    
	    WebSocketHandler.sendNewFilesUpdate(newFiles);
	}
	
	protected static File getUploadsFolder() {
		return uploadsFolder;
	}
}
