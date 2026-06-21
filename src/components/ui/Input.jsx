import { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

/**
 * Input component with label, helper text, error state, left icon, and password toggle.
 */
const Input = forwardRef(
  (
    {
      label,
      id,
      type = 'text',
      error,
      helperText,
      leftIcon,
      required,
      className = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-charcoal"
          >
            {label}
            {required && <span className="text-error ml-0.5" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
            aria-invalid={!!error}
            required={required}
            className={[
              'w-full h-11 px-3 text-sm text-charcoal bg-white border rounded-sm',
              'placeholder:text-muted',
              'transition-shadow duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary',
              error ? 'border-error focus:ring-error' : 'border-border',
              leftIcon ? 'pl-10' : '',
              type === 'password' ? 'pr-10' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />

          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>

        {error && (
          <p id={errorId} role="alert" className="flex items-center gap-1 text-xs text-error">
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-xs text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea with same label / error / helper pattern.
 */
export const Textarea = forwardRef(
  ({ label, id, error, helperText, required, rows = 4, className = '', ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-charcoal">
            {label}
            {required && <span className="text-error ml-0.5" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          aria-describedby={errorId}
          aria-invalid={!!error}
          required={required}
          className={[
            'w-full px-3 py-2.5 text-sm text-charcoal bg-white border rounded-sm',
            'placeholder:text-muted resize-y',
            'transition-shadow duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            error ? 'border-error focus:ring-error' : 'border-border',
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-xs text-error">
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

Textarea.displayName = 'Textarea';

export default Input;
