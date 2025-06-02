import type React from "react"
import type { SpecificFieldsProps } from "../../types/common"
import InputField from "./InputField"

const TeacherResearcher: React.FC<SpecificFieldsProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const grades = [
    { value: "Assistant", label: "Assistant" },
    { value: "MaitreAssistant", label: "Maître Assistant" },
    { value: "MaitreDeConference", label: "Maître de Conférences" },
    { value: "Professeur", label: "Professeur" },
  ]

  const fields = [
    { label: "Position", id: "position", type: "text" },
    { label: "Institution", id: "institution", type: "text", required: true },

  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            Grade
          </label>
          <select
            id="grade"
            name="grade"
            value={data.grade ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-background"
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
          <InputField
            key={field.id}
            label={field.label}
            id={field.id}
            type={field.type}
            value={data[field.id] ?? ""}
            onChange={handleChange}
            required={field.required !== false}
          />
        ))}
      </div>
    </div>
  )
}

export default TeacherResearcher