import React from "react"
import { UseFormReturn } from "react-hook-form"
import { InscriptionFormData } from "../../schemas/inscriptionSchema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

interface TeacherResearcherFieldsProps {
    form: UseFormReturn<InscriptionFormData>
}

export const TeacherResearcherFields: React.FC<TeacherResearcherFieldsProps> = ({ form }) => {
    const grades = [
        { value: "Assistant", label: "Assistant" },
        { value: "MaitreAssistant", label: "Maître Assistant" },
        { value: "MaitreDeConference", label: "Maître de Conférences" },
        { value: "Professeur", label: "Professeur" },
    ]

    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Grade</FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                name={field.name}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {grades.map((grade) => (
                                        <SelectItem key={grade.value} value={grade.value}>
                                            {grade.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
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