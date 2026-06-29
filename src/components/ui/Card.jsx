import { motion } from 'framer-motion';

/**
 * Card — the base surface used everywhere.
 * Optional hoverable (lifts on hover) and clickable (pointer cursor) variants.
 */
const Card = ({
  children,
  className = '',
  hoverable = false,
  clickable = false,
  padding = true,
  onClick,
  as: Tag = 'div',
  ...props
}) => {
  const baseClasses = [
    'bg-white rounded-xl border border-gray-200/80 card-shadow',
    padding ? 'p-6' : '',
    hoverable || clickable
      ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover'
      : '',
    clickable ? 'cursor-pointer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (hoverable || (clickable && onClick)) {
    return (
      <motion.div
        className={baseClasses}
        onClick={onClick}
        whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(27,31,29,0.08)' }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Tag className={baseClasses} onClick={onClick} {...props}>
      {children}
    </Tag>
  );
};

export default Card;
