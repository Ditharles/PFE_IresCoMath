import { Link, useLocation, useNavigate } from "react-router-dom"
import { Users, FileText, Settings, Box, User, LayoutDashboard } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { ClipboardList } from "lucide-react"
import type React from "react"
import { cn } from "../../../lib/utils"
import { ChartNoAxesCombined } from "lucide-react"

interface SidebarMenuItem {
    name: string
    path: string
    icon?: React.ElementType
    submenus?: { name: string; path: string }[]
}

const SidebarDirector = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const menuItems: SidebarMenuItem[] = [
        {
            name: "Demandes",
            path: "/demandes",
            icon: FileText,
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
            submenus: [
                { name: "Inventaire global", path: "/materiels/inventaire" },
                { name: "En cours", path: "/materiels/en-cours" },
            ],
        },
        { name: "Formulaire", path: "/templates", icon: ClipboardList },
        { name: "Gestion des Membres", path: "/membres", icon: Users },
        {
            name: "Statistiques", path: "/statistiques", icon: ChartNoAxesCombined,
            submenus: [
                { name: "Membres", path: "/statistiques/membres" },
                { name: "Matériels", path: "/statistiques/materiels" },
                { name: "Demandes", path: "/statistiques/demandes" },
            ]
        },
        { name: "Profil", path: "/profil", icon: User },
        { name: "Paramètres", path: "/parametres", icon: Settings },
    ]

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`)
    }

    const isParentActive = (item: SidebarMenuItem) => {
        return isActive(item.path) || item.submenus?.some((sub) => isActive(sub.path))
    }

    return (
        <aside className="h-full w-64 bg-card border-r border-border/40 shadow-sm z-40 backdrop-blur-sm">
            <div className="h-full flex flex-col">
                {/* Sidebar Header */}
                <div className="flex items-center h-16 px-4 border-b border-border/40">
                    <LayoutDashboard className="h-5 w-5 text-primary mr-2" />
                    <h2 className="text-lg font-semibold">Direction</h2>
                </div>

                {/* Sidebar Content */}
                <ScrollArea className="flex-1 py-2">
                    <nav className="px-2 space-y-1">
                        {menuItems.map((item, index) => {
                            const hasSubmenus = item.submenus && item.submenus.length > 0
                            const active = isParentActive(item)
                            const Icon = item.icon

                            if (hasSubmenus) {
                                return (
                                    <Accordion
                                        key={index}
                                        type="multiple"
                                        defaultValue={active ? [item.name] : []}
                                        className="border-none"
                                    >
                                        <AccordionItem value={item.name} className="border-none">
                                            <AccordionTrigger
                                                className={cn(
                                                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                                    "hover:bg-muted/80 hover:text-foreground dark:hover:bg-muted/50 gap-3 [&[data-state=open]>div>svg]:rotate-180",
                                                    active ? "bg-primary/10 text-primary" : "text-muted-foreground",
                                                )}
                                            >
                                                <div className="flex items-center gap-3 flex-1">
                                                    {Icon && <Icon className="h-4 w-4" />}
                                                    <span
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            navigate(item.path)
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pt-1 pb-0">
                                                <ul className="pl-7 space-y-1">
                                                    {item.submenus?.map((submenu, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link
                                                                to={submenu.path}
                                                                className={cn(
                                                                    "flex items-center rounded-md px-3 py-1.5 text-sm transition-colors duration-200 w-full",
                                                                    isActive(submenu.path)
                                                                        ? "bg-accent text-accent-foreground font-medium"
                                                                        : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/50",
                                                                )}
                                                            >
                                                                <div className="w-1 h-1 rounded-full bg-current mr-2 opacity-60"></div>
                                                                {submenu.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                )
                            }

                            return (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ",
                                        "hover:bg-muted/80 hover:text-foreground ",
                                        active ? "bg-primary/10 text-primary" : "text-muted-foreground",
                                    )}
                                >
                                    {Icon && <Icon className="h-4 w-4" />}
                                    <span>{item.name}</span>
                                    {active && <div className="ml-auto w-1 h-5 bg-primary rounded-full"></div>}
                                </Link>
                            )
                        })}
                    </nav>
                </ScrollArea>
            </div>
        </aside>
    )
}

export default SidebarDirector
