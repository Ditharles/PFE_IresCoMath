import { Pencil } from "lucide-react";
import { useState } from "react";

import type { EquipmentCategory } from "../../../../types/equipment";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { Separator } from "../../../ui/separator";
import EditCategory from "./EditCategory";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface CategoryDetailsProps {
    category: EquipmentCategory;
}

const CategoryDetails = ({ category }: CategoryDetailsProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const navigate = useNavigate();
    const getTypeBadgeVariant = (): "default" | "secondary" | "outline" => {
        switch (category.type) {
            case "EQUIPMENT":
                return "default";
            case "SUPPLIES":
                return "secondary";
            case "CONSUMABLES":
                return "outline";
            default:
                return "default";
        }
    };

    if (!category) {
        return <div>Aucune données disponibles</div>;
    }

    const availableCount = category.equipments?.filter(e => e.status === "AVAILABLE").length || 0;

    return (
        <>
        <Button
                variant="ghost"
                className="mb-4 cursor-pointer"
                onClick={() => navigate('/materiels/inventaire')}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la liste des categories
            </Button>
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">Détails de la catégorie</CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditModalOpen(true)}
                        aria-label="Modifier la catégorie"
                    >
                        <Pencil className="h-4 w-4 mr-2" />
                        Modifier
                    </Button>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <Separator className="my-2" />

                    {/* Section principale avec les informations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Nom</p>
                            <p className="text-lg">{category.name}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Type</p>
                            <Badge variant={getTypeBadgeVariant()}>
                                {category.type}
                            </Badge>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Quantité totale</p>
                            <p className="text-lg">{category.quantity}</p>
                        </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Équipements disponibles</p>
                        <p className="text-lg">{availableCount}</p>
                    </div>
                </div>

                <Separator className="my-4" />

                {/* Section description */}
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Description</p>
                    <p className="text-sm bg-muted/50 p-2 rounded">
                        {category.description || "Aucune description fournie"}
                    </p>
                </div>

                <Separator className="my-4" />

                {/* Section photos */}
                {category.photo && category.photo.length > 0 && (
                    <>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Photos</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {category.photo.map((photo, index) => (
                                    <div key={index} className="w-32 h-32 rounded-md overflow-hidden border">
                                        <img 
                                            src={photo} 
                                            alt={`Photo ${index + 1} de ${category.name}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Separator className="my-4" />
                    </>
                )}

                    {/* Section ID */}
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">ID de la catégorie</p>
                        <p className="text-sm font-mono bg-muted/50 p-2 rounded break-all">{category.id}</p>
                    </div>
                </CardContent>
            </Card>

            <EditCategory 
                category={category}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
        </>
    );
};

export default CategoryDetails;