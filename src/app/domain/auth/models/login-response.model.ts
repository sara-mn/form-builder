export interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    roles?: string[];
  };
}
