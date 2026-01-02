import axiosInstance from './axios';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CreateTenantDto {
  name: string;
  slug: string;
  description?: string;
}

class TenantService {
  async getCurrentTenant(): Promise<Tenant> {
    const response = await axiosInstance.get('/tenants/current');
    return response.data;
  }

  async getTenant(id: string): Promise<Tenant> {
    const response = await axiosInstance.get(`/tenants/${id}`);
    return response.data;
  }

  async createTenant(tenantData: CreateTenantDto): Promise<Tenant> {
    const response = await axiosInstance.post('/tenants', tenantData);
    return response.data;
  }

  async updateTenant(id: string, tenantData: Partial<CreateTenantDto>): Promise<Tenant> {
    const response = await axiosInstance.patch(`/tenants/${id}`, tenantData);
    return response.data;
  }

  async deleteTenant(id: string): Promise<void> {
    await axiosInstance.delete(`/tenants/${id}`);
  }

  async getAllTenants(): Promise<Tenant[]> {
    const response = await axiosInstance.get('/tenants');
    return response.data;
  }
}

export const tenantService = new TenantService(); 