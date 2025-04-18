"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { SpecificFieldsProps } from "../types/common"
import axios from "axios"
import { Loader2 } from "lucide-react"

const FormEtudiant: React.FC<SpecificFieldsProps> = ({ data, onChange }) => {
  const [enseignants, setEnseignants] = useState<Array<{ id: string; nom: string; prenom: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="etablissement" className="block text-sm font-medium text-gray-700 mb-1">
          Établissement
        </label>
        <input
          id="etablissement"
          name="etablissement"
          placeholder="Nom de l'établissement"
          value={data.etablissement || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div>
        <label htmlFor="annee_master" className="block text-sm font-medium text-gray-700 mb-1">
          Année de master
        </label>
        <input
          id="annee_master"
          name="annee_master"
          type="number"
          placeholder="Année de master"
          value={data.annee_master || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          required
          min="1"
          max="2"
        />
      </div>

      <div>
        <label htmlFor="encadrant" className="block text-sm font-medium text-gray-700 mb-1">
          Encadrant
        </label>
        {isLoading ? (
          <div className="flex items-center space-x-2 py-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <span className="text-sm text-gray-500">Chargement des enseignants...</span>
          </div>
        ) : error ? (
          <div className="text-sm text-red-500 py-2">{error}</div>
        ) : (
          <select
            id="encadrant"
            name="encadrant"
            value={data.encadrant || ""}
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
