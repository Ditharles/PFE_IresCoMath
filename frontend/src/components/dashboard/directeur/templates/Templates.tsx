import { useState, useEffect } from "react";
import { FileDown, Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { columns } from "./columns";
import { Template } from "../../../../types/templates";
import TemplateService from "../../../../services/templates.service";
import { exportDataToCSV } from "../../../../utils/membersUtils";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { BaseDataTable } from "../../BaseDataTable";

const Templates = () => {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState("");

    const templateService = new TemplateService();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await templateService.getTemplates();
            setTemplates(response.data);
        } catch (error) {
            console.error("Error fetching templates:", error);
            const errorMessage = error instanceof Error
                ? error.message
                : "Erreur lors de la récupération des templates";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleTemplateDelete = async (templateId: string) => {
        try {
            setIsLoading(true);
            const response = await templateService.deleteTemplate(templateId);
            setTemplates(prev => prev.filter(template => template.id !== templateId));
            toast.success(response.data?.message);
        } catch (error) {
            console.error("Error deleting template:", error);
            const errorMessage = error instanceof Error
                ? error.message
                : "Erreur lors de la suppression du template";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredTemplates = templates.filter(template => {
        const searchTerm = globalFilter.toLowerCase();
        return template.name.toLowerCase().includes(searchTerm);
    });

    return (
        <div className="space-y-6 h-full bg-background text-foreground p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestion des templates de formulaire</h1>
                <div className="flex gap-2">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => navigate("/templates/ajouter")}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nouveau template
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportDataToCSV(templates, "templates")}
                    >
                        <FileDown className="h-4 w-4 mr-2" />
                        Exporter
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchData}
                        disabled={isLoading}
                    >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                        Actualiser
                    </Button>
                </div>
            </div>

            <div className="flex gap-4">
                <Input
                    placeholder="Rechercher un template..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-full md:w-[300px]"
                />
            </div>

            <BaseDataTable
                columns={columns({ onTemplateDelete: handleTemplateDelete })}
                data={filteredTemplates}
                isLoading={isLoading}
                onRefresh={fetchData}
            />
        </div>
    );
};

export default Templates;