import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs — used on nested dashboard pages.
 *
 * @param {{
 *   items: Array<{ label: string, href?: string }>,
 * }} props
 */
const Breadcrumbs = ({ items = [] }) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex items-center gap-1.5 text-sm flex-wrap">
      <li>
        <Link
          to="/landlord/dashboard"
          className="text-muted hover:text-primary transition-colors flex items-center gap-1"
          aria-label="Dashboard home"
        >
          <Home size={14} aria-hidden="true" />
        </Link>
      </li>

      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1.5">
          <ChevronRight size={14} className="text-border" aria-hidden="true" />
          {item.href && i < items.length - 1 ? (
            <Link
              to={item.href}
              className="text-muted hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={i === items.length - 1 ? 'text-charcoal font-medium' : 'text-muted'}
              aria-current={i === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
