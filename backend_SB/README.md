# Backend — MediaWave (Spring Boot)

Ce dossier contient les modules backend du projet : API, logique métier et domaine.

## Prérequis

- Java 11+ (Java 17 recommandé)
- Maven (ou utilisez `mvnw` / `mvnw.cmd` si le wrapper est présent)

## Structure principale

- `backend_SB/api` : module Spring Boot exposant l'API REST
- `backend_SB/business` : logique métier
- `backend_SB/domain` : entités et objets de domaine partagés

## Construction

Depuis la racine du workspace (dossier `backend_SB`) :

```powershell
mvn -f root/pom.xml clean package
```

Remarques :
- Le POM parent se trouve dans `root/pom.xml`. Certaines commandes doivent être lancées depuis la racine pour que Maven résolve correctement les modules.

## Lancer l'API (développement)

Options :

- Avec Maven installé (recommandé si le wrapper est incomplet) — depuis la racine du repo :

```powershell
cd C:\path\to\backend_SB
mvn -f root/pom.xml -pl ../api spring-boot:run
```

- Ou depuis le module `api` (le `pom.xml` du module référence correctement le parent) :

```powershell
cd C:\path\to\backend_SB\api
mvn spring-boot:run
```

- Avec le wrapper Maven (`mvnw` / `mvnw.cmd`) :

  - Si le wrapper est correctement installé (fichiers `mvnw` et dossier `.mvn/wrapper` présents) :

```powershell
cd C:\path\to\backend_SB\root
./mvnw.cmd -pl ../api spring-boot:run
```

  - Si le wrapper renvoie une erreur du type `Cannot start maven from wrapper` ou s'il manque `.mvn/wrapper/maven-wrapper.properties`, utilisez `mvn` (Maven installé) comme indiqué ci‑dessus.

## Propriétés sensibles / variables d'environnement

Le projet utilise des propriétés pour la configuration de l'upload (Cloudflare R2). Par défaut il y a des valeurs placeholder dans :

`backend_SB/api/src/main/resources/application.properties`

Exemples de propriétés :

```
cloudflare.r2.access-key=...
cloudflare.r2.secret-key=...
cloudflare.r2.endpoint=...
cloudflare.r2.bucket=...
cloudflare.r2.public-domain=...
```

Vous pouvez définir ces valeurs :
- directement dans `application.properties` (développement local),
- ou via propriétés système Maven / Java : `mvn -Dcloudflare.r2.access-key=... spring-boot:run`,
- ou via variables d'environnement (ex. PowerShell) :

```powershell
$env:CLOUDFLARE_R2_ACCESS_KEY = "your-key"
$env:CLOUDFLARE_R2_SECRET_KEY = "your-secret"
cd api
mvn spring-boot:run
```

> Note : Spring Boot mappe les variables d'environnement en mode "relaxed binding" ; vérifiez la correspondance si vous passez par des variables d'environnement.

## Tests

Depuis la racine :

```powershell
mvn -f root/pom.xml test
```

## Astuces rapides

- Pour lancer uniquement un module Maven, utilisez `-pl <module>` (en faisant référence au chemin relatif utilisé dans le POM parent). Dans notre organisation `root/pom.xml` référence les modules via des chemins relatifs (`../api`, `../business`, ...), d'où la nécessité d'utiliser `-f root/pom.xml -pl ../api` si vous exécutez depuis `backend_SB`.
- Pour activer un profil : `-Dspring.profiles.active=dev` (passer après `mvn` ou dans la configuration du run).

Pour plus de détails, consultez les fichiers `application.properties` et les sources des modules.