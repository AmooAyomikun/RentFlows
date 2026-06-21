import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Building2, MapPin, ArrowLeft } from 'lucide-react';
import { createProperty } from '../../services/propertyService';
import { toast } from 'sonner';
import Input from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

const schema = z.object({
  name: z.string().min(2, 'Property name is required'),
  address: z.string().min(5, 'Full address is required'),
  propertyType: z.enum(['residential', 'commercial']),
  description: z.string().optional(),
});

const AddProperty = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { propertyType: 'residential' }
  });

  const onSubmit = async (data) => {
    try {
      await createProperty(data);
      toast.success('Property created successfully');
      navigate('/landlord/properties');
    } catch (err) {
      toast.error('Failed to create property');
    }
  };

  const breadcrumbs = [
    { label: 'Properties', path: '/landlord/properties' },
    { label: 'New Property', path: '/landlord/properties/new' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Breadcrumbs items={breadcrumbs} />

      <div>
        <h1 className="font-display font-bold text-2xl text-charcoal mb-1">Add a new property</h1>
        <p className="text-muted text-sm">Enter the details of your new property. You can add individual units later.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-charcoal border-b border-border pb-2">Basic Information</h2>

              <Input
                label="Property Name"
                placeholder="e.g. Sunshine Apartments or 123 Main St Duplex"
                required
                leftIcon={<Building2 size={15} />}
                error={errors.name?.message}
                {...register('name')}
              />

              <Select
                label="Property Type"
                options={[
                  { value: 'residential', label: 'Residential' },
                  { value: 'commercial', label: 'Commercial' }
                ]}
                required
                error={errors.propertyType?.message}
                {...register('propertyType')}
              />

              <Textarea
                label="Full Address"
                placeholder="Enter the complete address including state and city"
                required
                rows={3}
                error={errors.address?.message}
                {...register('address')}
              />

              <Textarea
                label="Description (Optional)"
                placeholder="Internal notes about this property..."
                rows={2}
                error={errors.description?.message}
                {...register('description')}
              />
            </div>

            <div className="pt-4 border-t border-border flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" loading={isSubmitting}>Create Property</Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddProperty;
