// Public-facing localized blog post
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  color: string;
  featured: boolean;
}

// Database blog post model (for admin pages)
export interface Blog {
  _id: string;
  id: number;
  title: {
    en: string;
    fr: string;
  };
  excerpt: {
    en: string;
    fr: string;
  };
  content: {
    en: string;
    fr: string;
  };
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  color: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
