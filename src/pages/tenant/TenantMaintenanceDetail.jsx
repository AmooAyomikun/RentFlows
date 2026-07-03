import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Wrench, Clock, CheckCircle2, Camera, X, Plus,
  MessageSquare, AlertTriangle, ChevronRight, Building2
} from 'lucide-react';
import { toast } from 'sonner';

const mockRequests = [
  {
    id: 'maint-1',
    title: 'Leaking kitchen sink tap',
    description: 'The kitchen sink tap has been dripping constantly for two weeks. Water is being wasted and there\'s some dampness building up under the cabinet.',
    category: 'Plumbing',
    priority: 'medium',
    status: 'in_progress',
    photoUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    createdAt: '2026-06-10T14:30:00Z',
    updatedAt: '2026-06-12T09:00:00Z',
    statusHistory: [
      { status: 'received', timestamp: '2026-06-10T14:30:00Z', note: 'Request received.' },
      { status: 'in_progress', timestamp: '2026-06-12T09:00:00Z', note: 'Plumber assigned. Visiting Monday 16 June.' }
    ]
  },
  {
    id: 'maint-2',
    title: 'Kitchen Sink Leak',
    description: 'There is a persistent water leak from the kitchen sink pipe. Water drips to the floor whenever the tap is on.',
    category: 'Plumbing',
    priority: 'high',
    status: 'in_progress',
    photoUrl: null,
    createdAt: '2026-06-28T10:00:00Z',
    updatedAt: '2026-06-29T14:00:00Z',
    statusHistory: [
      { status: 'received', timestamp: '2026-06-28T10:00:00Z', note: 'Request received. Our team will respond within 24 hours.' },
      { status: 'in_progress', timestamp: '2026-06-29T14:00:00Z', note: 'Plumber confirmed for Jul 02 at 10:00 AM.' }
    ]
  }
];

const categoryIcons = {
  Plumbing: '🔧',
  Electrical: '⚡',
  Structural: '🏗️',
  HVAC: '❄️',
  Security: '🔒',
  Other: '📋',
};

const priorityConfig = {
  high: { label: 'High Priority', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  medium: { label: 'Medium Priority', bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  low: { label: 'Low Priority', bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
};

const statusConfig = {
  received: { label: 'Received', icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100' },
  in_progress: { label: 'In Progress', icon: Wrench, color: 'text-amber-600', bg: 'bg-amber-100' },
  resolved: { label: 'Resolved', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
};

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const TenantMaintenanceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photoModal, setPhotoModal] = useState(false);

  // Find request - try by id or fallback to first
  const request = mockRequests.find(r => r.id === id) || mockRequests[0];

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4 text-center">
        <AlertTriangle size={40} className="text-amber-500" />
        <h2 className="font-bold text-xl text-gray-900">Ticket not found</h2>
        <p className="text-gray-500 text-sm">This maintenance request doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/tenant/maintenance')}
          className="px-5 py-2.5 bg-[#0B4F45] text-white rounded-xl text-sm font-bold border-none cursor-pointer"
        >
          Back to Maintenance
        </button>
      </div>
    );
  }

  const pConfig = priorityConfig[request.priority] || priorityConfig.medium;
  const sConfig = statusConfig[request.status] || statusConfig.received;
  const StatusIcon = sConfig.icon;

  const steps = [
    { key: 'received', label: 'Received' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'resolved', label: 'Resolved' },
  ];
  const currentStep = steps.findIndex(s => s.key === request.status);

  return (
    <div className="space-y-6 w-full font-sans pb-16 max-w-3xl mx-auto">
      {/* Breadcrumb & Back */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate('/tenant/maintenance')}
          className="flex items-center gap-1.5 text-[#4A4F4C] hover:text-[#0B4F45] transition-colors font-medium border-none bg-transparent cursor-pointer p-0"
        >
          <ArrowLeft size={16} />
          <span>Maintenance</span>
        </button>
        <ChevronRight size={14} className="text-gray-300" />
        <span className="text-gray-900 font-semibold truncate">{request.title}</span>
      </div>

      {/* Ticket Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-[#0B4F45] to-[#168070]" />
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${pConfig.bg} ${pConfig.text} ${pConfig.border}`}>
                  {pConfig.label}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${sConfig.bg} ${sConfig.color}`}>
                  <StatusIcon size={12} />
                  {sConfig.label}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-[#0B4F45]">{request.title}</h1>
              <div className="flex items-center gap-4 text-xs text-[#8A8F8B]">
                <span className="flex items-center gap-1">
                  <Building2 size={12} /> Victoria Island Towers, Suite 402-B
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {formatDate(request.createdAt)}
                </span>
              </div>
            </div>
            <div className="text-3xl">{categoryIcons[request.category] || '📋'}</div>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#8A8F8B] mb-6">Request Status</h2>
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200" />
          <div
            className="absolute top-5 left-5 h-0.5 bg-[#0B4F45] transition-all duration-700"
            style={{ width: currentStep === 0 ? '0%' : currentStep === 1 ? '50%' : '100%' }}
          />
          <div className="relative flex justify-between">
            {steps.map((step, idx) => {
              const done = idx <= currentStep;
              const current = idx === currentStep;
              return (
                <div key={step.key} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white ${done ? 'border-[#0B4F45]' : 'border-gray-200'}`}>
                    {done ? (
                      <CheckCircle2 size={20} className="text-[#0B4F45]" />
                    ) : (
                      <span className="text-xs font-bold text-gray-400">{idx + 1}</span>
                    )}
                  </div>
                  <span className={`text-xs font-bold text-center ${current ? 'text-[#0B4F45]' : done ? 'text-gray-700' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Log */}
        <div className="mt-8 space-y-4 pt-6 border-t border-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A8F8B]">Activity Timeline</h3>
          <div className="space-y-3">
            {[...request.statusHistory].reverse().map((item, i) => {
              const cfg = statusConfig[item.status] || statusConfig.received;
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3"
                >
                  <div className={`w-8 h-8 rounded-full ${cfg.bg} ${cfg.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 p-3 bg-[#FAF7F2] rounded-xl border border-[#E5E1DA]">
                    <p className="text-sm font-bold text-gray-900">{item.note}</p>
                    <p className="text-[11px] text-[#8A8F8B] mt-0.5">{formatDate(item.timestamp)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Description & Photo */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-[#0B4F45]" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#8A8F8B]">Description</h2>
        </div>
        <p className="text-sm text-[#4A4F4C] leading-relaxed whitespace-pre-wrap">{request.description}</p>

        {request.photoUrl && (
          <div>
            <p className="text-[10px] font-bold text-[#8A8F8B] uppercase tracking-wider mb-2">Attached Photo</p>
            <button
              onClick={() => setPhotoModal(true)}
              className="block rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity w-full sm:w-48 border-none p-0 bg-transparent"
            >
              <img
                src={request.photoUrl}
                alt="Maintenance issue"
                className="w-full h-32 object-cover"
              />
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#8A8F8B]">Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {
              toast.success('Thank you for your feedback! The landlord has been notified.');
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#FAF7F2] hover:bg-[#f0ece4] text-[#0B4F45] font-bold text-sm rounded-xl border border-[#E5E1DA] transition-colors cursor-pointer"
          >
            <MessageSquare size={16} />
            Add a Comment
          </button>
          <button
            onClick={() => navigate('/tenant/report-issue')}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#0B4F45] hover:bg-[#083D35] text-white font-bold text-sm rounded-xl border-none transition-colors cursor-pointer"
          >
            <Plus size={16} />
            New Request
          </button>
        </div>
        {request.status !== 'resolved' && (
          <button
            onClick={() => toast.success('Marked as resolved. Thank you for confirming!')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm rounded-xl border border-emerald-200 transition-colors cursor-pointer"
          >
            <CheckCircle2 size={16} />
            Mark Issue as Resolved
          </button>
        )}
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {photoModal && request.photoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setPhotoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <button
                onClick={() => setPhotoModal(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer border-none z-10"
              >
                <X size={20} className="text-gray-700" />
              </button>
              <img
                src={request.photoUrl}
                alt="Maintenance issue"
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TenantMaintenanceDetail;
