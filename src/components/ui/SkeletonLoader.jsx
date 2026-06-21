/**
 * SkeletonLoader — shimmer placeholder shapes matching content layout.
 * Pass width/height classes to customize.
 */

export const Skeleton = ({ className = '', ...props }) => (
  <div
    className={`skeleton rounded ${className}`}
    aria-hidden="true"
    {...props}
  />
);

/** Skeleton for a stat card */
export const StatCardSkeleton = () => (
  <div className="bg-white rounded border border-border shadow-card p-6 space-y-3">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-10 rounded" />
    </div>
    <Skeleton className="h-8 w-32" />
    <Skeleton className="h-3 w-20" />
  </div>
);

/** Skeleton for a table row */
export const TableRowSkeleton = ({ cols = 5 }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <Skeleton className={`h-4 ${i === 0 ? 'w-32' : 'w-20'}`} />
      </td>
    ))}
  </tr>
);

/** Skeleton for a property card */
export const PropertyCardSkeleton = () => (
  <div className="bg-white rounded border border-border shadow-card overflow-hidden">
    <Skeleton className="h-44 w-full rounded-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-56" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-28" />
    </div>
  </div>
);

/** Generic list item skeleton */
export const ListItemSkeleton = () => (
  <div className="flex items-center gap-3 p-4 border-b border-border">
    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-56" />
    </div>
    <Skeleton className="h-4 w-16" />
  </div>
);

/** Skeleton for a card with text */
export const ContentCardSkeleton = () => (
  <div className="bg-white rounded border border-border shadow-card p-6 space-y-4">
    <Skeleton className="h-5 w-48" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

export default Skeleton;
