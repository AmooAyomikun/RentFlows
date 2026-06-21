import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Building2, Users, CreditCard, AlertTriangle,
  Wrench, TrendingUp, ArrowRight, Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { StatCardSkeleton } from '../../components/ui/SkeletonLoader';
import { getProperties } from '../../services/propertyService';
import { getPaymentSummary, getRevenueTrend } from '../../services/paymentService';
import { getMaintenanceSnapshot } from '../../services/maintenanceService';
import { getNotifications } from '../../services/notificationService';
import { formatCurrency } from '../../utils/formatCurrency';
import { timeAgo } from '../../utils/formatDate';
import useAuthStore from '../../store/authStore';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const LandlordDashboard = () => {
  const { user } = useAuthStore();
  const firstName = user?.name?.split(' ')[0] || 'there';

  const { data: properties = [], isLoading: loadingProps } = useQuery({ queryKey: ['properties'], queryFn: getProperties });
  const { data: paymentSummary, isLoading: loadingPay } = useQuery({ queryKey: ['payment-summary'], queryFn: getPaymentSummary });
  const { data: maintenance, isLoading: loadingMaint } = useQuery({ queryKey: ['maintenance-snapshot'], queryFn: getMaintenanceSnapshot });
  const { data: revenueTrend = [], isLoading: loadingTrend } = useQuery({ queryKey: ['revenue-trend'], queryFn: () => getRevenueTrend(7) });
  const { data: notifications = [] } = useQuery({ queryKey: ['notifications'], queryFn: () => getNotifications({ type: 'all' }) });

  const totalUnits = properties.reduce((s, p) => s + (p.totalUnits || 0), 0);
  const occupiedUnits = properties.reduce((s, p) => s + (p.occupiedUnits || 0), 0);

  const unreadNotifs = notifications.filter(n => !n.isRead).slice(0, 4);
  const recentPayments = []; // populated from payments mock via quick join

  const loading = loadingProps || loadingPay;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">
            Good {getGreeting()}, {firstName}! 👋
          </h1>
          <p className="text-muted text-sm mt-0.5">Here's what's happening with your portfolio.</p>
        </div>
        <Link to="/landlord/properties/new">
          <Button size="sm" leftIcon={<Building2 size={15} />}>Add property</Button>
        </Link>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <motion.div variants={fadeUp}>
              <StatCard title="Total Properties" value={properties.length} icon={Building2} color="bg-primary/10" iconColor="text-primary" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StatCard title="Revenue (MTD)" value={paymentSummary?.collected || 0} icon={CreditCard} isCurrency color="bg-success/10" iconColor="text-success" trend={4.2} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StatCard title="Occupied / Total" value={occupiedUnits} icon={Users} color="bg-info/10" iconColor="text-info" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StatCard title="Overdue Payments" value={paymentSummary?.overdue || 0} icon={AlertTriangle} isCurrency color="bg-error/10" iconColor="text-error" />
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Charts + Activity row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Revenue chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-charcoal">Revenue Trend</h2>
              <Link to="/landlord/reports" className="text-xs text-primary hover:underline flex items-center gap-1">
                Full report <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
            {loadingTrend ? (
              <div className="skeleton h-48 rounded" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="rentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B4F45" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0B4F45" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E1DA" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8A8A72' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => `₦${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 11, fill: '#8A8A72' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(v) => [formatCurrency(v), 'Revenue']}
                    contentStyle={{ border: '1px solid #E5E1DA', borderRadius: 6, fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#0B4F45" strokeWidth={2} fill="url(#rentGrad)" dot={false} activeDot={{ r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Card>
        </motion.div>

        {/* Quick stats sidebar */}
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          {/* Maintenance snapshot */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-charcoal text-sm">Maintenance</h2>
              <Link to="/landlord/maintenance" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            {loadingMaint ? <div className="skeleton h-16 rounded" /> : (
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'New', value: maintenance?.received || 0, color: 'text-muted' },
                  { label: 'In Progress', value: maintenance?.in_progress || 0, color: 'text-accent' },
                  { label: 'Resolved', value: maintenance?.resolved || 0, color: 'text-success' },
                ].map((s) => (
                  <div key={s.label} className="bg-warm rounded p-2">
                    <p className={`font-mono font-bold text-lg ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-muted mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Occupancy ring */}
          <Card>
            <h2 className="font-semibold text-charcoal text-sm mb-3">Occupancy</h2>
            <div className="flex items-center gap-3">
              <OccupancyRing pct={totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0} />
              <div className="text-xs text-muted space-y-1">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-primary rounded-full" aria-hidden="true" />{occupiedUnits} occupied</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-border rounded-full" aria-hidden="true" />{totalUnits - occupiedUnits} vacant</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent notifications */}
      {unreadNotifs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-accent" aria-hidden="true" />
                <h2 className="font-semibold text-charcoal text-sm">Recent Alerts</h2>
                <span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">{unreadNotifs.length}</span>
              </div>
              <Link to="/landlord/notifications" className="text-xs text-primary hover:underline">All notifications</Link>
            </div>
            <ul className="divide-y divide-border">
              {unreadNotifs.map((n) => (
                <li key={n.id} className="py-2.5 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-charcoal font-medium truncate">{n.title}</p>
                    <p className="text-xs text-muted truncate">{n.message}</p>
                  </div>
                  <span className="text-xs text-muted flex-shrink-0 mt-0.5">{timeAgo(n.createdAt)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}

      {/* Properties quick view */}
      {properties.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-charcoal">Your Properties</h2>
            <Link to="/landlord/properties" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.slice(0, 3).map((p) => (
              <Link key={p.id} to={`/landlord/properties/${p.id}`}>
                <Card hoverable padding={false} className="overflow-hidden">
                  <div className="h-28 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Building2 size={28} className="text-primary/50" aria-hidden="true" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-charcoal text-sm mb-1 truncate">{p.name}</h3>
                    <p className="text-xs text-muted truncate mb-2">{p.address}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">{p.occupiedUnits}/{p.totalUnits} units</span>
                      <Badge status={p.occupiedUnits === p.totalUnits ? 'occupied' : 'vacant'} label={p.occupiedUnits === p.totalUnits ? 'Full' : 'Has vacancies'} />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
};

const OccupancyRing = ({ pct }) => {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const filled = (pct / 100) * circ;

  return (
    <svg width={72} height={72} viewBox="0 0 72 72" role="img" aria-label={`${pct}% occupancy`}>
      <circle cx={36} cy={36} r={r} fill="none" stroke="#E5E1DA" strokeWidth={6} />
      <circle
        cx={36} cy={36} r={r} fill="none"
        stroke="#0B4F45" strokeWidth={6}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        transform="rotate(-90 36 36)"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text x={36} y={40} textAnchor="middle" className="font-mono font-bold" style={{ fontSize: 14, fill: '#2D2D2A', fontFamily: 'JetBrains Mono, monospace' }}>
        {pct}%
      </text>
    </svg>
  );
};

export default LandlordDashboard;
