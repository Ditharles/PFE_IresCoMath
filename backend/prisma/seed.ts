import bcrypt from "bcrypt";

import prisma from "../src/utils/db";
import { Grade, Role, EquipmentType } from "../generated/prisma";

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
        cin: "ADMIN12345", // Ajout du champ cin
        admin: {
          create: {
            lastName: "Admin",
            firstName: "Système",
            cin: "ADMIN12345", // Ajout du champ cin
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
        cin: "DIR123456", // Ajout du champ cin
        teacherResearcher: {
          create: {
            lastName: "Directeur",
            firstName: "Laboratoire",
            cin: "DIR123456", // Ajout du champ cin
            position: "Directeur de laboratoire",
            grade: Grade.Professeur,
            institution: "Université IreSCoMath",
            photo: "https://randomuser.me/api/portraits/men/1.jpg",
          },
        },
      },
      include: {
        teacherResearcher: true,
      },
    });

    // Créer un enseignant-chercheur quelconque
    const enseignantChercheurPassword = await bcrypt.hash("enseignant123", 10);
    const enseignantChercheurUser = await prisma.user.create({
      data: {
        email: "enseignant@irescomath.com",
        password: enseignantChercheurPassword,
        role: Role.ENSEIGNANT,
        cin: "ENS123456",
        teacherResearcher: {
          create: {
            lastName: "Enseignant",
            firstName: "Chercheur",
            cin: "ENS123456", // Ajout du champ cin
            position: "Enseignant chercheur",
            grade: Grade.Professeur,
            institution: "Université IreSCoMath",
            photo: "https://randomuser.me/api/portraits/men/2.jpg",
          },
        },
      },
      include: {
        teacherResearcher: true,
      },
    });

    //Créer un etudiant master quelconque
    const etudiantMasterPassword = await bcrypt.hash("etudiant123", 10);
    const etudiantMasterUser = await prisma.user.create({
      data: {
        email: "etudiant@irescomath.com",
        password: etudiantMasterPassword,
        role: Role.MASTER,
        cin: "ETU123456",
        masterStudent: {
          create: {
            lastName: "Etudiant",
            firstName: "Master",
            cin: "ETU123456",
            masterYear: 2023,
            supervisorId: enseignantChercheurUser.teacherResearcher!.id,
            photo: "https://randomuser.me/api/portraits/men/3.jpg",
          },
        },
      },
      include: {
        masterStudent: true,
      },
    });

    // Créer un étudiant doctorant
    const doctorantPassword = await bcrypt.hash("doctorant123", 10);
    const doctorantUser = await prisma.user.create({
      data: {
        email: "doctorant@irescomath.com",
        password: doctorantPassword,
        role: Role.DOCTORANT,
        cin: "DOC123456",
        doctoralStudent: {
          create: {
            lastName: "Etudiant",
            firstName: "Doctorat",
            cin: "DOC123456",
            thesisYear: 2022,
            thesisSupervisorId: enseignantChercheurUser.teacherResearcher!.id,
            photo: "https://randomuser.me/api/portraits/women/3.jpg",
          },
        },
      },
      include: {
        doctoralStudent: true,
      },
    });

    console.log(
      "Directeur créé:",
      directeurUser.email,
      "\nMot de passe: directeur123"
    );
    console.log(
      "Enseignant Chercheur créé:",
      enseignantChercheurUser.email,
      "\nMot de passe: enseignant123"
    );
    console.log(
      "Etudiant Master créé:",
      etudiantMasterUser.email,
      "\nMot de passe: etudiant123"
    );
    console.log(
      "Doctorant créé:",
      doctorantUser.email,
      "\nMot de passe: doctorant123"
    );

    // Création des catégories d'équipements
    console.log("Création des catégories d'équipements...");

    // Catégorie Fournitures
    const fournituresCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.SUPPLIES,
        name: "Fournitures scientifiques",
        quantity: 100,
      },
    });

    // Catégorie Consommables
    const consommablesCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.CONSUMABLES,
        name: "Consommables informatiques",
        quantity: 75,
      },
    });

    // Catégorie Équipements
    const equipmentsCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Matériel informatique",
        quantity: 30,
      },
    });

    // Catégorie Outils
    const outilsCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.TOOLS,
        name: "Instruments scientifiques",
        quantity: 20,
      },
    });

    // Catégorie mathématiques
    const mathCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Équipements mathématiques",
        quantity: 15,
      },
    });

    // Création des équipements
    console.log("Création des équipements...");

    // Équipements de fournitures scientifiques
    await prisma.equipment.create({
      data: {
        name: "Carnets de notes scientifiques",
        categoryId: fournituresCategory.id,
        specifications: {
          marque: "MathWrite",
          description: "Papier spécial avec grilles logarithmiques et semi-log",
          stockDisponible: 50,
        },
        acquisitionDate: new Date("2024-01-15"),
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Tableau blanc effaçable",
        categoryId: fournituresCategory.id,
        specifications: {
          dimensions: "120x180cm",
          type: "Magnétique",
          accessoires: ["Marqueurs", "Effaceurs", "Aimants"],
          stockDisponible: 10,
        },
        acquisitionDate: new Date("2024-02-10"),
      },
    });

    // Équipements consommables informatiques
    await prisma.equipment.create({
      data: {
        name: "Cartouches d'encre pour imprimante laser",
        categoryId: consommablesCategory.id,
        specifications: {
          compatibilite: "HP LaserJet Pro",
          couleurs: ["Noir", "Cyan", "Magenta", "Jaune"],
          capacite: "3000 pages",
          stockDisponible: 24,
        },
        acquisitionDate: new Date("2024-03-05"),
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Disques SSD externes",
        categoryId: consommablesCategory.id,
        specifications: {
          capacite: "1TB",
          interface: "USB 3.1",
          vitesseLecture: "550MB/s",
          vitesseEcriture: "520MB/s",
          stockDisponible: 15,
        },
        acquisitionDate: new Date("2024-03-08"),
      },
    });

    // Équipements informatiques
    const stationCalcul = await prisma.equipment.create({
      data: {
        name: "Station de travail hautes performances",
        categoryId: equipmentsCategory.id,
        specifications: {
          marque: "Dell",
          modele: "Precision 7865",
          processeur: "AMD Ryzen Threadripper PRO",
          ram: "128GB DDR5",
          stockage: "2TB NVMe + 8TB SSD RAID",
          carteGraphique: "NVIDIA RTX A6000",
          systemeExploitation: "Linux Ubuntu 22.04 LTS",
          numeroSerie: "PREC7865-2024-001",
          etat: "Excellent",
        },
        acquisitionDate: new Date("2023-11-20"),
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Cluster de calcul parallèle",
        categoryId: equipmentsCategory.id,
        specifications: {
          nœuds: 8,
          processeurParNœud: "2x Intel Xeon Gold 6338",
          ramParNœud: "512GB",
          stockageTotal: "100TB",
          réseau: "InfiniBand 200Gb/s",
          framework: "SLURM + OpenMPI",
          numeroSerie: "CLSTR-HPC-2023-001",
          etat: "Excellent",
        },
        acquisitionDate: new Date("2023-08-15"),
      },
    });

    // Instruments scientifiques
    await prisma.equipment.create({
      data: {
        name: "Oscilloscope numérique",
        categoryId: outilsCategory.id,
        specifications: {
          marque: "Tektronix",
          modele: "MSO64B",
          bande: "6 GHz",
          canaux: 4,
          tauxEchantillonnage: "25 GS/s",
          ecran: '15.6" HD',
          numeroSerie: "TK-MSO64B-2022-005",
          etat: "Très bon",
          dernierEtalonnage: "2024-01-15",
        },
        acquisitionDate: new Date("2022-06-12"),
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Capteurs à effet Hall",
        categoryId: outilsCategory.id,
        specifications: {
          marque: "Lake Shore",
          modele: "HGCT-3020",
          plageChampMagnetique: "±2 Tesla",
          resolution: "0.1 mT",
          interfaceConnexion: "USB + GPIB",
          numeroSerie: "HALL-3020-023",
          etat: "Excellent",
          dernierEtalonnage: "2024-02-10",
        },
        acquisitionDate: new Date("2023-05-18"),
      },
    });

    // Équipements mathématiques
    await prisma.equipment.create({
      data: {
        name: "Logiciel de calcul symbolique (licence)",
        categoryId: mathCategory.id,
        specifications: {
          nom: "Mathematica",
          version: "13.2",
          typeLicence: "Réseau (50 utilisateurs)",
          modules: [
            "Machine Learning",
            "Signal Processing",
            "Finance Platform",
          ],
          dateExpiration: "2025-12-31",
          stockDisponible: 1,
        },
        acquisitionDate: new Date("2023-04-10"),
      },
    });

    await prisma.equipment.create({
      data: {
        name: "GPU pour calcul tensoriel",
        categoryId: mathCategory.id,
        specifications: {
          marque: "NVIDIA",
          modele: "A100",
          memoire: "80GB HBM2e",
          performance: "19.5 TFLOPS FP64",
          tenseurCores: 432,
          supportCUDA: "Version 11.4",
          numeroSerie: "A100-2023-007",
          etat: "Neuf",
        },
        acquisitionDate: new Date("2023-10-05"),
      },
    });

    // Création d'un historique d'emprunt d'équipement
    await prisma.equipmentHistory.create({
      data: {
        equipmentId: stationCalcul.id,
        userId: etudiantMasterUser.id,
        borrowDate: new Date("2024-04-01"),
        returnDate: new Date("2024-04-15"),
      },
    });

    // Ajout d'un emprunt en cours pour un doctorant
    await prisma.equipmentHistory.create({
      data: {
        equipmentId: stationCalcul.id,
        userId: doctorantUser.id,
        borrowDate: new Date("2024-04-20"),
        returnDate: null, // Emprunt en cours (pas encore retourné)
      },
    });

    console.log("Catégories d'équipements et équipements créés avec succès!");
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
    { name: "Session", model: prisma.session },
    { name: "Notification", model: prisma.notification },
    { name: "EquipmentHistory", model: prisma.equipmentHistory },
    { name: "Equipment", model: prisma.equipment },
    { name: "EquipmentCategory", model: prisma.equipmentCategory },
    { name: "ArticleRegistration", model: prisma.articleRegistration },
    { name: "ScientificEvent", model: prisma.scientificEvent },
    { name: "Mission", model: prisma.mission },
    { name: "RequestStage", model: prisma.requestStage },
    { name: "EquipmentLoanRequest", model: prisma.equipmentLoanRequest },
    { name: "PurchaseRequest", model: prisma.purchaseRequest },
    { name: "Request", model: prisma.request },
    { name: "DoctoralStudent", model: prisma.doctoralStudent },
    { name: "MasterStudent", model: prisma.masterStudent },
    { name: "DoctoralStudentRequest", model: prisma.doctoralStudentRequest },
    { name: "MasterStudentRequest", model: prisma.masterStudentRequest },
    {
      name: "TeacherResearcherRequest",
      model: prisma.teacherResearcherRequest,
    },
    { name: "TeacherResearcher", model: prisma.teacherResearcher },
    { name: "Admin", model: prisma.admin },
    { name: "User", model: prisma.user },
  ];

  // Nettoyer chaque table avec gestion des erreurs
  for (const table of tables) {
    try {
      await (table.model as any).deleteMany({});
      console.log(`Table ${table.name} nettoyée avec succès.`);
    } catch (error: any) {
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
