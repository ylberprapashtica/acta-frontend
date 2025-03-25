import React, { useState, useMemo } from 'react';
import { Invoice } from '../types/invoice';
import { DataList } from './common/DataList';
import { DateRangeFilter } from './common/DateRangeFilter';
import { invoiceService } from '../services/invoice.service';

interface InvoiceListProps {
  invoices: Invoice[];
  onInvoiceClick: (invoice: Invoice) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ 
  invoices, 
  onInvoiceClick, 
  currentPage,
  totalPages,
  onPageChange 
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.issueDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return invoiceDate >= start && invoiceDate <= end;
      } else if (start) {
        return invoiceDate >= start;
      } else if (end) {
        return invoiceDate <= end;
      }
      return true;
    });
  }, [invoices, startDate, endDate]);

  const handleDownloadPdf = async (invoice: Invoice) => {
    try {
      setDownloadingId(invoice.id);
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
      setDownloadingId(null);
    }
  };

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
      label: downloadingId ? 'Downloading...' : 'Download PDF',
      onClick: handleDownloadPdf,
      variant: 'secondary' as const,
      disabled: downloadingId !== null,
    },
  ];

  return (
    <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>
      </div>
      <DataList
        data={filteredInvoices}
        columns={columns}
        actions={actions}
        onRowClick={onInvoiceClick}
        pagination={{
          currentPage,
          totalPages,
          onPageChange,
        }}
      />
    </div>
  );
}; 