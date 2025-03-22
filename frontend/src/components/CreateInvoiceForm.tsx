import React, { useState } from 'react';
import { CreateInvoiceData, InvoiceItem } from '../services/invoice.service';
import { Company } from '../services/company.service';
import { Article } from '../services/article.service';

interface CreateInvoiceFormProps {
  onSubmit: (data: CreateInvoiceData) => void;
  companies: Company[];
  articles: Article[];
}

export const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({
  onSubmit,
  companies,
  articles,
}) => {
  const [issuerId, setIssuerId] = useState<string>('');
  const [recipientId, setRecipientId] = useState<string>('');
  const [items, setItems] = useState<InvoiceItem[]>([]);

  const handleAddItem = () => {
    setItems([...items, { articleId: 0, quantity: 1, unitPrice: 0 }]);
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: number) => {
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
        quantity: Math.max(1, newItems[index].quantity)
      };
      setItems(newItems);
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      if (item.articleId && item.quantity >= 1 && item.unitPrice) {
        return total + (item.quantity * item.unitPrice);
      }
      return total;
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issuerId || !recipientId || items.length === 0) {
      return;
    }

    // Validate that all items have quantity >= 1
    const invalidItems = items.some(item => item.quantity < 1);
    if (invalidItems) {
      alert('All items must have a quantity of at least 1');
      return;
    }

    // Filter out invalid items and ensure unitPrice is included
    const validItems = items
      .filter(item => item.articleId && item.quantity >= 1)
      .map(item => ({
        articleId: item.articleId,
        quantity: item.quantity,
        unitPrice: item.unitPrice || 0
      }));

    onSubmit({
      issuerId,
      recipientId,
      items: validItems
    });
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Create Invoice</h2>
        <div className="text-sm text-gray-500">
          Date: {currentDate}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Issuer</label>
        <select
          value={issuerId}
          onChange={(e) => setIssuerId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
        <label className="block text-sm font-medium text-gray-700">Recipient</label>
        <select
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Items</h3>
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Item
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <select
                value={item.articleId}
                onChange={(e) => handleArticleSelect(index, Number(e.target.value))}
                className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select an article</option>
                {articles.map((article) => (
                  <option key={article.id} value={article.id}>
                    {article.name} (${article.basePrice})
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', Math.max(1, Number(e.target.value)))}
                placeholder="Quantity"
                className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />

              <input
                type="number"
                value={item.unitPrice || ''}
                onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                placeholder="Unit Price (editable)"
                className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />

              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium text-gray-900">Total Amount:</div>
          <div className="text-2xl font-bold text-indigo-600">
            ${calculateTotal().toFixed(2)}
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Invoice
        </button>
      </div>
    </form>
  );
}; 