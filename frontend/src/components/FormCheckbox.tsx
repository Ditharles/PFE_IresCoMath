import React from 'react';

interface FormCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <div className="checkbox-container">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className="checkbox"
        />
        <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-slideIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormCheckbox;