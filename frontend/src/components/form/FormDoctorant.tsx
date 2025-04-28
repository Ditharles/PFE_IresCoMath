import type React from "react"
import { useEffect, useState } from "react"
import type { SpecificFieldsProps } from "../../../src/types/common"
import axios from "axios"
import { Loader2 } from "lucide-react"
import InputField from "./InputField"

const FormDoctorant: React.FC<SpecificFieldsProps> = ({ data, onChange }) => {
  const [enseignants, setEnseignants] = useState<Array<{ id: string; nom: string; prenom: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  useEffect(() => {
    const fetchEnseignants = async () => {
      setIsLoading(true)
      setError("")

      try {
        const response = await axios.get("http://localhost:8000/enseignants")
        setEnseignants(response.data)
      } catch (error) {
        setError("Erreur lors de la récupération des enseignants. Veuillez réessayer.")
        console.error("Erreur lors de la récupération des enseignants:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEnseignants()
  }, [])

  const fields = [
    { label: "Année de thèse", id: "annee_these", type: "number" },
    { label: "Établissement", id: "etablissement", type: "text" },
  ]

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <InputField
          key={field.id}
          label={field.label}
          id={field.id}
          type={field.type}
          value={data[field.id] ?? ""}
          onChange={handleChange}
        />
      ))}

      <div>
        <label htmlFor="directeur_these" className="block text-sm font-medium text-gray-700 mb-1">
          Directeur de thèse
        </label>
        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error}
          </div>
        )}
        {isLoading ? (
          <div className="flex items-center space-x-2 py-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <span className="text-sm text-gray-500">Chargement des enseignants...</span>
          </div>
        ) :
          <select
            id="directeur_these"
            name="directeur_these"
            value={data.directeur_these ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
            required
          >
            <option value="">Sélectionner votre directeur de thèse</option>
            {enseignants.map((enseignant) => (
              <option key={enseignant.id} value={enseignant.id}>
                {enseignant.nom} {enseignant.prenom}
              </option>
            ))}
          </select>
        }
      </div>
    </div>
  )
}

export default FormDoctorant
