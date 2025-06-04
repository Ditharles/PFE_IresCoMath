import { Role } from "./request";

export type User = {
  userId: string;
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  role: Role;
  photo: string;
  cin?: string;
  phone?: string;
  bankData?: string;
  createdAt: string;
  updatedAt: string;
  thesisYear?: number;
  masterYear?: number;
  grade?: string;
  position?: string;
  supervisorId?: string;
  thesisSupervisorId?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  encadrant?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  institution?: string;
  masterStudents?: User[];
  doctoralStudents?: User[];
  fullName?: string;
};
