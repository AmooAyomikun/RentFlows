import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Tabs — underline-indicator style with animated sliding indicator.
 *
 * @param {{
 *   tabs: Array<{ id: string, label: string, count?: number }>,
 *   activeTab: string,
 *   onChange: (id: string) => void,
 *   className?: string,
 * }} props
 */
const Tabs = ({ tabs, activeTab, onChange, className = '' }) => (
  <div className={`relative flex border-b border-border gap-1 ${className}`} role="tablist">
    {tabs.map((tab) => {
      const isActive = tab.id === activeTab;
      return (
        <button
          key={tab.id}
          role="tab"
          aria-selected={isActive}
          aria-controls={`tabpanel-${tab.id}`}
          id={`tab-${tab.id}`}
          onClick={() => onChange(tab.id)}
          className={[
            'relative px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-t',
            'flex items-center gap-2',
            isActive ? 'text-primary' : 'text-muted hover:text-charcoal',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                isActive ? 'bg-primary/10 text-primary' : 'bg-border text-muted'
              }`}
            >
              {tab.count}
            </span>
          )}

          {/* Animated underline indicator */}
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
              layoutId="tab-indicator"
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
      );
    })}
  </div>
);

export default Tabs;
