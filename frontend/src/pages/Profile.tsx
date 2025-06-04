import { JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generateReactHelpers } from "@uploadthing/react";
import {
  Pencil, Trash2, Mail, Phone, CreditCard,
  GraduationCap, Users, User as UserIcon, IdCard, Check, X, ExternalLink, Calendar, ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { cn } from '../lib/utils';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";

// Components
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "../components/ui/card";

import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import SupervisedStudentsList from "../components/dashboard/directeur/profile/SupervisedStudentsList";

// Services & Utils
import { useAuth } from "../contexts/AuthContext";
import AuthService from "../services/auth.service";
import { isAuthenticated } from "../utils/tokens.utils";
import { ManageUserService } from "../services/manageUser.service";

// Types
import { User } from "../types/Member";

const { useUploadThing } = generateReactHelpers();

// Constants
const ROLE_TRANSLATIONS: Record<string, string> = {
  ADMIN: "Administrateur",
  ENSEIGNANT: "Enseignant-Chercheur",
  DIRECTEUR: "Directeur",
  DOCTORANT: "Doctorant",
  MASTER: "Master",
};

export default function Profile() {
  // Hooks and Services
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const authService = new AuthService();
  const manageUserService = new ManageUserService();

  // State
  const [userData, setUserData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    cin: '',
  });
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  const { startUpload, isUploading } = useUploadThing('profileImage', {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.url) {
        setUserData(prev => prev ? { ...prev, photo: res[0].url } : null);
      }
    },
    onUploadError: () => {
      toast.error("Erreur lors du téléchargement de l'image");
    },
  });

  // Data Fetching
  const fetchUserData = async () => {
    if (!isAuthenticated()) return;

    try {
      setLoading(true);
      const response = id
        ? await manageUserService.getUser(id)
        : await authService.getUser();
      console.log(JSON.stringify(response.data, null, 2));
      setUserData(response.data);
      setEditedData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone || '',
        cin: response.data.cin || '',
      });
    } catch (error) {
      toast.error('Erreur lors du chargement des données utilisateur');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  // Permissions
  const isCurrentUser = user.userId === userData?.userId || user.id === userData?.id;
  const canSeeDetails = isCurrentUser ||
    user.role === "ADMIN" ||
    user.role === "DIRECTEUR" ||
    user.role === "ENSEIGNANT" ||
    (user.role === "ENSEIGNANT" && userData?.role === "MASTER" && userData.supervisorId === user.id);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    if (userData) {
      setEditedData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone || '',
        cin: userData.cin || '',
      });
    }
  };

  const handleSave = async () => {
    if (!userData) return;

    try {
      await authService.submitAdditionalInfo({
        firstName: editedData.firstName,
        lastName: editedData.lastName,
        phone: editedData.phone,
        cin: editedData.cin,
        photo: userData.photo
      });
      setEditMode(false);
      await fetchUserData();
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (!userData?.id) {
        throw new Error("ID utilisateur non trouvé");
      }
      if (confirmationText !== "Confirmer") {
        toast.error("Veuillez taper 'Confirmer' pour confirmer la suppression");
        return;
      }
      await manageUserService.delete(userData.id);
      setShowDeleteAlert(false);
      setConfirmationText('');
      navigate('/');
      toast.success("Compte supprimé avec succès");
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error(error);
    }
  };

  const handleDesactiveUser = async () => {
    try {
      if (!userData?.id) {
        throw new Error("ID utilisateur non trouvé");
      }
      await manageUserService.desactivate(userData.id);
      fetchUserData();
      toast.success("Compte désactivé avec succès");
    } catch (error) {
      toast.error('Erreur lors de la désactivation');
      console.error(error);
    }
  };

  // Loading State
  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">Chargement des données utilisateur...</div>
      </div>
    );
  }

  // Render Helpers
  const renderProfileImage = () => (
    <div className="relative group">
      <div className={cn(
        "w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-sm",
        isUploading && "opacity-50"
      )}>
        {userData.photo ? (
          <img
            src={userData.photo}
            alt="Photo de profil"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
            <UserIcon className="h-12 w-12" />
          </div>
        )}
      </div>
      {editMode && (
        <div className="absolute -bottom-1 -right-1">
          <input
            type="file"
            id="profileImage"
            className="hidden"
            onChange={async (e) => {
              if (e.target.files) {
                await startUpload([e.target.files[0]]);
              }
            }}
          />
          <label
            htmlFor="profileImage"
            className="p-1.5 rounded-full bg-muted hover:bg-muted/70 cursor-pointer border-2 border-background"
          >
            <Pencil className="h-4 w-4" />
          </label>
        </div>
      )}
    </div>
  );

  const renderEditableField = (label: string, name: string, value: string, icon: JSX.Element) => {
    if (editMode) {
      return (
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
            {icon}
            {label}
          </span>
          <Input
            name={name}
            value={value}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
          {icon}
          {label}
        </span>
        <div className="text-foreground font-medium">{value || "Non spécifié"}</div>
      </div>
    );
  };

  const renderInfoCard = (icon: React.ReactNode, label: string, value: string) => (
    <div className="flex flex-col">
      <span className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
        {icon}
        {label}
      </span>
      <div className="text-foreground font-medium">{value}</div>
    </div>
  );

  const renderActionButtons = () => (
    <div className="flex gap-2">
      {isCurrentUser && (
        <>
          {editMode ? (
            <>
              <Button
                onClick={handleSave}
                size="sm"
                variant="default"
                disabled={isUploading}
              >
                <Check className="mr-2 h-4 w-4" />
                Soumettre
              </Button>
              <Button
                onClick={handleCancelEdit}
                size="sm"
                variant="outline"
              >
                <X className="mr-2 h-4 w-4" />
                Annuler
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setEditMode(true)}
              size="sm"
              variant="outline"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          )}
        </>
      )}
      {user.role === "ADMIN" && !isCurrentUser && (
        <>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setShowDeleteAlert(true)}
          >
            <Trash2 className="mr-2 w-4 h-4" />
            Supprimer le compte
          </Button>
          {showDeleteAlert && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Confirmer la suppression</AlertTitle>
              <AlertDescription>
                <div className="mt-2">
                  <p className="mb-4">Cette action est irréversible. Veuillez taper "Confirmer" pour confirmer la suppression.</p>
                  <Input
                    placeholder="Tapez 'Confirmer'"
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
                    className="mb-4"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowDeleteAlert(false);
                        setConfirmationText('');
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteUser}
                      disabled={confirmationText !== "Confirmer"}
                    >
                      Confirmer la suppression
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDesactiveUser}
          >
            <Trash2 className="mr-2 w-4 h-4" />
            Désactiver le compte
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </div>
      <Card className="shadow-sm border-border">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-muted/5 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              {renderProfileImage()}
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {isCurrentUser ? "Mon Profil" : "Profil Utilisateur"}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {isCurrentUser
                    ? "Gérez vos informations personnelles"
                    : "Informations de l'utilisateur"}
                </CardDescription>
                <div className="mt-2">
                  <Badge variant="secondary">
                    {ROLE_TRANSLATIONS[userData.role]}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {renderActionButtons()}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          {/* Section Informations personnelles */}
          <div className="rounded-lg bg-muted/50 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <UserIcon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Informations personnelles</h3>
            </div>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderEditableField(
                "Nom",
                "lastName",
                editedData.lastName,
                <UserIcon className="h-4 w-4" />
              )}
              {renderEditableField(
                "Prénom",
                "firstName",
                editedData.firstName,
                <UserIcon className="h-4 w-4" />
              )}
              {renderEditableField(
                "CIN",
                "cin",
                editedData.cin,
                <IdCard className="h-4 w-4" />
              )}
              {renderInfoCard(
                <Mail className="h-4 w-4" />,
                "Email",
                userData.email
              )}
              {renderEditableField(
                "Téléphone",
                "phone",
                editedData.phone,
                <Phone className="h-4 w-4" />
              )}
              {userData.bankData && (
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Informations bancaires
                  </span>
                  <div className="text-foreground font-medium">
                    {userData.bankData}
                  </div>
                </div>
              )}
              {userData.createdAt && (
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date d'inscription
                  </span>
                  <div className="text-foreground font-medium">
                    {new Date(userData.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section Informations académiques */}
          {userData.thesisYear || userData.masterYear || userData.grade ||
            (userData.role === "ENSEIGNANT" || userData.role === "DIRECTEUR") ? (
            <div className="rounded-lg bg-muted/50 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Informations académiques</h3>
              </div>
              <Separator className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.thesisYear && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">Année de thèse</span>
                    <div className="text-foreground font-medium">{userData.thesisYear}</div>
                  </div>
                )}
                {userData.masterYear && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">Année de master</span>
                    <div className="text-foreground font-medium">{userData.masterYear}</div>
                  </div>
                )}
                {userData.grade && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">Grade</span>
                    <div className="text-foreground font-medium">{userData.grade}</div>
                  </div>
                )}
                {(userData.role === "ENSEIGNANT" || userData.role === "DIRECTEUR") && (
                  <>
                    {userData.position && (
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground mb-1">Position</span>
                        <div className="text-foreground font-medium">{userData.position}</div>
                      </div>
                    )}
                    {userData.institution && (
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground mb-1">Établissement</span>
                        <div className="text-foreground font-medium">{userData.institution}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : null}

          {/* Section Informations d'encadrement */}
          {(userData.role === 'MASTER' && userData.encadrant) ||
            (userData.role === 'DOCTORANT' && userData.thesisSupervisorId) ? (
            <div className="rounded-lg bg-muted/50 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Informations d'encadrement</h3>
              </div>
              <Separator className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.role === 'MASTER' && userData.encadrant && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">Encadrant</span>
                    <div className="text-foreground font-medium">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-primary hover:text-primary/80 hover:underline flex items-center gap-1"
                        onClick={() => userData.encadrant && navigate(`/profile/${userData.encadrant.id}`)}
                      >
                        {userData.encadrant?.firstName} {userData.encadrant?.lastName}
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
                {userData.role === 'DOCTORANT' && userData.thesisSupervisorId && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">Directeur de thèse</span>
                    <div className="text-foreground font-medium">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-primary hover:text-primary/80 hover:underline flex items-center gap-1"
                        onClick={() => navigate(`/profil/${userData.thesisSupervisorId}`)}
                      >
                        {userData.thesisSupervisor?.firstName} {userData.thesisSupervisor?.lastName}
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Section Étudiants supervisés */}
          {((userData.role === "ENSEIGNANT" || userData.role === "DIRECTEUR") && isCurrentUser) ||
            ((userData.role === "ENSEIGNANT" || userData.role === "DIRECTEUR") && user.role === "ADMIN") ? (
            <div className="rounded-lg bg-muted/50 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Étudiants Supervisés</h3>
              </div>
              <Separator className="mb-4" />
              <SupervisedStudentsList
                supervisorId={userData.id}
                title={`Étudiants supervisés par ${userData.firstName} ${userData.lastName}`}
                isLoading={false}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}