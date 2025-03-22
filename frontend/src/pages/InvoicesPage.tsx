import React, { useEffect, useState } from 'react';
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
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Invoice
        </button>
      </div>

      {showCreateForm ? (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create New Invoice</h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          <CreateInvoiceForm
            onSubmit={handleCreateInvoice}
            companies={companies}
            articles={articles}
          />
        </div>
      ) : selectedInvoice ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <button
            onClick={() => setSelectedInvoice(null)}
            className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to List
          </button>
          <InvoiceDetail invoice={selectedInvoice} />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <InvoiceList
            invoices={invoices}
            onInvoiceClick={setSelectedInvoice}
          />
        </div>
      )}
    </div>
  );
}; 