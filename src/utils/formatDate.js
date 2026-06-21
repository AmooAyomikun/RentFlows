import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';

/**
 * Formats a date string for display.
 * @param {string|Date} date
 * @param {string} [pattern='MMM d, yyyy']
 */
export const formatDate = (date, pattern = 'MMM d, yyyy') => {
  if (!date) return '—';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, pattern);
  } catch {
    return '—';
  }
};

/**
 * Returns a human-readable relative time ("2 days ago", "just now").
 */
export const timeAgo = (date) => {
  if (!date) return '—';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(d, { addSuffix: true });
  } catch {
    return '—';
  }
};

/**
 * Groups an array of items by day label ("Today", "Yesterday", "Jun 15").
 * Items must have a date field.
 * @param {Array} items
 * @param {string} dateField - Field name to group by
 */
export const groupByDay = (items, dateField = 'createdAt') => {
  const groups = {};
  items.forEach((item) => {
    const raw = item[dateField];
    if (!raw) return;
    const d = typeof raw === 'string' ? parseISO(raw) : raw;
    let label;
    if (isToday(d)) label = 'Today';
    else if (isYesterday(d)) label = 'Yesterday';
    else label = format(d, 'MMM d, yyyy');
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });
  return Object.entries(groups);
};

/**
 * Returns "Jun 1" style short date.
 */
export const shortDate = (date) => formatDate(date, 'MMM d');

/**
 * Returns "1 Jun 2026" long date.
 */
export const longDate = (date) => formatDate(date, 'd MMM yyyy');

/**
 * Returns a formatted date and time.
 */
export const formatDateTime = (date, pattern = 'MMM d, yyyy h:mm a') => formatDate(date, pattern);

