import axiosInstance from './axios';
import { User, Tenant, CreateUserDto, UpdateUserDto, CreateTenantDto, UpdateTenantDto } from '../types/admin';

// Tenant endpoints
export const getTenants = async (): Promise<Tenant[]> => {
  const response = await axiosInstance.get('/tenants');
  return response.data;
};

export const createTenant = async (data: CreateTenantDto): Promise<Tenant> => {
  const response = await axiosInstance.post('/tenants', data);
  return response.data;
};

export const updateTenant = async (id: string, data: UpdateTenantDto): Promise<Tenant> => {
  const response = await axiosInstance.patch(`/tenants/${id}`, data);
  return response.data;
};

export const deleteTenant = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/tenants/${id}`);
};

// User endpoints
export const getUsers = async (tenantId?: string): Promise<User[]> => {
  const url = tenantId ? `/users?tenantId=${tenantId}` : '/users';
  const response = await axiosInstance.get(url);
  return response.data;
};

export const createUser = async (data: CreateUserDto): Promise<User> => {
  const response = await axiosInstance.post('/users', data);
  return response.data;
};

export const updateUser = async (id: string, data: UpdateUserDto): Promise<User> => {
  const response = await axiosInstance.patch(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
}; 