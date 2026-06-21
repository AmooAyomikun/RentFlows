import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Wrench, Plus, Upload, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Input, { Textarea } from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { getMaintenanceRequests, createMaintenanceRequest } from '../../services/maintenanceService';
import { timeAgo, formatDate } from '../../utils/formatDate';

const requestSchema = z.object({
  title: z.string().min(5, 'Please provide a descriptive title'),
  description: z.string().min(20, 'Please provide more details (min 20 characters)'),
  category: z.string().min(1, 'Please select a category'),
});

const TenantMaintenance = () => {
  const [showForm, setShowForm] = useState(false);

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['tenant-maintenance'],
    queryFn: getMaintenanceRequests, // Mock service returns landlord view currently, but structure is same
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(requestSchema)
  });

  const onSubmit = async (data) => {
    try {
      await createMaintenanceRequest({ ...data, priority: 'medium' });
      toast.success('Maintenance request submitted successfully');
      setShowForm(false);
      reset();
      refetch();
    } catch (err) {
      toast.error('Failed to submit request');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal">Maintenance</h1>
          <p className="text-sm text-muted">Report issues and track repairs.</p>
        </div>
        {!showForm && (
          <Button leftIcon={<Plus size={16} />} onClick={() => setShowForm(true)}>New Request</Button>
        )}
      </div>

      {showForm ? (
        <Card className="max-w-2xl">
          <h2 className="font-semibold text-charcoal mb-4 border-b border-border pb-3">Submit a new request</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Select 
              label="Issue Category" 
              options={[
                { value: 'plumbing', label: 'Plumbing' },
                { value: 'electrical', label: 'Electrical' },
                { value: 'appliance', label: 'Appliance' },
                { value: 'structural', label: 'Structural / Cosmetic' },
                { value: 'other', label: 'Other' },
              ]}
              {...register('category')}
              error={errors.category?.message}
            />
            <Input 
              label="Short Title" 
              placeholder="e.g. Leaking pipe under kitchen sink" 
              {...register('title')}
              error={errors.title?.message}
            />
            <Textarea 
              label="Description" 
              placeholder="Describe the issue in detail. When did it start? Does it happen all the time?" 
              rows={4}
              {...register('description')}
              error={errors.description?.message}
            />
            
            <div className="pt-2">
              <label className="block text-sm font-semibold text-charcoal mb-1.5">Photos (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-warm/50 transition-colors cursor-pointer">
                <Upload size={24} className="text-muted mx-auto mb-2" />
                <p className="text-sm text-charcoal font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" loading={isSubmitting}>Submit Request</Button>
            </div>
          </form>
        </Card>
      ) : (
        <>
          {isLoading ? (
            <div className="text-center p-10 text-muted">Loading requests...</div>
          ) : requests.length === 0 ? (
            <EmptyState 
              title="No maintenance requests" 
              description="You haven't reported any issues yet." 
              icon={Wrench} 
              action={<Button onClick={() => setShowForm(true)}>Report an Issue</Button>}
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {requests.map(req => (
                <Card key={req.id} hoverable className="flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      status={req.status === 'resolved' ? 'active' : req.status === 'in_progress' ? 'invited' : 'past'} 
                      label={req.status.replace('_', ' ').toUpperCase()} 
                    />
                    <span className="text-xs text-muted">{timeAgo(req.createdAt)}</span>
                  </div>
                  <h3 className="font-semibold text-charcoal text-lg mb-2">{req.title}</h3>
                  <p className="text-sm text-muted mb-4 line-clamp-2">{req.description}</p>
                  
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-medium text-charcoal bg-warm px-2 py-1 rounded">
                      {req.category?.toUpperCase() || 'GENERAL'}
                    </span>
                    <Button variant="ghost" size="sm" className="h-8">View details</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TenantMaintenance;
