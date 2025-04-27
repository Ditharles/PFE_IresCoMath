import { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const authService = new AuthService();

const PasswordForget = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.forgotPassword(email);
      setMessage("Un lien de réinitialisation a été envoyé à votre adresse email.");
      // Optionnel : rediriger après quelques secondes
      setTimeout(() => navigate("/login"), 4000);
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Mot de passe oublié</h2>

        {message && <p className="text-green-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Envoyer
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

export default PasswordForget;
