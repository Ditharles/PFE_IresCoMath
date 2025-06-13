import bcrypt from "bcrypt";
import prisma from "../src/utils/db";
import {
  Grade,
  Role,
  EquipmentType,
  EquipmentStatus,
  RequestType,
} from "../generated/prisma";
import { create } from "domain";

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
        firstName: "Mohamed",
        lastName: "Ben Ali",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
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
        firstName: "Fatma",
        lastName: "Zouari",
        photo: "https://randomuser.me/api/portraits/women/2.jpg",
        teacherResearcher: {
          create: {
            position: "Directeur de laboratoire",
            grade: Grade.Professeur,
            institution: "Faculté des Sciences de Gabès",
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
        firstName: "Ahmed",
        lastName: "Trabelsi",
        photo: "https://randomuser.me/api/portraits/men/3.jpg",
        teacherResearcher: {
          create: {
            position: "Enseignant chercheur",
            grade: Grade.Professeur,
            institution: "Facultés des Sciences de Gabès",
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
        firstName: "Amira",
        lastName: "Ben Salah",
        photo: "https://randomuser.me/api/portraits/women/1.jpg",
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
        firstName: "Leila",
        lastName: "Hammami",
        photo: "https://randomuser.me/api/portraits/women/4.jpg",
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
        photo: [
          "https://unsplash.com/fr/photos/circuit-imprime-bleu-__LXdDYiL-w",
          "https://th.bing.com/th/id/R.5cd002bcc54777219ee24720fd0407f0?rik=vLsAehX0UKRsqg&pid=ImgRaw&r=0",
          "https://www.pcwdld.com/wp-content/uploads/Raspberry_Pi_4_Model_B_-_Side-scaled.jpg",
        ],
        quantity: 3,
      },
    });

    const reseauxCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Objets réseaux",
        description:
          "Équipements réseau pour la connectivité et la communication",
        photo: [
          "https://www.shutterstock.com/fr/image-photo/industrial-internet-equipment-network-switch-provision-2435843379",
          "https://www.shutterstock.com/fr/image-photo/fiber-optic-network-connection-signal-transmission-2626967163",
          "https://th.bing.com/th/id/OIP.WNUSa1OrRgP6T7RgC0lN1QHaFm?r=0&w=1000&h=757&rs=1&pid=ImgDetMain",
        ],
        quantity: 5,
      },
    });

    const stockageCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Stockage",
        description: "Disques durs et périphériques de stockage",
        photo: [
          " https://www.shutterstock.com/fr/image-photo/stack-old-possibly-nonfunctional-hard-drives-2592403233",
          "https://www.shutterstock.com/fr/image-photo/external-hard-disk-isolated-on-white-2547910355",
          "https://www.shutterstock.com/fr/image-photo/external-usb-hard-drive-isolated-on-2296844811",
        ],
        quantity: 4,
      },
    });

    const outilsPresentationCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.TOOLS,
        name: "Outils de présentation",
        description: "Équipements pour les présentations et conférences",
        photo: [
          "https://www.shutterstock.com/fr/image-vector/screen-projector-cinema-movie-games-meetings-1667781523",
          "https://unsplash.com/fr/photos/allume-projecteur-led-sur-table-MAYsdoYpGuk",
          "https://unsplash.com/fr/photos/projecteur-noir-et-blanc-sur-table-blanche-WU4ek4KCyjw",
        ],
        quantity: 8,
      },
    });

    const capteursCategory = await prisma.equipmentCategory.create({
      data: {
        type: EquipmentType.EQUIPMENT,
        name: "Capteurs",
        description: "Capteurs divers pour projets électroniques et IoT",
        photo: [
          "https://th.bing.com/th/id/OIP.n1lhxBtHiBkubfwhIpRPPwHaHa?r=0&rs=1&pid=ImgDetMain",
        ],
        quantity: 15,
      },
    });

    console.log("Catégories d'équipements créées");

    // Création d'équipements
    console.log("Création d'équipements...");

    // Création des cartes de développement
    await prisma.equipment.createMany({
      data: [
        {
          name: "Carte de développement Arduino Uno R3",
          categoryId: carteDeveloppementCategory.id,
          status: EquipmentStatus.AVAILABLE,
          photo: [
            "https://th.bing.com/th/id/OIP.SeXbjo3YNDhlSA_-6kroAwHaHa?r=0&rs=1&pid=ImgDetMain",
          ],
          specifications: {
            type: "Microcontrôleur",
            tension: "5V",
            processeur: "ATmega328P",
            memoire: "32KB Flash, 2KB SRAM",
          },
          acquisitionDate: new Date("2024-01-15"),
        },
        {
          name: "Carte de développement Raspberry Pi 4 Model B",
          categoryId: carteDeveloppementCategory.id,
          status: EquipmentStatus.AVAILABLE,
          photo: [
            "https://www.pcwdld.com/wp-content/uploads/Raspberry_Pi_4_Model_B_-_Side-scaled.jpg",
          ],
          specifications: {
            type: "Ordinateur monocarte",
            processeur: "Quad-core ARM Cortex-A72",
            memoire: "4GB RAM",
            stockage: "MicroSD",
          },
          acquisitionDate: new Date("2024-02-01"),
        },
        {
          name: "Carte de développement ESP32 DevKit",
          categoryId: carteDeveloppementCategory.id,
          status: EquipmentStatus.AVAILABLE,
          photo: [
            "https://www.picclickimg.com/7J8AAOSw4ABlwco6/Espressif-ESP32-C3-DevKit-RUST-1-Carte-de-d%C3%A9veloppement-ESP32-C3-DevKit-RUST-1.webp",
          ],
          specifications: {
            type: "Microcontrôleur WiFi/Bluetooth",
            processeur: "Dual-core Xtensa LX6",
            memoire: "520KB SRAM",
            connectivite: "WiFi 2.4GHz, Bluetooth 4.2",
          },
          acquisitionDate: new Date("2024-03-01"),
        },
      ],
    });
    // Création des capteurs
    await prisma.equipment.create({
      data: {
        name: "Capteur de lumière LDR",
        categoryId: capteursCategory.id,
        notes: "Capteur de luminosité analogique",
        cost: 2.99,
        bill: "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
        specifications: {
          type: "Photorésistance",
          resistance: "10-100kΩ",
          tension: "3.3V-5V",
          sensibilite: "0.5-10 lux",
        },
        acquisitionDate: new Date("2025-01-15"),
        photo: [
          "https://m.media-amazon.com/images/I/61W1h6+WQVL._AC_UF1000,1000_QL80_.jpg",
        ],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Capteur de distance HC-SR04",
        categoryId: capteursCategory.id,
        notes: "Capteur ultrasonique de distance",
        cost: 3.99,
        bill: "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
        specifications: {
          type: "Ultrasonique",
          portee: "2-400cm",
          precision: "3mm",
          tension: "5V",
        },
        acquisitionDate: new Date("2025-02-01"),
        photo: [
          "https://m.media-amazon.com/images/I/71iQn-+VqRL._AC_UF1000,1000_QL80_.jpg",
        ],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Capteur de température DHT22",
        categoryId: capteursCategory.id,
        notes: "Capteur de température et d'humidité",
        cost: 5.99,
        bill: "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
        specifications: {
          type: "Température/Humidité",
          plageTemp: "-40°C à 80°C",
          plageHumidite: "0-100%",
          precision: "±0.5°C",
        },
        acquisitionDate: new Date("2025-02-15"),
        photo: [
          "https://m.media-amazon.com/images/I/71tjbl0yQQL._AC_UF1000,1000_QL80_.jpg",
        ],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Capteur de mouvement PIR",
        categoryId: capteursCategory.id,
        notes: "Détecteur de mouvement infrarouge",
        cost: 4.99,
        bill: "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
        specifications: {
          type: "Infrarouge passif",
          portee: "3-7m",
          angle: "110°",
          tension: "3.3V-5V",
        },
        acquisitionDate: new Date("2025-03-01"),
        photo: [
          "https://m.media-amazon.com/images/I/61W1h6+WQVL._AC_UF1000,1000_QL80_.jpg",
        ],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Capteur de gaz MQ-2",
        categoryId: capteursCategory.id,
        notes: "Capteur de gaz combustible",
        cost: 6.99,
        bill: "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
        specifications: {
          type: "Gaz",
          plage: "0-10000ppm",
          tension: "5V",
          tempsReponse: "<10s",
        },
        acquisitionDate: new Date("2025-03-15"),
        photo: [
          "https://m.media-amazon.com/images/I/71iQn-+VqRL._AC_UF1000,1000_QL80_.jpg",
        ],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Disque Dur Externe WD 2TB",
        categoryId: stockageCategory.id,
        notes: "Disque dur externe portable",
        cost: 89.99,
        bill: "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
        specifications: {
          capacite: "2TB",
          interface: "USB 3.0",
          vitesse: "5400 RPM",
          dimensions: "111.5 x 82 x 21.5 mm",
        },
        acquisitionDate: new Date("2025-04-01"),
        photo: [
          "https://m.media-amazon.com/images/I/71tjbl0yQQL._AC_UF1000,1000_QL80_.jpg",
        ],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    await prisma.equipment.create({
      data: {
        name: "SSD Samsung 1TB",
        categoryId: stockageCategory.id,
        notes: "SSD interne haute performance",
        cost: 129.99,
        bill: "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
        specifications: {
          capacite: "1TB",
          interface: "SATA III",
          vitesseLecture: "560 MB/s",
          vitesseEcriture: "530 MB/s",
        },
        acquisitionDate: new Date("2025-04-15"),
        photo: [
          "https://m.media-amazon.com/images/I/71tjbl0yQQL._AC_UF1000,1000_QL80_.jpg",
        ],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    // Création des équipements de présentation
    await prisma.equipment.create({
      data: {
        name: "DataShow Epson EB-X05",
        categoryId: outilsPresentationCategory.id,
        notes: "Vidéoprojecteur portable",
        cost: 499.99,
        bill: "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
        specifications: {
          resolution: "1024 x 768",
          luminosite: "3300 lumens",
          contraste: "15000:1",
          poids: "2.3 kg",
        },
        acquisitionDate: new Date("2025-05-01"),
        photo: [
          "https://m.media-amazon.com/images/I/71iQn-+VqRL._AC_UF1000,1000_QL80_.jpg",
        ],
        status: EquipmentStatus.AVAILABLE,
      },
    });

    await prisma.equipment.create({
      data: {
        name: "Pointeur Laser Vert",
        categoryId: outilsPresentationCategory.id,
        notes: "Pointeur laser haute visibilité",
        cost: 29.99,
        bill: "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
        specifications: {
          couleur: "Vert",
          puissance: "5mW",
          portee: "100m",
          alimentation: "2 piles AAA",
        },
        acquisitionDate: new Date("2025-05-15"),
        photo: [
          "https://m.media-amazon.com/images/I/61W1h6+WQVL._AC_UF1000,1000_QL80_.jpg",
        ],
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
            letter:
              "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
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
            letter:
              "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
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
            categoryId: outilsPresentationCategory.id,
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
            specificDocument: [
              "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
            ],
            document: [
              "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
            ],
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
            url: "https://m.media-amazon.com/images/I/71iQn-+VqRL._AC_UF1000,1000_QL80_.jpg",
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
            urlConference: "https://url_de_la_conference.com",
            articleCover:
              "https://orw9jssgfa.ufs.sh/f/EXQHA8sNVKjwS3rZR2tYPnHiUWskfwtLy1Qrv4GIjpq8V9Me",
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
