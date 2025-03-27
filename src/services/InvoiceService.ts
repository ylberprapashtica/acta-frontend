import { Invoice } from '../types/invoice';
import axiosInstance from './axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

export interface CreateInvoiceData {
  issuerId: string;
  recipientId: string;
  items: Array<{
    articleId: number;
    quantity: number;
    unitPrice?: number;
  }>;
  issueDate?: string | Date;
}

class InvoiceService {
  async getInvoices(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Invoice>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await axiosInstance.get(`/invoices?${params.toString()}`);
    return response.data;
  }

  async getInvoice(id: number): Promise<Invoice> {
    const response = await axiosInstance.get(`/invoices/${id}`);
    return response.data;
  }

  async createInvoice(data: CreateInvoiceData): Promise<Invoice> {
    const response = await axiosInstance.post('/invoices', data);
    return response.data;
  }

  async updateInvoice(id: number, data: CreateInvoiceData): Promise<Invoice> {
    const response = await axiosInstance.put(`/invoices/${id}`, data);
    return response.data;
  }

  async getInvoicesByCompany(companyId: string, page: number = 1, limit: number = 100): Promise<PaginatedResponse<Invoice>> {
    const response = await axiosInstance.get(`/invoices/company/${companyId}?page=${page}&limit=${limit}`);
    return response.data;
  }

  async downloadPdf(id: number): Promise<Blob> {
    const response = await axiosInstance.get(`/invoices/${id}/pdf`, {
      responseType: 'blob'
    });
    return response.data;
  }

  async deleteInvoice(id: number): Promise<void> {
    await axiosInstance.delete(`/invoices/${id}`);
  }
}

export const invoiceService = new InvoiceService(); 