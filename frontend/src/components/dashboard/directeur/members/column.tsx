/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../../../types/Member";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { ManageUserService } from "../../../../services/manageUser.service";
import { toast } from "../../../Toast";


const manageUserService = new ManageUserService();
const deleteUser = async (id: string, password: string) => {
    try {
        const response = await manageUserService.deleteUser(id, password);
        toast.success(response?.data?.message);
        return true;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Une erreur est survenue");
        return false;
    }
}

export const columns: ColumnDef<User>[] = [
    {
        accessorFn: (row) => `${row.nom} ${row.prenom}`,
        id: "nomComplet",
        header: "Nom & Prénom",
        enableColumnFilter: true,
        cell: ({ row }) => <div className="font-medium">{row.getValue("nomComplet")}</div>,
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
        cell: ({ row }) => {
            const original = row.original;
            if ("annee_these" in original) {
                return "Doctorant";
            } else if ("annee_master" in original) {
                return "Étudiant Master";
            } else if ("fonction" in original) {
                return "Enseignant Chercheur";
            }
            return "Inconnu";
        }
    },
    {
        id: "actions",
        header: "Actions",
        enableColumnFilter: false,
        cell: ({ row }) => {
            const original = row.original;
            const [open, setOpen] = useState(false);
            const [password, setPassword] = useState("");

            const handleDelete = async () => {
                const success = await deleteUser(original.id, password);
                if (success) {
                    setOpen(false);
                    // Éventuellement rafraîchir la table ici
                }
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <a href={`/gestion/membres/${original.id}`}>Voir le profil</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => setOpen(true)}>Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Confirmer la suppression</DialogTitle>
                            </DialogHeader>
                            <Input
                                placeholder="Entrez le mot de passe"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <DialogFooter className="flex justify-end gap-2 mt-4">
                                <Button variant="ghost" onClick={() => setOpen(false)}>
                                    Annuler
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={!password.trim()}
                                >
                                    Confirmer la suppression
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            );
        }
    }
];