import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BusinessType, Company, CreateCompanyDto } from '../types/company';
import { companyService } from '../services/CompanyService';
import { getAPIUrl } from '../config';
import { authService } from '../services/AuthService';
import { tenantService, Tenant } from '../services/TenantService';

export const CompanyForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateCompanyDto>({
    businessName: '',
    tradeName: '',
    businessType: BusinessType.SOLE_PROPRIETORSHIP,
    uniqueIdentificationNumber: '',
    businessNumber: '',
    fiscalNumber: '',
    vatNumber: '',
    registrationDate: '',
    municipality: '',
    address: '',
    phoneNumber: '',
    email: '',
    bankAccount: '',
  });
  const [businessInfoText, setBusinessInfoText] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUserRole();
  }, []);

  useEffect(() => {
    if (id) {
      loadCompany();
    }
  }, [id]);

  useEffect(() => {
    if (isAdmin) {
      loadTenants();
    }
  }, [isAdmin]);

  const checkUserRole = () => {
    const user = authService.getCurrentUser();
    const userRole = user?.user?.role;
    setIsAdmin(userRole === 'admin' || userRole === 'super_admin');
  };

  const loadTenants = async () => {
    try {
      const tenantsList = await tenantService.getAllTenants();
      setTenants(tenantsList);
    } catch (err) {
      console.error('Failed to load tenants:', err);
    }
  };

  const loadCompany = async () => {
    try {
      setLoading(true);
      const company = await companyService.getCompany(id!);
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
        logo: company.logo || '',
      });
      if (company.logo) {
        setLogoPreview(`${getAPIUrl()}/uploads/companies/${company.logo}`);
      }
    } catch (err) {
      setError('Failed to load company');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      let company: Company;
      if (id) {
        company = await companyService.updateCompany(id, formData);
      } else {
        company = await companyService.createCompany(formData);
      }

      if (logoFile && company.id) {
        await companyService.uploadLogo(company.id, logoFile);
      }

      navigate('/companies');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save company');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = async () => {
    if (id) {
      try {
        setLoading(true);
        await companyService.removeLogo(id);
        setLogoPreview(null);
        setLogoFile(null);
        setFormData(prev => ({ ...prev, logo: undefined }));
      } catch (err) {
        setError('Failed to remove logo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const parseBusinessInfo = () => {
    try {
      const lines = businessInfoText.split('\n');
      const newFormData = { ...formData };
      
      lines.forEach(line => {
        const [key, value] = line.split('\t').map(s => s.trim());
        if (!key || !value) return;

        switch (key.toLowerCase()) {
          case 'emri i biznesit':
            newFormData.businessName = value;
            break;
          case 'emri tregtar':
            newFormData.tradeName = value;
            break;
          case 'lloji biznesit':
            const businessTypeMap: { [key: string]: BusinessType } = {
              'shoqëri me përgjegjësi të kufizuara': BusinessType.LLC,
              'person fizik': BusinessType.SOLE_PROPRIETORSHIP,
            };
            const mappedType = businessTypeMap[value.toLowerCase()];
            if (mappedType) {
              newFormData.businessType = mappedType;
            }
            break;
          case 'numri unik identifikues':
            newFormData.uniqueIdentificationNumber = value;
            break;
          case 'numri i biznesit':
            newFormData.businessNumber = value;
            break;
          case 'numri fiskal':
            newFormData.fiscalNumber = value;
            break;
          case 'data e regjistrimit':
            const [day, month, year] = value.split('/');
            newFormData.registrationDate = `${year}-${month}-${day}`;
            break;
          case 'komuna':
            newFormData.municipality = value;
            break;
          case 'adresa':
            newFormData.address = value;
            break;
          case 'telefoni':
            newFormData.phoneNumber = value;
            break;
          case 'e-mail':
            newFormData.email = value;
            break;
        }
      });

      setFormData(newFormData);
      setError(null);
    } catch (err) {
      setError('Failed to parse business information');
      console.error(err);
    }
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
        {id ? 'Edit Company' : 'Create New Company'}
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

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Paste Business Information
        </label>
        <textarea
          value={businessInfoText}
          onChange={(e) => setBusinessInfoText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          rows={6}
          placeholder="Paste the business information here..."
        />
        <button
          type="button"
          onClick={parseBusinessInfo}
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Parse and Fill Form
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Logo
          </label>
          <div className="flex items-center space-x-4">
            {logoPreview && (
              <div className="relative">
                <img
                  src={logoPreview}
                  alt="Company logo"
                  className="h-20 w-20 object-contain border rounded-md"
                />
                {id && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleLogoChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <p className="mt-1 text-sm text-gray-500">
                Supported formats: JPG, PNG. Max size: 2MB
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isAdmin && (
            <div className="form-group md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tenant
              </label>
              <select
                name="tenantId"
                value={formData.tenantId || ''}
                onChange={handleChange}
                required={isAdmin}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select a tenant</option>
                {tenants.map(tenant => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trade Name
            </label>
            <input
              type="text"
              name="tradeName"
              value={formData.tradeName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Type
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {Object.values(BusinessType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unique Identification Number
            </label>
            <input
              type="text"
              name="uniqueIdentificationNumber"
              value={formData.uniqueIdentificationNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Number
            </label>
            <input
              type="text"
              name="businessNumber"
              value={formData.businessNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fiscal Number
            </label>
            <input
              type="text"
              name="fiscalNumber"
              value={formData.fiscalNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              VAT Number
            </label>
            <input
              type="text"
              name="vatNumber"
              value={formData.vatNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Date
            </label>
            <input
              type="date"
              name="registrationDate"
              value={formData.registrationDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Municipality
            </label>
            <input
              type="text"
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Account
            </label>
            <input
              type="text"
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/companies')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {id ? 'Update' : 'Create'} Company
          </button>
        </div>
      </form>
    </div>
  );
}; 