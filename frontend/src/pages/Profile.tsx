import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../contexts/AuthContext";
import AuthService from "../services/auth.service";
import { isAuthenticated } from "../utils/tokens.utils";
import { Button } from "../components/ui/button";
import { Pencil, Trash2, Image } from "lucide-react";

import { generateReactHelpers } from "@uploadthing/react";

const { useUploadThing: uploadThing } = generateReactHelpers();

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    role: '',
    about: '',
    imageUrl: '',
  });
  const [editMode, setEditMode] = useState(false);
  const authService = new AuthService();

  const { startUpload, isUploading } = uploadThing('profileImage', {
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
        const response = await authService.getUser();
        const userData = response.data;
        setProfile({
          username: userData.username || userData.email,
          role: userData.role,
          about: userData.about || '',
          imageUrl: userData.imageUrl || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const translateRole = (role: string) => {
    const roleMapping: Record<string, string> = {
      ADMIN: "Administrator",
      ENSEIGNANT: "Teacher",
      DIRECTEUR: "Director",
      DOCTORANT: "PhD Student",
      MASTER: "Master",
    };
    return roleMapping[role] || role;
  };

  const handleImageDelete = () => {
    setProfile(prev => ({ ...prev, imageUrl: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setEditMode(!editMode)}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                {editMode ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="flex items-start gap-6">
              {/* Section Photo avec icônes toujours visibles */}
              <div className="relative">
                <img
                  src={profile.imageUrl || '/placeholder-user.png'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />

                <div className="absolute -bottom-2 -right-2 flex gap-2 bg-white p-1 rounded-full shadow-md border">
                  {/* Icône Galerie */}
                  <label 
                    htmlFor="profileImage"
                    className="cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                    title="Change photo"
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
                  
                  {/* Icône Suppression */}
                  {profile.imageUrl && (
                    <button
                      onClick={handleImageDelete}
                      className="p-1 hover:bg-gray-100 rounded-full text-red-500"
                      title="Delete photo"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
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
                <h3 className="text-sm font-medium text-gray-500">Username</h3>
                <p className="text-base">{profile.username}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Role</h3>
                <p className="text-base">{translateRole(profile.role)}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">About Me</h3>
                <p className="text-base">
                  {editMode ? (
                    <textarea
                      value={profile.about}
                      onChange={(e) => setProfile({...profile, about: e.target.value})}
                      className="border rounded p-2 w-full"
                      rows={4}
                    />
                  ) : (
                    profile.about || 'No description provided'
                  )}
                </p>
              </div>
            </div>

            {editMode && (
              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  onClick={async () => {
                    try {
                      await authService.submitAdditionalInfo(profile);
                      setEditMode(false);
                    } catch (error) {
                      console.error('Update error:', error);
                    }
                  }}
                  disabled={isUploading}
                >
                  {isUploading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
