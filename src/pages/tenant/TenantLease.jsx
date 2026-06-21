import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, User, ShieldCheck, Info, FileSpreadsheet, ChevronRight } from 'lucide-react';
import { getTenantDashboard } from '../../services/tenantService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const TenantLease = () => {
  const { data: dashData, isLoading } = useQuery({
    queryKey: ['tenant-dashboard'],
    queryFn: getTenantDashboard,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-border rounded w-1/4 mb-4"></div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="h-64 bg-border rounded"></div>
            <div className="h-48 bg-border rounded"></div>
          </div>
          <div className="space-y-6">
            <div className="h-40 bg-border rounded"></div>
            <div className="h-64 bg-border rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const { lease } = dashData || {};
  
  // Calculate lease progress
  const start = lease?.startDate ? new Date(lease.startDate) : new Date('2025-01-01');
  const end = lease?.endDate ? new Date(lease.endDate) : new Date('2025-12-31');
  const today = new Date();
  
  const totalDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
  const elapsedDays = Math.max(0, Math.round((today - start) / (1000 * 60 * 60 * 24)));
  const progressPercent = Math.min(100, Math.round((elapsedDays / totalDays) * 100));
  const remainingDays = Math.max(0, totalDays - elapsedDays);

  const clauses = [
    { title: 'Subleasing', content: 'Subleasing or assigning the lease is strictly prohibited without prior written consent from the landlord.' },
    { title: 'Pet Policy', content: 'Small house pets (under 10kg) are permitted with an additional non-refundable pet deposit.' },
    { title: 'Notice Period', content: 'A minimum of 60 days written notice is required prior to the end of the lease if you do not plan to renew.' },
    { title: 'Late Payments', content: 'Payments received more than 5 days after the due date will attract a 5% late fee penalty.' },
    { title: 'Maintenance', content: 'The landlord is responsible for structural repairs. Minor repairs under ₦10,000 are the tenant\'s responsibility.' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display font-bold text-2xl text-charcoal">My Lease</h1>
          <p className="text-sm text-muted">View your lease agreement details, rules, and documents.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge status="active" label="Active Lease" />
        </div>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column (2/3 width on desktop) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Lease Details Overview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h2 className="font-semibold text-charcoal text-lg">Lease Agreement Overview</h2>
                  <p className="text-xs text-muted">Reference Code: RF-LSE-92847</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-muted block mb-1">PROPERTY & UNIT</span>
                    <p className="font-semibold text-charcoal text-base">{lease?.propertyName}</p>
                    <p className="text-sm text-muted">{lease?.unitName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">LANDLORD / PROPERTY MANAGER</span>
                    <p className="font-semibold text-charcoal text-base">Chief Emeka Okafor</p>
                    <p className="text-sm text-muted">okafor.plaza@rentflow.ng</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-muted block mb-1">RENT PAYMENT</span>
                    <p className="font-mono font-semibold text-charcoal text-base">{formatCurrency(lease?.rentAmount)}</p>
                    <p className="text-sm text-muted">Paid per {lease?.rentCycle}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">LEASE DURATION</span>
                    <div className="flex items-center gap-2 text-sm text-charcoal mt-1">
                      <Calendar size={16} className="text-muted" />
                      <span>{formatDate(lease?.startDate)}</span>
                      <ChevronRight size={14} className="text-muted" />
                      <span>{formatDate(lease?.endDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Lease Documents */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card padding={false}>
              <div className="p-6 border-b border-border">
                <h2 className="font-semibold text-charcoal text-lg">Documents & Agreements</h2>
                <p className="text-xs text-muted">Official signed documents associated with this lease.</p>
              </div>

              <ul className="divide-y divide-border">
                <li className="p-4 flex items-center justify-between hover:bg-warm/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-charcoal">Signed Lease Agreement.pdf</p>
                      <p className="text-xs text-muted">2.4 MB • Signed by both parties on Dec 28, 2024</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" leftIcon={<Download size={14} />}>Download</Button>
                </li>
                
                <li className="p-4 flex items-center justify-between hover:bg-warm/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <FileSpreadsheet size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-charcoal">Move-in Inspection Report.pdf</p>
                      <p className="text-xs text-muted">1.8 MB • Signed on Jan 02, 2025</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" leftIcon={<Download size={14} />}>Download</Button>
                </li>

                <li className="p-4 flex items-center justify-between hover:bg-warm/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center text-info">
                      <Info size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-charcoal">Tenant Handbook & House Rules.pdf</p>
                      <p className="text-xs text-muted">850 KB • Updated August 2024</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" leftIcon={<Download size={14} />}>Download</Button>
                </li>
              </ul>
            </Card>
          </motion.div>

        </div>

        {/* Right Column (1/3 width on desktop) */}
        <div className="space-y-6">
          
          {/* Progress / Timeline Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h2 className="font-semibold text-charcoal text-base mb-4">Lease Progress</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-charcoal mb-1">
                    <span>{progressPercent}% Complete</span>
                    <span className="text-muted">{remainingDays} Days Left</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-border grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-warm rounded">
                    <span className="text-[10px] text-muted block">START DATE</span>
                    <span className="text-xs font-semibold text-charcoal">{formatDate(lease?.startDate)}</span>
                  </div>
                  <div className="p-2 bg-warm rounded">
                    <span className="text-[10px] text-muted block">END DATE</span>
                    <span className="text-xs font-semibold text-charcoal">{formatDate(lease?.endDate)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Key Terms & Clauses */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h2 className="font-semibold text-charcoal text-base mb-4">Key Terms & Clauses</h2>
              <div className="space-y-4">
                {clauses.map((clause, idx) => (
                  <div key={idx} className="space-y-1">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">{clause.title}</h3>
                    <p className="text-xs text-body leading-relaxed">{clause.content}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default TenantLease;
