import { ArrowLeft } from "lucide-react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { Role } from "../../../../types/request";
import { Button } from "../../../ui/button";


export const NotFoundComponent = () => {
  const role = useAuth().user?.role;
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <XCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium">Demande non trouvée</h3>
        <p className="mt-1 text-sm text-gray-500">
          La demande que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <Button
          className="mt-4"
          onClick={() => role === Role.DIRECTEUR ? navigate("/demandes") : navigate("/historique")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux demandes
        </Button>
      </div>
    </div>
  );
};