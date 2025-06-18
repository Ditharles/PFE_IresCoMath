/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../../../types/Member";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { MoreHorizontal, Check, X, User as UserIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../ui/dialog";
import { ManageUserService } from "../../../../services/manageUser.service";
import { toast } from "sonner";
import { ROLE_TRANSLATIONS } from "../../../../constants/members";
import { Role } from "../../../../types/request";
import { useAuth } from "../../../../contexts/AuthContext";
import { Badge } from "../../../ui/badge";

const manageUserService = new ManageUserService();

interface UserTableColumnsProps {
  onUpdate?: () => void;
}

export const columns = ({ onUpdate }: UserTableColumnsProps): ColumnDef<User>[] => [
  {
    accessorFn: (row) => `${row.lastName} ${row.firstName}`,
    id: "fullName",
    header: "Nom & Prénom",
    enableColumnFilter: true,
    cell: ({ row }) => <div className="font-medium">{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: true
  },
  {
    id: "role",
    header: "Rôle",
    enableColumnFilter: true,
    accessorFn: (row) => (row as User).role,
    cell: ({ row }) => (
      <div className="capitalize">
        {ROLE_TRANSLATIONS[row.original.role as Role]}
      </div>
    ),
    meta: {
      filterVariant: 'select',
      filterSelectOptions: Object.entries(ROLE_TRANSLATIONS).map(([value, label]) => ({
        value,
        label
      }))
    }
  },
  {
    id: "status",
    header: "Statut",
    enableColumnFilter: true,
    accessorFn: (row) => row.status,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={status === 'ACTIVE' ? 'default' : 'destructive'}
          className="flex items-center gap-1"
        >
          {status === 'ACTIVE' ? (
            <>
              <Check className="h-3 w-3" />
              Actif
            </>
          ) : (
            <>
              <X className="h-3 w-3" />
              Désactivé
            </>
          )}
        </Badge>
      );
    }
  },
  {
    id: "actions",
    header: "Actions",
    enableColumnFilter: false,
    cell: ({ row }) => {
      const { user } = useAuth();
      const original = row.original;
      const [deleteOpen, setDeleteOpen] = useState(false);
      const [deactivateOpen, setDeactivateOpen] = useState(false);
      const [reactivateOpen, setReactivateOpen] = useState(false);

      const handleActionComplete = () => {
        if (onUpdate) onUpdate();
      };


      const handleDelete = async () => {
        try {
          await manageUserService.delete(original.id);
          toast.success("Utilisateur supprimé avec succès");
          setDeleteOpen(false);
          handleActionComplete();
        } catch (error) {
          toast.error("Erreur lors de la suppression");
          console.error(error);
        }
      };

      const handleDeactivate = async () => {
        try {
          await manageUserService.desactivate(original.id);
          toast.success("Utilisateur désactivé avec succès");
          setDeactivateOpen(false);
          handleActionComplete();
        } catch (error) {
          toast.error("Erreur lors de la désactivation");
          console.error(error);
        }
      };

      const handleReactivate = async () => {
        try {
          await manageUserService.reactivate(original.id);
          toast.success("Utilisateur réactivé avec succès");
          setReactivateOpen(false);
          handleActionComplete();
        } catch (error) {
          toast.error("Erreur lors de la réactivation");
          console.error(error);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <a href={`/gestion/membres/${original.id}`} className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  Voir détails
                </a>
              </DropdownMenuItem>

              {user?.role === "DIRECTEUR" && (
                <>
                  {original.status === 'ACTIVE' ? (
                    <DropdownMenuItem
                      className="text-red-600 flex items-center gap-2"
                      onClick={() => setDeactivateOpen(true)}
                    >
                      <X className="h-4 w-4" />
                      Désactiver
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="text-green-600 flex items-center gap-2"
                      onClick={() => setReactivateOpen(true)}
                    >
                      <Check className="h-4 w-4" />
                      Réactiver
                    </DropdownMenuItem>
                  )}
                </>
              )}

              {user?.role === "ADMIN" && (
                <DropdownMenuItem
                  className="text-red-600 flex items-center gap-2"
                  onClick={() => setDeleteOpen(true)}
                >
                  <X className="h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>Êtes-vous sûr de vouloir supprimer définitivement cet utilisateur ?</p>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Confirmer la suppression
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={deactivateOpen} onOpenChange={setDeactivateOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirmer la désactivation</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>Êtes-vous sûr de vouloir désactiver cet utilisateur ?</p>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeactivateOpen(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleDeactivate}>
                  Confirmer la désactivation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={reactivateOpen} onOpenChange={setReactivateOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirmer la réactivation</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>Êtes-vous sûr de vouloir réactiver cet utilisateur ?</p>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setReactivateOpen(false)}>
                  Annuler
                </Button>
                <Button variant="default" onClick={handleReactivate}>
                  Confirmer la réactivation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    }
  }
];