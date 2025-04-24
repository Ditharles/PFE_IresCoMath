// src/services/serviceComptes.ts
import axios from 'axios';
import { Utilisateur } from '../types/Utilisateur';

// 🔄 Récupère la liste des comptes à valider depuis le backend
export const getComptesAValider = async (): Promise<Utilisateur[]> => {
  const response = await axios.get('/api/comptes/a-valider');
  return response.data;
};

// ✅ Valide un compte donné
export const validerCompte = async (id: string): Promise<void> => {
  await axios.post(`/api/comptes/valider/${id}`);
};

// ❌ Rejette un compte avec un motif
export const rejeterCompte = async (id: string, motif: string): Promise<void> => {
  await axios.post(`/api/comptes/rejeter/${id}`, { motif });
};
