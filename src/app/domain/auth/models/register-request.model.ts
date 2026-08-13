export interface RegisterRequest {
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}
