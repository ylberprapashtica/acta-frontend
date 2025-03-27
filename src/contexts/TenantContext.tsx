import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authService } from '../services/AuthService';
import { tenantService } from '../services/TenantService';

interface Tenant {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface TenantContextType {
  tenant: Tenant | null;
  setTenant: (tenant: Tenant | null) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    const initializeTenant = async () => {
      const user = authService.getCurrentUser();
      console.log('TenantContext - Initializing with user:', user);

      if (user?.user?.role === 'super_admin') {
        console.log('TenantContext - User is superadmin, skipping tenant fetch');
        return;
      }

      if (user?.user?.tenantId) {
        try {
          console.log('TenantContext - Fetching tenant for user:', user.user.tenantId);
          const currentTenant = await tenantService.getCurrentTenant();
          console.log('TenantContext - Fetched tenant:', currentTenant);
          setTenant(currentTenant);
        } catch (error) {
          console.error('TenantContext - Error fetching tenant:', error);
        }
      } else {
        console.log('TenantContext - No tenantId found for user');
      }
    };

    initializeTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
} 