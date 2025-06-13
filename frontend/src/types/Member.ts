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
  status?: string;
  bankData?: string;
  createdAt: string;
  updatedAt: string;
  thesisYear?: number;
  masterYear?: number;
  grade?: string;
  position?: string;
  thesisSupervisorId?: string;
  thesisSupervisor?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  supervisorId?: string;
  supervisor?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  institution?: string;
  masterStudents?: User[];
  doctoralStudents?: User[];
  fullName?: string;
};
