import React, {
    useState,
    useMemo,
    useCallback,
    FormEvent,
    ChangeEvent,
} from "react";
import axios from "axios";
import { Mail, Loader2, Send, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import AuthService from "../../services/auth.service";

const ResendEmail = () => {
    const authService = useMemo(() => new AuthService(), []);
    const token: string = localStorage.getItem("temptoken") || "";

    const [email, setEmail] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>("");
    const [tokenExpired, setTokenExpired] = useState<boolean>(!token); // initial state
    const showEmailInput = useMemo(() => !token || tokenExpired, [token, tokenExpired]);

    const validateEmail = useCallback((email: string): boolean => {
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
    }, []);

    const handleEmailChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            if (email) validateEmail(e.target.value);
        },
        [email, validateEmail]
    );

    const handleResendConfirmation = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (showEmailInput && !validateEmail(email)) return;

            setIsSubmitting(true);
            try {
                const response = showEmailInput
                    ? await authService.resendConfirmationEmailWithEmail(email)
                    : await authService.resendConfirmationEmail(token);
                toast.success(response.data.message);
            } catch (error) {
                handleError(error);
            } finally {
                setIsSubmitting(false);
            }
        },
        [showEmailInput, email, token, authService, validateEmail]
    );

    const handleTokenExpired = useCallback(() => {
        toast.warning(
            "Votre lien de confirmation a expiré. Veuillez saisir votre email pour recevoir un nouveau lien."
        );
        setTokenExpired(true);
        localStorage.removeItem("temptoken");
    }, []);

    const handleError = useCallback(
        (error: unknown) => {
            console.error("Erreur lors de la demande d'un nouveau lien de confirmation:", error);

            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                switch (status) {
                    case 404:
                        toast.error("Aucun compte n'est associé à cette adresse email.");
                        break;
                    case 429:
                        toast.warning("Trop de tentatives. Veuillez réessayer plus tard.");
                        break;
                    case 410:
                        handleTokenExpired();
                        break;
                    case 400:
                    case 401:
                    case 403:
                        toast.warning("Le lien de confirmation est invalide ou a expiré. Veuillez saisir votre email.");
                        handleTokenExpired(); // même traitement que 410
                        break;
                    default:
                        toast.error("Une erreur est survenue lors de l'envoi du nouveau lien de confirmation.");
                }
            } else {
                toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
            }
        },
        [handleTokenExpired]
    );

    return (
        <div className="min-h-screen flex items-center justify-center py-12">
            <div className="max-w-md w-full bg-background rounded-xl shadow-lg p-8">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-blue-100 p-3">
                        <Mail className="w-12 h-12 text-blue-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-4 text-center">
                    Vous avez perdu votre lien de confirmation ?
                </h1>

                <p className="text-gray-600 mb-6 text-center">
                    {tokenExpired
                        ? "Votre lien de confirmation a expiré. Veuillez saisir votre adresse email pour recevoir un nouveau lien."
                        : showEmailInput
                            ? "Veuillez saisir votre adresse email pour recevoir un lien de confirmation."
                            : "Cliquez sur le bouton ci-dessous pour recevoir un nouveau lien de confirmation à l'adresse email que vous avez utilisée lors de l'inscription."}
                </p>

                <form onSubmit={handleResendConfirmation} className="mb-6">
                    {showEmailInput && (
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 text-left mb-1"
                            >
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
                            {emailError && (
                                <p className="mt-1 text-sm text-red-600 text-left">{emailError}</p>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-accent py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                Envoi en cours...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Envoyer le lien de confirmation
                            </>
                        )}
                    </button>
                </form>

                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                            Vérifiez votre dossier de spam si vous ne recevez pas l'email.
                        </span>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/login"
                                className="text-blue-600 hover:text-blue-800 transition-colors font-medium text-center"
                            >
                                Se connecter
                            </Link>
                            <Link
                                to="/"
                                className="text-gray-600 hover:text-gray-800 transition-colors text-center"
                            >
                                Retour à l'accueil
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResendEmail;
