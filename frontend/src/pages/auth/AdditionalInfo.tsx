import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import { useAuth } from "../../contexts/AuthContext";
import AuthService from "../../services/auth.service";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";

import InputField from "../../components/form/InputField";

const AdditionalInfo = () => {
  const { loginSession } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
    bankData: "",
    signature: null as string | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authService = new AuthService();

  useEffect(() => {
    loginSession();
  }, [loginSession]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignatureUpload = useCallback((fileUrl: string) => {
    setForm((prev) => ({
      ...prev,
      signature: fileUrl,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await authService.submitAdditionalInfo({
        password: form.password,
        bankData: form.bankData,
        signature: form.signature,
      });
      toast.success(response?.data?.message || "Compte validé avec succès");
      setTimeout(() => {
        navigate("/accueil");
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      console.error("Erreur lors de la validation du compte :", err);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Finalisation de votre compte
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>

            <InputField
              label="Mot de passe"
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required

            />
          </div>

          <div>

            <InputField
              label="Confirmer le mot de passe"
              type="password"
              id="confirmPassword"

              value={form.confirmPassword}
              onChange={handleChange}
              required

            />
          </div>

          <div>

            <InputField
              label="IBAN"
              type="text"
              id="bankData"


              value={form.bankData}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Signature numérique
            </label>
            <FileUpload
              endpoint="signature"
              headerText="Téléverser votre signature"
              subHeaderText="Formats acceptés: PNG, JPG (max 2MB)"
              maxFiles={1}
              acceptedTypes={["image/png", "image/jpeg"]}

              onFileUploaded={handleSignatureUpload}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !form.signature}
        >
          {isSubmitting ? "Validation en cours..." : "Finaliser mon compte"}
        </Button>
      </form>
    </div>
  );
};

export default AdditionalInfo;