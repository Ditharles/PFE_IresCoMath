import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Validation = () => {
  const navigate = useNavigate(); // Hook pour rediriger
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
    rib: "",
    signature: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO : Valider et envoyer les données au backend ici
      console.log(form);

      // 🔁 Redirection vers la confirmation finale
      navigate("/validation-confirmee");
    } catch (err) {
      console.error("Erreur lors de la validation du compte :", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">
        Validation du compte
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          className="input"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="rib"
          placeholder="Données bancaires"
          onChange={handleChange}
          className="input"
        />
        <input
          type="file"
          name="signature"
          accept="image/*"
          onChange={handleChange}
          className="file:input"
        />
        <button type="submit" className="btn-primary w-full">
          Continuer
        </button>
      </form>
    </div>
  );
};

export default Validation;
