import React from 'react';
import { SpecificFieldsProps } from '../types/common';

const FormEnseignant: React.FC<SpecificFieldsProps> = ({ data, onChange }) => {
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
      <select
        name="grade"
        value={data.grade || ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
        required
      >
        <option value="">Sélectionner un grade</option>
        <option value="PA"> Assistant</option>
        <option value="PH">Maître Assistant</option>
        <option value="PH"> Maître de conférence </option>
        <option value="PES">Professeur </option>
       
 


      </select>

      <input
        type="text"
        name="specialite"
        placeholder="Spécialité"
        value={data.specialite || ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        required
      />
      <input
        type="text"
        name="département"
        placeholder="département"
        value={data.département || ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        required
      />

      <input
        type="file"
        accept="image/*"
        name="photo"
        onChange={handlePhotoUpload}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default FormEnseignant;