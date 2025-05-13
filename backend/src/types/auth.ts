import { Request, Response, NextFunction } from "express";
import { Role, Grade, RequestStatus, User } from "../../generated/prisma";

export interface AuthRequest extends Request {
  user: any;
}

export interface AuthResponse extends Response {
  locals: Record<string, any>;
}

export type AuthHandler = (
  req: AuthRequest,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export interface TeacherResearcherRequest {
  lastName: string;
  firstName: string;
  email: string;
  photo: string;
  position: string;
  grade: Grade;
  institution: string;
  status: RequestStatus;
  cin: string;
}

export interface DoctoralStudentRequest {
  lastName: string;
  firstName: string;
  email: string;
  thesisYear: string;
  thesisSupervisorId: string;
  status: RequestStatus;
  cin: string;
}

export interface MasterStudentRequest {
  lastName: string;
  firstName: string;
  email: string;
  masterYear: string;
  supervisorId: string;
  status: RequestStatus;
  cin: string;
}

export type UserRequest =
  | TeacherResearcherRequest
  | DoctoralStudentRequest
  | MasterStudentRequest;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}
