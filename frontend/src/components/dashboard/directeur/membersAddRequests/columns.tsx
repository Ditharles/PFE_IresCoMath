/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from "@tanstack/react-table"
import { RequestUser, RequestStatus } from "../../../../types/MemberAddRequest"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../ui/dropdown-menu"
import { Button } from "../../../ui/button"
import { ChevronDown } from "lucide-react"
import { Role } from "../../../../types/common"
import { ManageUserService } from "../../../../services/manageUser.service"
import { useState } from "react"
import { Input } from "../../../ui/input"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "../../../ui/dialog"
import { determineRequestRole } from "../../../../utils/membersUtils"

const manageUserService = new ManageUserService();
const requestStatusStrings = {
    [RequestStatus.APPROVED]: "Approuvé",
    [RequestStatus.PENDING]: "En attente",
    [RequestStatus.REJECTED]: "Rejeté"
};

export const columns = (refresh: () => void): ColumnDef<RequestUser>[] => [
    {
        accessorFn: (row) => `${row.lastName} ${row.firstName}`,
        id: "fullName",
        header: "Nom & Prénom",
        enableColumnFilter: true,
        cell: ({ row }) => {
            const original = row.original;
            const id = original.id;
            const role = determineRequestRole(original) as Role;
            return (
                <div className="font-medium">
                    <a href={`membre/?id=${id}&role=${role}`}>
                        {row.getValue("fullName")}
                    </a>
                </div>
            );
        },
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
            if ("thesisYear" in original) {
                return "Doctorant";
            } else if ("masterYear" in original) {
                return "Étudiant Master";
            } else if ("position" in original) {
                return "Enseignant Chercheur";
            }
            return "Inconnu";
        }
    },
    {
        accessorKey: "status",
        header: "Statut",
        enableColumnFilter: true,
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${status === RequestStatus.APPROVED
                        ? "bg-green-100 text-green-800"
                        : status === RequestStatus.REJECTED
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                >
                    {requestStatusStrings[status]}
                </span>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        enableColumnFilter: false,
        cell: ({ row }) => {
            const original = row.original;
            const [reason, setReason] = useState("");
            const [isOpen, setIsOpen] = useState(false);

            const handleAccept = () => {
                const role = determineRequestRole(original) as Role;
                if (original.id) {
                    manageUserService.acceptUser(original.id, role, true, "");
                    setTimeout(() => refresh(), 1000);
                }
            };

            const handleReject = () => {
                const role = determineRequestRole(original) as Role;
                if (reason && original.id) {
                    manageUserService.acceptUser(original.id, role, false, reason);
                    setIsOpen(false);
                    setReason("");
                    setTimeout(() => refresh(), 1000);
                }
            };

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <a href={`/membre?id=${original.id}&role=${determineRequestRole(original) as Role}`}>
                                    Voir le profil
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleAccept}>Approuver</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsOpen(true)}>Rejeter</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <div className={`${isOpen ? 'fixed inset-0 bg-black/20 backdrop-blur-sm z-40' : ''}`} />
                        <DialogContent className="sm:max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg p-6 shadow-lg">
                            <DialogHeader>
                                <DialogTitle>Motif du rejet</DialogTitle>
                            </DialogHeader>
                            <Input
                                placeholder="Entrez le motif du rejet"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <DialogFooter className="flex justify-end gap-2 mt-4">
                                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                                    Annuler
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleReject}
                                    disabled={!reason.trim()}
                                >
                                    Confirmer le rejet
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            )
        },
    },
]