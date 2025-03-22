import React from 'react';
import { Invoice } from '../services/invoice.service';
import { DataList } from './common/DataList';

interface InvoiceListProps {
  invoices: Invoice[];
  onInvoiceClick: (invoice: Invoice) => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, onInvoiceClick }) => {
  const columns = [
    {
      header: 'Invoice Number',
      accessor: (invoice: Invoice) => `#${invoice.invoiceNumber}`,
    },
    {
      header: 'Issue Date',
      accessor: (invoice: Invoice) => new Date(invoice.issueDate).toLocaleDateString(),
    },
    {
      header: 'Recipient',
      accessor: (invoice: Invoice) => invoice.recipient.businessName,
    },
    {
      header: 'Total Amount',
      accessor: (invoice: Invoice) => `€${Number(invoice.totalAmount).toFixed(2)}`,
      align: 'right' as const,
    },
  ];

  const actions = [
    {
      label: 'View Details',
      onClick: (invoice: Invoice) => onInvoiceClick(invoice),
      variant: 'primary' as const,
    },
    {
      label: 'Download PDF',
      onClick: (invoice: Invoice) => {
        window.open(`${import.meta.env.VITE_API_URL}/invoices/${invoice.id}/pdf`, '_blank');
      },
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
        </div>
      </div>
      <DataList
        data={invoices}
        columns={columns}
        actions={actions}
        onRowClick={onInvoiceClick}
      />
    </div>
  );
}; 