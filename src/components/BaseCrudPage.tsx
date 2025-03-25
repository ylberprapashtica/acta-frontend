import React, { useState, useEffect } from 'react';

interface BaseCrudPageProps<T> {
  title: string;
  subtitle: string;
  fetchItems: () => Promise<T[]>;
  createItem: (data: Omit<T, 'id'>) => Promise<T>;
  updateItem: (id: string | number, data: Omit<T, 'id'>) => Promise<T>;
  deleteItem: (id: string | number) => Promise<void>;
  ListComponent: React.ComponentType<{
    items: T[];
    onEdit: (item: T) => void;
    onDelete: (id: string | number) => void;
  }>;
  FormComponent: React.ComponentType<{
    item?: T;
    onSubmit: (data: Omit<T, 'id'>) => Promise<void>;
    onCancel: () => void;
  }>;
}

export function BaseCrudPage<T extends { id: string | number }>({
  title,
  subtitle,
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  ListComponent,
  FormComponent,
}: BaseCrudPageProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<T | undefined>();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<T, 'id'>) => {
    try {
      const newItem = await createItem(data);
      setItems((prev) => [...prev, newItem]);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleUpdate = async (data: Omit<T, 'id'>) => {
    if (!editingItem) return;

    try {
      const updatedItem = await updateItem(editingItem.id, data);
      setItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setEditingItem(undefined);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
    setShowForm(true);
  };

  if (loading) {
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
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
              <p className="mt-1 text-sm text-secondary">{subtitle}</p>
            </div>
            <button
              onClick={() => {
                setEditingItem(undefined);
                setShowForm(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Add New {title.slice(0, -1)}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
        {showForm ? (
          <div className="px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingItem ? `Edit ${title.slice(0, -1)}` : `Create New ${title.slice(0, -1)}`}
              </h2>
              <button
                onClick={() => {
                  setEditingItem(undefined);
                  setShowForm(false);
                }}
                className="text-secondary hover:text-secondary-dark"
              >
                Cancel
              </button>
            </div>
            <FormComponent
              item={editingItem}
              onSubmit={editingItem ? handleUpdate : handleCreate}
              onCancel={() => {
                setEditingItem(undefined);
                setShowForm(false);
              }}
            />
          </div>
        ) : (
          <ListComponent
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
} 