export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  readTime: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchHistory {
  _id: string;
  userId: string;
  query: string;
  results: number;
  aiResponse: string;
  timestamp: Date;
}

export interface Resource {
  _id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  type: 'tool' | 'article' | 'course' | 'community';
  createdAt: Date;
}

export interface SearchResponse {
  query: string;
  response: string;
  sources: Article[];
  timestamp: Date;
}

export interface DashboardStats {
  totalSearches: number;
  totalUsers: number;
  totalArticles: number;
  totalResources: number;
  searchTrend: { date: string; count: number }[];
  topQueries: { query: string; count: number }[];
}
