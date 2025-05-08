export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  biography: string;
  gender: string;
  birthdate: string | Date | "";
  avatar: string;
}
