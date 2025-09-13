export interface LoginRequest {
    username: string;
    password: string;
}

export const DEFAULT_LOGIN_REQUEST: LoginRequest = {
    username: "",
    password: ""
};