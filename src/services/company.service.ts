import axiosInstance from './axios';
import { Company, BusinessType } from '../types/company';

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
  async getCompanies(page: number = 1, limit: number = 100): Promise<PaginatedResponse<Company>> {
    const response = await axiosInstance.get(`/companies?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getCompany(id: string): Promise<Company> {
    const response = await axiosInstance.get(`/companies/${id}`);
    return response.data;
  }

  async createCompany(data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    const response = await axiosInstance.post('/companies', data);
    return response.data;
  }

  async updateCompany(id: string, data: Partial<Omit<Company, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Company> {
    const response = await axiosInstance.patch(`/companies/${id}`, data);
    return response.data;
  }

  async deleteCompany(id: string): Promise<void> {
    await axiosInstance.delete(`/companies/${id}`);
  }
}

export const companyService = new CompanyService(); 