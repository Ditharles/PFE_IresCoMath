import { PrismaClient, Role, Grade } from "../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Début de la procédure de seed...");

  
  await cleanDatabase();

  // Créer un administrateur
  const adminPassword = await bcrypt.hash("admin123", 10);
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@irescomath.com",
      password: adminPassword,
      role: Role.ADMIN,
      admin: {
        create: {
          nom: "Admin",
          prenom: "Système",
        },
      },
    },
    include: {
      admin: true,
    },
  });

  console.log("Administrateur créé:", adminUser.email);

  // Créer un enseignant-chercheur directeur
  const directeurPassword = await bcrypt.hash("directeur123", 10);
  const directeurUser = await prisma.user.create({
    data: {
      email: "directeur@irescomath.com",
      password: directeurPassword,
      role: Role.DIRECTEUR,
      enseignant: {
        create: {
          nom: "Directeur",
          prenom: "Laboratoire",
          fonction: "Directeur de laboratoire",
          grade: Grade.Professeur,
          etablissement: "Université IreSCoMath",
          photo: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      },
    },
    include: {
      enseignant: true,
    },
  });

  console.log("Directeur créé:", directeurUser.email);

  console.log("Seed terminé avec succès!");
}

// Fonction pour nettoyer la base de données
async function cleanDatabase() {
  console.log("Nettoyage de la base de données...");

  // Supprimer d'abord les entités qui ont des relations
  await prisma.session.deleteMany({});
  await prisma.notification.deleteMany({});

  await prisma.doctorant.deleteMany({});
  await prisma.master.deleteMany({});
  await prisma.requestDoctorant.deleteMany({});
  await prisma.requestMaster.deleteMany({});
  await prisma.requestEnseignantChercheur.deleteMany({});

  await prisma.enseignantChercheur.deleteMany({});
  await prisma.admin.deleteMany({});

  // Supprimer ensuite les utilisateurs
  await prisma.user.deleteMany({});

  console.log("Base de données nettoyée!");
}

main()
  .catch((e) => {
    console.error("Erreur durant le processus de seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Fermer la connexion Prisma à la fin
    await prisma.$disconnect();
  });
