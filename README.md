[![Watch the video](https://imgur.com/57x2yfs.png)](https://youtu.be/XO4gmQ-UFTs)
Landing page (clickable)

[![Watch the video](https://imgur.com/l2LThie.png)](https://youtu.be/_pesI5PGb4U)
Account creation / Login page (clickable)

![Project selection](https://imgur.com/8GEV879.png)
Project creation / Selection

![Empty Editor](https://imgur.com/nmqNwyJ.png)
Empty editor
 - Import new audio clips on the bottom left
 - Message people working on the project on the bottom right

![WIP editor](https://imgur.com/2p83g9M.png)
Work in progress project
 - Preview and select audio clips on the left
 - Add them to the project with left clicks on the desired track and location
 - Adjust clip position using drag and drop
 - Remove clip using right click
 - Set individual track volume
 - Zoom in and out of the editor
 - Play the track using the big button on the left
 - View / Change track progression using the red line indicator
 - Invite other users using their username at the top right
 - Save / Export the project at the top right

Bonjour,
voici le projet tel que nous l'avons présenté lors de la soutenance (le 19/05/2021). 
Voici comment utiliser le site en local :
	- Importer le projet dans eclipse (dynamic web project)
	- Ajouter les librairies externes se trouvant dans WebContent/WEB-INF/lib au classpath Classpath/Modulepath 
	- Toujours dans les propriétés du projet, accéder au paramètre 'Deployment Assembly' > Add.. > Java Build Path Entries > jdbc.jar puis sauvegarder
	- Importer le fichier bdd_projet.sql dans une base de donnée de type MySql 
	- Compléter les champs 'mydatabase', 'id' et 'pwd' dans src/bdd/LoadDriver.java avec les informations utilisés pour votre base de donnée
	- Nettoyer le projet avec Project > Clean...
	- Configurer Tomcat dans Eclipse (nous avons utilisé v9.0) et démarrez le serveur
	- Lancer le projet (clic droit sur le projet > Run As.. > Run on server)
	- Accéder à http://localhost:8080/collabStudio/, de préférence avec Firefox


Icons made by https://www.flaticon.com/authors/pixel-perfect
