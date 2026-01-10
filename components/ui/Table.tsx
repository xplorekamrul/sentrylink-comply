import React from 'react';

interface TableColumn {
   key: string;
   label: string;
   width?: string;
   render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
   columns: TableColumn[];
   data: any[];
   onRowClick?: (row: any) => void;
   selectable?: boolean;
   selectedRows?: Set<string>;
   onSelectRow?: (rowId: string) => void;
   onSelectAll?: (selected: boolean) => void;
   emptyMessage?: string;
   rowKey?: string;
}

export const Table: React.FC<TableProps> = ({
   columns,
   data,
   onRowClick,
   selectable = false,
   selectedRows = new Set(),
   onSelectRow,
   onSelectAll,
   emptyMessage = 'No data available',
   rowKey = 'id',
}) => {
   const allSelected = data.length > 0 && data.every((row) => selectedRows.has(row[rowKey]));
   const someSelected = data.some((row) => selectedRows.has(row[rowKey])) && !allSelected;

   if (data.length === 0) {
      return (
         <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-800 p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">{emptyMessage}</p>
         </div>
      );
   }

   return (
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                     {selectable && (
                        <th className="px-6 py-3 text-left">
                           <input
                              type="checkbox"
                              checked={allSelected}
                              ref={(el) => {
                                 if (el) el.indeterminate = someSelected;
                              }}
                              onChange={(e) => onSelectAll?.(e.target.checked)}
                              className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                           />
                        </th>
                     )}
                     {columns.map((column) => (
                        <th
                           key={column.key}
                           className={`px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-tight ${column.width || ''
                              }`}
                        >
                           {column.label}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {data.map((row, idx) => (
                     <tr
                        key={row[rowKey] || idx}
                        onClick={() => onRowClick?.(row)}
                        className={`border-b border-slate-200 dark:border-slate-700 transition-colors duration-200 ${onRowClick ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer' : ''
                           }`}
                     >
                        {selectable && (
                           <td className="px-6 py-4">
                              <input
                                 type="checkbox"
                                 checked={selectedRows.has(row[rowKey])}
                                 onChange={() => onSelectRow?.(row[rowKey])}
                                 onClick={(e) => e.stopPropagation()}
                                 className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                           </td>
                        )}
                        {columns.map((column) => (
                           <td
                              key={`${row[rowKey]}-${column.key}`}
                              className="px-6 py-4 text-sm text-slate-900 dark:text-slate-50"
                           >
                              {column.render
                                 ? column.render(row[column.key], row)
                                 : row[column.key]}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};
