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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Articles</h1>
        <button
          onClick={handleCreateClick}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Create New Article
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingArticle ? 'Edit Article' : 'Create New Article'}
          </h2>
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
  );
} 