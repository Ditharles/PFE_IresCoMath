import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Users, FileText, Settings, Box, User
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";
import { ScrollArea } from "../../../components/ui/scroll-area";

const Sidebar = ({ darkMode = false }: { darkMode?: boolean }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const menuItems = [
        {
            name: "Demandes",
            path: "/demandes",
            icon: FileText,
            submenus: [
                { name: "En attente", path: "/demandes/en-attente" },
                { name: "Validées", path: "/demandes/validees" },
                { name: "Closes", path: "/demandes/closes" },
                { name: "Rejetées", path: "/demandes/rejetees" }
            ]
        },
        {
            name: "Matériels",
            path: "/materiels",
            icon: Box,
            submenus: [
                { name: "Inventaire global", path: "/materiels/inventaire" },
                { name: "En cours", path: "/materiels/en-cours" }
            ]
        },
        { name: "Gestion des Membres", path: "/membres", icon: Users },
        { name: "Profil", path: "/profil", icon: User },
        { name: "Paramètres", path: "/parametres", icon: Settings }
    ];

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    const isParentActive = (item: any) => {
        return isActive(item.path) || item.submenus?.some((sub: any) => isActive(sub.path));
    };

    return (
        <aside
            className={` h-full relative w-64 p-4 shadow-md z-40 
        ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
            <div className="flex flex-col h-full fixed">



                <ScrollArea className="flex-1">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => {
                            const hasSubmenus = item.submenus ? item.submenus.length > 0 : false;
                            const active = isParentActive(item);
                            const Icon = item.icon;

                            const buttonClass = active
                                ? darkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-700"
                                : darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700";

                            if (hasSubmenus) {
                                return (
                                    <Accordion key={index} type="multiple" defaultValue={active ? [item.name] : []}>
                                        <AccordionItem value={item.name}>
                                            <AccordionTrigger
                                                onClick={() => navigate(item.path)}
                                                className={`px-4 py-2 rounded-md font-medium transition-colors ${buttonClass}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {Icon && <Icon className="w-4 h-4" />}
                                                    <span>{item.name}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="pl-4 mt-1 space-y-1">
                                                    {item.submenus?.map((submenu: { path: string; name: string }, subIndex: number) => (
                                                        <li key={subIndex}>
                                                            <Link
                                                                to={submenu.path}
                                                                className={`block rounded-md px-4 py-2 text-sm transition-colors
                                  ${isActive(submenu.path)
                                                                        ? darkMode
                                                                            ? "bg-blue-800/50 text-blue-100"
                                                                            : "bg-blue-50 text-blue-600"
                                                                        : darkMode
                                                                            ? "hover:bg-gray-700 text-gray-400"
                                                                            : "hover:bg-gray-50 text-gray-600"
                                                                    }`}
                                                            >
                                                                {submenu.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                );
                            }

                            return (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${buttonClass}`}
                                    >
                                        {Icon && <Icon className="w-4 h-4" />}
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </ScrollArea>
            </div>
        </aside>
    );
};

export default Sidebar;
