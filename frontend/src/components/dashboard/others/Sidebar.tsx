import { Link, useLocation } from "react-router-dom";
import { History, FilePlus2, User, Settings } from "lucide-react";
import { ScrollArea } from "../../../components/ui/scroll-area";

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const Sidebar = ({ darkMode = false }: { darkMode?: boolean }) => {
  const location = useLocation();

  const items: SidebarItem[] = [
    { name: "Historique", path: "/demandes", icon: History },
    { name: "Nouvelle demande", path: "/nouvelle-demande", icon: FilePlus2 },
    { name: "Profil", path: "/profil", icon: User },
    { name: "Paramètres", path: "/parametres", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <aside className={`h-full relative w-64 p-4 shadow-md z-40 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex flex-col h-full fixed">
        <ScrollArea className="flex-1">
          <ul className="space-y-2">
            {items.map((item, index) => {
              const isActiveItem = isActive(item.path);

              const linkClass = isActiveItem
                ? darkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-700"
                : darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700";

              const Icon = item.icon;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${linkClass}`}
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
