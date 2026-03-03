export interface Category {
  id: string;
  name: string;
  price: number;
  description: string;
  tutorProfileId: string;
  createdAt: string; // ISO date string
}

export interface TutorProfile {
  id: string;
  bio: string;
  subject: string[]; 
  hourlyPrice: number;
  rating: number; 
  authorId: string;
  createdAt: string;
  updatedAt: string; 
  categories: Category[];
}
