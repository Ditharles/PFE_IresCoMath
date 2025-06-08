import { FileText, ClipboardList, Package, BarChart3 } from "lucide-react";

export const features = [
    {
        title: "Gestion des demandes",
        description:
            "Centralisez et suivez toutes les demandes administratives du laboratoire. Gagnez du temps et réduisez les erreurs avec notre système intelligent.",
        icon: <FileText className="h-8 w-8 text-white" />,
    },
    {
        title: "Gestion des formulaires",
        description:
            "Créez, personnalisez et gérez facilement tous vos formulaires administratifs. Automatisez la collecte de données avec des formulaires intelligents.",
        icon: <ClipboardList className="h-8 w-8 text-white" />,
    },
    {
        title: "Suivi du matériel",
        description:
            "Gérez l'inventaire, l'état et la disponibilité du matériel scientifique et administratif avec une interface moderne et intuitive.",
        icon: <Package className="h-8 w-8 text-white" />,
    },
    {
        title: "Rapports et statistiques",
        description:
            "Générez des rapports détaillés et visualisez des statistiques en temps réel pour piloter efficacement l'activité du laboratoire.",
        icon: <BarChart3 className="h-8 w-8 text-white" />,
    },
]