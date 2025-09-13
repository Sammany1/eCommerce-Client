export enum UserRole {
    Customer,
    Admin,
    SuperAdmin
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  dateOfBirth: Date;
}

export const DEFAULT_USER: User = {
  id: 0,
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  role: 0,
  dateOfBirth: new Date()
};