import React from 'react';
import { Company } from '../types/company';

interface CompanyListProps {
  items: Company[];
  onEdit: (company: Company) => void;
  onDelete: (id: string | number) => void;
}

export const CompanyList: React.FC<CompanyListProps> = ({ items, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Business Name
                </th>
                <th className="hidden sm:table-cell px-3 py-3 sm:px-6 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Trade Name
                </th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-6 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Business Type
                </th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-6 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Address
                </th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-6 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-3 py-3 sm:px-6 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 sm:px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex flex-col sm:hidden">
                      <span className="mb-1">{company.businessName}</span>
                      <span className="text-xs text-gray-500">{company.tradeName || '-'}</span>
                      <span className="text-xs text-gray-500">{company.phoneNumber}</span>
                    </div>
                    <span className="hidden sm:inline">{company.businessName}</span>
                  </td>
                  <td className="hidden sm:table-cell px-3 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-500">
                    {company.tradeName || '-'}
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-500">
                    {company.businessType}
                  </td>
                  <td className="hidden lg:table-cell px-3 py-4 sm:px-6 text-sm text-gray-500">
                    {company.address}
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-500">
                    {company.phoneNumber}
                  </td>
                  <td className="px-3 py-4 sm:px-6 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(company)}
                      className="text-primary hover:text-primary-dark mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(company.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 