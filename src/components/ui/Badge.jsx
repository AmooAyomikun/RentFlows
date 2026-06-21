import { motion } from 'framer-motion';

/**
 * Badge / Status Pill — color-coded by status with text label.
 * Color is never the only indicator (text always present per PRD §12).
 */

const STATUS_STYLES = {
  paid: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  overdue: 'bg-error/10 text-error',
  due: 'bg-warning/10 text-warning',
  resolved: 'bg-info/10 text-info',
  in_progress: 'bg-accent/10 text-accent',
  received: 'bg-muted/10 text-muted',
  occupied: 'bg-success/10 text-success',
  vacant: 'bg-muted/10 text-body',
  refunded: 'bg-info/10 text-info',
  active: 'bg-success/10 text-success',
  inactive: 'bg-muted/10 text-muted',
  high: 'bg-error/10 text-error',
  medium: 'bg-warning/10 text-warning',
  low: 'bg-success/10 text-success',
};

const LABELS = {
  paid: 'Paid',
  pending: 'Pending',
  overdue: 'Overdue',
  due: 'Due',
  resolved: 'Resolved',
  in_progress: 'In Progress',
  received: 'Received',
  occupied: 'Occupied',
  vacant: 'Vacant',
  refunded: 'Refunded',
  active: 'Active',
  inactive: 'Inactive',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

/**
 * @param {{ status: string, label?: string, className?: string, dot?: boolean }} props
 */
const Badge = ({ status, label, className = '', dot = false }) => {
  const styles = STATUS_STYLES[status] || 'bg-muted/10 text-body';
  const text = label || LABELS[status] || status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles} ${className}`}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"
          aria-hidden="true"
        />
      )}
      {text}
    </span>
  );
};

export default Badge;
