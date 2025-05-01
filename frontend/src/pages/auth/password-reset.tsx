import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Toast, toast } from "../../components/Toast";


const authService = new AuthService();

const PasswordReset = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (token) {
        await authService.resetPassword(token, password);
        toast.success("Votre mot de passe a été réinitialisé avec succès !");
        setTimeout(() => navigate("/login"), 4000);
      } else {
        toast.error("Lien invalide.");
      }
    } catch (error) {
      toast.error("Erreur lors de la réinitialisation. Essayez encore.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Réinitialiser le mot de passe</h2>

        <Toast />
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Réinitialiser
          </button>
        </form>

        {/* Bouton retour connexion */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
