import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Mail, UserPlus, Filter } from 'lucide-react';
import { getTenants } from '../../services/tenantService';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { formatDate } from '../../utils/formatDate';

const Tenants = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: tenants = [], isLoading } = useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants,
  });

  const filtered = tenants.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase()) || (t.unitName && t.unitName.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: 'name',
      label: 'Tenant',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size="sm" />
          <div>
            <p className="font-medium text-charcoal">{row.name}</p>
            <p className="text-xs text-muted">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <Badge status={val} label={val.charAt(0).toUpperCase() + val.slice(1)} />,
    },
    {
      key: 'unitName',
      label: 'Unit',
      render: (val, row) => (
        <div>
          <p className="text-sm">{val || 'Unassigned'}</p>
          {row.propertyName && <p className="text-xs text-muted">{row.propertyName}</p>}
        </div>
      ),
    },
    {
      key: 'leaseEnd',
      label: 'Lease End',
      render: (val) => val ? <span className="text-sm">{formatDate(val)}</span> : '-',
    },
    {
      key: 'actions',
      label: '',
      render: () => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Mail size={14} /></Button>
          <Button variant="outline" size="sm">View</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal">Tenants</h1>
          <p className="text-sm text-muted">Manage your renters and their leases.</p>
        </div>
        <Button leftIcon={<UserPlus size={16} />}>Invite Tenant</Button>
      </div>

      <Card padding={false}>
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search tenants by name, email, or unit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-sm bg-warm rounded border-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={14} className="text-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border-border rounded-md py-1.5 pl-2 pr-8 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="invited">Invited</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          loading={isLoading}
          keyExtractor={(row) => row.id}
          emptyMessage="No tenants found matching your criteria."
        />
      </Card>
    </div>
  );
};

export default Tenants;
