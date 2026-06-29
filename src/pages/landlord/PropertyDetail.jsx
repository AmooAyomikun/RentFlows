import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, MapPin, Plus, MoreVertical, Edit2, Trash2, Home, Users
} from 'lucide-react';
import { getPropertyById, deleteProperty } from '../../services/propertyService';
import { getUnits } from '../../services/unitService';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import DataTable from '../../components/ui/DataTable';
import EmptyState from '../../components/ui/EmptyState';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: property, isLoading: loadingProp } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id),
  });

  const { data: units = [], isLoading: loadingUnits } = useQuery({
    queryKey: ['property-units', id],
    queryFn: () => getUnits({ propertyId: id }),
  });

  const breadcrumbs = [
    { label: 'Properties', path: '/landlord/properties' },
    { label: property?.name || 'Loading...', path: `/landlord/properties/${id}` },
  ];

  const unitColumns = [
    {
      key: 'name',
      label: 'Unit Name',
      render: (val) => <span className="text-base font-medium text-gray-900">{val}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <Badge status={val} label={val.charAt(0).toUpperCase() + val.slice(1)} />,
    },
    {
      key: 'rentAmount',
      label: 'Rent Amount',
      render: (val) => <span className="text-base font-mono text-gray-900">{formatCurrency(val)}</span>,
    },
    {
      key: 'tenant',
      label: 'Tenant',
      render: (val, row) => val ? (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
            {val.name.charAt(0)}
          </div>
          <span className="text-base font-medium text-gray-900">{val.name}</span>
        </div>
      ) : (
        <span className="text-base text-gray-400 italic">Vacant</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (_, row) => (
        <div className="flex justify-end">
          <Link to={`/landlord/properties/${id}/units/${row.id}`} className="text-primary hover:underline text-sm font-semibold">
            View details
          </Link>
        </div>
      ),
    },
  ];

  if (loadingProp) {
    return <div className="space-y-6"><ContentCardSkeleton /><ContentCardSkeleton /></div>;
  }

  if (!property) {
    return (
      <EmptyState
        title="Property not found"
        description="The property you're looking for doesn't exist or has been deleted."
        icon={Building2}
        action={<Link to="/landlord/properties"><Button>Back to Properties</Button></Link>}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={breadcrumbs} />

      {/* Property Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-border card-shadow overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-charcoal to-primary relative">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-xl bg-white border-4 border-white shadow-md flex items-center justify-center">
              <Building2 size={32} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="pt-14 pb-6 px-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-base text-[#4A4F4C]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> {property.address}
                </span>
                <span className="flex items-center gap-1.5">
                  <Home size={14} /> {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} /> {property.occupiedUnits}/{property.totalUnits} Units Occupied
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" leftIcon={<Edit2 size={14} />}>Edit</Button>
              <Button variant="danger" size="sm" leftIcon={<Trash2 size={14} />} onClick={() => setDeleteConfirmOpen(true)}>Delete</Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Units Section */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase text-gray-800">Units</h2>
          <Link to={`/landlord/properties/${id}/units/new`}>
            <Button size="sm" leftIcon={<Plus size={14} />}>Add Unit</Button>
          </Link>
        </div>

        <Card padding={false} className="overflow-hidden">
          {loadingUnits ? (
            <div className="p-6"><ContentCardSkeleton /></div>
          ) : units.length === 0 ? (
            <EmptyState
              title="No units yet"
              description="Add your first unit to this property to start collecting rent."
              icon={Home}
              action={<Link to={`/landlord/properties/${id}/units/new`}><Button>Add Unit</Button></Link>}
            />
          ) : (
            <DataTable
              columns={unitColumns}
              data={units}
              keyExtractor={(row) => row.id}
            />
          )}
        </Card>
      </motion.div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          try {
            setIsDeleting(true);
            await deleteProperty(id);
            setDeleteConfirmOpen(false);
            navigate('/landlord/properties');
          } catch (err) {
            console.error(err);
          } finally {
            setIsDeleting(false);
          }
        }}
        isSubmitting={isDeleting}
        title="Delete Property"
        message={`Are you sure you want to delete ${property.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default PropertyDetail;
