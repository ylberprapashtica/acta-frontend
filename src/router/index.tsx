import { createBrowserRouter } from 'react-router-dom';
import { CompanyList } from '../components/company/CompanyList';
import { CompanyForm } from '../components/company/CompanyForm';
import { Layout } from '../components/layout/Layout';
import { ArticleList } from '../components/ArticleList';
import { ArticleForm } from '../components/ArticleForm';
import { InvoiceList } from '../components/InvoiceList';
import { InvoiceForm } from '../components/InvoiceForm';
import { TenantList } from '../components/admin/TenantList';
import { TenantForm } from '../components/admin/TenantForm';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home';
import { AdminLayout } from '../components/layout/AdminLayout';
import { AdminPage } from '../pages/admin/AdminPage';
import { UsersPage } from '../pages/admin/UsersPage';
import { UserList } from '../components/admin/UserList';
import { UserForm } from '../components/admin/UserForm';

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
        children: [
          {
            index: true,
            element: <ArticleList />,
          },
          {
            path: 'new',
            element: <ArticleForm />,
          },
          {
            path: ':id/edit',
            element: <ArticleForm />,
          },
        ],
      },
      {
        path: 'invoices',
        children: [
          {
            index: true,
            element: <InvoiceList />,
          },
          {
            path: 'new',
            element: <InvoiceForm />,
          },
          {
            path: ':id/edit',
            element: <InvoiceForm />,
          },
        ],
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
        children: [
          {
            index: true,
            element: <TenantList />,
          },
          {
            path: 'new',
            element: <TenantForm />,
          },
          {
            path: ':id/edit',
            element: <TenantForm />,
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            index: true,
            element: <UserList />,
          },
          {
            path: 'new',
            element: <UserForm />,
          },
          {
            path: ':id/edit',
            element: <UserForm />,
          },
        ],
      },
    ],
  },
]); 