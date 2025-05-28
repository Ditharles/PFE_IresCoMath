import { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const authService = new AuthService();

const PasswordForget = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.forgotPassword(email);
      toast.success("Un email de confirmation vous a été envoyé.");

      setTimeout(() => navigate("/login"), 4000);
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-background p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Mot de passe oublié</h2>


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
            className="bg-blue-500 text-foreground p-2 rounded hover:bg-blue-600"
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
