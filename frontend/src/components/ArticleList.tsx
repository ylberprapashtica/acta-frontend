import { useEffect, useState } from 'react';
import { Article } from '../types/article';
import { articleService } from '../services/article.service';
import { DataList } from './common/DataList';

interface ArticleListProps {
  onEdit: (article: Article) => void;
}

export function ArticleList({ onEdit }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await articleService.getArticles();
      const articlesWithNumberPrices = data.map((article: Article) => ({
        ...article,
        basePrice: Number(article.basePrice)
      }));
      setArticles(articlesWithNumberPrices);
      setError(null);
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
      await articleService.deleteArticle(id);
      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name' as const,
    },
    {
      header: 'Code',
      accessor: 'code' as const,
    },
    {
      header: 'Unit',
      accessor: 'unit' as const,
    },
    {
      header: 'VAT Code',
      accessor: (article: Article) => `${article.vatCode}%`,
    },
    {
      header: 'Base Price',
      accessor: (article: Article) => Number(article.basePrice).toFixed(2),
      align: 'right' as const,
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: onEdit,
      variant: 'primary' as const,
    },
    {
      label: 'Delete',
      onClick: (article: Article) => handleDelete(article.id),
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
      <h2 className="text-2xl font-bold mb-6">Articles</h2>
      <DataList
        data={articles}
        columns={columns}
        actions={actions}
      />
    </div>
  );
} 