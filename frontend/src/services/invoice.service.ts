import axios from 'axios';
import { API_URL } from '../config';
import { Company } from './company.service';
import { Article } from './article.service';

export interface InvoiceItem {
  articleId: number;
  quantity: number;
  unitPrice?: number;
}

export interface CreateInvoiceData {
  issuerId: string;
  recipientId: string;
  items: InvoiceItem[];
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  issuer: Company;
  recipient: Company;
  items: Array<{
    id: number;
    article: Article;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    vatAmount: number;
  }>;
  totalAmount: number;
  totalVat: number;
}

class InvoiceService {
  async createInvoice(data: CreateInvoiceData): Promise<Invoice> {
    const response = await axios.post(`${API_URL}/invoices`, data);
    return response.data;
  }

  async getInvoice(id: number): Promise<Invoice> {
    const response = await axios.get(`${API_URL}/invoices/${id}`);
    return response.data;
  }

  async getInvoicesByCompany(companyId: string): Promise<Invoice[]> {
    const response = await axios.get(`${API_URL}/invoices/company/${companyId}`);
    return response.data;
  }
}

export const invoiceService = new InvoiceService(); 