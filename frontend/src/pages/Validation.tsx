import React, { useState } from "react";

const Validation = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Envoyer les données à ton backend
    console.log(form);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Validation du compte</h2>
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
