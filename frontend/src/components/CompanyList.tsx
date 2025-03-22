import React from 'react';
import { Company } from '../services/company.service';

interface CompanyListProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

export const CompanyList: React.FC<CompanyListProps> = ({ companies, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
              Business Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
              Trade Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
              Business Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {company.businessName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {company.tradeName || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {company.businessType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {company.address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {company.phoneNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
  );
}; 