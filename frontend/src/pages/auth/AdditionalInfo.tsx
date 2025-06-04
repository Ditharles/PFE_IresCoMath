import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import FileUpload from "../../components/FileUpload";
import InputField from "../../components/form/InputField";
import AuthService from "../../services/auth.service";

const AdditionalInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    bankData: "",
    signature: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSignatureUpload = (url: string[] | string) => {
    if (Array.isArray(url))
      setForm((prev) => ({
        ...prev,
        signature: url[0],
      }));
    else
      setForm((prev) => ({
        ...prev,
        signature: url,
      }));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tempToken = location.state?.tempToken;
      if (!tempToken) {
        throw new Error("Token temporaire manquant");
      }

      const response = await new AuthService().submitAdditionalInfo(form, tempToken);

      toast.success(response.data.message || "Informations supplémentaires validées avec succès !");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-background p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Finalisation de votre compte
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
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