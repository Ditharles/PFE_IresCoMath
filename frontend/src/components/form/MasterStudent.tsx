"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { SpecificFieldsProps } from "../../types/common"

import { Loader2 } from "lucide-react"
import InputField from "./InputField"
import api from "../../api/axios"

const MasterStudent: React.FC<SpecificFieldsProps> = ({ data, onChange }) => {
  const [enseignants, setEnseignants] = useState<Array<{
    id: string;
    lastName: string;
    firstName: string;
    position: string;
    grade: string;
  }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const fields = [
    { label: "Institution", id: "institution", type: "text", required: true },
    { label: "Année de master", id: "masterYear", type: "number", required: true },

  ]

  useEffect(() => {
    const fetchEnseignants = async () => {
      setIsLoading(true)
      setError("")

      try {
        const response = await api.get("/teachers-researchers")
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
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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

      <div>
        <label htmlFor="supervisorId" className="block text-sm font-medium text-gray-700 mb-1">
          Encadrant (Enseignant-Chercheur)
        </label>
        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error}
          </div>
        )}
        {isLoading ? (
          <div className="flex items-center space-x-2 py-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <span className="text-sm text-gray-500">Chargement des enseignants-chercheurs...</span>
          </div>
        ) : (
          <select
            id="supervisorId"
            name="supervisorId"
            value={data.supervisorId ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-background"
            required
          >
            <option value="">Sélectionner un encadrant</option>
            {enseignants.map((enseignant) => (
              <option key={enseignant.id} value={enseignant.id}>
                {enseignant.lastName} {enseignant.firstName} ({enseignant.position})
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}

export default MasterStudent