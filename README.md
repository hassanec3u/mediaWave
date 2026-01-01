
# MediaWave

MediaWave est une application web de partage multimédia composée d'un backend Spring Boot et d'un frontend Angular.

## Aperçu

- Backend : API REST, logique métier et domaine (dossier `backend_SB/`).
- Frontend : application Angular (dossier `frontend/`).

## Prérequis

- Java 11+ (17 recommandé) et Maven (ou utiliser `mvnw`/`mvnw.cmd`).
- Node.js 16+ et npm.

## Démarrage rapide

1. Depuis la racine, construire les modules Maven :

```
.\mvnw clean install
```

2. Lancer le backend (API) :

```
.\mvnw -pl backend_SB/api spring-boot:run
```

3. Lancer le frontend :

```
cd frontend
npm install
npm start
```

## Liens utiles

- README Backend : backend_SB/README.md
- README Frontend : frontend/README.md

## Configuration

- Backend : `backend_SB/api/src/main/resources/application.properties` ou `root/src/main/resources/application.properties`.
- Frontend : `frontend/src/environments/environments.ts`.

Pour des informations détaillées sur la construction, l'exécution et la configuration, consultez les README spécifiques au backend et au frontend.
