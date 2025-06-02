import { Role } from "./request";


export type User = {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  role: Role;
  photo: string;
  createdAt: string;
  updatedAt: string;
  thesisYear?: number;
  masterYear?: number;
  supervisorId?: string;
  thesisSupervisorId?: string;
  institution?: string;
};
