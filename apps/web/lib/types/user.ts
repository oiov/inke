export interface User {
  id?: string;
  name?: string;
  email: string;
  emailVerified: string;
  image?: string;
  credit: number;
  active: number;
  plan: string;
}
