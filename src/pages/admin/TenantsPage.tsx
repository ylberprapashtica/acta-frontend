import React, { useState, useEffect } from 'react';
import { Tenant, CreateTenantDto } from '../../types/admin';
import { getTenants, createTenant, updateTenant, deleteTenant } from '../../services/admin.service';
import { DataList } from '../../components/common/DataList';

export function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [formData, setFormData] = useState<CreateTenantDto>({
    name: '',
    slug: '',
    description: '',
  });

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      const data = await getTenants();
      setTenants(data);
    } catch (error) {
      console.error('Error loading tenants:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTenant) {
        await updateTenant(editingTenant.id, formData);
      } else {
        await createTenant(formData);
      }
      setIsModalOpen(false);
      setEditingTenant(null);
      setFormData({ name: '', slug: '', description: '' });
      loadTenants();
    } catch (error) {
      console.error('Error saving tenant:', error);
    }
  };

  const handleEdit = (tenant: Tenant) => {
    setEditingTenant(tenant);
    setFormData({
      name: tenant.name,
      slug: tenant.slug,
      description: tenant.description || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (tenant: Tenant) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        await deleteTenant(tenant.id);
        loadTenants();
      } catch (error) {
        console.error('Error deleting tenant:', error);
      }
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Tenant },
    { header: 'Slug', accessor: 'slug' as keyof Tenant },
    { header: 'Description', accessor: 'description' as keyof Tenant },
    {
      header: 'Status',
      accessor: (tenant: Tenant) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          tenant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {tenant.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: handleEdit,
      variant: 'primary' as const,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      variant: 'danger' as const,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tenants</h1>
        <button
          onClick={() => {
            setEditingTenant(null);
            setFormData({ name: '', slug: '', description: '' });
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Tenant
        </button>
      </div>

      <DataList
        data={tenants}
        columns={columns}
        actions={actions}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingTenant ? 'Edit Tenant' : 'Add Tenant'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {editingTenant ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 