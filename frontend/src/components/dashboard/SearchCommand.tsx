import { useEffect, useState, useCallback, useRef } from "react"
import { SearchIcon, History, FilePlus2, User, Settings, Users, UserCircle, FileText, Box, ClipboardList, ChartNoAxesCombined } from "lucide-react"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { useNavigate, useLocation } from "react-router-dom"
import { getUser } from "../../utils/tokens.utils"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "../ui/command"
import { cn } from "../../lib/utils"

interface SearchCommandProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

interface CommandItem {
    name: string
    path: string
    icon: React.ElementType
    group: string
    submenus?: { name: string; path: string }[]
}

const useCommandState = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isNavigating, setIsNavigating] = useState(false)
    const [selectedPath, setSelectedPath] = useState<string | null>(null)
    const navigateRef = useRef<(() => void) | null>(null)
    const location = useLocation()
    const animationTimeoutRef = useRef<NodeJS.Timeout>()

    const open = useCallback(() => {
        setIsOpen(true)
        setIsNavigating(false)
        setSelectedPath(null)
    }, [])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [])

    const handleNavigation = useCallback((path: string, callback: () => void) => {
        if (isNavigating) return
        setSelectedPath(path)
        setIsNavigating(true)
        navigateRef.current = callback
        close()
    }, [close, isNavigating])

    useEffect(() => {
        if (!isOpen && navigateRef.current) {
            animationTimeoutRef.current = setTimeout(() => {
                navigateRef.current?.()
                navigateRef.current = null
                setIsNavigating(false)
                setSelectedPath(null)
            }, 300)

            return () => {
                if (animationTimeoutRef.current) {
                    clearTimeout(animationTimeoutRef.current)
                }
            }
        }
    }, [isOpen])

    useEffect(() => {
        setIsNavigating(false)
        setSelectedPath(null)
        navigateRef.current = null
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current)
        }
    }, [location.pathname])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                if (isOpen) {
                    close()
                } else {
                    open()
                }
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [isOpen, open, close])

    return {
        isOpen,
        isNavigating,
        selectedPath,
        open,
        close,
        handleNavigation
    }
}

export const SearchCommand = ({ searchQuery, setSearchQuery }: SearchCommandProps) => {
    const navigate = useNavigate()
    const user = getUser()
    const { isOpen, isNavigating, selectedPath, open, close, handleNavigation } = useCommandState()

    const memberCommands: CommandItem[] = [
        { name: "Historique", path: "/historique", icon: History, group: "Navigation" },
        { name: "Nouvelle demande", path: "/nouvelle-demande", icon: FilePlus2, group: "Navigation" },
        { name: "Profil", path: "/profil", icon: User, group: "Navigation" },
        { name: "Paramètres", path: "/paramètres", icon: Settings, group: "Navigation" },
    ]

    const adminCommands: CommandItem[] = [
        { name: "Membres", path: "/admin/membres", icon: Users, group: "Administration" },
        { name: "Profil", path: "/admin/profil", icon: UserCircle, group: "Administration" },
        { name: "Paramètres", path: "/admin/parametres", icon: Settings, group: "Administration" },
    ]

    const directorCommands: CommandItem[] = [
        {
            name: "Demandes",
            path: "/demandes",
            icon: FileText,
            group: "Gestion",
            submenus: [
                { name: "En attente", path: "/demandes/en-attente" },
                { name: "Validées", path: "/demandes/validees" },
                { name: "Closes", path: "/demandes/closes" },
                { name: "Rejetées", path: "/demandes/rejetees" },
            ],
        },
        {
            name: "Matériels",
            path: "/materiels",
            icon: Box,
            group: "Gestion",
            submenus: [
                { name: "Inventaire global", path: "/materiels/inventaire" },
                { name: "En cours", path: "/materiels/en-cours" },
            ],
        },
        { name: "Formulaire", path: "/templates", icon: ClipboardList, group: "Gestion" },
        { name: "Gestion des Membres", path: "/membres", icon: Users, group: "Gestion" },
        {
            name: "Statistiques",
            path: "/statistiques",
            icon: ChartNoAxesCombined,
            group: "Gestion",
            submenus: [
                { name: "Membres", path: "/statistiques/membres" },
                { name: "Matériels", path: "/statistiques/materiels" },
                { name: "Demandes", path: "/statistiques/demandes" },
            ],
        },
        { name: "Profil", path: "/profil", icon: User, group: "Navigation" },
        { name: "Paramètres", path: "/parametres", icon: Settings, group: "Navigation" },
    ]

    const getCommandsByRole = () => {
        switch (user.role) {
            case "DIRECTEUR":
                return directorCommands
            case "ADMIN":
                return adminCommands
            default:
                return memberCommands
        }
    }

    const commands = getCommandsByRole()

    const handleSelect = (path: string) => {
        handleNavigation(path, () => navigate(path))
    }

    return (
        <div className="relative hidden md:block">
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-10 w-64 pr-20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={open}
                />
                <Badge
                    variant="secondary"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono"
                >
                    Ctrl + /
                </Badge>
            </div>

            <CommandDialog
                open={isOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        close()
                    }
                }}
                className="z-50"
                title="Recherche"
                description="Rechercher et naviguer dans l'application"
            >
                <CommandInput
                    placeholder="Rechercher..."
                />
                <CommandList>
                    <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                    {Array.from(new Set(commands.map(cmd => cmd.group))).map((group, index) => (
                        <CommandGroup key={index} heading={group}>
                            {commands
                                .filter(cmd => cmd.group === group)
                                .map((item, itemIndex) => {
                                    const Icon = item.icon
                                    const isSelected = selectedPath === item.path
                                    return (
                                        <div key={itemIndex}>
                                            <CommandItem
                                                onSelect={() => handleSelect(item.path)}
                                                disabled={isNavigating}
                                                className={cn(
                                                    "transition-all duration-200",
                                                    isNavigating && "opacity-50 cursor-not-allowed",
                                                    isSelected && "bg-accent"
                                                )}
                                            >
                                                <Icon className={cn(
                                                    "mr-2 h-4 w-4 transition-transform duration-200",
                                                    isSelected && "scale-110"
                                                )} />
                                                {item.name}
                                            </CommandItem>
                                            {item.submenus?.map((submenu, subIndex) => {
                                                const isSubmenuSelected = selectedPath === submenu.path
                                                return (
                                                    <CommandItem
                                                        key={subIndex}
                                                        onSelect={() => handleSelect(submenu.path)}
                                                        className={cn(
                                                            "pl-8 transition-all duration-200",
                                                            isNavigating && "opacity-50 cursor-not-allowed",
                                                            isSubmenuSelected && "bg-accent"
                                                        )}
                                                        disabled={isNavigating}
                                                    >
                                                        <div className={cn(
                                                            "w-1 h-1 rounded-full bg-current mr-2 transition-all duration-200",
                                                            isSubmenuSelected ? "opacity-100 scale-125" : "opacity-60"
                                                        )}></div>
                                                        {submenu.name}
                                                    </CommandItem>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                        </CommandGroup>
                    ))}
                    <CommandSeparator />
                    <CommandGroup heading="Recherche">
                        <CommandItem
                            onSelect={() => {
                                setSearchQuery("")
                                close()
                            }}
                            disabled={isNavigating}
                            className={cn(
                                "transition-all duration-200",
                                isNavigating && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            Rechercher...
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}

export default SearchCommand 