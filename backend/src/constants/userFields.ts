import { RequestRole } from "../utils/validateUtils";

export const doctoralStudentFields = {
  id: true,

  thesisYear: true,
  thesisSupervisorId: true,
  thesisSupervisor: true,
};

export const masterStudentFields = {
  id: true,

  masterYear: true,
  supervisorId: true,
  supervisor: true,
};

export const teacherResearcherFields = {
  id: true,

  position: true,
  grade: true,
  institution: true,
  masterStudents: { select: masterStudentFields },
  doctoralStudents: { select: doctoralStudentFields },
};

export const userFields = {
  id: true,
  email: true,
  lastName: true,
  firstName: true,
  photo: true,
  role: true,
  createdAt: true,
  phone: true,
  cin: true,
  bankData: true,
  teacherResearcher: { select: teacherResearcherFields },
  doctoralStudent: { select: doctoralStudentFields },
  masterStudent: { select: masterStudentFields },
  admin: true,
};

export const doctoralStudentRequestFields = {
  id: true,
  lastName: true,
  firstName: true,
  email: true,
  thesisYear: true,
  createdAt: true,
  thesisSupervisorId: true,
  photo: true,
  status: true,
};

export const masterStudentRequestFields = {
  id: true,
  lastName: true,
  firstName: true,
  email: true,
  masterYear: true,
  createdAt: true,
  supervisorId: true,
  photo: true,
  status: true,
};

export const fields: Record<RequestRole, any> = {
  ENSEIGNANT: {
    id: true,
    lastName: true,
    firstName: true,
    email: true,
    position: true,
    grade: true,
    createdAt: true,
    photo: true,
    status: true,
  },
  MASTER: masterStudentRequestFields,
  DOCTORANT: doctoralStudentRequestFields,
};
