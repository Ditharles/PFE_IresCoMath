export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  photo?: string;
  phone?: string;
  cin?: string;
  bankData?: string;
  createdAt?: string;
}
