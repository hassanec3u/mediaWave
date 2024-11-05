## 1. Option Docker
   Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Git
   Pour commencer, vous devez basculer vers la branche contenant les modifications pour la conteneurisation de l'application. Suivez les étapes ci-dessous :

1. **Accédez à la branche** :
   Exécutez la commande suivante dans votre terminal pour vous déplacer vers la branche :

   ```bash
   git checkout feature/conteneuriser-app
2. **Exécuter la commande de docker compose** :

   ```bash
   docker compose up
## 2. Option manuelle
Prérequis
- MongoDB : Assurez-vous que MongoDB est installé sur votre machine. Configurez le root, le login, et le mot de passe dans le fichier app.module.ts du dossier backend. Par défaut, aucun login ou mot de passe n’est configuré.
- NestJS et Angular : Ces frameworks doivent être installés sur votre machine pour le backend et le frontend de l’application.

Lancer l'application
1. Méthode manuelle
   
    Backend :
    - Ouvrez le dossier backend.
    - éxecutez npm install pour installer les dépendances.
    - Démarrez le serveur avec npm run start:dev. Le backend sera accessible par défaut sur http://localhost:3000.
  
    Frontend :
    - Ouvrez le dossier frontEnd.
    - Exécutez npm install pour installer les dépendances.
    - Démarrez le serveur Angular avec ng serve. Le frontend sera accessible par défaut sur http://localhost:4200.


## Liste des fonctionnalités implémentées dans la V1.0
1. Authentification et gestion des utilisateurs
  Création de comptes (inscription)
  Connexion/déconnexion
  Gestion des profils utilisateurs (photo, bio, informations de contact)
2. Publications (posts)
  Création de publications (texte, image)
  Modification et suppression des publications
3. Commentaires et interactions
  Ajouter, modifier, supprimer des commentaires
  liker aux publications
6. Recherche et gestion des amis
  Recherche d’utilisateurs par nom 
  Ajout/suppression d’amis
  Suivi des demandes d’amis (en attente, acceptées, refusées)
