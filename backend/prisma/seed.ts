import bcrypt from "bcrypt";
import prisma from "../src/utils/db";
import { Grade, Role, EquipmentType } from "../generated/prisma";

async function main() {
  console.log("Début de la procédure de seed...");

  try {
    await cleanDatabase();

    // Création des utilisateurs (identique à votre version originale)
    const adminPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@irescomath.com",
        password: adminPassword,
        
        role: Role.ADMIN,
        cin: "ADMIN12345",
        admin: {
          create: {
            lastName: "Admin",
            firstName: "Système",
            cin: "ADMIN12345",
          },
        },
      },
      include: {
        admin: true,
      },
    });

    const directeurPassword = await bcrypt.hash("directeur123", 10);
    const directeurUser = await prisma.user.create({
      data: {
        email: "directeur@irescomath.com",
        password: directeurPassword,
        role: Role.DIRECTEUR,
        cin: "DIR123456",
        teacherResearcher: {
          create: {
            lastName: "Directeur",
            firstName: "Laboratoire",
            cin: "DIR123456",
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
            cin: "ENS123456",
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

    console.log("Utilisateurs créés avec succès");

    // Création des catégories d'équipements adaptées à votre laboratoire
    console.log("Création des catégories d'équipements...");

    // Catégorie Cartes de développement
    const devBoardsCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Cartes de développement",
        quantity: 20,
      },
    });

    // Catégorie Périphériques de présentation
    const presentationCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Périphériques de présentation",
        quantity: 10,
      },
    });

    // Catégorie Réseau
    const networkCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Équipements réseau",
        quantity: 5,
      },
    });

    // Catégorie Stockage
    const storageCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Stockage de données",
        quantity: 15,
      },
    });

    // Catégorie Capteurs
    const sensorsCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Capteurs et modules",
        quantity: 25,
      },
    });

    // Création des équipements spécifiques à votre laboratoire
    console.log("Création des équipements...");

    // Cartes ESP32
    const esp32Boards = await prisma.equipment.create({
      data: {
        name: "Carte ESP32",
        categoryId: devBoardsCategory.id,
        specifications: {
          marque: "Espressif",
          modele: "ESP32-WROOM-32",
          cpu: "Dual-core Xtensa LX6",
          vitesse: "240 MHz",
          memoire: "520KB SRAM, 16MB Flash",
          wifi: "802.11 b/g/n",
          bluetooth: "Bluetooth 4.2",
          ports: "GPIO, ADC, DAC, UART, SPI, I2C",
          stockDisponible: 8,
          numeroSerie: "ESP32-2023-001",
          etat: "Neuf"
        },
        acquisitionDate: new Date("2023-01-15"),
      },
    });

    // Cartes Raspberry Pi
    const raspberryPis = await prisma.equipment.create({
      data: {
        name: "Carte Raspberry Pi",
        categoryId: devBoardsCategory.id,
        specifications: {
          marque: "Raspberry Pi Foundation",
          modele: "Raspberry Pi 4 Model B",
          cpu: "Quad-core Cortex-A72",
          vitesse: "1.5GHz",
          ram: "4GB LPDDR4",
          stockage: "MicroSD",
          ports: "2x USB 3.0, 2x USB 2.0, 2x HDMI, Gigabit Ethernet",
          connectivite: "Wi-Fi 802.11ac, Bluetooth 5.0",
          stockDisponible: 6,
          numeroSerie: "RPI4-2023-002",
          etat: "Neuf"
        },
        acquisitionDate: new Date("2023-02-10"),
      },
    });

    // Capteur Data Show
    const dataShowSensor = await prisma.equipment.create({
      data: {
        name: "Capteur Data Show",
        categoryId: sensorsCategory.id,
        specifications: {
          marque: "Vernier",
          modele: "GDX-DSH",
          typeCapteur: "Multifonction",
          interfaces: "USB, Bluetooth",
          compatibilite: "Windows, macOS, Chrome OS, iOS, Android",
          stockDisponible: 3,
          numeroSerie: "VRN-DSH-2023-003",
          etat: "Excellent"
        },
        acquisitionDate: new Date("2023-03-05"),
      },
    });

    // Pointeur laser
    const laserPointer = await prisma.equipment.create({
      data: {
        name: "Pointeur laser",
        categoryId: presentationCategory.id,
        specifications: {
          marque: "Logitech",
          modele: "Spotlight",
          couleur: "Rouge",
          portee: "100m",
          autonomie: "3 mois (usage normal)",
          connectivite: "USB rechargeable",
          stockDisponible: 5,
          numeroSerie: "LOG-SPT-2023-004",
          etat: "Très bon"
        },
        acquisitionDate: new Date("2023-03-15"),
      },
    });

    // Switch réseau
    const networkSwitch = await prisma.equipment.create({
      data: {
        name: "Switch réseau",
        categoryId: networkCategory.id,
        specifications: {
          marque: "TP-Link",
          modele: "TL-SG108",
          ports: "8 ports Gigabit",
          vitesse: "10/100/1000 Mbps",
          type: "Non géré",
          alimentation: "Interne",
          stockDisponible: 2,
          numeroSerie: "TPL-SG108-2023-005",
          etat: "Neuf"
        },
        acquisitionDate: new Date("2023-04-01"),
      },
    });

    // Disque dur externe
    const externalHdd = await prisma.equipment.create({
      data: {
        name: "Disque dur externe",
        categoryId: storageCategory.id,
        specifications: {
          marque: "Western Digital",
          modele: "My Passport",
          capacite: "2TB",
          interface: "USB 3.0",
          vitesse: "5Gbps",
          dimensions: "110 x 82 x 15 mm",
          poids: "230g",
          stockDisponible: 4,
          numeroSerie: "WD-MP2TB-2023-006",
          etat: "Neuf"
        },
        acquisitionDate: new Date("2023-04-10"),
      },
    });

    // Création d'historiques d'emprunt
    await prisma.equipmentHistory.create({
      data: {
        equipmentId: esp32Boards.id,
        userId: etudiantMasterUser.id,
        borrowDate: new Date("2023-05-01"),
        returnDate: new Date("2023-05-15"),
       
      },
    });

    await prisma.equipmentHistory.create({
      data: {
        equipmentId: raspberryPis.id,
        userId: doctorantUser.id,
        borrowDate: new Date("2023-05-10"),
        returnDate: null, // Emprunt en cours
       
      },
    });

    await prisma.equipmentHistory.create({
      data: {
        equipmentId: dataShowSensor.id,
        userId: enseignantChercheurUser.id,
        borrowDate: new Date("2023-04-20"),
        returnDate: new Date("2023-05-20"),
      
      },
    });

    console.log("Équipements et historiques créés avec succès!");
    console.log("Seed terminé avec succès!");
  } catch (error) {
    console.error("Erreur durant le processus de seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function cleanDatabase() {
  console.log("Nettoyage de la base de données...");

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