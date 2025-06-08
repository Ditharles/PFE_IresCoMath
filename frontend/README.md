# Frontend IresCoMath

Ce frontend est une application React (TypeScript) utilisant Vite, TailwindCSS et de nombreux composants modernes pour l'interface utilisateur du projet IresCoMath.

---

## Sommaire

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement du projet](#lancement-du-projet)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Tests end-to-end (Cypress)](#tests-end-to-end-cypress)
- [FAQ](#faq)

---

## Prérequis

- Node.js (v18+ recommandé)
- npm (v9+)
- Un backend IresCoMath fonctionnel (voir dossier `backend`)
- Un navigateur moderne

---

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-utilisateur/PFE_IresCoMath.git
   cd PFE_IresCoMath/frontend
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

---

## Configuration

1. **Variables d'environnement**

   Créez un fichier `.env` à la racine du dossier `frontend` si besoin (voir `.env.example` si présent).

   Variables utiles (exemple) :

   ```
   BACKEND_URL=http://localhost:8000
   ```

   > Par défaut, l'API est appelée sur `http://localhost:8000`. Modifiez ce paramètre si votre backend tourne sur un autre port.

---

## Lancement du projet

- **Mode développement (hot reload)**

  ```bash
  npm run dev
  ```

  L'application sera accessible sur [http://localhost:5173](http://localhost:5173) (ou le port affiché par Vite).

- **Build de production**

  ```bash
  npm run build
  npm run preview
  ```

---

## Structure du projet

- `src/pages` : Pages principales de l'application (auth, dashboard, demandes, etc.)
- `src/components` : Composants réutilisables (UI, formulaires, tableaux, etc.)
- `src/services` : Services pour les appels API (auth, utilisateurs, demandes, etc.)
- `src/utils` : Fonctions utilitaires (formatage, tokens, etc.)
- `src/routes` : Définition des routes React Router
- `src/styles` : Fichiers CSS/Tailwind
- `src/types` : Types TypeScript partagés
- `cypress/` : Tests end-to-end

---

## Fonctionnalités principales

- **Authentification & gestion des sessions**
  - Connexion, inscription, gestion des tokens JWT, rafraîchissement automatique
- **Gestion des demandes**
  - Création, édition, suivi, validation et export des demandes administratives
- **Gestion des membres**
  - Ajout, validation, export CSV, filtrage par rôle/statut
- **Gestion des matériels**
  - Inventaire, ajout, modification, suppression, statistiques
- **Génération et gestion de formulaires dynamiques**
  - Téléversement de fichiers, génération de documents à partir de templates
- **Statistiques**
  - Visualisation graphique des demandes, membres, matériels
- **Notifications**
  - Système de notifications et d'emails selon le rôle utilisateur
- **Tests automatisés**
  - Scénarios de bout en bout avec Cypress

---

## Tests end-to-end (Cypress)

Des tests E2E sont disponibles dans le dossier `cypress/`.

- **Lancer l'interface Cypress :**

  ```bash
  npx cypress open
  ```

- **Lancer les tests en mode headless :**

  ```bash
  npx cypress run
  ```

  Ce ne sera pas possible en raison de certaines contraintes, se référer aux dossiers note.tsx dans le dossier cypress

- Les scénarios couvrent l'inscription, la connexion, la création de demandes, la gestion des membres, etc.

---

## FAQ

- **Erreur de connexion à l'API ?**
  - Vérifiez la variable `VITE_API_URL` et que le backend est bien lancé.
- **Problème d'authentification ?**
  - Vérifiez que les tokens sont bien stockés dans le localStorage.
- **Problème d'upload de fichiers ?**
  - Vérifiez que le backend accepte les fichiers et que l'URL d'upload est correcte.
- **Tests Cypress ne passent pas ?**
  - Vérifiez que le backend et le frontend sont bien lancés, et que les fixtures sont à jour.

---

Pour toute question, ouvrez une issue ou contactez l'équipe technique.
