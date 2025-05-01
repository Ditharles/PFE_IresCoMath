import { Request, Response, NextFunction } from "express";
import { Role, Grade, RequestStatus, User } from "../../generated/prisma";

export interface AuthRequest extends Request {
  user: User;
}

export interface AuthResponse extends Response {
  locals: Record<string, any>;
}

export type AuthHandler = (
  req: AuthRequest,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export interface RequestEnseignant {
  nom: string;
  prenom: string;
  email: string;
  photo: string;
  fonction: string;
  grade: Grade;
  etablissement: string;
  status: RequestStatus;
}

export interface RequestDoctorant {
  nom: string;
  prenom: string;
  email: string;
  annee_these: string;
  directeur_these?: { id: string };
  directeur_these_id: string;
  status: RequestStatus;
}

export interface RequestMaster {
  nom: string;
  prenom: string;
  email: string;
  annee_master: string;
  encadrant?: { id: string };
  encadrant_id: string;
  status: RequestStatus;
}

export type RequestType = RequestEnseignant | RequestDoctorant | RequestMaster;

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
