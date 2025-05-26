import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Phone, Mail, User, GraduationCap, ArrowLeft, Pencil, 
  Building2, Calendar, Clock 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter,
  CardDescription
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../../contexts/AuthContext";
import { ManageUserService } from "../../services/manageUser.service";
import { RoleEnum } from "../../types/common";
import { cn } from "../../lib/utils";
import { toast } from "react-toastify";


interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleEnum;
  phone?: string;
  status: string;
  createdAt: string;
  lastLogin?: string;
  thesisLevel?: string;
  thesisYear?: string;
  thesisSubject?: string;
  supervisorId?: string;
  masterYear?: string;
  position?: string;
  specialty?: string;
  about?: string;
  photo?: string;
}

const MemberDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [supervisedMembers, setSupervisedMembers] = useState<Member[]>([]);
  const [supervisor, setSupervisor] = useState<Member | null>(null);
  const [tabActive, setTabActive] = useState<'master' | 'doctorant'>('master');
  const [editMode, setEditMode] = useState(false);
  const manageUserService = new ManageUserService();

  useEffect(() => {
    if (!user || !id) return;

    const isAuthorized = 
      user.id === id ||
      user.role === RoleEnum.DIRECTEUR ||
      (user.role === RoleEnum.ENSEIGNANT && user.supervisedStudents?.includes(id)) ||
      ([RoleEnum.DOCTORANT, RoleEnum.MASTER].includes(user.role) && user.supervisorId === id );

    if (!isAuthorized) {
      toast.error("Accès refusé");
      navigate(user.role === RoleEnum.DIRECTEUR ? "/membres" : "/profil", { replace: true });
    }
  }, [user, id, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [memberRes, allMembersRes] = await Promise.all([
          manageUserService.getUser(id!),
          manageUserService.getUsers()
        ]);

        setMember(memberRes.data);
        
        const supervisorId = memberRes.data.supervisorId;
        if (supervisorId) {
          const supervisorRes = await manageUserService.getUser(supervisorId);
          setSupervisor(supervisorRes.data);
        }

        setSupervisedMembers(
          allMembersRes.data.filter((m: Member) => 
            m.supervisorId === id
          )
        );
      } catch (error) {
        toast.error("Erreur de chargement");
        navigate("/membres");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const translateRole = (role: RoleEnum) => {
    const roleMapping: Record<RoleEnum, string> = {
      [RoleEnum.ADMIN]: "Administrateur",
      [RoleEnum.ENSEIGNANT]: "Enseignant",
      [RoleEnum.DIRECTEUR]: "Directeur",
      [RoleEnum.DOCTORANT]: "Doctorant",
      [RoleEnum.MASTER]: "Master",
    };
    return roleMapping[role] || role;
  };

  if (!member) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-lg font-medium">Membre introuvable</h3>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
          Retour
        </Button>
      </div>
    );
  }

  const isCurrentUserProfile = user?.id === member.id;
  const doctorantSupervised = supervisedMembers.filter(m => m.role === RoleEnum.DOCTORANT);
  const masterSupervised = supervisedMembers.filter(m => m.role === RoleEnum.MASTER);

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        {isCurrentUserProfile && (
          <Button
            variant={editMode ? "destructive" : "default"}
            onClick={() => setEditMode(!editMode)}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            {editMode ? "Annuler" : "Modifier le profil"}
          </Button>
        )}
      </div>

      <Card className="overflow-hidden shadow-md">
        <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-start gap-6">
              {member.photo ? (
                <img 
                  src={member.photo} 
                  alt={`${member.firstName} ${member.lastName}`} 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <User className="h-10 w-10" />
                </div>
              )}

              <div className="space-y-1">
                <CardTitle className="text-2xl">
                  {member.firstName} {member.lastName}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {member.email}
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge 
                variant="secondary"
                className={cn(
                  "px-4 py-1",
                  member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                )}
              >
                {member.status === 'active' ? 'Actif' : 'Inactif'}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {translateRole(member.role)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <User className="h-5 w-5" />
                  Informations Personnelles
                </h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd className="mt-1 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {editMode ? (
                        <input
                          type="text"
                          value={member.phone || ''}
                          onChange={(e) => setMember({...member, phone: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      ) : (
                        member.phone || 'Non renseigné'
                      )}
                    </dd>
                  </div>
                  {member.position && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Poste</dt>
                      <dd className="mt-1">
                        {editMode ? (
                          <input
                            type="text"
                            value={member.position}
                            onChange={(e) => setMember({...member, position: e.target.value})}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        ) : (
                          member.position
                        )}
                      </dd>
                    </div>
                  )}
                  {member.specialty && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Spécialité</dt>
                      <dd className="mt-1">
                        {editMode ? (
                          <input
                            type="text"
                            value={member.specialty}
                            onChange={(e) => setMember({...member, specialty: e.target.value})}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        ) : (
                          member.specialty
                        )}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5" />
                  Dates
                </h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Inscription</dt>
                    <dd className="mt-1">{formatDate(member.createdAt)}</dd>
                  </div>
                  {member.lastLogin && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Dernière connexion</dt>
                      <dd className="mt-1 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {formatDateTime(member.lastLogin)}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5" />
                  Description
                </h3>
                {editMode ? (
                  <textarea
                    value={member.about || ''}
                    onChange={(e) => setMember({...member, about: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[120px]"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {member.about || 'Aucune description fournie'}
                  </p>
                )}
              </div>
            </div>

            {(member.role === RoleEnum.ENSEIGNANT || member.role === RoleEnum.DIRECTEUR) && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900">Étudiants Supervisés</h3>
                  
                  <div className="border-b mt-4">
                    <div className="flex space-x-6">
                      <button
                        className={cn(
                          "pb-2 px-1 transition-all relative",
                          tabActive === 'master' 
                            ? "text-primary font-medium" 
                            : "text-gray-500 hover:text-gray-700"
                        )}
                        onClick={() => setTabActive('master')}
                      >
                        Étudiants Master ({masterSupervised.length})
                        {tabActive === 'master' && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                      </button>
                      <button
                        className={cn(
                          "pb-2 px-1 transition-all relative",
                          tabActive === 'doctorant' 
                            ? "text-primary font-medium" 
                            : "text-gray-500 hover:text-gray-700"
                        )}
                        onClick={() => setTabActive('doctorant')}
                      >
                        Doctorants ({doctorantSupervised.length})
                        {tabActive === 'doctorant' && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    {tabActive === 'master' && (
                      <div className="space-y-2">
                        {masterSupervised.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sujet</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Année</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {masterSupervised.map((user) => (
                                  <tr 
                                    key={user.id} 
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => navigate(`/membre/${user.id}/${user.role}`)}
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.thesisSubject || "-"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.masterYear || "-"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">Aucun étudiant en master supervisé</p>
                        )}
                      </div>
                    )}

                    {tabActive === 'doctorant' && (
                      <div className="space-y-2">
                        {doctorantSupervised.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sujet</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {doctorantSupervised.map((user) => (
                                  <tr 
                                    key={user.id} 
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => navigate(`/membre/${user.id}/${user.role}`)}
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.thesisSubject || "-"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.thesisLevel || "-"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">Aucun doctorant supervisé</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t bg-gray-50/50 p-6">
          <div className="flex justify-end gap-4 w-full">
            {editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Annuler
                </Button>
                <Button onClick={() => {
                  // Implémentez la logique de sauvegarde ici
                  setEditMode(false);
                }}>
                  Enregistrer
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Fermer
                </Button>
                {user?.role === RoleEnum.DIRECTEUR && !isCurrentUserProfile && (
                  <Button variant="destructive">
                    Supprimer le membre
                  </Button>
                )}
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MemberDetails;