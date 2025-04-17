import React from 'react';
import { SpecificFieldsProps } from '../types/common';

const FormEtudiant: React.FC<SpecificFieldsProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onChange({ ...data, photo: e.target.files[0] });
    }
  };

  return (
    <div className="space-y-4">
      <input
      name="etablissement"
      placeholder="Établissement"
      value={data.etablissement || ""}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
      required
      />
      <select
      name="encadrant"
      value={data.encadrant || ""}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
      required
      >
      <option value="">Sélectionner un encadrant</option>
      <option value="Dr. Haifa Touati">Dr. Haifa Touati</option>
      <option value="Dr. Mahmoud Ltaief">Dr. Mahmoud Ltaief</option>
      <option value="Dr. Ridha">Dr. Ridha</option>
      <option value="Dr. Mohamed Belhassen">Dr. Mohamed Belhassen</option>
      <option value="Dr. Fethi Mguis">Dr. fethi Mguis</option>
      <option value="Dr.Eya Ben Charrada">Dr. Eya Ben charrada</option>
      </select>

      <input
      type="file"
      accept="image/*"
      name="photo"
      onChange={handlePhotoUpload}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      required
      />
    </div>
  );
};

export default FormEtudiant;