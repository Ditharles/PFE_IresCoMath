import type React from "react"
import type { SpecificFieldsProps } from "../../../src/types/common"
import InputField from "./InputField"

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

  const fields = [
    { label: "Fonction", id: "fonction", type: "text" },
    { label: "Établissement", id: "etablissement", type: "text" },
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
          value={data.grade ?? ""}
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

      {fields.map((field) => (
        <div key={field.id}>
          <InputField label={field.label} id={field.id} value={data[field.id] ?? ""} onChange={handleChange} />

        </div>
      ))}


    </div>
  )
}

export default FormEnseignant
