import { Invoice } from '../types/invoice';

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
}

class InvoiceService {
  async getInvoices(page: number = 1, limit: number = 100): Promise<PaginatedResponse<Invoice>> {
    const response = await fetch(`${API_URL}/invoices?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    return response.json();
  }

  async getInvoice(id: number): Promise<Invoice> {
    const response = await fetch(`${API_URL}/invoices/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch invoice');
    }
    return response.json();
  }

  async createInvoice(data: CreateInvoiceData): Promise<Invoice> {
    const response = await fetch(`${API_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create invoice');
    }
    return response.json();
  }

  async getInvoicesByCompany(companyId: string, page: number = 1, limit: number = 100): Promise<PaginatedResponse<Invoice>> {
    const response = await fetch(`${API_URL}/invoices/company/${companyId}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch company invoices');
    }
    return response.json();
  }

  async downloadPdf(id: number): Promise<Blob> {
    const response = await fetch(`${API_URL}/invoices/${id}/pdf`);
    if (!response.ok) {
      throw new Error('Failed to download invoice PDF');
    }
    return response.blob();
  }
}

export const invoiceService = new InvoiceService(); 