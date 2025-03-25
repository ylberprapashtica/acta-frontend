import React, { useState, useEffect } from 'react';
import { Company, BusinessType } from '../types/company';

interface CompanyFormProps {
  item?: Company;
  onSubmit: (data: Omit<Company, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Company, 'id'>>({
    businessName: '',
    tradeName: '',
    businessType: BusinessType.SOLE_PROPRIETORSHIP,
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (item) {
      setFormData({
        businessName: item.businessName,
        tradeName: item.tradeName || '',
        businessType: item.businessType,
        uniqueIdentificationNumber: item.uniqueIdentificationNumber,
        businessNumber: item.businessNumber || '',
        fiscalNumber: item.fiscalNumber || '',
        vatNumber: item.vatNumber || '',
        registrationDate: item.registrationDate.split('T')[0],
        municipality: item.municipality,
        address: item.address,
        phoneNumber: item.phoneNumber,
        email: item.email,
        bankAccount: item.bankAccount || '',
        createdAt: item.createdAt,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
            Business Name *
          </label>
          <input
            type="text"
            name="businessName"
            id="businessName"
            required
            value={formData.businessName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tradeName" className="block text-sm font-medium text-gray-700">
            Trade Name
          </label>
          <input
            type="text"
            name="tradeName"
            id="tradeName"
            value={formData.tradeName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
            Business Type *
          </label>
          <select
            name="businessType"
            id="businessType"
            required
            value={formData.businessType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value={BusinessType.SOLE_PROPRIETORSHIP}>Sole Proprietorship</option>
            <option value={BusinessType.PARTNERSHIP}>Partnership</option>
            <option value={BusinessType.LLC}>Limited Liability Company</option>
            <option value={BusinessType.CORPORATION}>Corporation</option>
          </select>
        </div>

        <div>
          <label htmlFor="uniqueIdentificationNumber" className="block text-sm font-medium text-gray-700">
            Unique Identification Number *
          </label>
          <input
            type="text"
            name="uniqueIdentificationNumber"
            id="uniqueIdentificationNumber"
            required
            value={formData.uniqueIdentificationNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700">
            Business Number
          </label>
          <input
            type="text"
            name="businessNumber"
            id="businessNumber"
            value={formData.businessNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="fiscalNumber" className="block text-sm font-medium text-gray-700">
            Fiscal Number
          </label>
          <input
            type="text"
            name="fiscalNumber"
            id="fiscalNumber"
            value={formData.fiscalNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700">
            VAT Number
          </label>
          <input
            type="text"
            name="vatNumber"
            id="vatNumber"
            value={formData.vatNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">
            Registration Date *
          </label>
          <input
            type="date"
            name="registrationDate"
            id="registrationDate"
            required
            value={formData.registrationDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">
            Municipality *
          </label>
          <input
            type="text"
            name="municipality"
            id="municipality"
            required
            value={formData.municipality}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address *
          </label>
          <input
            type="text"
            name="address"
            id="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700">
            Bank Account
          </label>
          <input
            type="text"
            name="bankAccount"
            id="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {item ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}; 