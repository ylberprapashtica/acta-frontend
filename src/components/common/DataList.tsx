import React from 'react';
import { Pagination } from './Pagination';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  align?: 'left' | 'right' | 'center';
}

interface Action<T> {
  label: string | ((item: T) => React.ReactNode);
  onClick: (item: T) => void | undefined;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface DataListProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  onRowClick?: (item: T) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export function DataList<T>({ data, columns, actions, onRowClick, pagination }: DataListProps<T>) {
  const getButtonClassName = (variant: string = 'primary') => {
    const baseClasses = "inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
    switch (variant) {
      case 'primary':
        return `${baseClasses} text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`;
      case 'secondary':
        return `${baseClasses} text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500`;
      case 'danger':
        return `${baseClasses} text-white bg-red-600 hover:bg-red-700 focus:ring-red-500`;
      default:
        return `${baseClasses} text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`;
    }
  };

  const getCellContent = (item: T, column: Column<T>): React.ReactNode => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    const value = item[column.accessor];
    return String(value);
  };

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-${column.align || 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  <span className="text-xs font-medium text-gray-500 uppercase pr-4">
                    {column.header}
                  </span>
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(item)}
                className={onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-${column.align || 'left'}`}
                  >
                    {getCellContent(item, column)}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex justify-center space-x-2">
                      {actions.map((action, actionIndex) => (
                        action.onClick ? (
                          <button
                            key={actionIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(item);
                            }}
                            className={getButtonClassName(action.variant)}
                          >
                            {typeof action.label === 'function' ? action.label(item) : action.label}
                          </button>
                        ) : (
                          <span key={actionIndex} className="text-sm text-gray-900">
                            {typeof action.label === 'function' ? action.label(item) : action.label}
                          </span>
                        )
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {data.map((item, rowIndex) => (
          <div
            key={rowIndex}
            onClick={() => onRowClick?.(item)}
            className={`bg-white py-4 rounded-lg shadow space-y-2 
               ${onRowClick ? 'hover:bg-gray-100 cursor-pointer' : ''}`}
          >
            {columns.map((column, colIndex) => (
              <div key={colIndex} className={`flex flex-row justify-between items-center py-2 px-4 ${
                colIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}>
                <span className="text-xs font-medium text-gray-500 uppercase whitespace-nowrap pr-4">
                  {column.header}
                </span>
                <span className="text-sm text-gray-900">
                  {getCellContent(item, column)}
                </span>
              </div>
            ))}
            {actions && actions.length > 0 && (
              <div className="pt-2 px-4 flex flex-wrap gap-2 justify-end">
                {actions.map((action, actionIndex) => (
                  action.onClick ? (
                    <button
                      key={actionIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick(item);
                      }}
                      className={getButtonClassName(action.variant)}
                    >
                      {typeof action.label === 'function' ? action.label(item) : action.label}
                    </button>
                  ) : (
                    <span key={actionIndex} className="text-sm text-gray-900">
                      {typeof action.label === 'function' ? action.label(item) : action.label}
                    </span>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
} 