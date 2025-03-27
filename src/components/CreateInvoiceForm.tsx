import React, { useState } from 'react';
import { Company } from '../types/company';
import { Article } from '../types/article';
import { CreateInvoiceData } from '../services/InvoiceService';

interface CreateInvoiceFormProps {
  companies: Company[];
  articles: Article[];
  onSubmit: (data: CreateInvoiceData) => void;
}

interface InvoiceItemInput {
  articleId: number;
  quantity: number;
  unitPrice: number;
}

export const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({
  companies,
  articles,
  onSubmit,
}) => {
  const [issuerId, setIssuerId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [items, setItems] = useState<InvoiceItemInput[]>([]);

  const handleAddItem = () => {
    setItems([...items, { articleId: 0, quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItemInput,
    value: number,
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleArticleSelect = (index: number, articleId: number) => {
    const selectedArticle = articles.find(article => article.id === articleId);
    if (selectedArticle) {
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        articleId,
        unitPrice: selectedArticle.basePrice,
      };
      setItems(newItems);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      issuerId,
      recipientId,
      items: items.map(item => ({
        articleId: item.articleId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    });
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const article = articles.find((a) => a.id === item.articleId);
      if (!article) return total;
      return total + item.quantity * item.unitPrice;
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Create New Invoice</h2>
        </div>
        <div className="px-4 sm:px-6 py-4 space-y-6">
          {/* Company Selection */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="issuerId" className="block text-sm font-medium text-secondary">
                Issuer
              </label>
              <select
                id="issuerId"
                value={issuerId}
                onChange={(e) => setIssuerId(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                required
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.businessName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="recipientId" className="block text-sm font-medium text-secondary">
                Recipient
              </label>
              <select
                id="recipientId"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                required
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.businessName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Items</h3>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Article
                    </label>
                    <select
                      value={item.articleId}
                      onChange={(e) => handleArticleSelect(index, Number(e.target.value))}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                      required
                    >
                      <option value="0">Select an article</option>
                      {articles.map((article) => (
                        <option key={article.id} value={article.id}>
                          {article.name} - €{article.basePrice}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full sm:w-32">
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, 'quantity', parseInt(e.target.value))
                      }
                      className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Unit Price
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleItemChange(index, 'unitPrice', parseFloat(e.target.value))
                      }
                      className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="mt-6 sm:mt-0 inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Add Item
            </button>
          </div>

          {/* Total */}
          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm text-secondary">Total Amount</p>
              <p className="text-2xl font-semibold text-gray-900">
                €{calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Create Invoice
        </button>
      </div>
    </form>
  );
}; 