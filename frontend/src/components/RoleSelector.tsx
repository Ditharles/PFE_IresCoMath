interface Props {
    onSelectRole: (role: "doctorant" | "etudiant" | "enseignant") => void;
  }
  
  export default function RoleSelector({ onSelectRole }: Props) {
    return (
      <div className="flex gap-4 justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onSelectRole("doctorant")}
        >
          Doctorant
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => onSelectRole("etudiant")}
        >
          Étudiant
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() => onSelectRole("enseignant")}
        >
          Enseignant Chercheur
        </button>
      </div>
    );
  }
  