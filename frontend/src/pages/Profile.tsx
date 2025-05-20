import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../contexts/AuthContext";
import AuthService from "../services/auth.service";
import { isAuthenticated } from "../utils/tokens.utils";
import { Button } from "../components/ui/button";
import { Pencil, Trash2, Image, Check } from "lucide-react";
import { generateReactHelpers } from "@uploadthing/react";
import { cn } from '../lib/utils';

const { useUploadThing } = generateReactHelpers();

type Profile = {
  username: string;
  userMail: string;
  role: string;
  about: string;
  imageUrl: string;
};

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>({
    username: '',
    userMail: '',
    role: '',
    about: '',
    imageUrl: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const authService = new AuthService();

  const { startUpload, isUploading } = useUploadThing('profileImage', {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.url) {
        setProfile(prev => ({ ...prev, imageUrl: res[0].url }));
      }
    },
    onUploadError: () => {
      console.error("Erreur lors du téléchargement de l'image");
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated()) return;

      try {
        setLoading(true);
        const response = await authService.getUser();
        const userData = response.data;
        setProfile({
          username: `${userData.firstName} ${userData.lastName}`,
          userMail: userData.email,
          role: userData.role,
          about: userData.about || '',
          imageUrl: userData.imageUrl || '',
        });
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const translateRole = (role: string) => {
    const roleMapping: Record<string, string> = {
      ADMIN: "Administrateur",
      ENSEIGNANT: "Enseignant-Chercheur",
      DIRECTEUR: "Directeur",
      DOCTORANT: "Doctorant",
      MASTER: "Master",
    };
    return roleMapping[role] || role;
  };

  const handleImageDelete = () => {
    setProfile(prev => ({ ...prev, imageUrl: '' }));
  };

  const handleSave = async () => {
    try {
      const [firstName, lastName] = profile.username.split(' ');
      await authService.submitAdditionalInfo({
        firstName,
        lastName,
        about: profile.about,
        imageUrl: profile.imageUrl
      });
      setEditMode(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold">Mon Profil</CardTitle>
                <CardDescription>Gérez vos informations personnelles</CardDescription>
              </div>
              <Button
                variant={editMode ? "destructive" : "outline"}
                onClick={() => setEditMode(!editMode)}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                {editMode ? 'Annuler' : 'Modifier'}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className={cn(
                  "w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200",
                  isUploading && "opacity-50"
                )}>
                  {profile.imageUrl ? (
                    <img
                      src={profile.imageUrl}
                      alt="Photo de profil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span>Pas de photo</span>
                    </div>
                  )}
                </div>

                {editMode && (
                  <div className="absolute -bottom-2 -right-2 flex gap-2 bg-white p-1 rounded-full shadow-md border">
                    <label 
                      htmlFor="profileImage"
                      className="cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                      title="Changer la photo"
                    >
                      <Image className="h-5 w-5 text-gray-600" />
                      <input
                        id="profileImage"
                        type="file"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files?.[0]) {
                            await startUpload([e.target.files[0]]);
                          }
                        }}
                        accept="image/*"
                      />
                    </label>
                    
                    {profile.imageUrl && (
                      <button
                        onClick={handleImageDelete}
                        className="p-1 hover:bg-gray-100 rounded-full text-red-500"
                        title="Supprimer la photo"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-semibold">
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.username}
                      onChange={(e) => setProfile({...profile, username: e.target.value})}
                      className="border rounded p-2 w-full"
                    />
                  ) : (
                    profile.username
                  )}
                </h2>
                <Badge variant="secondary" className="text-sm">
                  {translateRole(profile.role)}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-base">{profile.userMail}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Rôle</h3>
                <p className="text-base">{translateRole(profile.role)}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">À propos de moi</h3>
                <p className="text-base">
                  {editMode ? (
                    <textarea
                      value={profile.about}
                      onChange={(e) => setProfile({...profile, about: e.target.value})}
                      className="border rounded p-2 w-full"
                      rows={4}
                    />
                  ) : (
                    profile.about || 'Aucune description fournie'
                  )}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-2">Étudiants Supervisés</h3>
              <Badge variant="outline" className="text-sm">
                Étudiants en Master (4)
              </Badge>
            </div>

            {editMode && (
              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  onClick={handleSave}
                  disabled={isUploading}
                  className="gap-2"
                >
                  {isUploading ? 'Enregistrement...' : (
                    <>
                      <Check className="h-4 w-4" />
                      Enregistrer
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}