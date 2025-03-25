import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tenant } from '../../types/admin';
import { getTenants, deleteTenant } from '../../services/admin.service';
import { DataList } from '../common/DataList';

export const TenantList: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      setLoading(true);
      const data = await getTenants();
      setTenants(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tenants');
      console.error('Error loading tenants:', err);
      setTenants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this tenant?')) {
      return;
    }

    try {
      await deleteTenant(id);
      await loadTenants();
    } catch (err) {
      setError('Failed to delete tenant');
      console.error(err);
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
      onClick: (tenant: Tenant) => {
        window.location.href = `/admin/tenants/${tenant.id}/edit`;
      },
      variant: 'primary' as const,
    },
    {
      label: 'Delete',
      onClick: (tenant: Tenant) => handleDelete(tenant.id),
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
        <h2 className="text-2xl font-bold">Tenants</h2>
        <Link
          to="/admin/tenants/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New Tenant
        </Link>
      </div>

      <div className="md:bg-white md:shadow rounded-lg">
        {tenants.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600">No tenants found. Create your first tenant to get started.</p>
          </div>
        ) : (
          <DataList
            data={tenants}
            columns={columns}
            actions={actions}
          />
        )}
      </div>
    </div>
  );
}; 