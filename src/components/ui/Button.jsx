import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Button component — primary / secondary / ghost / destructive variants.
 * Sizes: sm / md / lg.
 * States: default / loading / disabled.
 */
const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon = null,
      rightIcon = null,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-body font-semibold rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none';

    const variants = {
      primary:
        'bg-primary text-white hover:bg-primary-dark active:scale-[0.98] disabled:opacity-40',
      secondary:
        'border-[1.5px] border-primary text-primary bg-transparent hover:bg-primary/5 active:scale-[0.98] disabled:opacity-40',
      ghost:
        'text-primary bg-transparent hover:underline active:scale-[0.98] disabled:opacity-40',
      destructive:
        'bg-error text-white hover:bg-error/90 active:scale-[0.98] disabled:opacity-40',
      outline:
        'border border-border text-body bg-transparent hover:bg-warm active:scale-[0.98] disabled:opacity-40',
      accent:
        'bg-accent text-white hover:bg-accent/90 active:scale-[0.98] disabled:opacity-40',
      white:
        'bg-white text-primary hover:bg-warm active:scale-[0.98] disabled:opacity-40',
      whiteOutline:
        'border border-white/20 text-white bg-transparent hover:bg-white/10 active:scale-[0.98] disabled:opacity-40',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-5 text-sm',
      lg: 'h-[52px] px-7 text-base',
    };

    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        whileHover={!isDisabled ? { scale: 1.01 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ duration: 0.15 }}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <>
            <span
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
            <span>Loading…</span>
          </>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
