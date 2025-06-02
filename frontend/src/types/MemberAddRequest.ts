type DoctoralStudentRequest = {
  id?: string;
  lastName: string;
  firstName: string;
  email: string;
  thesisYear: number;
  createdAt: Date;
  thesisSupervisorId: string;
  thesisSupervisor?: { id: string; lastName: string; firstName: string };
  status: RequestStatus;
  rejectionReason?: string;
  photo?: string;
  isConfirmed?: boolean;
};

type MasterStudentRequest = {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  masterYear: number;
  createdAt: Date;
  supervisorId: string;
  supervisor?: { id: string; lastName: string; firstName: string };
  status: RequestStatus;
  rejectionReason?: string;
  photo?: string;
  isConfirmed?: boolean;
};

type TeacherResearcherRequest = {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  position: string;
  grade: Grade;
  institution: string;
  status: RequestStatus;
  isConfirmed?: boolean;
  rejectionReason?: string;
  photo?: string;
  createdAt: Date;
};

export type RequestUser =
  | DoctoralStudentRequest
  | MasterStudentRequest
  | TeacherResearcherRequest;

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  APPROVED_BY_SUPERVISOR = "APPROVED_BY_SUPERVISOR",
  APPROVED_BY_DIRECTOR = "APPROVED_BY_DIRECTOR",
  REJECTED = "REJECTED",
  REJECTED_BY_SUPERVISOR = "REJECTED_BY_SUPERVISOR",
  REJECTED_BY_DIRECTOR = "REJECTED_BY_DIRECTOR",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
}
export enum Grade {
  Assistant,
  MaitreAssistant,
  MaitreDeConference,
  Professeur,
}
