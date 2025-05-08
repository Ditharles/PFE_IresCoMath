export type Role =
  | "DOCTORANT"
  | "MASTER"
  | "ENSEIGNANT"
  | "DIRECTEUR"
  | "ADMIN"
  | "";

export enum RoleEnum {
  DOCTORANT = "DOCTORANT",
  MASTER = "MASTER",
  ENSEIGNANT = "ENSEIGNANT",
  DIRECTEUR = "DIRECTEUR",
  ADMIN = "ADMIN",
}

export interface CommonFields {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  cin: string;
}

export interface BaseSpecificFields {
  photo: string | null;
}

export interface DoctoralStudentFields extends BaseSpecificFields {
  institution: string;
  thesisYear: string;
  thesisSupervisor: string;
}

export interface MasterStudentFields extends BaseSpecificFields {
  institution: string;
  supervisor: string;
}

export interface TeacherResearcherFields extends BaseSpecificFields {
  grade: string;
  specialty: string;
}

export interface SpecificFieldsProps {
  data: BaseSpecificFields & { [key: string]: any };
  onChange: (data: { [key: string]: any }) => void;
}

export interface FileItem {
  url: string;
  name: string;
  type?: string;
}

export type UploadFileRoute = "profileImage";