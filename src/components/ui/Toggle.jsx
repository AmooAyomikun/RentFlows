import { motion } from 'framer-motion';

/**
 * Toggle Switch — animated thumb slide, used in settings page.
 *
 * @param {{
 *   checked: boolean,
 *   onChange: (val: boolean) => void,
 *   label?: string,
 *   disabled?: boolean,
 *   id?: string,
 * }} props
 */
const Toggle = ({ checked, onChange, label, disabled = false, id }) => {
  const toggleId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        id={toggleId}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={[
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          checked ? 'bg-primary' : 'bg-border',
          disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <motion.span
          className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          aria-hidden="true"
        />
      </button>

      {label && (
        <label
          htmlFor={toggleId}
          className={`text-sm font-medium ${disabled ? 'text-muted' : 'text-charcoal'} cursor-pointer`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

/**
 * Checkbox — animated check transition.
 */
export const Checkbox = ({ checked, onChange, label, disabled = false, id }) => {
  const checkId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={checkId} className={`flex items-center gap-2.5 cursor-pointer ${disabled ? 'opacity-40' : ''}`}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        id={checkId}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={[
          'w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-colors duration-150 flex-shrink-0',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
          checked ? 'bg-primary border-primary' : 'border-border bg-white',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      {label && <span className="text-sm text-charcoal select-none">{label}</span>}
    </label>
  );
};

export default Toggle;
