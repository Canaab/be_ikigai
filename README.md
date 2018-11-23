# Project IKIGAI ISEN

## Installation des outils de développement
### Node
Assurez-vous d'avoir Node.js installé sur votre ordinateur : https://nodejs.org/fr/

Ouvrez un terminal et tapez les commandes :\
`node --version`  - *Doit retourner 'v10.13.x' ou supérieure.*\
`npm --version` - *Doit retourner v6.4.x ou supérieure.*

### Docker
Installez Docker sur votre ordinateur : https://www.docker.com/get-started

Assurez-vous que docker est bien démarré (à vérifier à chaque redémmarage), et tapez la commande :\
`docker -v` - *Doit retourner 'Docker version 18.06.1-ce, build xxxxxx' ou supérieure.*

###MongoDB
Téléchargez un instance de MongoDB : https://www.mongodb.com/download-center/community (Onglet 'Server')

Décompressez l'archive dans un dossier 'mongodb'.\
Sous Windows, prévoyez l'installation de GitBash, qui permet les commandes Unix :\
https://github.com/git-for-windows/git/releases/tag/v2.19.1.windows.1

##Installation de l'environnement
###Pull GitHub
Créez un dossier 'be_ikigai' et faîtes-y un pull depuis https://github.com/canaab/be_ikigai

###Serveur
Rendez-vous dans ***be_ikigai/src/server*** et tapez la commande :\
`npm install`

###WebApp
Rendez-vous dans ***be_ikigai/src/webapp*** et tapez la commande :\
`npm install`

##Build avec Docker
Dans un terminal, placez vous dans le dossier d'origine (be_ikigai), et tapez les commandes:\
`docker-compose build`\
`docker-compose up`\

Pour arrêter les services, tapez :\
`docker-compose down`

##Pour développer
Docker nous servira en particulier à build la solution finale sur un serveur, mais pour le développement, il est plus simple d'utiliser `npm start` une fois dans le dossier ***be_ikigai/src/webapp***, puis une fois dans le dossier ***be_ikigai/src/server***, et de démarrer un serveur mongoDB à part (port 27017).