# Project IKIGAI ISEN

## Installation des outils de développement
### Node
Assurez-vous d'avoir Node.js installé sur votre ordinateur : https://nodejs.org/fr/

Ouvrez un terminal et tapez les commandes :\
`node --version`  - *Doit retourner 'v10.13.x' ou supérieure.*\
`npm --version` - *Doit retourner v6.4.x ou supérieure.*

### MongoDB
Téléchargez un instance de MongoDB : https://www.mongodb.com/download-center/community (Onglet 'Server')

Décompressez l'archive dans un dossier 'mongodb'.\
Sous Windows, prévoyez l'installation de GitBash, qui permet les commandes Unix :\
https://github.com/git-for-windows/git/releases/tag/v2.19.1.windows.1

### Flask
(Assurez-vous d'avoir python 3.x installé)
Installez pip sur votre machine : https://pip.pypa.io/en/stable/installing/

Dans un terminal :\
`pip install Flask`

## Installation de l'environnement
### Pull GitHub
Créez un dossier 'be_ikigai' et faîtes-y un pull depuis https://github.com/canaab/be_ikigai

### Serveur
Rendez-vous dans ***be_ikigai/src/server*** et tapez la commande :\
`npm install`

### Flask
Rendez-vous dans ***be_ikigai/src/python*** et tapez la commande :\
`export FLASK_APP=hello.py && flask run`

### WebApp
Rendez-vous dans ***be_ikigai/src/webapp*** et tapez la commande :\
`npm install`

## Pour développer
Pour le développement, il est plus simple d'utiliser `npm start` une fois dans le dossier ***be_ikigai/src/webapp***, puis une fois dans le dossier ***be_ikigai/src/server***, et de démarrer un serveur mongoDB à part (port 27017).
