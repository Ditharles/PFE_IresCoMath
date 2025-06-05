import React from "react"
import { useNavigate } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import FileUpload from "../../components/FileUpload"
import { DoctorantStudentFields } from "../../components/form/DoctorantStudentFields"
import { MasterStudentFields } from "../../components/form/MasterStudentFields"
import RoleSelector from "../../components/form/RoleSelector"
import { TeacherResearcherFields } from "../../components/form/TeacherResearcherFields"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { InscriptionFormData, inscriptionSchema } from "../../schemas/inscriptionSchema"
import AuthService from "../../services/auth.service"
import { Role } from "../../types/common"

type InscriptionRole = "DOCTORANT" | "MASTER" | "ENSEIGNANT"

const Inscription: React.FC = () => {
  const navigate = useNavigate()
  const [role, setRole] = React.useState<InscriptionRole | null>(null)
  const [loading, setLoading] = React.useState(false)

  const methods = useForm<InscriptionFormData>({
    resolver: zodResolver(inscriptionSchema),
    mode: "onBlur",
    defaultValues: {
      lastName: "",
      firstName: "",
      phone: "",
      email: "",
      cin: "",
      password: "",
      photo: null,
      role: undefined
    },
  })

  // Mettre à jour le rôle dans le formulaire quand il change
  React.useEffect(() => {
    if (role) {
      methods.setValue("role", role)
    }
  }, [role, methods])

  const onSubmit = async (data: InscriptionFormData) => {
    if (!role) {
      toast.warning("Veuillez sélectionner un rôle avant de soumettre le formulaire.")
      return
    }

    setLoading(true)
    try {
      console.log("Données du formulaire:", data)
      console.log("Rôle sélectionné:", role)

      const formData = {
        ...data,
        role: role
      }

      
      const authService = new AuthService()
     
      const response = await authService.register(formData, role)
      console.log("Réponse reçue:", response)

      if (response.data?.tempToken) {
        localStorage.setItem("temptoken", response.data.tempToken)
        toast.success("Inscription réussie ! Vous allez être redirigé vers la page de confirmation.")
        navigate("/resend-confirmation-email")
      } else {
        throw new Error("Token temporaire non reçu")
      }
    } catch (error: unknown) {
      console.error("Erreur détaillée lors de l'inscription:", error)
      const errorMessage = error instanceof Error ? error.response.data.message : "Une erreur inattendue s'est produite."
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={methods.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={methods.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={methods.control}
                name="cin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CIN</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Sélectionnez votre rôle</h2>
                <RoleSelector
                  onSelectRole={(newRole) => {
                    if (newRole === "DOCTORANT" || newRole === "MASTER" || newRole === "ENSEIGNANT") {
                      setRole(newRole)
                    }
                  }}
                  activeRole={role ?? ""}
                />
                {!role && methods.formState.errors.role && (
                  <p className="text-red-500 text-sm mt-2">Veuillez sélectionner un rôle</p>
                )}
              </div>

              {role && (
                <div className="border-t pt-6">
                  <h2 className="text-lg font-semibold mb-4">Informations supplémentaires</h2>
                  {role === "DOCTORANT" && <DoctorantStudentFields form={methods} />}
                  {role === "MASTER" && <MasterStudentFields form={methods} />}
                  {role === "ENSEIGNANT" && <TeacherResearcherFields form={methods} />}
                </div>
              )}

              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Photo de profil</h2>
                <FormField
                  control={methods.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="profilePicture"
                          maxFiles={1}
                          onFileUploaded={(urls) => {
                            console.log("URL de la photo reçue:", urls[0])
                            field.onChange(urls[0])
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              {role && (
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => methods.reset()}
                    disabled={loading}
                  >
                    Réinitialiser
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Traitement en cours..." : "S'inscrire"}
                  </Button>
                </div>
              )}
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}

export default Inscription