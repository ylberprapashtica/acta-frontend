import React from 'react';
import { useTenant } from '../contexts/TenantContext';
import { tenantService, Tenant } from '../services/tenant.service';
import { authService } from '../services/auth.service';
import { companyService, Company, PaginatedResponse } from '../services/company.service';

export function TenantBanner() {
  const { tenant, setTenant } = useTenant();
  const [loading, setLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState<Company[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser?.user?.tenantId) {
          const currentTenant = await tenantService.getCurrentTenant();
          setTenant(currentTenant);
          
          // Fetch all companies and filter by tenant
          const companiesResponse = await companyService.getCompanies();
          const tenantCompanies = companiesResponse.items.filter(
            company => company.tenantId === currentTenant.id
          );
          setCompanies(tenantCompanies);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setTenant]);

  if (loading) {
    return null;
  }

  if (!tenant) {
    return null;
  }

  return (
    <div className="bg-indigo-600 text-white px-4 py-2 text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-medium">Current Tenant:</span>
            <span className="ml-2">{tenant.name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Companies:</span>
            <div className="ml-2 flex space-x-4">
              {companies.map((company) => (
                <span key={company.id} className="bg-indigo-500 px-2 py-1 rounded">
                  {company.tradeName || company.businessName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 