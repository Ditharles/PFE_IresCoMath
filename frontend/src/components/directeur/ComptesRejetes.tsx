// src/components/directeur/ComptesRejetes.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';

interface CompteRejete {
  id: string;
  nom: string;
  prenom: string;
  fonction: string;
  motif: string;
}

const ComptesRejetes = () => {
  const [comptesRejetes, setComptesRejetes] = useState<CompteRejete[]>([]);

  useEffect(() => {
    // Appel API pour récupérer les comptes rejetés
    const fetchComptesRejetes = async () => {
      try {
        const response = await axios.get('/api/comptes/rejetes');
        setComptesRejetes(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des comptes rejetés :', error);
      }
    };

    fetchComptesRejetes();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Comptes rejetés</h2>

      {comptesRejetes.length === 0 ? (
        <p className="text-gray-500">Aucun compte rejeté pour le moment.</p>
      ) : (
        comptesRejetes.map((compte) => (
          <div key={compte.id} className="border p-4 rounded mb-3">
            <p><strong>Nom :</strong> {compte.nom} {compte.prenom}</p>
            <p><strong>Fonction :</strong> {compte.fonction}</p>
            <p><strong>Motif du rejet :</strong> {compte.motif}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ComptesRejetes;
