// utils/memberUtils.jsimport { useMemo } from "react";
import { RoleEnum } from "../types/common";
import { User } from "../types/Member";
import { RequestUser } from "../types/MemberAddRequest";
import { useMemo } from "react";
/**
 * Détermine le rôle d'un utilisateur en fonction de ses attributs
 */
export const determineRole = (user: User) => {
  if ("annee_these" in user) return RoleEnum.DOCTORANT;
  if ("annee_master" in user) return RoleEnum.MASTER;
  if ("fonction" in user) return RoleEnum.ENSEIGNANT;
  return RoleEnum.ADMIN;
};
export const determineRequestRole = (request: RequestUser) => {
  if ("annee_these" in request) return RoleEnum.DOCTORANT;
  if ("annee_master" in request) return RoleEnum.MASTER;
  if ("fonction" in request) return RoleEnum.ENSEIGNANT;
  return RoleEnum.ADMIN;
};

/**
 * Hook personnalisé pour filtrer les utilisateurs
 */
export const useFilteredUsers = (
  users,
  searchQuery,
  filterRole,
  filterStatus,
  activeTab
) => {
  return useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.nom} ${user.prenom}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const role = determineRole(user);
      const matchesRole = filterRole ? role === filterRole : true;
      const matchesStatus = filterStatus ? user.status === filterStatus : true;
      const matchesTab = activeTab === "all" ? true : role === activeTab;

      return matchesSearch && matchesRole && matchesStatus && matchesTab;
    });
  }, [users, searchQuery, filterRole, filterStatus, activeTab]);
};

/**
 * Crée et télécharge un fichier CSV à partir des données
 */
export const exportDataToCSV = (data, fileName) => {
  // Créer des données CSV
  const headers = [
    "Nom",
    "Prénom",
    "Email",
    "Rôle",
    "Statut",
    "Date de demande",
  ];

  const csvData = data.map((item) => {
    const role =
      determineRole(item) === RoleEnum.DOCTORANT
        ? "Doctorant"
        : determineRole(item) === RoleEnum.MASTER
        ? "Étudiant Master"
        : "Enseignant";

    return [
      item.nom,
      item.prenom,
      item.email,
      role,
      item.status || "N/A",
      new Date(item.createdAt).toLocaleDateString(),
    ];
  });

  const csvContent = [
    headers.join(","),
    ...csvData.map((row) => row.join(",")),
  ].join("\n");

  // Créer un blob et télécharger
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${fileName}-${new Date().toISOString().slice(0, 10)}.csv`
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
