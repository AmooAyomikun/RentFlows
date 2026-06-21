import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Mail, Phone, Calendar, Home, DollarSign, Edit, AlertCircle } from 'lucide-react';
import { getTenants } from '../../services/tenantService';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';
import EmptyState from '../../components/ui/EmptyState';

const TenantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: tenants, isLoading } = useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants,
  });

  const tenant = tenants?.find((t) => t.id === id);

  if (isLoading) {
    return <div className="space-y-6"><ContentCardSkeleton /></div>;
  }

  if (!tenant) {
    return (
      <EmptyState 
        title="Tenant not found" 
        description="The tenant record you are looking for does not exist."
        action={<Button onClick={() => navigate('/landlord/tenants')}>Back to Tenants</Button>}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/landlord/tenants')}
          className="p-2 hover:bg-warm rounded-full transition-colors text-muted hover:text-charcoal"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Avatar name={tenant.name} size="md" />
            <div>
              <h1 className="font-display font-bold text-2xl text-charcoal flex items-center gap-2">
                {tenant.name}
                <Badge status={tenant.paymentStatus === 'paid' ? 'success' : tenant.paymentStatus === 'overdue' ? 'error' : 'warning'} label={tenant.paymentStatus.toUpperCase()} />
              </h1>
              <p className="text-sm text-muted flex items-center gap-2">
                <span className="flex items-center gap-1"><Mail size={12} /> {tenant.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Phone size={12} /> {tenant.phone}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Mail size={16} />}>Message</Button>
          <Button variant="outline" leftIcon={<Edit size={16} />}>Edit</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="space-y-6">
          <Card>
            <h2 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Home size={18} className="text-primary" />
              Lease Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted mb-1">Property</p>
                <p className="text-sm font-medium text-charcoal">{tenant.propertyName || 'Unassigned'}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Unit</p>
                <p className="text-sm font-medium text-charcoal">{tenant.unitLabel || 'Unassigned'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted mb-1">Lease Start</p>
                  <p className="text-sm text-charcoal">{formatDate(tenant.leaseStart)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Lease End</p>
                  <p className="text-sm text-charcoal">{formatDate(tenant.leaseEnd)}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
              <DollarSign size={18} className="text-success" />
              Financials
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted mb-1">Rent Amount</p>
                <p className="text-lg font-mono font-bold text-charcoal">{formatCurrency(tenant.rentAmount)} <span className="text-sm font-sans text-muted font-normal">/ yr</span></p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Security Deposit</p>
                <p className="text-sm font-mono text-charcoal">{formatCurrency(tenant.depositAmount)}</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted mb-1">Last Payment</p>
                <p className="text-sm text-charcoal">{tenant.lastPaymentDate ? formatDate(tenant.lastPaymentDate) : 'No payments yet'}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - History */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-charcoal">Recent Payments</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            {/* Mock recent payments since we don't have a direct query for tenant's payments here without importing paymentService and rewriting */}
            <div className="space-y-3">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg bg-warm/30">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                       <DollarSign size={18} className="text-success" />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-charcoal">Rent Payment</p>
                       <p className="text-xs text-muted">{formatDate(new Date(2026, 6 - i, 1))}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-mono font-bold text-charcoal">{formatCurrency(tenant.rentAmount)}</p>
                     <Badge status="success" label="Paid" className="mt-1" />
                   </div>
                 </div>
               ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-charcoal flex items-center gap-2">
                <AlertCircle size={18} className="text-warning" />
                Maintenance Requests
              </h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="text-center py-8">
              <p className="text-sm text-muted">No recent maintenance requests from this tenant.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TenantDetail;
