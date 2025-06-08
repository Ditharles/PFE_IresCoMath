import React from "react"
import { UseFormReturn } from "react-hook-form"
import { InscriptionFormData } from "../../schemas/inscriptionSchema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import api from "../../api/axios"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

interface DoctorantStudentFieldsProps {
    form: UseFormReturn<InscriptionFormData>
}

export const DoctorantStudentFields: React.FC<DoctorantStudentFieldsProps> = ({ form }) => {
    const [enseignants, setEnseignants] = React.useState<Array<{
        id: string
        lastName: string
        firstName: string
        position: string
    }>>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    React.useEffect(() => {
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
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="thesisYear"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Année de thèse</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="thesisSupervisorId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Directeur de thèse</FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner votre directeur de thèse" />
                                </SelectTrigger>
                                <SelectContent>
                                    {enseignants.map((enseignant) => (
                                        <SelectItem key={enseignant.id} value={enseignant.id}>
                                            {enseignant.lastName} {enseignant.firstName} ({enseignant.position})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
} 