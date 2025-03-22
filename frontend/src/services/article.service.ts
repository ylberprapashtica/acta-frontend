import axios from 'axios';
import { API_URL } from '../config';
import { Article, CreateArticleDto, UpdateArticleDto } from '../types/article';

export interface Article {
  id: number;
  name: string;
  unit: string;
  code: string;
  vatCode: string;
  basePrice: number;
}

class ArticleService {
  private static instance: ArticleService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_URL}/articles`;
  }

  public static getInstance(): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService();
    }
    return ArticleService.instance;
  }

  async getArticles(): Promise<Article[]> {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
  }

  async getArticle(id: number): Promise<Article> {
    const response = await axios.get(`${API_URL}/articles/${id}`);
    return response.data;
  }

  async createArticle(data: Omit<Article, 'id'>): Promise<Article> {
    const response = await axios.post(`${API_URL}/articles`, data);
    return response.data;
  }

  async updateArticle(id: number, data: Partial<Article>): Promise<Article> {
    const response = await axios.patch(`${API_URL}/articles/${id}`, data);
    return response.data;
  }

  async deleteArticle(id: number): Promise<void> {
    await axios.delete(`${API_URL}/articles/${id}`);
  }
}

export const articleService = new ArticleService(); 