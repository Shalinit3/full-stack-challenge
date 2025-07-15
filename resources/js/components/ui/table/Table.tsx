import React from 'react';

export type Column<T> = {
  header: string;
  key: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type Action<T> = {
  icon: React.ReactNode;
  onClick: (row: T) => void;
  label?: string;
};

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
  actions?: Action<T>[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Table<T extends Record<string, any>>({
  columns,
  data,
  className = '',
  onRowClick,
  actions = [],
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto w-full">
      <table className={`w-full border-collapse text-sm bg-white ${className}`}>
        <thead className="bg-gray-100 text-left">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2 border-b font-medium">
                {col.header}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-700 text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-4 text-center text-gray-500">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => onRowClick?.(row)} className={`
                  even:bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer
                  ${onRowClick ? 'hover:cursor-pointer' : ''}
                `}>
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2 border-b">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-4 py-3 border-b border-gray-100 flex items-center justify-center gap-3">
                    {actions.map((action, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // avoid triggering onRowClick
                          action.onClick(row);
                        }}
                        title={action.label}
                        className="text-gray-500 hover:text-gray-800 transition-colors"
                      >
                        {action.icon}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}