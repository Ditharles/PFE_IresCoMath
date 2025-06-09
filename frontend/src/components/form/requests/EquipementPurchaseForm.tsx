import { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '../../ui/button';
import { Plus } from 'lucide-react';
import EquipmentPurchaseItem from './EquipmentPurchaseItem';

const EquipmentPurchaseForm: React.FC = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  // Ajout d'un matériel par défaut au montage du composant
  useEffect(() => {
    if (fields.length === 0) {
      append({
        equipmentType: '',
        name: '',
        specifications: {},
        quantity: 1,
        costEstimation: '0',
        productUrl: '',
        photo: '',
        notes: ''
      });
    }
  }, [append, fields.length]);

  const addNewEquipment = () => {
    append({
      equipmentType: '',
      name: '',
      specifications: {},
      quantity: 1,
      costEstimation: '0',
      productUrl: '',
      photo: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-8">
      {fields.map((field, index) => (
        <EquipmentPurchaseItem
          key={field.id}
          index={index}
          showDelete={fields.length > 1}
          onDelete={() => remove(index)}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addNewEquipment}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Ajouter un autre matériel
      </Button>
    </div>
  );
};

export default EquipmentPurchaseForm;