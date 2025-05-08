import type React from "react"
import { useEffect, useState } from "react"
import type { SpecificFieldsProps } from "../../types/common"
import { Loader2 } from "lucide-react"
import InputField from "./InputField"
import api from "../../api/axios"

const DoctorantStudent: React.FC<SpecificFieldsProps> = ({ data, onChange }) => {
  const [enseignants, setEnseignants] = useState<Array<{
    id: string
    lastName: string
    firstName: string
    position: string
    grade: string
  }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const parsedValue = type === "number" ? Number(value) : value
    onChange({ ...data, [name]: parsedValue })
  }

  useEffect(() => {
    const fetchEnseignants = async () => {
      setIsLoading(true)
      setError("")

      try {
        const response = await api.get("teachers-researchers")
        setEnseignants(response.data)
      } catch (error) {
        setError("Erreur lors de la récupération des enseignants-chercheurs. Veuillez réessayer.")
        console.error("Erreur lors de la récupération des enseignants:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEnseignants()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Champ année de thèse */}
        <InputField
          key="thesisYear"
          label="Année de thèse"
          id="thesisYear"

          type="number"
          value={data["thesisYear"] ?? ""}
          onChange={handleChange}
          required
        />

        {/* Champ directeur de thèse */}
        <div className="flex flex-col">
          <label htmlFor="thesisSupervisorId" className="text-sm font-medium text-gray-700 mb-1">
            Directeur de thèse
          </label>

          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}

          {isLoading ? (
            <div className="flex items-center space-x-2 py-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              <span className="text-sm text-gray-500">Chargement des enseignants-chercheurs...</span>
            </div>
          ) : (
            <select
              id="thesisSupervisorId"
              name="thesisSupervisorId"
              value={data.thesisSupervisorId ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              required
            >
              <option value="">Sélectionner votre directeur de thèse</option>
              {enseignants.map((enseignant) => (
                <option key={enseignant.id} value={enseignant.id}>
                  {enseignant.lastName} {enseignant.firstName} ({enseignant.position}, {enseignant.grade})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorantStudent