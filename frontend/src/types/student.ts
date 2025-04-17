export interface StudentData {
    etablissement: string;
    encadrant: string;
    photo: File | null;
  }
  
  export interface FormSpecificProps {
    data: StudentData;
    onChange: (data: StudentData) => void;
  }