export interface Tenant {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'super_admin' | 'admin' | 'user';
  tenantId?: string;
  tenant?: Tenant;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  tenantId: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: 'admin' | 'user';
  isActive?: boolean;
}

export interface CreateTenantDto {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateTenantDto {
  name?: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
} 