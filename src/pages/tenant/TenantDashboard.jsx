import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CreditCard, History, Download, AlertCircle, FileText } from 'lucide-react';
import { getTenantDashboard, getTenantPayments } from '../../services/tenantService';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { ContentCardSkeleton, StatCardSkeleton } from '../../components/ui/SkeletonLoader';
import EmptyState from '../../components/ui/EmptyState';

const TenantDashboard = () => {
  const { data: dashData, isLoading: dashLoading } = useQuery({
    queryKey: ['tenant-dashboard'],
    queryFn: getTenantDashboard,
  });

  const { data: payments = [], isLoading: payLoading } = useQuery({
    queryKey: ['tenant-payments'],
    queryFn: getTenantPayments,
  });

  if (dashLoading) {
    return (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <ContentCardSkeleton />
      </div>
    );
  }

  const { lease, balance } = dashData || {};
  const isOverdue = balance?.status === 'overdue';

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl text-charcoal">Welcome Home 👋</h1>
        <p className="text-sm text-muted">Manage your lease, payments, and requests.</p>
      </motion.div>

      {/* Lease Overview & Balance */}
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 z-0" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                <h2 className="font-semibold text-charcoal">Your Lease</h2>
                <Badge status="active" label="Active" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted">Property</p>
                  <p className="font-medium text-charcoal text-sm">{lease?.propertyName}</p>
                  <p className="text-xs text-muted">{lease?.unitName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-muted">Rent</p>
                    <p className="font-mono font-medium text-sm">{formatCurrency(lease?.rentAmount)}</p>
                    <p className="text-xs text-muted">per {lease?.rentCycle}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Lease Period</p>
                    <p className="text-sm font-medium">{formatDate(lease?.startDate)}</p>
                    <p className="text-xs text-muted">to {formatDate(lease?.endDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className={`h-full border-t-4 ${isOverdue ? 'border-t-error' : 'border-t-primary'}`}>
            <div className="flex flex-col h-full justify-center">
              <h2 className="font-semibold text-charcoal mb-1 text-center">Current Balance</h2>
              <div className="text-center mb-6">
                <p className={`font-mono text-4xl font-bold ${isOverdue ? 'text-error' : 'text-charcoal'}`}>
                  {formatCurrency(balance?.amount)}
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  {isOverdue && <AlertCircle size={14} className="text-error" />}
                  <p className={`text-sm ${isOverdue ? 'text-error font-medium' : 'text-muted'}`}>
                    Due on {formatDate(balance?.dueDate)}
                  </p>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full" 
                leftIcon={<CreditCard size={18} />}
                variant={isOverdue ? 'danger' : 'primary'}
                disabled={balance?.amount === 0}
              >
                {balance?.amount === 0 ? 'No balance due' : 'Pay Rent Now'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Payments */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-charcoal">Recent Payments</h2>
        </div>
        <Card padding={false}>
          {payLoading ? (
            <div className="p-6"><ContentCardSkeleton /></div>
          ) : payments.length === 0 ? (
            <EmptyState title="No payments yet" icon={History} />
          ) : (
            <ul className="divide-y divide-border">
              {payments.slice(0, 3).map(payment => (
                <li key={payment.id} className="p-4 flex items-center justify-between hover:bg-warm/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${payment.status === 'completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                      {payment.status === 'completed' ? <CheckCircle size={18} /> : <Clock size={18} />}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-charcoal">Rent Payment</p>
                      <p className="text-xs text-muted">{formatDate(payment.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-mono font-medium">{formatCurrency(payment.amount)}</p>
                      <Badge status={payment.status} label={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)} />
                    </div>
                    {payment.status === 'completed' && (
                      <Button variant="ghost" size="sm" className="hidden sm:flex" leftIcon={<Download size={14} />}>
                        Receipt
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="p-3 border-t border-border bg-warm/30 text-center">
            <Link to="/tenant/payments" className="text-xs font-medium text-primary hover:underline">View all payment history</Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default TenantDashboard;

// Add missing icons inline for brevity
const CheckCircle = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const Clock = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
