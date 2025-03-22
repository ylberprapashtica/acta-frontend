import { Company } from './company';
import { Article } from './article';

export interface InvoiceItem {
  id: number;
  article: Article;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vatAmount: number;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  issuer: Company;
  recipient: Company;
  items: InvoiceItem[];
  totalAmount: number;
  totalVat: number;
  createdAt: string;
  updatedAt: string;
} 