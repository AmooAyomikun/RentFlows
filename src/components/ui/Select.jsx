import { forwardRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

/**
 * Select / Dropdown component — custom styled chevron, accessible label + error.
 */
const Select = forwardRef(
  (
    {
      label,
      id,
      options = [],
      error,
      helperText,
      required,
      placeholder = 'Select an option',
      className = '',
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${selectId}-error` : undefined;

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-charcoal">
            {label}
            {required && <span className="text-error ml-0.5" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-describedby={errorId}
            aria-invalid={!!error}
            required={required}
            className={[
              'w-full h-11 pl-3 pr-9 text-sm text-charcoal bg-white border rounded-sm appearance-none cursor-pointer',
              'transition-shadow duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              error ? 'border-error focus:ring-error' : 'border-border',
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {error && (
          <p id={errorId} role="alert" className="flex items-center gap-1 text-xs text-error">
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
