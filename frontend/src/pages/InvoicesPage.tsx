import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Invoice, invoiceService, CreateInvoiceData } from '../services/invoice.service';
import { Company, companyService } from '../services/company.service';
import { Article, articleService } from '../services/article.service';
import { InvoiceList } from '../components/InvoiceList';
import { InvoiceDetail } from '../components/InvoiceDetail';
import { CreateInvoiceForm } from '../components/CreateInvoiceForm';

export const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [companiesData, articlesData] = await Promise.all([
          companyService.getCompanies(),
          articleService.getArticles(),
        ]);

        setCompanies(companiesData);
        setArticles(articlesData);

        // Get invoices for all companies
        const invoicesPromises = companiesData.map((company: Company) => 
          invoiceService.getInvoicesByCompany(company.id)
        );
        const allInvoicesArrays = await Promise.all(invoicesPromises);
        const allInvoices = allInvoicesArrays.flat();
        setInvoices(allInvoices);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateInvoice = async (data: CreateInvoiceData) => {
    try {
      const newInvoice = await invoiceService.createInvoice(data);
      setInvoices([...invoices, newInvoice]);
      setShowCreateForm(false);
      navigate(`/invoices/${newInvoice.id}`);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const handleInvoiceClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
              <p className="mt-1 text-sm text-secondary">
                Manage your invoices and create new ones
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Create New Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
        {showCreateForm ? (
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Create New Invoice</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-secondary hover:text-secondary-dark"
              >
                Cancel
              </button>
            </div>
            <CreateInvoiceForm
              companies={companies}
              articles={articles}
              onSubmit={handleCreateInvoice}
            />
          </div>
        ) : selectedInvoice ? (
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Invoice Details</h2>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-secondary hover:text-secondary-dark"
              >
                Back to List
              </button>
            </div>
            <InvoiceDetail invoice={selectedInvoice} />
          </div>
        ) : (
          <InvoiceList
            invoices={invoices}
            onInvoiceClick={handleInvoiceClick}
          />
        )}
      </div>
    </div>
  );
}; 