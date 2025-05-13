import { PrismaClient, Role, Grade } from "../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Début de la procédure de seed...");

  try {
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
    const enseignantChercheur = await prisma.user.create({
      data: {
        email: "testa@gmail.com",
        password: await bcrypt.hash("testa123", 10),
        role: Role.ENSEIGNANT,
        enseignant: {
          create: {
            nom: "Testa",
            prenom: "Test",
            fonction: "Enseignant-chercheur",
            grade: Grade.Professeur,
            etablissement: "Université IreSCoMath",
          },
        },
         }

    });

    console.log("Directeur créé:", directeurUser.email);

    console.log("Seed terminé avec succès!");
  } catch (error) {
    console.error("Erreur durant le processus de seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Fonction pour nettoyer la base de données de manière sécurisée
async function cleanDatabase() {
  console.log("Nettoyage de la base de données...");

  // Liste des tables à nettoyer dans l'ordre pour respecter les contraintes de clés étrangères
  const tables = [
    { name: "session", model: prisma.session },
    { name: "notification", model: prisma.notification },
    { name: "doctorant", model: prisma.doctorant },
    { name: "master", model: prisma.master },
    { name: "requestDoctorant", model: prisma.requestDoctorant },
    { name: "requestMaster", model: prisma.requestMaster },
    {
      name: "requestEnseignantChercheur",
      model: prisma.requestEnseignantChercheur,
    },
    { name: "enseignantChercheur", model: prisma.enseignantChercheur },
    { name: "admin", model: prisma.admin },
    { name: "user", model: prisma.user },
  ];

  // Nettoyer chaque table avec gestion des erreurs
  for (const table of tables) {
    try {
      await table.model.deleteMany({});
      console.log(`Table ${table.name} nettoyée avec succès.`);
    } catch (error) {
      // Si la table n'existe pas encore (erreur P2021), on ignore simplement et on continue
      if (error.code === "P2021") {
        console.log(`Table ${table.name} n'existe pas encore, on continue.`);
      } else {
        // Pour les autres types d'erreurs, on les affiche mais on continue
        console.warn(
          `Avertissement lors du nettoyage de la table ${table.name}:`,
          error.message
        );
      }
    }
  }

  console.log("Base de données nettoyée!");
}

main()
  .then(() => console.log("Script de seed exécuté avec succès"))
  .catch((e) => {
    console.error("Erreur durant le processus de seed:", e);
    process.exit(1);
  });
