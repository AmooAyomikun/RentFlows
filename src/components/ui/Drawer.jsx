import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Drawer / Side Panel — slides in from the right.
 * Used for maintenance detail and mobile filters.
 */
const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  width = 'w-full max-w-md',
}) => {
  // Escape key handler
  useEffect(() => {
    const handler = (e) => {
      if ((e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) && isOpen) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999]" role="dialog" aria-modal="true" aria-label={title}>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className={`absolute right-0 top-0 h-full ${width} bg-white shadow-lg flex flex-col`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
              <h2 className="text-h4 font-display text-charcoal">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close panel"
                className="text-muted hover:text-charcoal transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Drawer;
