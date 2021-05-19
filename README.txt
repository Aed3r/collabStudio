Bonjour,
voici le projet tel que nous l'avons présenté lors de la soutenance (le 19/05/2021). 
Une ligne de CSS dans le fichier editeur.css a été ajouté pour résoudre le problème de déplacement des sons dans l'éditeur.
Voici comment utiliser le site en local :
	- Importez le projet dans eclipse
	- Ajoutez les librairies externes se trouvant dans WebContent/WEB-INF/lib au classpath Classpath/Modulepath 
	- Toujours dans les propriétés du projet, accédez au paramètre 'Deployment Assembly' > Add.. > Java Build Path Entries > jdbc.jar puis sauvegardez
	- Importé la base de donnée à l'aide du fichier bdd_projet.sql
	- Complétez les champs 'mydatabase', 'id' et 'pwd' dans src/bdd/LoadDriver.java avec les informations utilisés pour la base de donnée
	- Nettoyé le projet avec Project > Clean...
	- Configurez Tomcat (nous avons utilisé v9.0) et démarrez le serveur
	- Accédé à http://localhost:8080/collabStudio/, de préférence avec Firefox


Icons made by https://www.flaticon.com/authors/pixel-perfect