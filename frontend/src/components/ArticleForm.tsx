import { useState, useEffect } from 'react';
import { Article, CreateArticleDto, VatCode } from '../types/article';
import { ArticleService } from '../services/article.service';

interface ArticleFormProps {
  article?: Article;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ArticleForm({ article, onSuccess, onCancel }: ArticleFormProps) {
  const [formData, setFormData] = useState<CreateArticleDto>({
    name: '',
    unit: '',
    code: '',
    vatCode: VatCode.ZERO,
    basePrice: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const articleService = ArticleService.getInstance();

  useEffect(() => {
    if (article) {
      setFormData({
        name: article.name,
        unit: article.unit,
        code: article.code,
        vatCode: article.vatCode,
        basePrice: Number(article.basePrice),
      });
    }
  }, [article]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (article) {
        await articleService.update(article.id, formData);
      } else {
        await articleService.create(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save article');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'basePrice' ? Number(value) || 0 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Unit</label>
        <input
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">VAT Code</label>
        <select
          name="vatCode"
          value={formData.vatCode}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value={VatCode.ZERO}>0%</option>
          <option value={VatCode.EIGHT}>8%</option>
          <option value={VatCode.EIGHTEEN}>18%</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Base Price</label>
        <input
          type="number"
          name="basePrice"
          value={formData.basePrice}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {article ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
} 