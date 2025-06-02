import { RequestType } from "../../generated/prisma";
import { requestRelationFieldByType } from "./requests";

export const authorizedFields = {
  nom_complet: "fullName",
  email: "email",
  telephone: "phone",
  role: "role",
  cin: "cin",
  superviseur: "supervisor",
  grade: "grade",
  etablissement: "institution",
  organisme_accueil: "hostOrganization",
  pays: "country",
  ville: "city",
  date_debut: "startDate",
  date_fin: "endDate",
  objectif: "objective",
  nom_equipement: "equipmentName",
  categorie_equipement: "equipmentCategory",
  quantite: "quantity",
  estimation_cout: "costEstimation",
};
