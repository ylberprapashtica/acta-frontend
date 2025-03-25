import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Invoice } from '../types/invoice';
import { invoiceService } from '../services/invoice.service';
import { DataList } from './common/DataList';

interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

export const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadInvoices(currentPage);
  }, [currentPage]);

  const loadInvoices = async (page: number) => {
    try {
      setLoading(true);
      const response = await invoiceService.getInvoices(page);
      setInvoices(response.items);
      setTotalPages(response.meta.lastPage);
      setError(null);
    } catch (err) {
      setError('Failed to load invoices');
      console.error('Error loading invoices:', err);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) {
      return;
    }

    try {
      await invoiceService.deleteInvoice(Number(id));
      await loadInvoices(currentPage);
    } catch (err) {
      setError('Failed to delete invoice');
      console.error(err);
    }
  };

  const columns = [
    {
      header: 'Invoice Number',
      accessor: (invoice: Invoice) => invoice.invoiceNumber,
    },
    {
      header: 'Recipient',
      accessor: (invoice: Invoice) => invoice.recipient.businessName,
    },
    {
      header: 'Issue Date',
      accessor: (invoice: Invoice) => new Date(invoice.issueDate).toLocaleDateString(),
    },
    {
      header: 'Due Date',
      accessor: (invoice: Invoice) => new Date(invoice.dueDate).toLocaleDateString(),
    },
    {
      header: 'Total Amount',
      accessor: (invoice: Invoice) => Number(invoice.totalAmount).toFixed(2),
      align: 'right' as const,
    },
  ];

  const actions = [
    {
      label: 'View',
      onClick: (invoice: Invoice) => {
        window.location.href = `/invoices/${invoice.id}`;
      },
      variant: 'primary' as const,
    },
    {
      label: 'Delete',
      onClick: (invoice: Invoice) => handleDelete(invoice.id),
      variant: 'danger' as const,
    },
  ];

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Invoices</h2>
        <Link
          to="/invoices/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New Invoice
        </Link>
      </div>

      <div className="md:bg-white md:shadow rounded-lg">
        {invoices.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600">No invoices found. Create your first invoice to get started.</p>
          </div>
        ) : (
          <DataList
            data={invoices}
            columns={columns}
            actions={actions}
            pagination={{
              currentPage,
              totalPages,
              onPageChange: setCurrentPage,
            }}
          />
        )}
      </div>
    </div>
  );
}; 