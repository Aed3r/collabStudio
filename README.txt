Bonjour,
voici le projet tel que nous l'avons présenté lors de la soutenance (le 19/05/2021). 
Une ligne de CSS dans le fichier editeur.css a été ajouté pour résoudre le problème de déplacement des sons dans l'éditeur.
Voici comment utiliser le site en local :
	- Importer le projet dans eclipse
	- Ajouter les librairies externes se trouvant dans WebContent/WEB-INF/lib au classpath Classpath/Modulepath 
	- Toujours dans les propriétés du projet, accéder au paramètre 'Deployment Assembly' > Add.. > Java Build Path Entries > jdbc.jar puis sauvegarder
	- Importer la base de donnée à l'aide du fichier bdd_projet.sql
	- Compléter les champs 'mydatabase', 'id' et 'pwd' dans src/bdd/LoadDriver.java avec les informations utilisés pour la base de donnée
	- Nettoyer le projet avec Project > Clean...
	- Configurer Tomcat (nous avons utilisé v9.0) et démarrez le serveur
	- Accéder à http://localhost:8080/collabStudio/, de préférence avec Firefox


Icons made by https://www.flaticon.com/authors/pixel-perfect
