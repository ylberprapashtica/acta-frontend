import { Article } from '../types/article';
import axiosInstance from './axios';

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
    const response = await axiosInstance.get(`/articles?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getArticle(id: number): Promise<Article> {
    const response = await axiosInstance.get(`/articles/${id}`);
    return response.data;
  }

  async createArticle(article: Omit<Article, 'id'>): Promise<Article> {
    const response = await axiosInstance.post('/articles', article);
    return response.data;
  }

  async updateArticle(id: number, article: Partial<Article>): Promise<Article> {
    const response = await axiosInstance.patch(`/articles/${id}`, article);
    return response.data;
  }

  async deleteArticle(id: number): Promise<void> {
    await axiosInstance.delete(`/articles/${id}`);
  }
}

export const articleService = new ArticleService(); 