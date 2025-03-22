import axios from 'axios';
import { Company, CreateCompanyDto } from '../types/company';
import api from './api';

const API_URL = '/companies';

export const companyService = {
  async getAll(): Promise<Company[]> {
    const response = await api.get<Company[]>(API_URL);
    console.log('API Response:', response.data);
    return response.data;
  },

  async getById(id: string): Promise<Company> {
    const response = await api.get<Company>(`${API_URL}/${id}`);
    return response.data;
  },

  async create(company: CreateCompanyDto): Promise<Company> {
    const response = await api.post<Company>(API_URL, company);
    return response.data;
  },

  async update(id: string, company: Partial<CreateCompanyDto>): Promise<Company> {
    const response = await api.patch<Company>(`${API_URL}/${id}`, company);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${API_URL}/${id}`);
  },
}; 