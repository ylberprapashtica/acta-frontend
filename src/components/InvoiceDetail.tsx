import React, { useState } from 'react';
import { Invoice, InvoiceItem } from '../types/invoice';
import { invoiceService } from '../services/InvoiceService';

interface InvoiceDetailProps {
  invoice: Invoice;
}

export const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ invoice }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      const blob = await invoiceService.downloadPdf(invoice.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Invoice Details
            </h3>
            <p className="mt-1 text-sm text-secondary">
              Invoice #{invoice.invoiceNumber}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                isDownloading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </button>
            <div className="text-right">
              <p className="text-sm text-secondary">Issue Date</p>
              <p className="text-base font-medium text-gray-900">
                {new Date(invoice.issueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium text-secondary mb-2">Issuer</h4>
            <p className="text-base text-gray-900">{invoice.issuer.businessName}</p>
            <p className="text-sm text-secondary">{invoice.issuer.address}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-secondary mb-2">Recipient</h4>
            <p className="text-base text-gray-900">{invoice.recipient.businessName}</p>
            <p className="text-sm text-secondary">{invoice.recipient.address}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                Article
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                Unit Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                VAT
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoice.items.map((item: InvoiceItem) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.article.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  €{Number(item.unitPrice).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  €{Number(item.totalPrice).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  €{Number(item.vatAmount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-end space-x-8">
          <div className="text-right">
            <p className="text-sm text-secondary">Total Amount</p>
            <p className="text-lg font-semibold text-gray-900">
              €{Number(invoice.totalAmount).toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-secondary">Total VAT</p>
            <p className="text-lg font-semibold text-gray-900">
              €{Number(invoice.totalVat).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 