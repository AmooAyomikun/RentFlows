import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ArrowLeft, Mail, Phone, Calendar, Home, DollarSign, Edit, AlertCircle, Award, Star, ShieldCheck, CheckCircle2, FileText, X, Send, ThumbsUp } from 'lucide-react';
import { getTenants } from '../../services/tenantService';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';
import EmptyState from '../../components/ui/EmptyState';

const TenantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewScore, setReviewScore] = useState(845);
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      landlord: 'Chief Emeka Okafor (Victoria Island Towers)',
      date: 'Dec 2025',
      rating: 5,
      comment: 'Exceptional resident. Settled service charges promptly and left Unit #4B in pristine condition upon lease transfer.'
    },
    {
      id: 'rev-2',
      landlord: 'Alhaji Musa Rano (Ikoyi Crescent Lofts)',
      date: 'Nov 2023',
      rating: 5,
      comment: 'Very polite and zero noise complaints. Recommended for any premium luxury apartment.'
    }
  ]);

  // Modal Form State
  const [punctualityStar, setPunctualityStar] = useState(5);
  const [upkeepStar, setUpkeepStar] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const { data: tenants, isLoading } = useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants,
  });

  const tenant = tenants?.find((t) => t.id === id);

  if (isLoading) {
    return <div className="space-y-6"><ContentCardSkeleton /></div>;
  }

  if (!tenant) {
    return (
      <EmptyState 
        title="Tenant not found" 
        description="The tenant record you are looking for does not exist."
        action={<Button onClick={() => navigate('/landlord/tenants')}>Back to Tenants</Button>}
      />
    );
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      toast.error('Please enter a brief performance review comment.');
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      landlord: 'You (Current Landlord Rating)',
      date: 'Just Now',
      rating: Math.round((punctualityStar + upkeepStar) / 2),
      comment: reviewComment
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewScore(prev => Math.min(1000, prev + 15));
    setShowReviewModal(false);
    setReviewComment('');
    toast.success('Resident review published! Trust score increased by +15 points.');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans text-[#4A4F4C] pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => navigate('/landlord/tenants')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900 border-none bg-transparent cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <Avatar name={tenant.name} size="md" />
            <div>
              <h1 className="text-2xl font-display font-bold text-[#0B4F45] m-0 flex items-center gap-2">
                {tenant.name}
                <Badge status={tenant.paymentStatus === 'paid' ? 'success' : tenant.paymentStatus === 'overdue' ? 'error' : 'warning'} label={tenant.paymentStatus.toUpperCase()} />
              </h1>
              <p className="text-xs sm:text-sm text-[#4A4F4C] flex items-center gap-2 m-0 mt-0.5">
                <span className="flex items-center gap-1"><Mail size={12} /> {tenant.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Phone size={12} /> {tenant.phone}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowReviewModal(true)}
            className="px-4 py-2 rounded-xl bg-[#0B4F45] hover:bg-[#083D35] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer border-none"
          >
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>Submit Landlord Rating</span>
          </button>
          <Button variant="outline" leftIcon={<Mail size={16} />}>Message</Button>
        </div>
      </div>

      {/* ── REPUTATION & TRUST PASSPORT HERO CARD ── */}
      <div className="dashboard-card bg-[#0B4F45] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={14} /> Verified RentFlow Trust Passport
              </span>
              <span className="bg-[#C75B30] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Tier 1 Prime Resident
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white m-0">
              Reputation Score: {reviewScore} / 1000
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed m-0">
              This resident has completed full background screening. Payment punctuality is automated via NIBSS direct debit verification with zero default flags across 3 tenancy terms.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>NIN Identity Verified</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>BVN Biometric Match</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>CRC Bureau Clear</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center min-w-[240px]">
            <span className="text-[11px] text-white/70 font-bold uppercase tracking-wider block mb-1">Default Risk Assessment</span>
            <div className="text-3xl font-mono font-black text-[#F4C395]">
              VERY LOW RISK
            </div>
            <span className="text-xs font-bold text-emerald-300 mt-2 block">
              ★ 100% On-Time Payment Record
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column - Details & Financials */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-4 flex items-center gap-2">
              <Home size={18} className="text-[#0B4F45]" />
              Lease Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Property</p>
                <p className="text-base font-medium text-gray-900">{tenant.propertyName || 'Unassigned'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Unit</p>
                <p className="text-base font-medium text-gray-900">{tenant.unitLabel || 'Unassigned'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Lease Start</p>
                  <p className="text-base text-[#4A4F4C]">{formatDate(tenant.leaseStart)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Lease End</p>
                  <p className="text-base text-[#4A4F4C]">{formatDate(tenant.leaseEnd)}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-600" />
              Financials
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Rent Amount</p>
                <p className="text-lg font-mono font-bold text-gray-900">{formatCurrency(tenant.rentAmount)} <span className="text-sm font-sans text-gray-500 font-normal">/ yr</span></p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Security Deposit</p>
                <p className="text-base font-mono text-gray-900">{formatCurrency(tenant.depositAmount)}</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Last Payment</p>
                <p className="text-base text-[#4A4F4C]">{tenant.lastPaymentDate ? formatDate(tenant.lastPaymentDate) : 'No payments yet'}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Landlord Reviews History & Payments */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Landlord Reference & Reviews Log */}
          <Card>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-[#0B4F45] m-0 flex items-center gap-2">
                  <Award size={18} className="text-[#C75B30]" />
                  Verified Landlord References & Ratings
                </h2>
                <p className="text-xs text-[#4A4F4C] m-0 mt-0.5">Immutable feedback provided by registered estate landlords upon lease exit.</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {reviewsList.length} Endorsements
              </span>
            </div>

            <div className="space-y-4">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-gray-50/80 border border-gray-200/80 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 m-0">{rev.landlord}</h3>
                      <span className="text-[11px] text-gray-500 block">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#4A4F4C] m-0 italic bg-white p-3 rounded-lg border border-gray-100">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Recent NIBSS Payment Logs</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-3">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                       <DollarSign size={18} className="text-emerald-600" />
                     </div>
                     <div>
                       <p className="text-sm font-bold text-gray-900 m-0">Annual Rent Tranche Settlement</p>
                       <p className="text-xs text-gray-500 m-0 mt-0.5">{formatDate(new Date(2026, 6 - i, 1))}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-mono font-bold text-gray-900 m-0">{formatCurrency(tenant.rentAmount)}</p>
                     <Badge status="success" label="Verified NIBSS" className="mt-1" />
                   </div>
                 </div>
               ))}
            </div>
          </Card>

        </div>
      </div>

      {/* MODAL: SUBMIT LANDLORD REVIEW */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {showReviewModal && (
            <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0B4F45] flex items-center justify-center font-bold">
                      <Star size={18} className="fill-[#0B4F45]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0B4F45] m-0">Publish Resident Review</h3>
                      <p className="text-xs text-gray-500 m-0">Rate {tenant.name}'s tenancy performance.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-2">Payment Punctuality</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setPunctualityStar(star)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                            punctualityStar >= star ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-gray-50 border-gray-200 text-gray-300'
                          }`}
                        >
                          <Star size={18} className={punctualityStar >= star ? 'fill-amber-400' : ''} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-2">Property Upkeep & Cleanliness</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUpkeepStar(star)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                            upkeepStar >= star ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-gray-50 border-gray-200 text-gray-300'
                          }`}
                        >
                          <Star size={18} className={upkeepStar >= star ? 'fill-amber-400' : ''} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Performance Feedback Comment</label>
                    <textarea
                      rows="3"
                      placeholder="Describe prompt payment, property maintenance, or communication attitude..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#0B4F45]"
                    />
                  </div>

                  <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 flex items-center gap-2.5">
                    <ShieldCheck size={18} className="text-[#0B4F45] shrink-0" />
                    <p className="text-[11px] text-[#0B4F45] m-0">
                      Submitting positive reviews increases the resident's RentFlow Trust Score across the national network.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-bold text-xs hover:bg-gray-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#0B4F45] hover:bg-[#083D35] text-white font-bold text-xs shadow-sm cursor-pointer border-none flex items-center justify-center gap-2"
                    >
                      <span>Publish Rating</span>
                      <Send size={14} />
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </div>
  );
};

export default TenantDetail;
