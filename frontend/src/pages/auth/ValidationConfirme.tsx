import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toast, toast } from "../../components/Toast";
import AuthService from "../../services/auth.service";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";


type TokenStatus = "validating" | "valid" | "invalid";

const authService = new AuthService();
const ValidationConfirme: React.FC = () => {
const {loginSession} = useAuth();

  const { token } = useParams<{ token: string }>();

  const navigate = useNavigate();
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>("validating");

  useEffect(() => {
    if (!token) {
      setTokenStatus("invalid");
      toast.error("Lien de validation manquant ou invalide.");
      return;
    }

    const validateToken = async () => {
      try {
        const response = await authService.verifyValidationUser(token);
        console.log("success")
        if (response.status === 200) {
          setTokenStatus("valid");
          toast.success("Votre email a été confirmé avec succès!");
          loginSession();

          navigate("/informations-supplementaires");
        } else {
          setTokenStatus("invalid");
          toast.error("Le lien de confirmation est invalide ou expiré.");
        }
      } catch (error) {
        console.error("Erreur lors de la validation du token:", error);
        setTokenStatus("invalid");
        toast.error("Erreur serveur. Veuillez réessayer.");
      }
    };

    validateToken();
  }, [token]);




  return (
    <div className="p-6 text-center flex flex-col items-center justify-center min-h-screen">
      <Toast />
      {tokenStatus === "validating" && (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          <h2 className="text-2xl font-bold text-blue-600">Validation en cours...</h2>
          <p className="text-gray-700">Merci de patienter quelques instants.</p>
        </div>
      )}

      {tokenStatus === "valid" && (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-green-600">🎉 Compte confirmé !</h2>
          <p className="text-gray-700">Redirection vers la connexion...</p>
        </div>
      )}

      {tokenStatus === "invalid" && (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-red-600">❌ Validation échouée</h2>
          <p className="text-gray-700">Lien invalide ou expiré. Redirection...</p>
        </div>
      )}
    </div>
  );
};

export default ValidationConfirme;

