import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import RoleSelector from "../../components/form/RoleSelector";
import FormDoctorant from "../../components/form/FormDoctorant";
import FormEtudiant from "../../components/form/FormEtudiant";
import FormEnseignant from "../../components/form/FormEnseignant";
import type { BaseSpecificFields, CommonFields, Role } from "../../types/common";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Toast, toast } from "../../components/Toast";
import FileUpload from "../../components/FileUpload";
import InputField from "../../components/form/InputField";
import SubmitButtons from "../../components/form/SubmitButtons";

const Inscription: React.FC = () => {
  const [role, setRole] = useState<Role | null>(null);
  const [commonFields, setCommonFields] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    cin: ""
  });

  const [specificFields, setSpecificFields] = useState<BaseSpecificFields & { [key: string]: any }>({
    photo: null,
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);

  useEffect(() => {
    if (status === "success") {
      const redirectTimer = setTimeout(() => {
        navigate("/resend-confirmation-email");
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [status, navigate]);

  const handleChangeCommon = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommonFields((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleProfilePhotoUpdate = useCallback((photoLink: string) => {
    setSpecificFields((prev) => ({
      ...prev,
      photo: photoLink
    }));

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

    if (!role) {
      toast.warning("Veuillez sélectionner un rôle avant de soumettre le formulaire.");
      setLoading(false);
      return;
    }

    const requestData = { ...commonFields, role, ...specificFields };
    console.log(requestData);
    try {
      const response = await authService.register(requestData, role);
      setStatus("success");
      localStorage.setItem("temptoken", response.data.tempToken);
      toast.success("Inscription réussie ! Vous allez être redirigé vers la page de confirmation.");
    } catch (error: any) {
      setStatus("error");
      toast.error(error?.response?.data?.message || "Une erreur inattendue s'est produite.");
    } finally {
      setLoading(false);
    }
  }, [role, commonFields, specificFields, authService]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Toast />
      {loading && <LoadingOverlay loadingText="Traitement en cours..." />}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 relative">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Inscription</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CommonFieldsInputs commonFields={commonFields} handleChangeCommon={handleChangeCommon} />
          <RoleSelection role={role} setRole={setRole} />
          {role && (
            <AdditionalInfo
              role={role}
              specificFields={specificFields}
              setSpecificFields={setSpecificFields}
            />
          )}
          <ProfilePhotoUpload
            specificFields={specificFields}
            handleProfilePhotoUpdate={handleProfilePhotoUpdate}
          />
          {role && (
            <SubmitButtons loading={loading} resetForm={resetForm} />
          )}
        </form>
      </div>
    </div>
  );
};

const CommonFieldsInputs: React.FC<{ commonFields: CommonFields, handleChangeCommon: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ commonFields, handleChangeCommon }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Nom" id="nom" value={commonFields.nom} onChange={handleChangeCommon} />
      <InputField label="Prénom" id="prenom" value={commonFields.prenom} onChange={handleChangeCommon} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Téléphone" id="telephone" value={commonFields.telephone} onChange={handleChangeCommon} />
      <InputField label="Email" id="email" type="email" value={commonFields.email} onChange={handleChangeCommon} />
    </div>
    <InputField label="CIN" id="cin" value={commonFields.cin} onChange={handleChangeCommon} />
  </>
);



const RoleSelection = ({ role, setRole }) => (
  <div className="py-4">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">Sélectionnez votre rôle</h2>
    <RoleSelector onSelectRole={setRole} activeRole={role} />
  </div>
);

const AdditionalInfo = ({ role, specificFields, setSpecificFields }) => (
  <div className="border-t pt-6">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">Informations supplémentaires</h2>
    {role === "DOCTORANT" && <FormDoctorant data={specificFields} onChange={setSpecificFields} />}
    {role === "MASTER" && <FormEtudiant data={specificFields} onChange={setSpecificFields} />}
    {role === "ENSEIGNANT" && <FormEnseignant data={specificFields} onChange={setSpecificFields} />}
  </div>
);

const ProfilePhotoUpload = ({ specificFields, handleProfilePhotoUpdate }) => (
  <div className="py-4">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">Photo de profil</h2>
    <FileUpload
      endpoint="profilePicture"
      headerText="Téléchargez votre photo de profil"
      subHeaderText="Formats acceptés : JPG, PNG"
      maxFiles={1}
      onFileUploaded={handleProfilePhotoUpdate}
    />
    {specificFields.photo && (
      <div className="mt-2 text-sm text-green-600">
        {specificFields.photo.length} photo(s) téléchargée(s) avec succès
      </div>
    )}

  </div>
);


export default Inscription;
