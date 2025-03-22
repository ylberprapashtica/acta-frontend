import { useEffect, useState } from 'react';
import { Article, VatCode } from '../types/article';
import { ArticleService } from '../services/article.service';

interface ArticleListProps {
  onEdit: (article: Article) => void;
}

export function ArticleList({ onEdit }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const articleService = ArticleService.getInstance();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await articleService.getAll();
      // Convert basePrice to number for each article
      const articlesWithNumberPrices = data.map(article => ({
        ...article,
        basePrice: Number(article.basePrice)
      }));
      setArticles(articlesWithNumberPrices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      await articleService.delete(id);
      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Articles</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Name</th>
              <th className="px-6 py-3 border-b text-left">Code</th>
              <th className="px-6 py-3 border-b text-left">Unit</th>
              <th className="px-6 py-3 border-b text-left">VAT Code</th>
              <th className="px-6 py-3 border-b text-right">Base Price</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{article.name}</td>
                <td className="px-6 py-4 border-b">{article.code}</td>
                <td className="px-6 py-4 border-b">{article.unit}</td>
                <td className="px-6 py-4 border-b">{article.vatCode}%</td>
                <td className="px-6 py-4 border-b text-right">
                  {Number(article.basePrice).toFixed(2)}
                </td>
                <td className="px-6 py-4 border-b text-center space-x-2">
                  <button
                    onClick={() => onEdit(article)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 