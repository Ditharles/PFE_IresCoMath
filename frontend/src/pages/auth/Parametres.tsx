import { useNavigate } from "react-router-dom";

export default function Parametres() {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Paramètres</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li className="cursor-pointer text-blue-600 hover:underline" onClick={() => navigate('/changer-mot-de-passe')}>password-forget</li>
        <li className="cursor-pointer text-blue-600 hover:underline" onClick={() => navigate('/langue')}>Langue</li>
        <li className="cursor-pointer text-blue-600 hover:underline" onClick={() => navigate('/theme')}>Thème</li>
        <li className="cursor-pointer text-blue-600 hover:underline" onClick={() => navigate('/sessions')}>Sessions actives</li>
        <li className="cursor-pointer text-blue-600 hover:underline" onClick={() => navigate('/notifications')}>Préférences de notification</li>
        <li className="cursor-pointer text-blue-600 hover:underline" onClick={() => navigate('/assistant')}>Contacter l'assistant</li>
      </ul>
    </div>
  );
}
