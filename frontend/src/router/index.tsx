import { createBrowserRouter } from 'react-router-dom';
import { CompanyList } from '../components/company/CompanyList';
import { CompanyForm } from '../components/company/CompanyForm';
import { Layout } from '../components/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
    ],
  },
]); 