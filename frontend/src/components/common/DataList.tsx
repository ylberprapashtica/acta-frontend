import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  align?: 'left' | 'right' | 'center';
}

interface Action<T> {
  label: string;
  onClick: (item: T) => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface DataListProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  onRowClick?: (item: T) => void;
}

export function DataList<T>({ data, columns, actions, onRowClick }: DataListProps<T>) {
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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-${column.align || 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}
              >
                {column.header}
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
                      <button
                        key={actionIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(item);
                        }}
                        className={getButtonClassName(action.variant)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 