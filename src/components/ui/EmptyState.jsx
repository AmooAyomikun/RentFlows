import { motion, AnimatePresence } from 'framer-motion';

/**
 * EmptyState — icon/illustration + message + optional CTA.
 * Used on every list page when there's no data.
 */
const EmptyState = ({
  icon: Icon,
  title = 'Nothing here yet',
  description,
  action,
  className = '',
}) => (
  <div
    className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    aria-live="polite"
  >
    {Icon && (
      <div className="w-16 h-16 rounded-full bg-primary/8 flex items-center justify-center mb-5">
        <Icon size={28} className="text-primary/60" aria-hidden="true" />
      </div>
    )}

    {/* Forest Teal + Sunclay brand illustration squiggle */}
    {!Icon && (
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        className="mb-5 opacity-40"
        aria-hidden="true"
      >
        <circle cx="40" cy="40" r="36" stroke="#0B4F45" strokeWidth="2" strokeDasharray="6 4" />
        <path d="M28 40 Q40 28 52 40 Q40 52 28 40Z" stroke="#C75B30" strokeWidth="2" fill="none" />
      </svg>
    )}

    <h3 className="font-display font-semibold text-charcoal text-lg mb-2">{title}</h3>

    {description && (
      <p className="text-sm text-muted max-w-xs mb-6">{description}</p>
    )}

    {action && <div className="mt-2">{action}</div>}
  </div>
);

export default EmptyState;
