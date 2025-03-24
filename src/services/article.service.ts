import { Article } from '../types/article';

const API_URL = import.meta.env.VITE_API_URL;

interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

class ArticleService {
  async getArticles(page: number = 1, limit: number = 100): Promise<PaginatedResponse<Article>> {
    const response = await fetch(`${API_URL}/articles?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return response.json();
  }

  async getArticle(id: number): Promise<Article> {
    const response = await fetch(`${API_URL}/articles/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return response.json();
  }

  async createArticle(article: Omit<Article, 'id'>): Promise<Article> {
    const response = await fetch(`${API_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    if (!response.ok) {
      throw new Error('Failed to create article');
    }
    return response.json();
  }

  async updateArticle(id: number, article: Partial<Article>): Promise<Article> {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    if (!response.ok) {
      throw new Error('Failed to update article');
    }
    return response.json();
  }

  async deleteArticle(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete article');
    }
  }
}

export const articleService = new ArticleService(); 