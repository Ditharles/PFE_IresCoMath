import { Grade, RequestType, Role } from "../../generated/prisma";
import { requestRelationFieldByType } from "../constants/requests";

export const defineValueMap = (
  request: any,
  type: RequestType,
  language?: string
): Record<string, any> => {
  if (typeof request !== "object" || request === null) {
    return {};
  }

  const nestedDataUser: Record<Role, string> = {
    [Role.MASTER]: "masterStudent",
    [Role.DOCTORANT]: "doctoralStudent",
    [Role.ENSEIGNANT]: "teacherResearcher",
    [Role.DIRECTEUR]: "teacherResearcher",
    [Role.ADMIN]: "admin",
  };

  const nameField = requestRelationFieldByType[type];
  if (!nameField) {
    return {};
  }

  const result: Record<string, any> = {};

  const nestedData = request[nameField] || {};
  const userInfo = request.user || {};
  const fieldUser = nestedDataUser[userInfo.role as Role] || "admin";

  result["nom_complet"] = userInfo.firstName + " " + userInfo.lastName;
  if (userInfo[fieldUser]) {
    result["email"] = userInfo.email;
    result["telephone"] = userInfo.phone;
    result["role"] = formatRole(
      userInfo.role,
      userInfo[fieldUser].grade,
      userInfo[fieldUser].thesisYear,
      userInfo[fieldUser].masterYear
    );
    result["cin"] = userInfo.cin;
    result["etablissement"] = userInfo.institution;
  }

  result["organisme_accueil"] = nestedData.hostOrganization;
  result["pays"] = nestedData.country;
  result["ville"] = nestedData.city;
  result["date_debut"] = nestedData.startDate;
  result["date_fin"] = nestedData.endDate;
  result["objectif"] = nestedData.objective;

  if (nestedData.equipment) {
    result["nom_equipement"] = nestedData.equipment.name;
    result["categorie_equipement"] = nestedData.equipment.category;
    result["quantite"] = nestedData.equipment.quantity;
  }

  result["estimation_cout"] = nestedData.costEstimation;

  return result;
};

const formatRole = (
  role: Role,
  grade: Grade,
  thesisYear: number,
  masterYear: number
): string => {
  switch (role) {
    case Role.DOCTORANT:
      let thesisYearMessage = "";
      switch (thesisYear) {
        case 1:
          thesisYearMessage = "en première année de thèse";
          break;
        case 2:
          thesisYearMessage = "en deuxième année de thèse";
          break;
        case 3:
          thesisYearMessage = "en troisième année de thèse";
          break;
        case 4:
          thesisYearMessage = "en quatrième année de thèse";
          break;
        default:
          thesisYearMessage = "en thèse";
      }
      return "étudiant doctorant " + thesisYearMessage;

    case Role.ENSEIGNANT:
      let gradeMessage = "";
      switch (grade) {
        case Grade.Assistant:
          gradeMessage = "Assistant";
          break;
        case Grade.MaitreAssistant:
          gradeMessage = "Maître Assistant";
          break;
        case Grade.MaitreDeConference:
          gradeMessage = "Maître de Conférences";
          break;
        case Grade.Professeur:
          gradeMessage = "Professeur";
          break;
        default:
          gradeMessage = "enseignant chercheur";
      }
      return "enseignant chercheur de grade " + gradeMessage;

    case Role.MASTER:
      switch (masterYear) {
        case 1:
          return "Étudiant Master en première année";
        case 2:
          return "Étudiant Master en deuxième année";
        case 3:
          return "Étudiant Master en troisième année";
        case 4:
          return "Étudiant Master en quatrième année";
        default:
          return "Étudiant Master";
      }

    case Role.ADMIN:
      return "Administrateur";
    case Role.DIRECTEUR:
      return "Directeur";
    default:
      return role;
  }
};
