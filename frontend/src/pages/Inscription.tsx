import { useState } from "react";
import RoleSelector from "../components/RoleSelector";
import FormDoctorant from "../components/FormDoctorant";
import FormEtudiant from "../components/FormEtudiant";
import FormEnseignant from "../components/FormEnseignant";

type Role = "doctorant" | "etudiant" | "enseignant" | null;

export default function Inscription() {
  const [role, setRole] = useState<Role>(null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
      <RoleSelector onSelectRole={setRole} />
      <div className="mt-8">
        {role === "doctorant" && <FormDoctorant />}
        {role === "etudiant" && <FormEtudiant />}
        {role === "enseignant" && <FormEnseignant />}
      </div>
    </div>
  );
}
