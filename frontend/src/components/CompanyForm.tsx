import React, { useState, useEffect } from 'react';
import { Company } from '../services/company.service';

interface CompanyFormProps {
  company?: Company;
  onSubmit: (data: Omit<Company, 'id'>) => void;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ company, onSubmit }) => {
  const [formData, setFormData] = useState<Omit<Company, 'id'>>({
    businessName: '',
    tradeName: '',
    businessType: '',
    uniqueIdentificationNumber: '',
    businessNumber: '',
    fiscalNumber: '',
    vatNumber: '',
    registrationDate: new Date().toISOString().split('T')[0],
    municipality: '',
    address: '',
    phoneNumber: '',
    email: '',
    bankAccount: '',
  });

  useEffect(() => {
    if (company) {
      setFormData({
        businessName: company.businessName,
        tradeName: company.tradeName || '',
        businessType: company.businessType,
        uniqueIdentificationNumber: company.uniqueIdentificationNumber,
        businessNumber: company.businessNumber || '',
        fiscalNumber: company.fiscalNumber || '',
        vatNumber: company.vatNumber || '',
        registrationDate: company.registrationDate.split('T')[0],
        municipality: company.municipality,
        address: company.address,
        phoneNumber: company.phoneNumber,
        email: company.email,
        bankAccount: company.bankAccount || '',
      });
    }
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-secondary">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tradeName" className="block text-sm font-medium text-secondary">
            Trade Name
          </label>
          <input
            type="text"
            id="tradeName"
            name="tradeName"
            value={formData.tradeName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-secondary">
            Business Type *
          </label>
          <input
            type="text"
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="uniqueIdentificationNumber" className="block text-sm font-medium text-secondary">
            Unique Identification Number *
          </label>
          <input
            type="text"
            id="uniqueIdentificationNumber"
            name="uniqueIdentificationNumber"
            value={formData.uniqueIdentificationNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="businessNumber" className="block text-sm font-medium text-secondary">
            Business Number
          </label>
          <input
            type="text"
            id="businessNumber"
            name="businessNumber"
            value={formData.businessNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="fiscalNumber" className="block text-sm font-medium text-secondary">
            Fiscal Number
          </label>
          <input
            type="text"
            id="fiscalNumber"
            name="fiscalNumber"
            value={formData.fiscalNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="vatNumber" className="block text-sm font-medium text-secondary">
            VAT Number
          </label>
          <input
            type="text"
            id="vatNumber"
            name="vatNumber"
            value={formData.vatNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="registrationDate" className="block text-sm font-medium text-secondary">
            Registration Date *
          </label>
          <input
            type="date"
            id="registrationDate"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="municipality" className="block text-sm font-medium text-secondary">
            Municipality *
          </label>
          <input
            type="text"
            id="municipality"
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-secondary">
            Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-secondary">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="bankAccount" className="block text-sm font-medium text-secondary">
            Bank Account
          </label>
          <input
            type="text"
            id="bankAccount"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {company ? 'Update Company' : 'Create Company'}
        </button>
      </div>
    </form>
  );
}; 