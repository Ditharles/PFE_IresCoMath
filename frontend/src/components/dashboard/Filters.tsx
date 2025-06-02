// Filters.jsx
import { Search, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { RoleEnum } from "../../types/common";
import { RequestStatus } from "../../types/MemberAddRequest";
import { set } from "date-fns";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filterRole: string;
  setFilterRole: (value: string) => void;
  filterStatus?: RequestStatus;
  setFilterStatus: (value: RequestStatus | undefined) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
  clearFilters: () => void;
  showStatusFilter?: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filterRole,
  setFilterRole,
  filterStatus,
  setFilterStatus,
  activeTab,
  setActiveTab,
  clearFilters,
  showStatusFilter = true
}) => {
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setFilterRole(value === "all" ? "" : value);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center p-1">
          <CardTitle>Filtres</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearFilters();
              setActiveTab("all");
            }}
            className="text-muted-foreground"
            disabled={!searchQuery && !filterRole && !filterStatus}
          >
            <X className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher nom, prénom ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {showStatusFilter && (
            <Select
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value as RequestStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={RequestStatus.APPROVED}>Approuvé</SelectItem>
                <SelectItem value={RequestStatus.PENDING}>En attente</SelectItem>
                <SelectItem value={RequestStatus.REJECTED}>Rejeté</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">Tous</TabsTrigger>
              <TabsTrigger value={RoleEnum.DOCTORANT} className="flex-1">Doctorants</TabsTrigger>
              <TabsTrigger value={RoleEnum.MASTER} className="flex-1">Masters</TabsTrigger>
              <TabsTrigger value={RoleEnum.ENSEIGNANT} className="flex-1">Enseignants</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default Filters;