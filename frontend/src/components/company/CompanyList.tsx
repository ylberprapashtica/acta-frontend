import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Company } from '../../types/company';
import { companyService } from '../../services/companyService';
import { DataList } from '../common/DataList';

export const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyService.getAll();
      const companiesArray = Array.isArray(data) ? data : [];
      setCompanies(companiesArray);
      setError(null);
    } catch (err) {
      setError('Failed to load companies');
      console.error('Error loading companies:', err);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this company?')) {
      return;
    }

    try {
      await companyService.delete(id);
      setCompanies(companies.filter(company => company.id !== id));
    } catch (err) {
      setError('Failed to delete company');
      console.error(err);
    }
  };

  const columns = [
    {
      header: 'Business Name',
      accessor: 'businessName' as const,
    },
    {
      header: 'Identification Number',
      accessor: 'uniqueIdentificationNumber' as const,
    },
    {
      header: 'Business Type',
      accessor: 'businessType' as const,
    },
    {
      header: 'Phone Number',
      accessor: 'phoneNumber' as const,
    },
    {
      header: 'Email',
      accessor: 'email' as const,
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (company: Company) => {
        window.location.href = `/companies/${company.id}/edit`;
      },
      variant: 'primary' as const,
    },
    {
      label: 'Delete',
      onClick: (company: Company) => handleDelete(company.id),
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
        <h2 className="text-2xl font-bold">Companies</h2>
        <Link
          to="/companies/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Company
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Companies</h2>
      {companies.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-600">No companies found. Add your first company to get started.</p>
        </div>
      ) : (
        <DataList
          data={companies}
          columns={columns}
          actions={actions}
        />
      )}
        </div>
    </div>
  );
}; 