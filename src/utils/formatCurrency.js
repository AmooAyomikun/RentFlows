/**
 * Formats a number as Nigerian Naira.
 * @param {number} amount
 * @param {boolean} [compact=false] - Use compact notation (e.g. ₦3.5M)
 * @returns {string}
 */
export const formatCurrency = (amount, compact = false) => {
  if (amount == null) return '—';
  if (compact) {
    if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Returns the color class for a payment status.
 * @param {'paid'|'pending'|'overdue'|'refunded'} status
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'paid': return 'badge-paid';
    case 'pending': return 'badge-pending';
    case 'overdue': return 'badge-overdue';
    case 'resolved': return 'badge-resolved';
    case 'in_progress': return 'badge-in-progress';
    default: return 'badge-pending';
  }
};

/**
 * Capitalizes and humanizes a status string.
 */
export const humanizeStatus = (status) => {
  const map = {
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
    refunded: 'Refunded',
    received: 'Received',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    due: 'Due',
    vacant: 'Vacant',
    occupied: 'Occupied',
  };
  return map[status] || status;
};
