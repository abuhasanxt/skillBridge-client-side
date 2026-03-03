export interface Tutor {
  id: string;
  authorId: string;
  bio: string;
  hourlyPrice: number;
  rating: number;
  subject: string[];
  createdAt: string;
}
export interface Category {
  id: string;
  name: string;
  price: number;
  description: string;
  tutors: Tutor;
}
