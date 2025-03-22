import React, { useState, useEffect } from 'react';
import { Company } from '../services/company.service';
import { CompanyList } from '../components/CompanyList';
import { CompanyForm } from '../components/CompanyForm';

export const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | undefined>();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/companies');
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      const data = await response.json();
      setCompanies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompany = async (data: Omit<Company, 'id'>) => {
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create company');
      }

      const newCompany = await response.json();
      setCompanies((prev) => [...prev, newCompany]);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleUpdateCompany = async (data: Omit<Company, 'id'>) => {
    if (!editingCompany) return;

    try {
      const response = await fetch(`/api/companies/${editingCompany.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update company');
      }

      const updatedCompany = await response.json();
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === updatedCompany.id ? updatedCompany : company
        )
      );
      setEditingCompany(undefined);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDeleteCompany = async (id: string) => {
    try {
      const response = await fetch(`/api/companies/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete company');
      }

      setCompanies((prev) => prev.filter((company) => company.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-background-paper shadow-card rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
              <p className="mt-1 text-sm text-secondary">
                Manage your business partners and clients
              </p>
            </div>
            <button
              onClick={() => {
                setEditingCompany(undefined);
                setShowForm(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Add New Company
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
                {editingCompany ? 'Edit Company' : 'Create New Company'}
              </h2>
              <button
                onClick={() => {
                  setEditingCompany(undefined);
                  setShowForm(false);
                }}
                className="text-secondary hover:text-secondary-dark"
              >
                Cancel
              </button>
            </div>
            <CompanyForm
              company={editingCompany}
              onSubmit={editingCompany ? handleUpdateCompany : handleCreateCompany}
            />
          </div>
        ) : (
          <CompanyList
            companies={companies}
            onEdit={handleEditCompany}
            onDelete={handleDeleteCompany}
          />
        )}
      </div>
    </div>
  );
}; 