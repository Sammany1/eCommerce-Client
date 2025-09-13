import { User } from "./user.model";

export interface AuthResponse {
    token: string;
    tokenType: string;
    expireIn: number;
    user: User;
}