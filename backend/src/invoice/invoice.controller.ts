import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  createInvoice(@Body() data: {
    issuerId: string;
    recipientId: string;
    items: Array<{
      articleId: number;
      quantity: number;
      unitPrice?: number;
    }>;
  }) {
    return this.invoiceService.createInvoice(data);
  }

  @Get(':id')
  getInvoice(@Param('id') id: string) {
    return this.invoiceService.getInvoice(+id);
  }

  @Get('company/:companyId')
  getInvoicesByCompany(@Param('companyId') companyId: string) {
    return this.invoiceService.getInvoicesByCompany(companyId);
  }
} 