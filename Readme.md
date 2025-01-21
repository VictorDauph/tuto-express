#Monter et build les containers (Express et MongoDb):
docker-compose up --build 

#Monter les container sans build:
docker-compose up

#vider le cache de docker
docker system prune -a

Pour accéder à swagger-UI via un navigateur:
http://localhost:3000/api-docs/


#Le projet est configuré pour fonctionner avec le debugger de vs-code
#lancer le projet:
npm run dockerStart 

#lancer le debugger:
Debug Docker

le projet doit être lancé pour que le debugger fonctionne.