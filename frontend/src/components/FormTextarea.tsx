import React from 'react';

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 4
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
      ></textarea>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-slideIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormTextarea;