import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Modal — centered overlay with scale+fade transition.
 * Closes on overlay click or Escape key. Focus is trapped inside.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  showClose = true,
  className = '',
}) => {
  const overlayRef = useRef(null);
  const firstFocusableRef = useRef(null);

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

  // Focus first focusable on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const el = overlayRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        el?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm pointer-events-none" aria-hidden="true" />

          {/* Panel */}
          <motion.div
            className={`relative w-full ${maxWidth} bg-white rounded-2xl shadow-2xl my-auto flex flex-col max-h-[88vh] overflow-hidden ${className}`}
            initial={{ scale: 0.95, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            {(title || showClose) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0 bg-gray-50/50">
                {title && (
                  <h2 className="text-lg font-bold text-[#1E293B] m-0 pr-4">{title}</h2>
                )}
                {showClose && (
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="ml-auto text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors p-1.5 rounded-full focus-visible:outline-none cursor-pointer border-none bg-transparent shrink-0 flex items-center justify-center"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
