/**
 * Avatar — image or initials fallback with size variants and optional status dot.
 */

const sizeMap = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const dotSizeMap = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
};

const dotColorMap = {
  online: 'bg-success',
  away: 'bg-warning',
  offline: 'bg-muted',
};

/** Get initials from a full name string */
const getInitials = (name = '') => {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * @param {{
 *   name?: string,
 *   src?: string,
 *   size?: 'xs'|'sm'|'md'|'lg'|'xl',
 *   status?: 'online'|'away'|'offline',
 *   className?: string,
 * }} props
 */
const Avatar = ({ name = '', src, size = 'md', status, className = '' }) => {
  const initials = getInitials(name);

  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeMap[size]} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${sizeMap[size]} rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold`}
          aria-label={name || 'User avatar'}
          role="img"
        >
          {initials}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizeMap[size]} ${dotColorMap[status]} rounded-full border-2 border-white`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

export default Avatar;
