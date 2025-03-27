import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Company } from '../types/company';
import { companyService } from '../services/company.service';
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

export const CompanyList: React.FC = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadCompanies(currentPage);
  }, [currentPage]);

  const loadCompanies = async (page: number) => {
    try {
      setLoading(true);
      const response = await companyService.getCompanies(page);
      setCompanies(response.items);
      setTotalPages(response.meta.lastPage);
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
      await companyService.deleteCompany(id);
      await loadCompanies(currentPage);
    } catch (err) {
      setError('Failed to delete company');
      console.error(err);
    }
  };

  const columns = [
    {
      header: 'Logo',
      accessor: (company: Company) => (
        <div className="flex items-center">
          {company.logo ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/companies/${company.logo}`}
              alt={`${company.businessName} logo`}
              className="h-10 w-10 object-contain border rounded-md"
            />
          ) : (
            <div className="h-10 w-10 border rounded-md flex items-center justify-center bg-gray-50">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Business Name',
      accessor: 'businessName' as const,
    },
    {
      header: 'Identification Number',
      accessor: 'uniqueIdentificationNumber' as const,
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
        navigate(`/companies/${company.id}/edit`);
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

      <div className="md:bg-white md:shadow rounded-lg">
        {companies.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600">No companies found. Add your first company to get started.</p>
          </div>
        ) : (
          <DataList
            data={companies}
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