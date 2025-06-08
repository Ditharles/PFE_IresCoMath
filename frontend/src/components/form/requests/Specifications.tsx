import { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { FormLabel } from '../../ui/form';
import { Button } from '../../ui/button';
import { X, Plus } from 'lucide-react';

interface KeyValuePair {
  key: string;
  value: string;
}

interface SpecificationsProps {
  initialSpecifications?: KeyValuePair[];
  onChange: (specificationObject: Record<string, string>) => void;
}

const Specifications: React.FC<SpecificationsProps> = ({
  initialSpecifications = [{ key: '', value: '' }],
  onChange
}) => {
  const [specifications, setSpecifications] = useState<KeyValuePair[]>(initialSpecifications);

  useEffect(() => {

    if (initialSpecifications && initialSpecifications.length > 0) {
      setSpecifications(initialSpecifications);
    }
  }, []);

  const addSpecification = () => {
    const newSpecs = [...specifications, { key: '', value: '' }];
    setSpecifications(newSpecs);
    updateParentValue(newSpecs);
  };

  const removeSpecification = (specIndex: number) => {
    const newSpecs = specifications.filter((_, i) => i !== specIndex);
    setSpecifications(newSpecs);
    updateParentValue(newSpecs);
  };

  const handleSpecificationChange = (specIndex: number, field: 'key' | 'value', newValue: string) => {
    const newSpecs = [...specifications];
    newSpecs[specIndex][field] = newValue;
    setSpecifications(newSpecs);
    updateParentValue(newSpecs);
  };

  const updateParentValue = (specs: KeyValuePair[]) => {
    // Convertit le tableau de KeyValuePair en objet pour le formulaire parent
    const specObject = specs.reduce((acc, { key, value }) => {
      if (key) acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    // Notifie le parent du changement
    onChange(specObject);
  };

  return (
    <div className="space-y-4">
      <FormLabel>Spécifications techniques</FormLabel>
      {specifications.map((spec, specIndex) => (
        <div key={specIndex} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-5">
            <Input
              placeholder="Clé"
              value={spec.key}
              onChange={(e) => handleSpecificationChange(specIndex, 'key', e.target.value)}
            />
          </div>
          <div className="col-span-5">
            <Input
              placeholder="Valeur"
              value={spec.value}
              onChange={(e) => handleSpecificationChange(specIndex, 'value', e.target.value)}
            />
          </div>
          <div className="col-span-2 flex justify-center">
            {specifications.length > 1 && specIndex !== specifications.length - 1 ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeSpecification(specIndex)}
                className="h-9 w-9 text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addSpecification}
                className="h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Specifications;