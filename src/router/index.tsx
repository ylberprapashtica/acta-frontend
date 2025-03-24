import { createBrowserRouter } from 'react-router-dom';
import { CompanyList } from '../components/company/CompanyList';
import { CompanyForm } from '../components/company/CompanyForm';
import { Layout } from '../components/layout/Layout';
import { ArticlePage } from '../pages/ArticlePage';
import { InvoicesPage } from '../pages/InvoicesPage';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home';
import { AdminLayout } from '../components/layout/AdminLayout';
import { AdminPage } from '../pages/admin/AdminPage';
import { TenantsPage } from '../pages/admin/TenantsPage';
import { UsersPage } from '../pages/admin/UsersPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'companies',
        children: [
          {
            index: true,
            element: <CompanyList />,
          },
          {
            path: 'new',
            element: <CompanyForm />,
          },
          {
            path: ':id/edit',
            element: <CompanyForm />,
          },
        ],
      },
      {
        path: 'articles',
        element: <ArticlePage />,
      },
      {
        path: 'invoices',
        element: <InvoicesPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: 'tenants',
        element: <TenantsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
]); 