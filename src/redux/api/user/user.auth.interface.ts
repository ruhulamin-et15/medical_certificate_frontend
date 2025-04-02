export interface LoginUserInterface {
  email: string;
  password: string;
}
export interface RegisterUserInterface {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string | null;
}
