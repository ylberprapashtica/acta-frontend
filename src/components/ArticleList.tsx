import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Article } from '../types/article';
import { articleService } from '../services/article.service';
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

export const ArticleList: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadArticles(currentPage);
  }, [currentPage]);

  const loadArticles = async (page: number) => {
    try {
      setLoading(true);
      const response = await articleService.getArticles(page);
      setArticles(response.items);
      setTotalPages(response.meta.lastPage);
      setError(null);
    } catch (err) {
      setError('Failed to load articles');
      console.error('Error loading articles:', err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      await articleService.deleteArticle(Number(id));
      await loadArticles(currentPage);
    } catch (err) {
      setError('Failed to delete article');
      console.error(err);
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
      onClick: (article: Article) => {
        navigate(`/articles/${article.id}/edit`);
      },
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Articles</h2>
        <Link
          to="/articles/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Article
        </Link>
      </div>

      <div className="md:bg-white md:shadow rounded-lg">
        {articles.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600">No articles found. Add your first article to get started.</p>
          </div>
        ) : (
          <DataList
            data={articles}
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