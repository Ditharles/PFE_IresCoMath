import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import { useAuth } from "../../contexts/AuthContext";
import AuthService from "../../services/auth.service";
import { toast } from "react-toastify";

const AdditionalInfo = () => {
  const { loginSession } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
    rib: "",
    signature: null as File | null,
  });
  const authService = new AuthService();
  useEffect(() => {
    loginSession();
  })
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
      const response = await authService.submitAdditionalInfo(form);
      toast.success(response?.data?.message);
      setTimeout(() => {
        navigate("/accueil");
      }, 2000);

    } catch (err) {
      console.error("Erreur lors de la validation du compte :", err);
    }
  };

  const handleProfilePhotoUpdate = useCallback((photoLink: string) => {
    setForm((prev) => ({
      ...prev,
      photo: photoLink
    }));

  }, []);
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
        <FileUpload
          endpoint="signature"
          headerText="Téléchargez votre signature"
          subHeaderText="Formats acceptés : JPG, PNG"
          maxFiles={1}
          onFileUploaded={handleProfilePhotoUpdate}
        />
        <button type="submit" className="btn-primary w-full">
          Continuer
        </button>
      </form>
    </div>
  );
};

export default AdditionalInfo;
