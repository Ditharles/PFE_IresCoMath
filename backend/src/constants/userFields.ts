import { RequestRole } from "../utils/validateUtils";

export const doctoralStudentFields = {
    id: true,
    lastName: true,
    firstName: true,
    thesisYear: true,
    thesisSupervisorId: true,
    photo: true,
};

export const masterStudentFields = {
    id: true,
    lastName: true,
    firstName: true,
    masterYear: true,
    supervisorId: true,
    photo: true,
};

export const teacherResearcherFields = {
    id: true,
    lastName: true,
    firstName: true,
    position: true,
    grade: true,
    photo: true,
    masterStudents: { select: masterStudentFields },
    doctoralStudents: { select: doctoralStudentFields },
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
  