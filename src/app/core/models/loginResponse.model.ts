import { AuthResponse } from "./authResponse.model";

export interface LoginResponse {
    success: boolean;
    message: string;
    data: AuthResponse;
}

export const DEFAULT_LOGIN_RESPONSE: LoginResponse = {
  success: false,
  message: '',
  data: {
    token: '',
    tokenType: '',
    expireIn: 0,
    user: {
      id: 0,
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      role: 0,
      dateOfBirth: new Date()
    }
  }
};