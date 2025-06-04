import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import AuthService from "../../services/auth.service";
import { Loader2 } from "lucide-react";

type TokenStatus = "validating" | "valid" | "invalid";

const authService = new AuthService();
const ValidationConfirme: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>("validating");

  let isCalled = false;
  useEffect(() => {

    if (!token) {
      setTokenStatus("invalid");
      toast.error("Lien de validation manquant ou invalide.");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
      return;
    }

    const validateToken = async () => {
      if (isCalled) return;
      isCalled = true;

      try {
        const response = await authService.verifyValidationUser(token);
        if (response.data && response.data.tempToken) {
          setTokenStatus("valid");
          toast.success("Votre compte a été confirmé avec succès !");
          navigate("/informations-supplementaires", {
            state: { tempToken: response.data.tempToken },
            replace: true
          });
        } else {
          throw new Error("Réponse invalide du serveur");
        }
      } catch (error: any) {
        console.error("Erreur lors de la validation du token:", error);
        setTokenStatus("invalid");
        toast.error(error.response?.data?.message || "Le lien de confirmation est invalide ou expiré.");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    };

    validateToken();
  }, [token, navigate]);

  return (
    <div className="p-6 text-center flex flex-col items-center justify-center min-h-screen">
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
          <p className="text-gray-700">Préparation de votre espace personnel...</p>
        </div>
      )}

      {tokenStatus === "invalid" && (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-red-600">❌ Validation échouée</h2>
          <p className="text-gray-700">Lien invalide ou expiré. Redirection vers la connexion...</p>
        </div>
      )}
    </div>
  );
};

export default ValidationConfirme;
