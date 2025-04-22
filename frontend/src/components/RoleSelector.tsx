
import type React from "react"
import type { Role } from "../types/common"
import { UserIcon, GraduationCap, BookOpen } from "lucide-react"

interface RoleSelectorProps {
  onSelectRole: (role: Role) => void
  activeRole: Role
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole, activeRole }) => {
  const roles = [
    {
      id: "DOCTORANT",
      label: "Doctorant",
      icon: <GraduationCap className="w-8 h-8 mb-2 text-blue-600" />,
    },
    {
      id: "MASTER",
      label: "Étudiant en Master",
      icon: <BookOpen className="w-8 h-8 mb-2 text-blue-600" />,
    },
    {
      id: "ENSEIGNANT",
      label: "Enseignant chercheur",
      icon: <UserIcon className="w-8 h-8 mb-2 text-blue-600" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {roles.map((role) => (
        <button
          key={role.id}
          type="button"
          onClick={() => onSelectRole(role.id as Role)}
          className={`flex flex-col items-center p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all ${activeRole === role.id ? "border-blue-500 bg-blue-50" : ""
            }`}
          aria-pressed={activeRole === role.id}
          aria-label={`Sélectionner le rôle ${role.label}`}
        >
          {role.icon}
          <span>{role.label}</span>
        </button>
      ))}
    </div>
  )
}

export default RoleSelector
