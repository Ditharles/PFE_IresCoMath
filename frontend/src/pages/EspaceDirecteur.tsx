import { useState } from "react";
import ValidationComptes from "../components/directeur/ValidationComptes";
import ComptesRejetes from "../components/directeur/ComptesRejetes";



// Composant principal de la page Espace Directeur
const EspaceDirecteur = () => {
  // État pour suivre l'onglet sélectionné
  const [selectedTab, setSelectedTab] = useState<"validation" | "rejetes">("validation");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Espace Directeur</h1>

      {/* Boutons de navigation entre les onglets */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          onClick={() => setSelectedTab("validation")}
          className={`px-6 py-2 rounded-full transition-colors duration-200 ${
            selectedTab === "validation"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          Comptes à valider
        </button>
        <button
          onClick={() => setSelectedTab("rejetes")}
          className={`px-6 py-2 rounded-full transition-colors duration-200 ${
            selectedTab === "rejetes"
              ? "bg-red-600 text-white"
              : "bg-white text-red-600 border border-red-600"
          }`}
        >
          Comptes rejetés
        </button>
      </div>

      {/* Affichage conditionnel du contenu en fonction de l'onglet sélectionné */}
      {selectedTab === "validation" ? (
        <ValidationComptes />
      ) : (
        <ComptesRejetes />
      )}
    </div>
  );
};

export default EspaceDirecteur;
