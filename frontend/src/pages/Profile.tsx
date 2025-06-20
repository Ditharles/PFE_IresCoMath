import { JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generateReactHelpers } from "@uploadthing/react";
import {
  Pencil, Mail, Phone, CreditCard,
  GraduationCap, Users, User as UserIcon, IdCard, X, ExternalLink, Calendar, ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { cn } from '../lib/utils';
import { Badge } from "../components/ui/badge";
import { RoleEnum } from "../types/common";

// Components
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "../components/ui/card";

import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import SupervisedStudentsList from "../components/profile/SupervisedStudentsList";
import { ActionButtons } from "../components/profile/ActionsButtons";

// Services & Utils
import { useAuth } from "../contexts/AuthContext";
import AuthService from "../services/auth.service";
import { ManageUserService } from "../services/manageUser.service";

// Types
import { User } from "../types/Member";
import { isAxiosError } from "axios";
import SkeletonProfile from "../components/profile/SkeletonProfile";
import { Role } from "../types/request";
import { ROLE_TRANSLATIONS } from "../constants/members";

const { useUploadThing } = generateReactHelpers();

export default function Profile() {
  // Hooks and Services
  const { user, isLoggedIn } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const authService = new AuthService();
  const manageUserService = new ManageUserService();

  // State
  const [userData, setUserData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
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
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const response = id
        ? await manageUserService.getUser(id)
        : await authService.getUser();
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
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  // Permissions
  const isCurrentUser = (user?.userId === userData?.userId) || (user?.id === userData?.id) || false;

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
      await authService.updateUser({
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

  const handleReactivateUser = async () => {
    try {
      if (!userData?.id) {
        throw new Error("ID utilisateur non trouvé");
      }
      await manageUserService.reactivate(userData.id);
      await fetchUserData();
      toast.success("Compte réactivé avec succès");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Erreur lors de la réactivation');
      } else {
        toast.error('Erreur lors de la réactivation');
      }
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
      if (isCurrentUser) {
        navigate('/logout');
      } else {
        navigate('/gestion/membres');
      }
      toast.success("Compte supprimé avec succès");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Erreur lors de la suppression');
      }
      console.error(error);
    }
  };

  const handleDesactiveUser = async () => {
    try {
      if (!userData?.id) {
        throw new Error("ID utilisateur non trouvé");
      }
      await manageUserService.desactivate(userData.id);
      await fetchUserData();
      toast.success("Compte désactivé avec succès");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Erreur lors de la désactivation');
      }
      console.error(error);
    }
  };

  // Loading State
  if (loading || !userData) {
    return <SkeletonProfile />;
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
            accept="image/*"
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

  const renderInfoCard = (icon: React.ReactNode, label: string, value: React.ReactNode) => (
    <div className="flex flex-col">
      <span className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
        {icon}
        {label}
      </span>
      <div className="text-foreground font-medium">{value || "Non spécifié"}</div>
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
                <div className="mt-2 flex gap-2 items-center">
                  <Badge variant="secondary">
                    {ROLE_TRANSLATIONS[userData.role as Role]}
                  </Badge>
                  {userData.status === 'DESACTIVE' && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <X className="h-3 w-3" />
                      Désactivé
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <ActionButtons
                isCurrentUser={isCurrentUser}
                isAdmin={user?.role === RoleEnum.ADMIN}
                isDirector={user?.role === RoleEnum.DIRECTEUR}
                isTargetAdminOrDirector={[Role.ADMIN, Role.DIRECTEUR].includes(userData?.role)}
                isDesactivated={userData?.status !== "ACTIVE"}
                editMode={editMode}
                isUploading={isUploading}
                showDeleteAlert={showDeleteAlert}
                confirmationText={confirmationText}
                onEdit={() => setEditMode(true)}
                onSave={handleSave}
                onCancelEdit={handleCancelEdit}
                onDelete={handleDeleteUser}
                onShowDeleteAlert={setShowDeleteAlert}
                onConfirmationTextChange={setConfirmationText}
                onDesactivate={handleDesactiveUser}
                onReactivate={handleReactivateUser}
              />
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
              {userData.bankData && renderInfoCard(
                <CreditCard className="h-4 w-4" />,
                "Informations bancaires",
                userData.bankData
              )}
              {userData.createdAt && renderInfoCard(
                <Calendar className="h-4 w-4" />,
                "Date d'inscription",
                new Date(userData.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              )}
            </div>
          </div>

          {/* Section Informations académiques */}
          {(userData.role !== Role.ADMIN) && (
            <div className="rounded-lg bg-muted/50 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Informations académiques</h3>
              </div>
              <Separator className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.thesisYear && renderInfoCard(
                  <GraduationCap className="h-4 w-4" />,
                  "Année de thèse",
                  userData.thesisYear
                )}
                {userData.masterYear && renderInfoCard(
                  <GraduationCap className="h-4 w-4" />,
                  "Année de master",
                  userData.masterYear
                )}
                {userData.grade && renderInfoCard(
                  <GraduationCap className="h-4 w-4" />,
                  "Grade",
                  userData.grade
                )}
                {userData.position && renderInfoCard(
                  <GraduationCap className="h-4 w-4" />,
                  "Position",
                  userData.position
                )}
                {userData.institution && renderInfoCard(
                  <GraduationCap className="h-4 w-4" />,
                  "Établissement",
                  userData.institution
                )}
              </div>
            </div>
          )}

          {/* Section Informations d'encadrement */}
          {userData.role === Role.MASTER ||
            userData.role === Role.DOCTORANT ? (
            <div className="rounded-lg bg-muted/50 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Informations d'encadrement</h3>
              </div>
              <Separator className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.role === Role.MASTER && userData.supervisor && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">Encadrant</span>
                    <div className="text-foreground font-medium">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-primary hover:text-primary/80 hover:underline flex items-center gap-1"
                        onClick={() => userData.supervisor && navigate(`/gestion/membres/${userData.supervisorId}`)}
                      >
                        {userData.supervisor?.firstName} {userData.supervisor?.lastName}
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
                {userData.role === Role.DOCTORANT && userData.thesisSupervisorId && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">Directeur de thèse</span>
                    <div className="text-foreground font-medium">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-primary hover:text-primary/80 hover:underline flex items-center gap-1"
                        onClick={() => navigate(`/gestion/membres/${userData.thesisSupervisorId}`)}
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
          {((userData.role === Role.ENSEIGNANT || userData.role === Role.DIRECTEUR) &&
            (isCurrentUser || user?.role === RoleEnum.ADMIN || user?.role === RoleEnum.DIRECTEUR)) && (
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
            )}
        </CardContent>
      </Card>
    </div>
  );
}