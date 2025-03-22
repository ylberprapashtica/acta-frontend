import { Article, CreateArticleDto, UpdateArticleDto } from '../types/article';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class ArticleService {
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

  async getAll(): Promise<Article[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return response.json();
  }

  async getById(id: number): Promise<Article> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return response.json();
  }

  async create(article: CreateArticleDto): Promise<Article> {
    const response = await fetch(this.baseUrl, {
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

  async update(id: number, article: UpdateArticleDto): Promise<Article> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
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

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete article');
    }
  }
} 