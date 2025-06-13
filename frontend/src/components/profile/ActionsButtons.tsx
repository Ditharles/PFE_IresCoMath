import { Check, X, Pencil, Trash2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


interface ActionButtonsProps {
  isCurrentUser: boolean;
  isAdmin: boolean;
  isDirector: boolean;
  isTargetAdminOrDirector: boolean;
  isDesactivated: boolean;
  editMode: boolean;
  isUploading: boolean;
  showDeleteAlert: boolean;
  confirmationText: string;
  onEdit: () => void;
  onSave: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  onShowDeleteAlert: (show: boolean) => void;
  onConfirmationTextChange: (text: string) => void;
  onDesactivate: () => void;
  onReactivate: () => void;
}

export function ActionButtons({
  isCurrentUser,
  isAdmin,
  isDirector,
  isTargetAdminOrDirector,
  isDesactivated,
  editMode,
  isUploading,
  showDeleteAlert,
  confirmationText,
  onEdit,
  onSave,
  onCancelEdit,
  onDelete,
  onShowDeleteAlert,
  onConfirmationTextChange,
  onDesactivate,
  onReactivate,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      {isCurrentUser && (
        <>
          {editMode ? (
            <>
              <Button
                onClick={onSave}
                size="sm"
                variant="default"
                disabled={isUploading}
              >
                <Check className="mr-2 h-4 w-4" />
                Soumettre
              </Button>
              <Button onClick={onCancelEdit} size="sm" variant="outline">
                <X className="mr-2 h-4 w-4" />
                Annuler
              </Button>
            </>
          ) : (
            <Button onClick={onEdit} size="sm" variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          )}
        </>
      )}

      {/* Boutons Admin - Suppression */}
      {isAdmin && !isTargetAdminOrDirector && !isCurrentUser && !isTargetAdminOrDirector && (
        <>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onShowDeleteAlert(true)}
          >
            <Trash2 className="mr-2 w-4 h-4" />
            Supprimer le compte
          </Button>
          {showDeleteAlert && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Confirmer la suppression</AlertTitle>
              <AlertDescription>
                <div className="mt-2">
                  <p className="mb-4">
                    Cette action est irréversible. Veuillez taper "Confirmer"
                    pour confirmer la suppression.
                  </p>
                  <Input
                    placeholder="Tapez 'Confirmer'"
                    value={confirmationText}
                    onChange={(e) => onConfirmationTextChange(e.target.value)}
                    className="mb-4"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        onShowDeleteAlert(false);
                        onConfirmationTextChange("");
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={onDelete}
                      disabled={confirmationText !== "Confirmer"}
                    >
                      Confirmer la suppression
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </>
      )}

      {/* Boutons Directeur - Désactivation */}
      {isDirector && !isCurrentUser && !isDesactivated && (
        <Button size="sm" variant="destructive" onClick={onDesactivate}>
          <Trash2 className="mr-2 w-4 h-4" />
          Désactiver le compte
        </Button>
      )}
      {isDirector && !isCurrentUser && isDesactivated && (
        <Button size="sm" variant="default" onClick={onReactivate}>
          <Check className="mr-2 w-4 h-4" />
          Activer le compte
        </Button>
      )}
    </div>
  );
}