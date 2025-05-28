import bcrypt from "bcrypt";
import prisma from "../src/utils/db";
import {
  Grade,
  Role,
  EquipmentType,
  EquipmentStatus,
  RequestType,
} from "../generated/prisma";

async function main() {
  console.log("Début de la procédure de seed...");

  try {
    await cleanDatabase();

    // Création des utilisateurs
    const adminPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@irescomath.com",
        password: adminPassword,
        role: Role.ADMIN,
        cin: "ADMIN12345",
        firstName: "Système",
        lastName: "Admin",
        photo: null,
        bankData: null,
        signature: null,
        admin: {
          create: {},
        },
      },
    });

    const directeurPassword = await bcrypt.hash("directeur123", 10);
    const directeurUser = await prisma.user.create({
      data: {
        email: "directeur@irescomath.com",
        password: directeurPassword,
        role: Role.DIRECTEUR,
        cin: "DIR123456",
        firstName: "Laboratoire",
        lastName: "Directeur",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
        teacherResearcher: {
          create: {
            position: "Directeur de laboratoire",
            grade: Grade.Professeur,
            institution: "Université IreSCoMath",
          },
        },
      },
    });

    const enseignantChercheurPassword = await bcrypt.hash("enseignant123", 10);
    const enseignantChercheurUser = await prisma.user.create({
      data: {
        email: "enseignant@irescomath.com",
        password: enseignantChercheurPassword,
        role: Role.ENSEIGNANT,
        cin: "ENS123456",
        firstName: "Chercheur",
        lastName: "Enseignant",
        photo: "https://randomuser.me/api/portraits/men/2.jpg",
        teacherResearcher: {
          create: {
            position: "Enseignant chercheur",
            grade: Grade.Professeur,
            institution: "Université IreSCoMath",
          },
        },
      },
      select: {
        id: true,
        teacherResearcher: {
          select: {
            id: true,
          },
        },
      },
    });

    const etudiantMasterPassword = await bcrypt.hash("etudiant123", 10);
    const etudiantMasterUser = await prisma.user.create({
      data: {
        email: "etudiant@irescomath.com",
        password: etudiantMasterPassword,
        role: Role.MASTER,
        cin: "ETU123456",
        firstName: "Master",
        lastName: "Etudiant",
        photo: "https://randomuser.me/api/portraits/men/3.jpg",
        masterStudent: {
          create: {
            masterYear: 2023,
            supervisorId: enseignantChercheurUser.teacherResearcher!.id,
          },
        },
      },
    });

    const doctorantPassword = await bcrypt.hash("doctorant123", 10);
    const doctorantUser = await prisma.user.create({
      data: {
        email: "doctorant@irescomath.com",
        password: doctorantPassword,
        role: Role.DOCTORANT,
        cin: "DOC123456",
        firstName: "Doctorat",
        lastName: "Etudiant",
        photo: "https://randomuser.me/api/portraits/women/3.jpg",
        doctoralStudent: {
          create: {
            thesisYear: 2022,
            thesisSupervisorId: enseignantChercheurUser.teacherResearcher!.id,
          },
        },
      },
    });

    console.log("Utilisateurs créés avec succès");

    // Création des catégories d'équipements
    console.log("Création des catégories d'équipements...");

    const carteDeveloppementCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Cartes de développement",
        description:
          "Microcontrôleurs et cartes de développement pour projets électroniques",
        photo: ["https://example.com/carte-dev.jpg"],
        quantity: 5,
      },
    });

    const ordinateurCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Ordinateurs portables",
        description: "Ordinateurs portables pour la recherche et développement",
        photo: ["https://example.com/laptop.jpg"],
        quantity: 10,
      },
    });

    const oscilloscopeCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Oscilloscopes",
        description: "Instruments de mesure électronique",
        photo: ["https://example.com/oscilloscope.jpg"],
        quantity: 3,
      },
    });

    console.log("Catégories d'équipements créées");

    // Création d'équipements
    console.log("Création d'équipements...");

    await prisma.equipment.create({
      data: {
        name: "Arduino UNO",
        categoryId: carteDeveloppementCategory.id,
        notes: "Pour projets étudiants",
        cost: 25.99,
        bill: "https://example.com/bill-arduino.pdf",
        specifications: {
          microcontroleur: "ATmega328P",
          tension: "5V",
          entree: "6-20V",
        },
        acquisitionDate: new Date("2023-01-15"),
        photo: ["https://example.com/arduino.jpg"],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Raspberry Pi 4",
        categoryId: carteDeveloppementCategory.id,
        notes: "Modèle 8GB RAM",
        cost: 89.99,
        bill: "https://example.com/bill-raspberry.pdf",
        specifications: {
          processeur: "Broadcom BCM2711",
          ram: "8GB",
          ports: "2x USB 3.0, 2x USB 2.0",
        },
        acquisitionDate: new Date("2023-02-20"),
        photo: ["https://example.com/raspberry.jpg"],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    await prisma.equipment.create({
      data: {
        name: "ThinkPad X1 Carbon",
        categoryId: ordinateurCategory.id,
        notes: "Pour chercheurs seniors",
        cost: 1899.99,
        bill: "https://example.com/bill-thinkpad.pdf",
        specifications: {
          processeur: "Intel i7-1165G7",
          ram: "16GB",
          stockage: "512GB SSD",
        },
        acquisitionDate: new Date("2023-03-10"),
        photo: ["https://example.com/thinkpad.jpg"],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    console.log("Équipements créés avec succès");

    // Création de demandes selon les rôles
    console.log("Création de demandes spécifiques par rôle...");

    // Étudiant Master: Seulement demandes de stage
    const masterStageRequest = await prisma.request.create({
      data: {
        type: RequestType.INTERNSHIP,
        userId: etudiantMasterUser.id,
        status: "PENDING",
        stage: {
          create: {
            organization: "Entreprise ABC",
            organizationEmail: "contact@abc.com",
            supervisor: "M. Dupont",
            supervisorEmail: "dupont@abc.com",
            supervisorPhone: "0123456789",
            letter: "https://example.com/lettre-stage.pdf",
            country: "France",
            startDate: new Date("2023-07-01"),
            endDate: new Date("2023-08-31"),
          },
        },
      },
    });

    // Doctorant: Demandes de stage et d'emprunt
    const doctoralStageRequest = await prisma.request.create({
      data: {
        type: RequestType.INTERNSHIP,
        userId: doctorantUser.id,
        status: "PENDING",
        stage: {
          create: {
            organization: "Laboratoire XYZ",
            organizationEmail: "contact@xyz.org",
            supervisor: "Dr. Martin",
            supervisorEmail: "martin@xyz.org",
            supervisorPhone: "0987654321",
            letter: "https://example.com/lettre-stage-doctorant.pdf",
            country: "Canada",
            startDate: new Date("2023-09-01"),
            endDate: new Date("2023-12-31"),
          },
        },
      },
    });

    const doctoralLoanRequest = await prisma.request.create({
      data: {
        type: RequestType.EQUIPMENT_LOAN,
        userId: doctorantUser.id,
        status: "PENDING",
        loanRequest: {
          create: {
            equipmentId: (await prisma.equipment.findFirst({
              where: { name: "Raspberry Pi 4" },
            }))!.id,
            quantity: 1,
            startDate: new Date("2023-06-01"),
            endDate: new Date("2023-06-15"),
          },
        },
      },
    });

    // Enseignant Chercheur: Tous types de demandes SAUF stage
    const teacherMissionRequest = await prisma.request.create({
      data: {
        type: RequestType.MISSION,
        userId: enseignantChercheurUser.id,
        status: "PENDING",
        mission: {
          create: {
            hostOrganization: "Université de Paris",
            objective: "Collaboration de recherche",
            country: "France",
            startDate: new Date("2023-10-01"),
            endDate: new Date("2023-10-10"),
            specificDocument: ["https://example.com/doc1.pdf"],
            document: ["https://example.com/doc2.pdf"],
          },
        },
      },
    });

    const teacherPurchaseRequest = await prisma.request.create({
      data: {
        type: RequestType.EQUIPMENT_PURCHASE,
        userId: enseignantChercheurUser.id,
        status: "PENDING",
        purchaseRequest: {
          create: {
            equipmentType: EquipmentType.EQUIPMENT,
            name: "Microscope électronique",
            url: "https://example.com/microscope",
            quantity: 1,
            specifications: {
              grossissement: "10000x",
            },
            costEstimation: 50000.0,
          },
        },
      },
    });

    const teacherArticleRequest = await prisma.request.create({
      data: {
        type: RequestType.ARTICLE_REGISTRATION,
        userId: enseignantChercheurUser.id,
        status: "PENDING",
        articleRegistration: {
          create: {
            title: "Nouvelle méthode d'analyse mathématique",
            conference: "Conférence Internationale",
            urlConference: "https://example.com/conference",
            articleCover: "https://example.com/article-cover.pdf",
            amount: "500",
          },
        },
      },
    });

    console.log("Demandes créées avec succès selon les rôles");

    console.log("Seed complet avec succès!");
  } catch (error) {
    console.error("Erreur durant le seed:", error);
  }
}

async function cleanDatabase() {
  console.log("Nettoyage de la base de données...");

  const tables = [
    { name: "Template", model: prisma.template },
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

  for (const table of tables) {
    try {
      await (table.model as any).deleteMany({});
      console.log(`Table ${table.name} nettoyée avec succès.`);
    } catch (error: any) {
      if (error.code === "P2021") {
        console.log(`Table ${table.name} n'existe pas encore, on continue.`);
      } else {
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
