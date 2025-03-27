import axiosInstance from './axios';
import { useTenant } from '../contexts/TenantContext';
import { Company, CreateCompanyDto } from '../types/company';

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

class CompanyService {
  async getCompanies(page = 1, limit = 10): Promise<PaginatedResponse<Company>> {
    const response = await axiosInstance.get('/companies', {
      params: { page, limit },
    });
    return response.data;
  }

  async getCompany(id: string): Promise<Company> {
    const response = await axiosInstance.get(`/companies/${id}`);
    return response.data;
  }

  async createCompany(companyData: CreateCompanyDto): Promise<Company> {
    const response = await axiosInstance.post('/companies', companyData);
    return response.data;
  }

  async updateCompany(id: string, companyData: Partial<CreateCompanyDto>): Promise<Company> {
    const response = await axiosInstance.patch(`/companies/${id}`, companyData);
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