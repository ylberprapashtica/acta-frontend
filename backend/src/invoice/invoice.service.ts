import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceItem } from '../entities/invoice-item.entity';
import { Article } from '../entities/article.entity';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private invoiceItemRepository: Repository<InvoiceItem>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async createInvoice(data: {
    issuerId: string;
    recipientId: string;
    items: Array<{
      articleId: number;
      quantity: number;
      unitPrice?: number;
    }>;
  }) {
    const issuer = await this.companyRepository.findOne({ where: { id: data.issuerId } });
    const recipient = await this.companyRepository.findOne({ where: { id: data.recipientId } });

    if (!issuer || !recipient) {
      throw new NotFoundException('Issuer or recipient company not found');
    }

    // Create invoice items first to calculate totals
    const invoiceItems = await Promise.all(
      data.items.map(async (item) => {
        const article = await this.articleRepository.findOne({ where: { id: item.articleId } });
        if (!article) {
          throw new NotFoundException(`Article with ID ${item.articleId} not found`);
        }

        const invoiceItem = this.invoiceItemRepository.create({
          article,
          quantity: item.quantity,
          unitPrice: item.unitPrice || article.basePrice,
        });

        return this.invoiceItemRepository.save(invoiceItem);
      }),
    );

    // Calculate totals
    const totalAmount = invoiceItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalVat = invoiceItems.reduce((sum, item) => sum + item.vatAmount, 0);

    // Create and save invoice with totals
    const invoice = this.invoiceRepository.create({
      issuer,
      recipient,
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      invoiceNumber: `INV-${Date.now()}`,
      totalAmount,
      totalVat,
      items: invoiceItems,
    });

    return this.invoiceRepository.save(invoice);
  }

  async getInvoice(id: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['issuer', 'recipient', 'items', 'items.article'],
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async getInvoicesByCompany(companyId: string) {
    return this.invoiceRepository.find({
      where: [
        { issuer: { id: companyId } },
        { recipient: { id: companyId } },
      ],
      relations: ['issuer', 'recipient', 'items', 'items.article'],
    });
  }
} 