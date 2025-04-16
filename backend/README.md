# Backend IresCoMath

## Initialisation de la base de données

Le projet contient un script de seed pour initialiser votre base de données avec des données initiales essentielles:

- Un administrateur système
- Un enseignant-chercheur avec le rôle de directeur

### Prérequis

Assurez-vous d'avoir configuré votre fichier `.env` avec la variable d'environnement `DATABASE_URL` pointant vers votre base de données PostgreSQL et autre variables .

Exemple:

```
DATABASE_URL="postgresql://username:password@localhost:port/name?schema=public"
```

`JWT_SECRET_KEY`

`JWT_REFRESH_SECRET_KEY`

`EMAIL_USER`
`EMAIL_PASS`

### Étapes d'initialisation

1. **Installation des dépendances**

   ```bash
   npm install
   ```

2. **Appliquer les migrations Prisma** (si ce n'est pas déjà fait)

   ```bash
   npx prisma migrate dev
   ```

3. **Exécuter le script de seed**
   ```bash
   npm run db:seed
   ```
   ou
   ```bash
   npx prisma db seed
   ```

### Comptes créés

Après avoir exécuté le seed, les comptes suivants seront disponibles:

#### Administrateur

- **Email**: admin@irescomath.com
- **Mot de passe**: admin123
- **Rôle**: ADMIN

#### Directeur de laboratoire

- **Email**: directeur@irescomath.com
- **Mot de passe**: directeur123
- **Rôle**: DIRECTEUR
- **Grade**: Professeur

## Développement

Pour lancer le serveur en mode développement:

```bash
npm run dev
```

Le serveur sera accessible à l'adresse http://localhost:3000 (ou selon la configuration de votre fichier .env).
