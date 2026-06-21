import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, MapPin, Building2, ChevronRight } from 'lucide-react';
import { getProperties } from '../../services/propertyService';
import { getPropertyPhoto } from '../../utils/propertyPhotos';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

const Properties = () => {
  const [search, setSearch] = useState('');

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
  });

  const filtered = properties.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal">Properties</h1>
          <p className="text-sm text-muted">Manage your portfolio and units.</p>
        </div>
        <Link to="/landlord/properties/new">
          <Button leftIcon={<Plus size={16} />}>Add property</Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-3 rounded-lg border border-border shadow-sm flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 text-sm bg-warm rounded border-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
          />
        </div>
        <div className="text-sm text-muted hidden sm:block">
          {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <ContentCardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={search ? "No properties found" : "No properties yet"}
          description={search ? `We couldn't find anything matching "${search}".` : "Add your first property to start managing units and tenants."}
          icon={Building2}
          action={
            !search && (
              <Link to="/landlord/properties/new">
                <Button>Add your first property</Button>
              </Link>
            )
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((property, i) => (
            <motion.div key={property.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/landlord/properties/${property.id}`} className="block h-full group">
                <Card hoverable className="h-full flex flex-col p-0 overflow-hidden border-border/80 group-hover:border-primary/30 transition-colors">
                  {/* Image or placeholder */}
                  <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border flex items-center justify-center relative overflow-hidden">
                    {getPropertyPhoto(property.id) ? (
                      <img src={getPropertyPhoto(property.id)} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Building2 size={32} className="text-primary/30 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                    )}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge
                        status={property.occupiedUnits === property.totalUnits ? 'occupied' : 'vacant'}
                        label={`${property.occupiedUnits}/${property.totalUnits} Units`}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-semibold text-charcoal text-lg mb-1 group-hover:text-primary transition-colors truncate">
                      {property.name}
                    </h2>
                    <div className="flex items-start gap-1.5 text-muted text-sm mb-4">
                      <MapPin size={14} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="line-clamp-2">{property.address}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-sm">
                      <span className="font-mono font-medium text-charcoal">
                        {property.propertyType === 'residential' ? 'Residential' : 'Commercial'}
                      </span>
                      <span className="text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Manage <ChevronRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
