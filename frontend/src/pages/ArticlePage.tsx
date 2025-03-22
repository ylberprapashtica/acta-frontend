import { useState } from 'react';
import { Article } from '../types/article';
import { ArticleList } from '../components/ArticleList';
import { ArticleForm } from '../components/ArticleForm';

export function ArticlePage() {
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | undefined>();

  const handleCreateClick = () => {
    setEditingArticle(undefined);
    setShowForm(true);
  };

  const handleEditClick = (article: Article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingArticle(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingArticle(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
              <p className="mt-1 text-sm text-secondary">
                Manage your products and services
              </p>
            </div>
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Add New Article
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
        {showForm ? (
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingArticle ? 'Edit Article' : 'Create New Article'}
              </h2>
              <button
                onClick={handleFormCancel}
                className="text-secondary hover:text-secondary-dark"
              >
                Cancel
              </button>
            </div>
            <ArticleForm
              article={editingArticle}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        ) : (
          <ArticleList onEdit={handleEditClick} />
        )}
      </div>
    </div>
  );
} 