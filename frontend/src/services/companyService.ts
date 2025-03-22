import { Company } from '../types/company';

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

class CompanyService {
  async getAll(page: number = 1, limit: number = 100): Promise<PaginatedResponse<Company>> {
    const response = await fetch(`${API_URL}/companies?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch companies');
    }
    return response.json();
  }

  async getOne(id: string): Promise<Company> {
    const response = await fetch(`${API_URL}/companies/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch company');
    }
    return response.json();
  }

  async create(company: Omit<Company, 'id'>): Promise<Company> {
    const response = await fetch(`${API_URL}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    });
    if (!response.ok) {
      throw new Error('Failed to create company');
    }
    return response.json();
  }

  async update(id: string, company: Partial<Company>): Promise<Company> {
    const response = await fetch(`${API_URL}/companies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    });
    if (!response.ok) {
      throw new Error('Failed to update company');
    }
    return response.json();
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/companies/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete company');
    }
  }
}

export const companyService = new CompanyService(); 