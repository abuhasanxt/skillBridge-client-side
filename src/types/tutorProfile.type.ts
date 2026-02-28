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
  subject: string[]; // e.g., ["biology", "phy"]
  hourlyPrice: number;
  rating: number; // e.g., 5
  authorId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  categories: Category[];
}
