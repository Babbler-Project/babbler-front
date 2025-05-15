export interface AuthResponse {
  type: string;
  token: string;
  user: User;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  roleId: number;
  firstName?: string;
  lastName?: string;
}

export interface Role {
  id: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  roleId: number;
  role: Role;
  fullName: string | null;
}

export interface JwtPayload {
  userId: number;
  role?: string;
  iat?: number;
  exp?: number;
}
