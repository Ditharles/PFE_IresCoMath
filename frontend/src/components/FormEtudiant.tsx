import { useState } from "react";
import axios from "axios";

export default function FormEtudiant() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    cin: "",
    dateNaissance: "",
    encadrant: "",
    document: null as File | null,
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "file" && files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value as string | Blob);
    });

    try {
      await axios.post("/api/inscription-etudiant", data);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <>
      {status === "success" && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          ✅ Inscription réussie ! Veuillez attendre la validation de votre compte.
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          ❌ Une erreur est survenue. Veuillez réessayer.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        onReset={() => setFormData({
          nom: "",
          prenom: "",
          email: "",
          cin: "",
          dateNaissance: "",
          encadrant: "",
          document: null,
        })}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="cin"
          placeholder="CIN"
          value={formData.cin}
          onChange={handleChange}
          className="input"
        />
        <input
          type="date"
          name="dateNaissance"
          value={formData.dateNaissance}
          onChange={handleChange}
          className="input"
        />
        <select
          name="encadrant"
          value={formData.encadrant}
          onChange={handleChange}
          className="input"
        >
          <option value="">-- Encadrant --</option>
          <option>Dr. Saïd</option>
          <option>Pr. Khadija</option>
        </select>

        <input
          type="file"
          name="document"
          accept="image/*"
          onChange={handleChange}
          className="col-span-full file:input"
        />

        <div className="flex gap-4 col-span-full justify-center mt-4">
          <button type="submit" className="btn-primary">
            Soumettre
          </button>
          <button type="reset" className="btn-secondary">
            Réinitialiser
          </button>
        </div>
      </form>
    </>
  );
}
