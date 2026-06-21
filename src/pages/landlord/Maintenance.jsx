import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Wrench, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMaintenanceRequests } from '../../services/maintenanceService';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { timeAgo } from '../../utils/formatDate';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';
import EmptyState from '../../components/ui/EmptyState';

const Maintenance = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['maintenance-requests'],
    queryFn: getMaintenanceRequests,
  });

  const filtered = requests.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.propertyName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || r.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Kanban view mapping
  const columns = [
    { id: 'received', title: 'Received', color: 'border-muted/30 bg-warm/50' },
    { id: 'in_progress', title: 'In Progress', color: 'border-accent/30 bg-accent/5' },
    { id: 'resolved', title: 'Resolved', color: 'border-success/30 bg-success/5' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-charcoal">Maintenance</h1>
        <p className="text-sm text-muted">Track and resolve tenant issues.</p>
      </div>

      {/* Filters */}
      <Card padding={false} className="p-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search by issue or property..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-sm bg-warm rounded border-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 border border-border rounded-md px-2 bg-white">
              <Filter size={14} className="text-muted" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-sm border-none bg-transparent py-1.5 focus:ring-0 cursor-pointer"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            {/* Mobile-only status filter (hidden on md+ since Kanban handles status) */}
            <div className="md:hidden flex items-center gap-2 border border-border rounded-md px-2 bg-white">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border-none bg-transparent py-1.5 focus:ring-0 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="received">Received</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Kanban Board (Desktop) / List (Mobile) */}
      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => <ContentCardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No maintenance requests"
          description="Everything is running smoothly."
          icon={Wrench}
        />
      ) : (
        <div className="flex flex-col md:flex-row gap-5 items-start">
          {columns.map(col => {
            const colRequests = filtered.filter(r => r.status === col.id);
            // On mobile, only show columns that match status filter if not 'all'
            if (statusFilter !== 'all' && statusFilter !== col.id) return null;

            return (
              <div key={col.id} className={`flex-1 w-full rounded-lg border ${col.color} p-4 min-h-[500px]`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-charcoal">{col.title}</h3>
                  <span className="text-xs font-mono bg-white text-charcoal px-2 py-0.5 rounded-full border border-border shadow-sm">
                    {colRequests.length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {colRequests.map(req => (
                    <Link key={req.id} to={`/landlord/maintenance/${req.id}`} className="block">
                      <Card hoverable className="p-4 border-border/80 shadow-sm cursor-pointer relative overflow-hidden bg-white">
                        {req.priority === 'high' && (
                          <div className="absolute top-0 right-0 w-8 h-8 -mr-4 -mt-4 bg-error/20 rotate-45 transform origin-bottom-left" />
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <Badge 
                            status={req.priority === 'high' ? 'error' : req.priority === 'medium' ? 'warning' : 'info'} 
                            label={req.priority.toUpperCase()} 
                            className="text-[10px]"
                          />
                          <span className="text-xs text-muted">{timeAgo(req.createdAt)}</span>
                        </div>
                        <h4 className="font-medium text-charcoal text-sm mb-1">{req.title}</h4>
                        <p className="text-xs text-muted mb-3 line-clamp-1">{req.propertyName} • {req.unitName}</p>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <p className="text-xs font-medium text-charcoal">{req.tenantName}</p>
                          {req.updates?.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted">
                              <MessageSquare size={12} /> {req.updates.length}
                            </div>
                          )}
                        </div>
                      </Card>
                    </Link>
                  ))}
                  {colRequests.length === 0 && (
                    <div className="border-2 border-dashed border-border/50 rounded-lg h-24 flex items-center justify-center">
                      <p className="text-xs text-muted">Drop tickets here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Maintenance;
