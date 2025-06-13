import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { toast } from "sonner";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

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
      toast.success(response!.data.message);
      login();
      setTimeout(() => {
        navigate("/accueil");
      }, 3000);
    } catch (error: any) {
      if (error.response?.data?.type === "REQUEST_PENDING") {
        toast.warning("Votre demande d'adhésion est en cours de traitement. Veuillez patienter.");
      } else if (error.response?.data?.type === "REQUEST_REJECTED") {
        toast.error(`Votre demande d'adhésion a été rejetée. Raison: ${error.response.data.message}`);
      } else if (error.response?.data?.type === "REQUEST_APPROVED") {
        toast.info("Votre demande d'adhésion a été approuvée. Veuillez vérifier votre email pour activer votre compte.");
      } else {
        toast.error(error.response?.data?.message || "Une erreur s'est produite lors de la connexion.");
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-background/50 to-background/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/accueil")}
            className="flex items-center gap-2 px-0 hover:bg-transparent">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Retour</span>
          </Button>
        </div>

        <div className="bg-card shadow-2xl rounded-2xl p-8 relative">
          {isSubmitting && (
            <LoadingOverlay
              loadingText="Connexion en cours..."
              spinnerSize={24}
              overlayOpacity={0.7}
              showSpinner={true}
              showProgressBar={false}
            />
          )}

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-primary">Connexion</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background text-foreground"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background text-foreground"
                required
                autoComplete="current-password"
              />
              <div className="text-right pt-1">
                <Link
                  to="/password-forget"
                  className="text-primary hover:text-primary/80 text-sm">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium">
              Se connecter
            </button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Pas encore de compte?{" "}
              <Link
                to="/inscription"
                className="text-primary hover:text-primary/80 font-medium">
                Créer un compte
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;