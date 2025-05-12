export type User = {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  role: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  thesisYear?: number;
  masterYear?: number;
  supervisorId?: string;
  thesisSupervisorId?: string;
  institution?: string;
};
