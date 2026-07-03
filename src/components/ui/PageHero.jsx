/**
 * PageHero — Premium dashboard page hero banner
 * Inspired by Dribbble / Behance SaaS dashboard patterns.
 *
 * Props:
 *  icon         – Lucide icon component (e.g. <Banknote />)
 *  iconBg       – Tailwind bg class for icon circle (e.g. "bg-emerald-500")
 *  tag          – Short upper label (e.g. "Financial Ledger")
 *  title        – H1 headline
 *  subtitle     – Subtext paragraph
 *  stats        – Array of { label, value, sub? } objects (up to 4)
 *  actions      – Array of { label, onClick, variant: 'primary'|'ghost', icon? }
 *  gradient     – Tailwind gradient classes for the banner bg (optional override)
 *  children     – Extra JSX rendered after the action buttons (optional)
 */

const PageHero = ({
  icon: Icon,
  iconBg = 'bg-[#0B4F45]',
  tag,
  title,
  subtitle,
  stats = [],
  actions = [],
  gradient = 'from-[#072F29] via-[#0B4F45] to-[#0d5a50]',
  children,
}) => {
  return (
    <div
      className={`relative bg-gradient-to-br ${gradient} rounded-2xl overflow-hidden mb-8 shadow-xl`}
      style={{ isolation: 'isolate' }}
    >
      {/* ── Decorative mesh blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Top-right blob */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        {/* Bottom-left blob */}
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#C75B30]/15 blur-2xl" />
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Subtle shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 px-6 py-7 sm:px-8 sm:py-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-8">

        {/* Left column: tag + title + subtitle + actions */}
        <div className="flex-1 min-w-0">
          {/* Tag row */}
          <div className="flex items-center gap-3 mb-3">
            {Icon && (
              <div
                className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center text-white shadow-lg shrink-0`}
              >
                <Icon size={20} strokeWidth={2.2} />
              </div>
            )}
            {tag && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#E79868] text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C75B30] animate-pulse" />
                {tag}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-white leading-tight tracking-tight m-0 mb-1.5"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}>
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-white/70 text-sm leading-relaxed m-0 max-w-xl">
              {subtitle}
            </p>
          )}

          {/* Action buttons */}
          {actions.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5 mt-5">
              {actions.map((action, i) => {
                const BtnIcon = action.icon;
                const isPrimary = action.variant !== 'ghost';
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={action.onClick}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.97] cursor-pointer border-none shadow-sm ${
                      isPrimary
                        ? 'bg-[#C75B30] hover:bg-[#b04a25] text-white shadow-[0_4px_14px_rgba(199,91,48,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm'
                    }`}
                  >
                    {BtnIcon && <BtnIcon size={14} />}
                    {action.label}
                  </button>
                );
              })}
            </div>
          )}

          {children}
        </div>

        {/* Right column: stats pills */}
        {stats.length > 0 && (
          <div className="flex flex-row md:flex-col gap-3 shrink-0 flex-wrap md:min-w-[200px]">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-xl px-4 py-3 text-center min-w-[100px] flex-1 md:flex-none"
              >
                <div className="font-mono font-black text-white text-lg leading-none mb-0.5">
                  {stat.value}
                </div>
                <div className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
                {stat.sub && (
                  <div className="text-[#E79868] text-[10px] font-bold mt-0.5">{stat.sub}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHero;
