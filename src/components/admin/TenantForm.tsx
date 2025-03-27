import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tenant, CreateTenantDto, UpdateTenantDto } from '../../types/admin';
import { getTenant, createTenant, updateTenant } from '../../services/admin.service';
import { Company, companyService } from '../../services/company.service';

export const TenantForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState<CreateTenantDto>({
    name: '',
    slug: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      loadTenant(id);
      loadCompanies(id);
    }
  }, [id]);

  const loadTenant = async (tenantId: string) => {
    try {
      setLoading(true);
      const tenant = await getTenant(tenantId);
      setFormData({
        name: tenant.name,
        slug: tenant.slug,
        description: tenant.description || '',
      });
      setError(null);
    } catch (err) {
      setError('Failed to load tenant');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async (tenantId: string) => {
    try {
      const response = await companyService.getCompanies(1, 100); // Get up to 100 companies
      const tenantCompanies = response.items.filter(company => company.tenantId === tenantId);
      setCompanies(tenantCompanies);
    } catch (err) {
      console.error('Failed to load companies:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await updateTenant(id, formData);
      } else {
        await createTenant(formData);
      }
      navigate('/admin/tenants');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save tenant');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? 'Edit Tenant' : 'Create New Tenant'}
      </h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="space-y-6">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/admin/tenants')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>

        {id && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Assigned Companies</h2>
            {companies.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {companies.map((company) => (
                    <li key={company.id} className="px-4 py-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{company.businessName}</p>
                          <p className="text-sm text-gray-500">{company.tradeName || company.businessName}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {company.uniqueIdentificationNumber}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500">No companies assigned to this tenant.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 