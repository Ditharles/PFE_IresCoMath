import { useState } from 'react'
import { Template } from '../../../../types/templates'
import { Button } from "../../../ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../../ui/dropdown-menu"
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../ui/dialog"

interface ActionsCellProps {
    template: Template
    onDelete: (templateId: string) => void
}

const ActionsCell: React.FC<ActionsCellProps> = ({ template, onDelete }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => navigate(`/templates/${template.id}`)}>
                        Voir details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/templates/modifier/${template.id}`)}>
                        Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        setOpen(true);
                        setDropdownOpen(false);
                    }}>
                        Supprimer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                    </DialogHeader>
                    <p>Êtes-vous sûr de vouloir supprimer ce template ?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Annuler
                        </Button>
                        <Button variant="destructive" onClick={() => {
                            onDelete(template.id);
                            setOpen(false);
                        }}>
                            Supprimer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ActionsCell