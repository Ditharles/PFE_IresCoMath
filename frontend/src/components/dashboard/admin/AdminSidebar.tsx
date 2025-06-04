import { Link, useLocation } from "react-router-dom"
import { Users, UserCircle, Settings, LayoutDashboard } from "lucide-react"
import { ScrollArea } from "../../../components/ui/scroll-area"
import type React from "react"
import { cn } from "../../../lib/utils"

interface SidebarMenuItem {
    name: string
    path: string
    icon?: React.ElementType
}

const AdminSidebar = () => {
    const location = useLocation()
    const menuItems: SidebarMenuItem[] = [
        { name: "Membres", path: "/admin/membres", icon: Users },
        { name: "Profil", path: "/admin/profil", icon: UserCircle },
        { name: "Paramètres", path: "/admin/parametres", icon: Settings },
    ]

    const isActive = (path: string) => {
        return location.pathname === path
    }

    return (
        <aside className="h-full w-64 bg-card border-r border-border/40 shadow-sm z-40 backdrop-blur-sm">
            <div className="h-full flex flex-col">
                {/* Sidebar Header */}
                <div className="flex items-center h-16 px-4 border-b border-border/40">
                    <LayoutDashboard className="h-5 w-5 text-primary mr-2" />
                    <h2 className="text-lg font-semibold">Administration</h2>
                </div>

                {/* Sidebar Content */}
                <ScrollArea className="flex-1 py-2">
                    <nav className="px-2 space-y-1">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon
                            const active = isActive(item.path)

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

export default AdminSidebar 