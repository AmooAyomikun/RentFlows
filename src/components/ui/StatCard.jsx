import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Card from './Card';
import useCountUp from '../../hooks/useCountUp';
import { formatCurrency } from '../../utils/formatCurrency';

/**
 * StatCard — icon + animated count-up number + label + trend arrow.
 * Used on both dashboards.
 *
 * @param {{
 *   title: string,
 *   value: number,
 *   icon: React.ComponentType,
 *   trend?: number,     // % change (+ve = up, -ve = down)
 *   prefix?: string,   // e.g. '₦'
 *   isCurrency?: boolean,
 *   color?: string,    // tailwind bg class for icon container
 * }} props
 */
const StatCard = ({
  title,
  value = 0,
  icon: Icon,
  trend,
  isCurrency = false,
  color = 'bg-primary/10',
  iconColor = 'text-primary',
}) => {
  const animatedValue = useCountUp(value, 1200, true);

  const displayValue = isCurrency
    ? formatCurrency(animatedValue)
    : animatedValue.toLocaleString('en-NG');

  const TrendIcon =
    trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendColor =
    trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-muted';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <p className="text-sm text-muted font-medium">{title}</p>
          {Icon && (
            <div className={`${color} rounded p-2.5`}>
              <Icon size={20} className={iconColor} aria-hidden="true" />
            </div>
          )}
        </div>

        <div>
          <p className="font-mono text-2xl font-semibold text-charcoal tracking-tight">
            {displayValue}
          </p>

          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-1.5 ${trendColor}`}>
              <TrendIcon size={14} aria-hidden="true" />
              <span className="text-xs font-medium">
                {Math.abs(trend)}% vs last month
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
