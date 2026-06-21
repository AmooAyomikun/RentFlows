import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, Download, Filter, Search } from 'lucide-react';
import { getPayments, getPaymentSummary } from '../../services/paymentService';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import EmptyState from '../../components/ui/EmptyState';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const Payments = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['landlord-payments'],
    queryFn: () => getPayments(),
  });

  const { data: summary } = useQuery({
    queryKey: ['landlord-payment-summary'],
    queryFn: () => getPaymentSummary(),
  });

  const filtered = payments.filter((p) => {
    const matchesSearch =
      (p.tenantName && p.tenantName.toLowerCase().includes(search.toLowerCase())) ||
      (p.propertyName && p.propertyName.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: 'tenantName',
      label: 'Tenant',
      render: (val, row) => (
        <div>
          <p className="text-sm font-medium">{val || 'Unknown Tenant'}</p>
          <p className="text-xs text-muted">{row.propertyName} • {row.unitLabel}</p>
        </div>
      ),
    },
    {
      key: 'paymentDate',
      label: 'Date',
      render: (val, row) => <span className="text-sm">{val ? formatDate(val) : formatDate(row.dueDate)}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (val) => <span className="font-mono font-medium">{formatCurrency(val)}</span>,
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
          {row.status === 'paid' && (
            <button className="p-1.5 text-muted hover:text-charcoal bg-warm rounded border border-border">
              <Download size={14} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-charcoal">Payments Ledger</h1>
        <p className="text-sm text-muted">Track all rent and maintenance payments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-muted mb-1">Total Collected</p>
          <p className="text-2xl font-bold font-mono text-success">
            {summary ? formatCurrency(summary.collected) : '₦0'}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted mb-1">Pending Payments</p>
          <p className="text-2xl font-bold font-mono text-warning">
            {summary ? formatCurrency(summary.pending) : '₦0'}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted mb-1">Overdue</p>
          <p className="text-2xl font-bold font-mono text-error">
            {summary ? formatCurrency(summary.overdue) : '₦0'}
          </p>
        </Card>
      </div>

      <Card padding={false} className="p-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search by tenant or property..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-sm bg-warm rounded border-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
          </div>
          <div className="flex items-center gap-2 border border-border rounded-md px-2 bg-white">
            <Filter size={14} className="text-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border-none bg-transparent py-1.5 focus:ring-0 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </Card>

      <Card padding={false}>
        {isLoading ? (
          <div className="p-10 text-center text-muted">Loading payments...</div>
        ) : filtered.length === 0 ? (
          <EmptyState title="No payments found" icon={CreditCard} />
        ) : (
          <DataTable columns={columns} data={filtered} keyExtractor={(row) => row.id} />
        )}
      </Card>
    </div>
  );
};

export default Payments;
