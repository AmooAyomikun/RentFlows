import { motion } from 'framer-motion';

/**
 * Stepper — used in multi-step forms (signup, add property).
 * Shows step numbers, labels and progress line between steps.
 *
 * @param {{
 *   steps: Array<{ label: string }>,
 *   currentStep: number, // 0-indexed
 * }} props
 */
const Stepper = ({ steps, currentStep }) => (
  <nav aria-label="Progress" className="w-full">
    <ol className="flex items-center gap-0 w-full">
      {steps.map((step, i) => {
        const isDone = i < currentStep;
        const isActive = i === currentStep;
        const isLast = i === steps.length - 1;

        return (
          <li key={step.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300',
                  isDone
                    ? 'bg-primary border-primary text-white'
                    : isActive
                    ? 'border-primary text-primary bg-white'
                    : 'border-border text-muted bg-white',
                ].join(' ')}
                aria-current={isActive ? 'step' : undefined}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={[
                  'mt-1.5 text-xs font-medium text-center max-w-[80px] leading-tight hidden sm:block',
                  isActive ? 'text-primary' : isDone ? 'text-charcoal' : 'text-muted',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="flex-1 h-0.5 mx-2 mt-[-14px] sm:mt-[-26px] overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isDone ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

/**
 * ProgressBar — simple linear progress bar.
 */
export const ProgressBar = ({ value = 0, max = 100, label, color = 'bg-primary', className = '' }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      {label && (
        <div className="flex justify-between text-xs text-muted mb-1">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-border rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

export default Stepper;
