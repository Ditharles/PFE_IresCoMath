import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { toast } from "sonner";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const authService = new AuthService();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await authService.login(email, password);
      console.log(response);
      toast.success(response!.data.message || "Connexion réussie !");
      login();
      setTimeout(() => {
        navigate("/accueil");
      }, 3000);
    } catch (error) {
      toast.error(error!.response?.data.message || "Une erreur s'est produite lors de la connexion.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md relative">
        {isSubmitting && (
          <LoadingOverlay
            loadingText="Connexion en cours..."
            spinnerSize={24}
            spinnerColor="#3b82f6"
            overlayOpacity={0.7}
            showSpinner={true}
            showProgressBar={false}
          />
        )}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-indigo-700">Connexion</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          {/* Lien "Mot de passe oublié ?" */}
          <div className="text-right mt-2">
            <Link to="/password-forget" className="text-blue-500 hover:underline text-sm">
              Mot de passe oublié ?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Se connecter
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Pas encore de compte?{" "}
            <Link to="/inscription" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
