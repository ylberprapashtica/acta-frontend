import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Response } from 'express';

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

  @Get(':id/pdf')
  async downloadPdf(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.invoiceService.generatePdf(+id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="invoice-${id}.pdf"`,
    });
    res.send(buffer);
  }
} 