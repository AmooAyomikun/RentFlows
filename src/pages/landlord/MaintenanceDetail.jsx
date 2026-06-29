import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, MessageSquare, Wrench, Clock, CheckCircle, Upload } from 'lucide-react';
import { getMaintenanceRequests } from '../../services/maintenanceService';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { Textarea } from '../../components/ui/Input';
import { formatDateTime } from '../../utils/formatDate';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';
import EmptyState from '../../components/ui/EmptyState';

const MaintenanceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reply, setReply] = useState('');

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['maintenance-requests'],
    queryFn: getMaintenanceRequests,
  });

  const request = requests.find((r) => r.id === id);

  if (isLoading) {
    return <div className="space-y-6"><ContentCardSkeleton /></div>;
  }

  if (!request) {
    return (
      <EmptyState 
        title="Ticket not found" 
        description="This maintenance request does not exist or has been removed."
        action={<Button onClick={() => navigate('/landlord/maintenance')}>Back to Maintenance</Button>}
      />
    );
  }

  const statusSteps = [
    { id: 'received', label: 'Received' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' }
  ];

  const currentStepIdx = statusSteps.findIndex(s => s.id === request.status);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/landlord/maintenance')}
          className="p-2 hover:bg-warm rounded-full transition-colors text-muted hover:text-charcoal"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <Badge 
              status={request.priority === 'high' ? 'error' : request.priority === 'medium' ? 'warning' : 'info'} 
              label={`${request.priority.toUpperCase()} PRIORITY`} 
            />
            <span className="text-xs font-mono text-muted">{request.id}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{request.title}</h1>
        </div>
      </div>

      {/* Status Pipeline Stepper */}
      <Card padding={false} className="p-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-warm rounded-full -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500 rounded-full -z-10" 
            style={{ width: `${(currentStepIdx / (statusSteps.length - 1)) * 100}%` }}
          />
          
          {statusSteps.map((step, idx) => {
            const isCompleted = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted ? 'bg-primary text-white' : 'bg-warm text-muted border border-border'
                }`}>
                  {isCompleted ? <CheckCircle size={16} /> : <span className="text-xs font-medium">{idx + 1}</span>}
                </div>
                <span className={`text-xs font-semibold ${isCurrent ? 'text-primary' : isCompleted ? 'text-charcoal' : 'text-muted'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-primary" />
              Description
            </h2>
            <p className="text-base text-[#4A4F4C] leading-relaxed whitespace-pre-wrap">{request.description}</p>
            
            {request.photoUrl && (
              <div className="mt-6 border border-border rounded-lg overflow-hidden">
                <img src={request.photoUrl} alt="Maintenance issue" className="w-full h-auto object-cover max-h-96" />
              </div>
            )}
          </Card>

          {/* Activity Timeline */}
          <Card>
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-6 flex items-center gap-2">
              <Clock size={18} className="text-info" />
              Activity History
            </h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {request.statusHistory?.map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Timeline dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-warm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    {item.status === 'resolved' ? <CheckCircle size={16} className="text-success" /> : <Wrench size={16} className="text-muted" />}
                  </div>
                  {/* Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-charcoal text-sm capitalize">{item.status.replace('_', ' ')}</span>
                      <span className="text-[10px] text-muted">{formatDateTime(item.timestamp)}</span>
                    </div>
                    <p className="text-base text-[#4A4F4C]">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-sm font-semibold uppercase text-gray-800 mb-3">Add Note or Reply</h3>
              <Textarea 
                placeholder="Type a message to the tenant or internal note..." 
                rows={3} 
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <div className="flex justify-between items-center mt-3">
                <Button variant="ghost" size="sm" leftIcon={<Upload size={14} />}>Attach File</Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Internal Note</Button>
                  <Button variant="primary" size="sm" disabled={!reply.trim()}>Send to Tenant</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-4">Ticket Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Tenant</p>
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-900">{request.tenantName}</p>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]">View</Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Property</p>
                <p className="text-base text-[#4A4F4C]">{request.propertyName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Unit</p>
                <p className="text-base text-[#4A4F4C]">{request.unitLabel}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Category</p>
                <Badge status="default" label={request.category} />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Created At</p>
                <p className="text-base text-[#4A4F4C]">{formatDateTime(request.createdAt)}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-4">Actions</h2>
            <div className="space-y-2">
              <Button className="w-full" variant={currentStepIdx < 1 ? "primary" : "outline"} disabled={currentStepIdx >= 1}>
                Mark In Progress
              </Button>
              <Button className="w-full" variant={currentStepIdx === 1 ? "success" : "outline"} disabled={currentStepIdx >= 2}>
                Mark Resolved
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetail;
