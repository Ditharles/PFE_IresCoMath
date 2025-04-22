import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import RoleSelector from "../components/RoleSelector";
import FormDoctorant from "../components/FormDoctorant";
import FormEtudiant from "../components/FormEtudiant";
import FormEnseignant from "../components/FormEnseignant";
import type { BaseSpecificFields, Role } from "../types/common";
import LoadingOverlay from "../components/LoadingOverlay";
import { Toast, toast } from "../components/Toast";

const Inscription: React.FC = () => {
  const [role, setRole] = useState<Role>("");
  const [commonFields, setCommonFields] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    cin: "",
  });

  const [specificFields, setSpecificFields] = useState<BaseSpecificFields & { [key: string]: any }>({
    photo: null,
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;

    if (status === "success") {
      redirectTimer = setTimeout(() => {
        navigate("/resend-confirmation-email");
      }, 3000);
    }

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [status, navigate]);

  const handleChangeCommon = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommonFields((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setCommonFields({
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      cin: "",
    });
    setSpecificFields({ photo: null });
    setStatus("idle");
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    // Validate form data
    if (!role) {
      toast.warning("Veuillez sélectionner un rôle avant de soumettre le formulaire.");
      setLoading(false);
      return;
    }

    // Create data object for API request
    const requestData = {
      ...commonFields,
      role,
      ...specificFields,
    };

    try {
      const response = await authService.register(requestData, role);
      setStatus("success");
      localStorage.setItem("temptoken", response.data.tempToken)
      toast.success("Inscription réussie ! Vous allez être redirigé vers la page de confirmation.");
    } catch (error) {
      setStatus("error");
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Une erreur inattendue s'est produite.");
      }
    } finally {
      setLoading(false);
    }
  }, [role, commonFields, specificFields, authService]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      {/* Toast container */}
      <Toast />
      {loading && <LoadingOverlay loadingText="Traitement en cours..." />}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 relative">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Inscription</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                id="nom"
                type="text"
                name="nom"
                placeholder="Votre nom"
                value={commonFields.nom}
                onChange={handleChangeCommon}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                id="prenom"
                type="text"
                name="prenom"
                placeholder="Votre prénom"
                value={commonFields.prenom}
                onChange={handleChangeCommon}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                id="telephone"
                type="tel"
                name="telephone"
                placeholder="Votre numéro de téléphone"
                value={commonFields.telephone}
                onChange={handleChangeCommon}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Votre adresse email"
                value={commonFields.email}
                onChange={handleChangeCommon}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="cin" className="block text-sm font-medium text-gray-700 mb-1">
              CIN
            </label>
            <input
              id="cin"
              type="text"
              name="cin"
              placeholder="Votre numéro de CIN"
              value={commonFields.cin}
              onChange={handleChangeCommon}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div className="py-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Sélectionnez votre rôle</h2>
            <RoleSelector
              onSelectRole={(selectedRole) => {
                setRole(selectedRole);
              }}
              activeRole={role}
            />
          </div>

          {role && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Informations supplémentaires</h2>
              {role === "DOCTORANT" && (
                <FormDoctorant
                  data={specificFields}
                  onChange={(data) => setSpecificFields((prev) => ({ ...prev, ...data }))}
                />
              )}
              {role === "MASTER" && (
                <FormEtudiant
                  data={specificFields}
                  onChange={(data) => setSpecificFields((prev) => ({ ...prev, ...data }))}
                />
              )}
              {role === "ENSEIGNANT" && (
                <FormEnseignant
                  data={specificFields}
                  onChange={(data) => setSpecificFields((prev) => ({ ...prev, ...data }))}
                />
              )}
            </div>
          )}

          {role && (
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Traitement en cours..." : "S'inscrire"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  toast.info("Le formulaire a été réinitialisé.");
                }}
                className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Inscription;
