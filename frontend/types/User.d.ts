export interface User {
  id: number;
  username: string;
  fullName: string;
  biography: string;
  gender: string;
  birthdate: string | Date | "";
}
