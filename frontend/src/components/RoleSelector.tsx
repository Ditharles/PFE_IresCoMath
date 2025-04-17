import React from 'react';
import { Role } from '../types/common';
import { UserIcon, GraduationCap, BookOpen } from 'lucide-react';

interface RoleSelectorProps {
  onSelectRole: (role: Role) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        type="button"
        onClick={() => onSelectRole('doctorant')}
        className="flex flex-col items-center p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
      >
        <GraduationCap className="w-8 h-8 mb-2 text-blue-600" />
        <span>Doctorant</span>
      </button>
      <button
        type="button"
        onClick={() => onSelectRole('master')}
        className="flex flex-col items-center p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
      >
        <BookOpen className="w-8 h-8 mb-2 text-blue-600" />
        <span>Étudiant</span>
      </button>
      <button
        type="button"
        onClick={() => onSelectRole('enseignant')}
        className="flex flex-col items-center p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
      >
        <UserIcon className="w-8 h-8 mb-2 text-blue-600" />
        <span>Enseignant</span>
      </button>
    </div>
  );
};

export default RoleSelector;