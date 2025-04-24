
// Ce composant affichera la liste des comptes à valider
const ValidationComptes = () => {
  // Tu pourras récupérer les comptes via un appel API ici plus tard

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Liste des comptes à valider</h2>

      {/* Exemple de compte à valider - à remplacer par une vraie liste plus tard */}
      <div className="border p-4 rounded mb-3">
        <p><strong>Nom :</strong> Jean Dupont</p>
        <p><strong>Fonction :</strong> Doctorant</p>
        <div className="mt-2 flex gap-2">
          <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Valider</button>
          <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">Rejeter</button>
        </div>
      </div>

      {/* Ajouter d'autres utilisateurs ici dynamiquement */}
    </div>
  );
};

export default ValidationComptes;
