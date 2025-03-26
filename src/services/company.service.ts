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
  async getCompanies(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Company>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await axiosInstance.get(`/companies?${params.toString()}`);
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

  async uploadLogo(id: string, file: File): Promise<Company> {
    const formData = new FormData();
    formData.append('logo', file);
    const response = await axiosInstance.post(`/companies/${id}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async removeLogo(id: string): Promise<Company> {
    const response = await axiosInstance.delete(`/companies/${id}/logo`);
    return response.data;
  }
}

export const companyService = new CompanyService(); 