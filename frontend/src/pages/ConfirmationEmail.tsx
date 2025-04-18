import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { CheckCircle, AlertCircle, Mail, Loader2 } from "lucide-react";
import { Toast, toast } from "../components/Toast";

type TokenStatus = "validating" | "valid" | "invalid" | "expired";

export default function ConfirmationEmail() {
  const params = useParams();
  const token = params.token as string;

  const [tokenStatus, setTokenStatus] = useState<TokenStatus>("validating");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      if (!params || !token) {
        setTokenStatus("invalid");
        return;
      }

      try {
        const endpoint = `http://localhost:8000/auth/confirm-request/${token}`;
        const response = await axios.get(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Check response status or specific fields to determine token validity
        if (response.data.status === "success") {
          setTokenStatus("valid");
          toast.success("Votre email a été confirmé avec succès!");
        } else {
          setTokenStatus("invalid");
          toast.error("Le lien de confirmation est invalide ou expiré.");
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setTokenStatus("invalid");
        toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
      }
    };

    validateToken();
  }, [token, params]);

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("L'email est requis");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Format d'email invalide");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  // Request new confirmation email
  const handleResendConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = "http://localhost:8000/auth/resend-confirmation";
      const response: AxiosResponse = await axios.post(
        endpoint,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Un nouveau lien de confirmation a été envoyé à votre adresse email.");
    } catch (error) {
      console.error("Error requesting new confirmation email:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          toast.error("Aucun compte n'est associé à cette adresse email.");
        } else if (error.response?.status === 429) {
          toast.warning("Trop de tentatives. Veuillez réessayer plus tard.");
        } else {
          toast.error("Une erreur est survenue lors de l'envoi du nouveau lien de confirmation.");
        }
      } else {
        toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render different content based on token status
  const renderContent = () => {
    switch (tokenStatus) {
      case "validating":
        return (
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Validation en cours...</h1>
            <p className="text-gray-600">Nous vérifions votre lien de confirmation. Veuillez patienter.</p>
          </div>
        );

      case "valid":
        return (
          <>
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4 text-gray-900">Email confirmé avec succès !</h1>

            <p className="text-gray-600 mb-8">
              Votre adresse email a été confirmée. Votre compte est en cours d'examen par un administrateur. Vous
              recevrez une notification dès que votre compte sera activé.
            </p>

            <div className="flex flex-col space-y-4">
              <Link
                to="/login"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Se connecter
              </Link>

              <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                Retour à l'accueil
              </Link>
            </div>
          </>
        );
      case "invalid":
        return (
          <>
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-amber-100 p-3">
                <AlertCircle className="w-12 h-12 text-amber-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4 text-gray-900">
              Lien expiré ou invalide
            </h1>

            <p className="text-gray-600 mb-6">
              Le lien de confirmation est invalide, expiré ou a déjà été utilisé. Veuillez demander un nouveau lien en saisissant votre adresse email ci-dessous.
            </p>

            <form onSubmit={handleResendConfirmation} className="mb-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left mb-1">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full pl-10 pr-4 py-2 border ${emailError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                    required
                  />
                </div>
                {emailError && <p className="mt-1 text-sm text-red-600 text-left">{emailError}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer un nouveau lien"
                )}
              </button>
            </form>

            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                Retour à l'accueil
              </Link>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <Toast />
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">{renderContent()}</div>
    </div>
  );
}
