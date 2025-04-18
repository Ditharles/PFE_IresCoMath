"use client"

import type React from "react"
import type { SpecificFieldsProps } from "../types/common"

const FormEnseignant: React.FC<SpecificFieldsProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const grades = [
    { value: "Assistant", label: "Assistant" },
    { value: "MaitreAssistant", label: "Maître Assistant" },
    { value: "MaitreDeConference", label: "Maître de conférence" },
    { value: "Professeur", label: "Professeur" },
  ]

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
          Grade
        </label>
        <select
          id="grade"
          name="grade"
          value={data.grade || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
          required
        >
          <option value="">Sélectionner un grade</option>
          {grades.map((grade) => (
            <option key={grade.value} value={grade.value}>
              {grade.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="fonction" className="block text-sm font-medium text-gray-700 mb-1">
          Fonction
        </label>
        <input
          id="fonction"
          type="text"
          name="fonction"
          placeholder="Votre fonction"
          value={data.fonction || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div>
        <label htmlFor="etablissement" className="block text-sm font-medium text-gray-700 mb-1">
          Établissement
        </label>
        <input
          id="etablissement"
          type="text"
          name="etablissement"
          placeholder="Nom de l'établissement"
          value={data.etablissement || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>
    </div>
  )
}

export default FormEnseignant
