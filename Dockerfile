# Étape 1 : Utiliser une image officielle Node.js
FROM node:16

# Étape 2 : Définir le dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package*.json ./

#Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Installer nodemon globalement (pour surveiller les modifications)
RUN npm install -g nodemon

# Étape 6 : Copier tout le code source dans le conteneur
COPY . .




