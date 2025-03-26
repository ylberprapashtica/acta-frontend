import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Invoice, InvoiceItem } from '../types/invoice';
import { Company, BusinessType } from '../types/company';
import { Article, VatCode } from '../types/article';
import { invoiceService } from '../services/invoice.service';
import { companyService } from '../services/company.service';
import { articleService } from '../services/article.service';
import { DownloadInvoiceButton } from './common/DownloadInvoiceButton';

export const InvoiceForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isViewMode = location.pathname === `/invoices/${id}`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState<{
    issuerId: string;
    recipientId: string;
    items: Array<{
      articleId: number;
      quantity: number;
      unitPrice?: number;
    }>;
    issueDate?: Date;
  }>({
    issuerId: '',
    recipientId: '',
    items: [{ articleId: 0, quantity: 1, unitPrice: 0 }],
    issueDate: new Date(),
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [companiesData, articlesData] = await Promise.all([
        companyService.getCompanies(),
        articleService.getArticles(),
      ]);

      setCompanies(companiesData.items);
      setArticles(articlesData.items);

      if (id) {
        const invoiceData = await invoiceService.getInvoice(Number(id));
        setInvoice(invoiceData);
        setFormData({
          issuerId: invoiceData.issuer.id.toString(),
          recipientId: invoiceData.recipient.id.toString(),
          items: invoiceData.items.map(item => ({
            articleId: item.article.id,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          issueDate: new Date(invoiceData.issueDate),
        });
      }
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formattedData = {
        ...formData,
        issueDate: formData.issueDate ? new Date(formData.issueDate) : undefined,
      };

      if (id) {
        await invoiceService.updateInvoice(Number(id), formattedData);
      } else {
        await invoiceService.createInvoice(formattedData);
      }
      navigate('/invoices');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save invoice');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // If issuer changes, load articles for that company
    if (name === 'issuerId' && value) {
      try {
        const articlesData = await articleService.getArticles(1, 100, value);
        setArticles(articlesData.items);
        // Clear items when issuer changes
        setFormData(prev => ({
          ...prev,
          items: [{ articleId: 0, quantity: 1, unitPrice: 0 }],
        }));
      } catch (err) {
        console.error('Failed to load articles for company:', err);
      }
    }
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleArticleSelect = (index: number, articleId: number) => {
    const selectedArticle = articles.find(article => article.id === articleId);
    if (selectedArticle) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map((item, i) => 
          i === index ? { 
            ...item, 
            articleId,
            unitPrice: selectedArticle.basePrice 
          } : item
        ),
      }));
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { articleId: 0, quantity: 1, unitPrice: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">
        {isViewMode ? 'View Invoice' : id ? 'Edit Invoice' : 'Create New Invoice'}
      </h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issuer
            </label>
            <select
              name="issuerId"
              value={formData.issuerId}
              onChange={handleChange}
              required
              disabled={isViewMode}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                isViewMode ? 'bg-gray-100' : ''
              }`}
            >
              <option value="">Select Issuer</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>
                  {company.businessName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient
            </label>
            <select
              name="recipientId"
              value={formData.recipientId}
              onChange={handleChange}
              required
              disabled={isViewMode}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                isViewMode ? 'bg-gray-100' : ''
              }`}
            >
              <option value="">Select Recipient</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>
                  {company.businessName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Date
            </label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate ? new Date(formData.issueDate).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              required
              disabled={isViewMode}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                isViewMode ? 'bg-gray-100' : ''
              }`}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Items</h3>
          </div>

          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 shadow rounded-lg">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Article
                </label>
                <select
                  value={item.articleId}
                  onChange={(e) => handleArticleSelect(index, Number(e.target.value))}
                  required
                  disabled={isViewMode || !formData.issuerId}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    isViewMode ? 'bg-gray-100' : ''
                  }`}
                >
                  <option value="0">Select Article</option>
                  {articles.map(article => (
                    <option key={article.id} value={article.id}>
                      {article.name} - {article.code}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                  required
                  disabled={isViewMode}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    isViewMode ? 'bg-gray-100' : ''
                  }`}
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                  required
                  disabled={isViewMode}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    isViewMode ? 'bg-gray-100' : ''
                  }`}
                />
              </div>

              <div className="form-group flex items-end">
                {!isViewMode && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {!isViewMode && (
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Item
            </button>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          {!isViewMode && (
            <>
              <button
                type="button"
                onClick={() => navigate('/invoices')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {id ? 'Update' : 'Create'} Invoice
              </button>
            </>
          )}
          {isViewMode && invoice && <DownloadInvoiceButton invoice={invoice} />}
        </div>
      </form>
    </div>
  );
}; 