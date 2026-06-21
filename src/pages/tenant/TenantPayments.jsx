import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, Download, ExternalLink, Calendar as CalIcon } from 'lucide-react';
import { getTenantPayments } from '../../services/tenantService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import EmptyState from '../../components/ui/EmptyState';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const TenantPayments = () => {
  const [payModalOpen, setPayModalOpen] = useState(false);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['tenant-payments'],
    queryFn: getTenantPayments,
  });

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (val) => <span className="text-sm font-medium">{formatDate(val)}</span>,
    },
    {
      key: 'description',
      label: 'Description',
      render: (val) => <span className="text-sm">{val || 'Rent Payment'}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (val) => <span className="font-mono">{formatCurrency(val)}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <Badge status={val} label={val.charAt(0).toUpperCase() + val.slice(1)} />,
    },
    {
      key: 'actions',
      label: '',
      render: (_, row) => (
        <div className="flex justify-end gap-2">
          {row.status === 'completed' && (
            <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>Receipt</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal">Payments</h1>
          <p className="text-sm text-muted">View your payment history and download receipts.</p>
        </div>
        <Button leftIcon={<CreditCard size={16} />} onClick={() => setPayModalOpen(true)}>Pay Rent</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 space-y-5">
          <Card padding={false}>
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-charcoal">Payment History</h2>
            </div>
            {isLoading ? (
              <div className="p-10 text-center text-muted">Loading payments...</div>
            ) : payments.length === 0 ? (
              <EmptyState title="No payments yet" icon={CreditCard} />
            ) : (
              <DataTable columns={columns} data={payments} keyExtractor={row => row.id} />
            )}
          </Card>
        </div>
        
        <div className="space-y-5">
          <Card>
            <h2 className="font-semibold text-charcoal mb-4">Payment Methods</h2>
            <div className="space-y-3">
              <div className="p-3 border border-border rounded-md bg-warm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <CreditCard size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">•••• 4242</p>
                    <p className="text-xs text-muted">Expires 12/26</p>
                  </div>
                </div>
                <Badge status="active" label="Default" />
              </div>
              <Button variant="outline" className="w-full" size="sm">Add Payment Method</Button>
            </div>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <CalIcon size={20} className="text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-charcoal text-sm mb-1">Auto-Pay Active</h3>
                <p className="text-xs text-muted mb-3">Your rent will be automatically paid 3 days before the due date.</p>
                <button className="text-xs font-medium text-primary hover:underline">Manage Auto-Pay</button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mock Pay Modal Placeholder */}
      {payModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <Card className="w-full max-w-md animate-in fade-in zoom-in-95">
            <h2 className="font-display font-semibold text-xl mb-4">Make a Payment</h2>
            <p className="text-sm text-muted mb-6">Payment gateway simulation. In a real app, this would load Paystack.</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setPayModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setPayModalOpen(false)}>Simulate Payment</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TenantPayments;
