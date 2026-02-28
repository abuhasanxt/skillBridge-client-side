export type Tutor = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  isBanned: boolean;
  role: string;
  phone: string | null;
};