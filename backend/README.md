# Backend IresCoMath

Ce backend gère l'API, la base de données et la logique métier du projet IresCoMath. Il est construit avec Node.js, TypeScript, Express et Prisma.

---

## Sommaire

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Base de données & Seed](#base-de-données--seed)
- [Lancement du serveur](#lancement-du-serveur)
- [Structure du projet](#structure-du-projet)
- [Principaux processus](#principaux-processus)
- [Tests](#tests)
- [FAQ](#faq)

---

## Prérequis

- Node.js (v18+ recommandé)
- npm (v9+)
- PostgreSQL (ou autre base compatible Prisma)
- Un éditeur de texte (VSCode recommandé)

---

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-utilisateur/PFE_IresCoMath.git
   cd PFE_IresCoMath/backend
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

---

## Configuration

1. **Variables d'environnement**

   Créez un fichier `.env` à la racine du dossier `backend` en vous basant sur le fichier `.env.example` si disponible.

   Variables essentielles :

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/nom_bdd?schema=public"
   JWT_SECRET_KEY="votre_clé_secrète"
   JWT_REFRESH_SECRET_KEY="votre_clé_refresh"
   EMAIL_USER="adresse@email.com"
   EMAIL_PASS="motdepasse"
   ```

---

## Base de données & Seed

1. **Appliquer les migrations Prisma**

   ```bash
   npx prisma migrate dev
   ```

2. **Initialiser la base avec des données de test**

   ```bash
   npm run db:seed
   # ou
   npx prisma db seed
   ```

   Cela crée :

   - Un administrateur (`admin@irescomath.com` / `admin123`)
   - Un directeur de laboratoire (`directeur@irescomath.com` / `directeur123`)

---

## Lancement du serveur

- **Mode développement (avec hot reload)**

  ```bash
  npm run dev
  ```

- **Mode production**

  ```bash
  npm run build
  npm start
  ```

Le serveur écoute par défaut sur [http://localhost:8000](http://localhost:8000).

---

## Structure du projet

- `src/controllers` : Logique métier des routes
- `src/routes` : Définition des endpoints Express
- `src/services` : Services métiers (ex : génération de documents)
- `src/utils` : Fonctions utilitaires (auth, gestion équipements, etc.)
- `src/middleware` : Middlewares Express (auth, rôles)
- `src/constants` : Constantes globales
- `prisma/schema.prisma` : Modèle de la base de données

---

## Principaux processus

### 1. **Authentification & Autorisation**

- JWT pour la gestion des sessions
- Middleware `verifyToken` pour sécuriser les routes
- Middleware `checkRole` pour restreindre l'accès selon le rôle (ADMIN, DIRECTEUR, ENSEIGNANT...)

### 2. **Gestion des utilisateurs**

- Création, modification, suppression d'utilisateurs
- Attribution de rôles et gestion des droits

### 3. **Gestion des équipements**

- Ajout, modification, suppression de catégories et d'équipements
- Attribution d'équipements à des catégories
- Suivi du statut et de la quantité

### 4. **Gestion des requêtes et validations**

- Système de demandes (requests) avec workflow de validation
- Notifications par email pour validation ou refus

### 5. **Génération de documents**

- Génération de documents Word à partir de templates et de données dynamiques
- Extraction et validation des placeholders dans les modèles

---

## Tests

> Les tests ont étés réalisés de bout en bout, prière vous référer au dossier frontend



---

## FAQ

- **Problème de connexion à la base ?**
  - Vérifiez la variable `DATABASE_URL` dans `.env`.
- **Erreur d'authentification ?**
  - Vérifiez les clés JWT dans `.env`.
- **Besoin de comptes de test ?**
  - Utilisez les comptes créés par le seed (voir plus haut).

---

Pour toute question, ouvrez une issue ou contactez l'équipe technique.
