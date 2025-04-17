import { useState } from "react";
import axios from "axios";
import RoleSelector from "../components/RoleSelector";
import FormDoctorant from "../components/FormDoctorant";
import FormEtudiant from "../components/FormEtudiant";
import FormEnseignant from "../components/FormEnseignant";
import { BaseSpecificFields, Role } from '../types/common';
export default function Inscription() {
  const [role, setRole] = useState<Role>(null);
  const [commonFields, setCommonFields] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    cin: "",
  });

  const [message,setMessage] = useState<string>("");
  const [specificFields, setSpecificFields] = useState<BaseSpecificFields & { [key: string]: any }>({
    photo: null,
    encadrant: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChangeCommon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommonFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Add common fields
    Object.entries(commonFields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // Add role
    formData.append('role', role || '');
    
    // Add specific fields
    Object.entries(specificFields).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const endpoint = `${process.env.BACKEND_API!}/auth/request-${role}`;
      await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'application/json',

        },
      });
      setStatus("success");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setStatus("error");
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message || "Une erreur est survenue.");
      } else {
        setMessage("Une erreur est survenue.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Inscription</h1>

        {status === "success" && (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
            ✅ Inscription réussie ! Veuillez attendre la validation de votre compte.
          </div>
        )}
        {status === "error" && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
            ❌ {message}
          </div>

        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={commonFields.nom}
              onChange={handleChangeCommon}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={commonFields.prenom}
              onChange={handleChangeCommon}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              name="telephone"
              placeholder="Téléphone"
              value={commonFields.telephone}
              onChange={handleChangeCommon}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={commonFields.email}
              onChange={handleChangeCommon}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <input
            type="text"
            name="cin"
            placeholder="CIN"
            value={commonFields.cin}
            onChange={handleChangeCommon}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />

          <div className="py-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Sélectionnez votre rôle</h2>
            <RoleSelector onSelectRole={setRole} />
          </div>

          {role && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Informations supplémentaires</h2>
              {role === "doctorant" && (
                <FormDoctorant data={specificFields} onChange={(data) => setSpecificFields((prev) => ({ ...prev, ...data }))} />
              )}
              {role === "master" && (
                <FormEtudiant
                  data={specificFields}
                  onChange={(data) =>
                    setSpecificFields((prev) => ({ ...prev, ...data }))
                  }
                />
              )}
              {role === "enseignant" && (
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
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                S'inscrire
              </button>
              <button
                type="reset"
                onClick={() => {
                  setCommonFields({
                    nom: "",
                    prenom: "",
                    telephone: "",
                    email: "",
                    cin: "",
                  });
                  setSpecificFields({ photo: null, encadrant: "" });
                  setStatus("idle");
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
}