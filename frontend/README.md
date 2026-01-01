# Frontend — MediaWave (Angular)

Application frontend développée avec Angular.

## Prérequis

- Node.js 16+ et npm
- (Optionnel) Angular CLI

## Installation

```
cd frontend
npm install
```

## Démarrage (développement)

```
npm start
# ou
ng serve
```

L'application sera disponible sur `http://localhost:4200/`.

## Compilation (production)

```
npm run build
```

Les fichiers compilés seront dans `dist/`.

## Tests

Unitaires :

```
npm test
```

E2E :

```
npm run e2e
```

## Configuration

Modifier l'URL de l'API dans `src/environments/environments.ts` selon l'environnement (dev/prod).

## Astuces

- Si vous utilisez le backend local, assurez-vous qu'il est disponible sur `http://localhost:8080` ou adaptez `environments.ts`.
- Pour générer une nouvelle ressource Angular : `ng generate component my-component`.

Pour plus d'informations, consultez la documentation Angular : https://angular.io/.
