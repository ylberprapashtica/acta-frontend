import axios from 'axios';
import { API_URL } from '../config';

export interface Company {
  id: string;
  businessName: string;
  tradeName?: string;
  businessType: string;
  uniqueIdentificationNumber: string;
  businessNumber?: string;
  fiscalNumber?: string;
  vatNumber?: string;
  registrationDate: string;
  municipality: string;
  address: string;
  phoneNumber: string;
  email: string;
  bankAccount?: string;
}

class CompanyService {
  async getCompanies(): Promise<Company[]> {
    const response = await axios.get(`${API_URL}/companies`);
    return response.data;
  }

  async getCompany(id: string): Promise<Company> {
    const response = await axios.get(`${API_URL}/companies/${id}`);
    return response.data;
  }

  async createCompany(data: Omit<Company, 'id'>): Promise<Company> {
    const response = await axios.post(`${API_URL}/companies`, data);
    return response.data;
  }

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    const response = await axios.patch(`${API_URL}/companies/${id}`, data);
    return response.data;
  }

  async deleteCompany(id: string): Promise<void> {
    await axios.delete(`${API_URL}/companies/${id}`);
  }
}

export const companyService = new CompanyService(); 