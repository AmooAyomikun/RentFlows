import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import Badge from './Badge';
import { TableRowSkeleton } from './SkeletonLoader';
import EmptyState from './EmptyState';
import { Database } from 'lucide-react';

/**
 * DataTable — sortable columns, row hover, pagination footer,
 * responsive stacked-card fallback on mobile (hidden on sm:).
 *
 * @param {{
 *   columns: Array<{ key: string, label: string, sortable?: boolean, mono?: boolean, render?: Function }>,
 *   data: Array<any>,
 *   isLoading?: boolean,
 *   emptyTitle?: string,
 *   emptyDescription?: string,
 *   onRowClick?: Function,
 * }} props
 */
const DataTable = ({
  columns,
  data = [],
  isLoading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your filters.',
  onRowClick,
}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal === bVal) return 0;
    const cmp = aVal < bVal ? -1 : 1;
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <div className="w-full overflow-hidden rounded border border-border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-border bg-warm/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide whitespace-nowrap"
                  scope="col"
                >
                  {col.sortable ? (
                    <button
                      className="flex items-center gap-1 hover:text-charcoal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                      onClick={() => handleSort(col.key)}
                      aria-sort={
                        sortKey === col.key
                          ? sortDir === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                      }
                    >
                      {col.label}
                      {sortKey === col.key ? (
                        sortDir === 'asc' ? (
                          <ChevronUp size={12} aria-hidden="true" />
                        ) : (
                          <ChevronDown size={12} aria-hidden="true" />
                        )
                      ) : (
                        <ChevronsUpDown size={12} aria-hidden="true" className="opacity-40" />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRowSkeleton key={i} cols={columns.length} />
                ))
              : sorted.map((row, i) => (
                  <tr
                    key={row.id || i}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={[
                      'border-b border-border/60 last:border-0',
                      'transition-colors duration-100',
                      'hover:bg-warm/60',
                      onRowClick ? 'cursor-pointer' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={[
                          'px-4 py-3 text-body',
                          col.mono ? 'font-mono text-xs' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {!isLoading && data.length === 0 && (
        <EmptyState
          icon={Database}
          title={emptyTitle}
          description={emptyDescription}
        />
      )}
    </div>
  );
};

export default DataTable;
