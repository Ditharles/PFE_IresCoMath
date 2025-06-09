import { useMemo } from "react";
import { RoleEnum } from "../types/common";
import { User } from "../types/Member";
import { RequestStatus, RequestUser } from "../types/MemberAddRequest";

/**
 * Détermine le rôle d'un utilisateur en fonction de ses attributs
 */
export const determineRole = (user: User|RequestUser) => {
  if ("thesisYear" in user) return RoleEnum.DOCTORANT;
  if ("masterYear" in user) return RoleEnum.MASTER;
  if ("position" in user) return RoleEnum.ENSEIGNANT;
  return RoleEnum.ADMIN;
};
export const determineRequestRole = (request: RequestUser) => {
  if ("thesisYear" in request) return RoleEnum.DOCTORANT;
  if ("masterYear" in request) return RoleEnum.MASTER;
  if ("position" in request) return RoleEnum.ENSEIGNANT;
  return RoleEnum.ADMIN;
};

/**
 * Hook personnalisé pour filtrer les utilisateurs
 */
export const useFilteredUsers = (
  users: User[],
  searchQuery: string,
  filterRole: string,
  filterStatus: RequestStatus | undefined,
  activeTab: string
) => {
  return useMemo(() => {
    return users.filter((user: User) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const role = determineRole(user);
      const matchesRole = filterRole ? role == filterRole : true;
      const matchesStatus = filterStatus ?  
        ('status' in user ? user.status === filterStatus : false) 
        : true;
      const matchesTab = activeTab === "all" ? true : role === activeTab;

      return matchesSearch && matchesRole && matchesStatus && matchesTab;
    });
  }, [users, searchQuery, filterRole, filterStatus, activeTab]);
};
export const useFilteredRequestUsers = (
  users: RequestUser[],
  searchQuery: string,
  filterRole: string,
  filterStatus: RequestStatus | undefined,
  activeTab: string
) => {
  return useMemo(() => {
    return users.filter((user: RequestUser) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const role = determineRole(user);
      const matchesRole = filterRole ? role == filterRole : true;
      const matchesStatus = filterStatus ?  
        ('status' in user ? user.status === filterStatus : false) 
        : true;
      const matchesTab = activeTab === "all" ? true : role === activeTab;

      return matchesSearch && matchesRole && matchesStatus && matchesTab;
    });
  }, [users, searchQuery, filterRole, filterStatus, activeTab]);
};

/**
 * Crée et télécharge un fichier CSV à partir des données
 */
export const exportDataToCSV = (data: unknown, fileName: string) => {
  // Créer des données CSV  
  const headers = [
    "Nom",
    "Prénom",
    "Email",
    "Rôle",
    "Statut",
    "Date de demande",
  ];

  const csvData = (data as Array<{nom: string; prenom: string; email: string; status?: string; createdAt: string,role: string}>).map((item) => {
    
    return [
      item.nom,
      item.prenom,
      item.email,
      item.role,
      item.status || "N/A",
      new Date(item.createdAt).toLocaleDateString(),
    ];
  });

  const csvContent = [
    headers.join(","),
    ...csvData.map((row: string[]) => row.join(",")),
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
