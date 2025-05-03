"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { SpecificFieldsProps } from "../../../src/types/common"
import axios from "axios"
import { Loader2 } from "lucide-react"
import InputField from "./InputField"


const FormEtudiant: React.FC<SpecificFieldsProps> = ({ data, onChange }) => {
  const [enseignants, setEnseignants] = useState<Array<{ id: string; nom: string; prenom: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const fields = [
    { label: "Établissement", id: "etablissement", type: "text" },
    { label: "Année de master", id: "annee_master", type: "number" },
  ]
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

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.id}>
          <InputField label={field.label} id={field.id} value={data[field.id] ?? ""} onChange={handleChange} type={field.type} />
        </div>
      ))}
      <div>
        <label htmlFor="encadrant" className="block text-sm font-medium text-gray-700 mb-1">
          Encadrant
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
        ) : (
          <select
            id="encadrant"
            name="encadrant"
            value={data.encadrant ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
            required
          >
            <option value="">Sélectionner un encadrant</option>
            {enseignants.map((enseignant) => (
              <option key={enseignant.id} value={enseignant.id}>
                {enseignant.nom} {enseignant.prenom}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}

export default FormEtudiant
