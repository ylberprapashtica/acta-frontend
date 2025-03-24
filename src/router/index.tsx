import { createBrowserRouter } from 'react-router-dom';
import { CompanyList } from '../components/company/CompanyList';
import { CompanyForm } from '../components/company/CompanyForm';
import { Layout } from '../components/layout/Layout';
import { ArticlePage } from '../pages/ArticlePage';
import { InvoicesPage } from '../pages/InvoicesPage';
import Login from '../pages/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
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
]); 