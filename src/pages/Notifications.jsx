import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Check, CheckCheck, Trash2, CreditCard, Wrench, Info,
  ArrowLeft, Inbox, Mail, AtSign, RefreshCw, Settings as GearIcon,
  Banknote, FileText, Server
} from 'lucide-react';
import { toast } from 'sonner';
import { timeAgo } from '../utils/formatDate';
import useAuthStore from '../store/authStore';

// Initial Mock Tenant Notifications
const initialTenantNotifications = [
  {
    id: "notif-t1",
    type: "payment",
    title: "Rent payment processed",
    message: "Your rent payment of ₦450,000 for Apt 4B, Okafor Plaza has been successfully processed. Receipt is ready for download.",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    link: "/tenant/payments",
  },
  {
    id: "notif-t2",
    type: "maintenance",
    title: "Maintenance request updated",
    message: "Your plumbing repair request for 'Leaking kitchen pipe' has been updated to IN PROGRESS.",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    link: "/tenant/maintenance",
  },
  {
    id: "notif-t3",
    type: "system",
    title: "Lease agreement active",
    message: "Your lease for Okafor Plaza Apt 4B has been activated by Chief Emeka Okafor.",
    isRead: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    link: "/tenant/lease",
  }
];

const landlordFeedItems = [
  {
    id: 'l1',
    title: 'Rent Received - Unit 402B',
    time: '2m ago',
    icon: Banknote,
    iconBg: 'bg-teal-50 text-teal-800',
    bodyPrefix: 'Tenant Sarah Jenkins has successfully processed the monthly rent payment of ',
    bodyBold: '$3,250.00',
    bodySuffix: ' via ACH.',
    actions: [
      { label: 'View Receipt', type: 'primary', route: '/landlord/payments' },
      { label: 'Dismiss', type: 'ghost' },
    ]
  },
  {
    id: 'l2',
    title: 'Urgent: Plumbing Issue Reported',
    time: '1h ago',
    icon: Wrench,
    iconBg: 'bg-rose-50 text-rose-600',
    body: 'Unit 12C at "The Pinnacle Heights" has reported a water leak in the master bathroom. High priority service ticket created.',
    actions: [
      { label: 'Assign Contractor', type: 'accent', route: '/landlord/maintenance' },
      { label: 'Call Tenant', type: 'outline' },
    ]
  },
  {
    id: 'l3',
    title: 'Lease Renewal Pending',
    time: '4h ago',
    icon: FileText,
    iconBg: 'bg-emerald-50 text-emerald-700',
    body: 'The lease for Unit 881 at "Oakwood Residency" expires in 60 days. Renewal documents have been sent to the resident.',
    actions: [
      { label: 'Review Terms', type: 'secondary', route: '/landlord/tenants' },
    ]
  },
  {
    id: 'l4',
    title: 'RentFlow System Maintenance',
    time: '8h ago',
    icon: Server,
    iconBg: 'bg-gray-100 text-gray-700',
    body: "We're performing scheduled maintenance tonight at 02:00 AM EST. Real-time bank sync may be delayed for 30 minutes.",
    linkText: 'Learn more about v2.4 updates',
  },
  {
    id: 'l5',
    title: 'Marcus Chen mentioned you',
    time: '1d ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    quote: '"@admin, please check the occupancy report for the West Wing. The numbers seem to be lagging behind our Q3 projections."',
    actions: [
      { label: 'Reply', type: 'primary' },
      { label: 'Open Thread', type: 'ghost' },
    ]
  },
];

const filterList = [
  { id: 'all', label: 'All Notifications', count: 24, icon: Inbox },
  { id: 'unread', label: 'Unread', count: 8, icon: Mail },
  { id: 'mentions', label: 'Mentions', count: 3, icon: AtSign },
  { id: 'system', label: 'System Updates', count: 2, icon: RefreshCw },
];

const categoryList = [
  { label: 'Payments', color: 'bg-[#0B4F45]' },
  { label: 'Maintenance', color: 'bg-[#F4A261]' },
  { label: 'Lease Agreements', color: 'bg-[#5eead4]' },
];

const Notifications = ({ role: propRole }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const role = propRole || user?.role || 'landlord';

  const [activeFilter, setActiveFilter] = useState('all');
  const [feed, setFeed] = useState(landlordFeedItems);

  // Tenant state
  const [tenantNotifs, setTenantNotifs] = useState([]);
  const [tenantFilter, setTenantFilter] = useState('all');

  useEffect(() => {
    if (role === 'tenant') {
      const stored = localStorage.getItem('rf_tenant_notifications');
      if (stored) setTenantNotifs(JSON.parse(stored));
      else {
        localStorage.setItem('rf_tenant_notifications', JSON.stringify(initialTenantNotifications));
        setTenantNotifs(initialTenantNotifications);
      }
    }
  }, [role]);

  const handleDismiss = (id) => {
    setFeed(feed.filter(item => item.id !== id));
    toast.success('Notification dismissed');
  };

  const handleMarkAllRead = () => {
    toast.success('All notifications marked as read');
  };

  if (role === 'landlord') {
    return (
      <div className="font-sans text-gray-900 pb-12">
        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[28px] font-display font-extrabold text-[#072F29] tracking-tight m-0">Notifications</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1 m-0">Stay updated with your property portfolio activity.</p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button onClick={handleMarkAllRead} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs inline-flex items-center gap-2 cursor-pointer">
              <CheckCheck size={16} className="text-gray-600" />
              <span>Mark all as read</span>
            </button>
            <button onClick={() => navigate('/landlord/settings')} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs inline-flex items-center gap-2 cursor-pointer">
              <GearIcon size={16} className="text-gray-600" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* ── TWO COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Left Sidebar Filters */}
          <div className="md:col-span-1 space-y-8">
            {/* Filter By */}
            <div>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block mb-3 px-1">Filter By</span>
              <div className="space-y-1">
                {filterList.map((f) => {
                  const Icon = f.icon;
                  const isActive = activeFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer border-none text-xs ${
                        isActive
                          ? 'bg-white border border-gray-200/80 shadow-2xs font-bold text-gray-900'
                          : 'bg-transparent font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className={isActive ? 'text-[#072F29]' : 'text-gray-400'} />
                        <span>{f.label}</span>
                      </div>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-gray-200/80 font-bold text-gray-900' : 'bg-gray-100 text-gray-600'}`}>
                        {f.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categories */}
            <div>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block mb-3 px-1">Categories</span>
              <div className="space-y-2.5 px-2">
                {categoryList.map((cat) => (
                  <div key={cat.label} className="flex items-center gap-2.5 text-xs font-bold text-gray-700 cursor-pointer hover:text-black">
                    <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                    <span>{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Alerts Promo Card */}
            <div className="bg-[#072F29] text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white m-0">Smart Alerts</h3>
                <p className="text-xs text-white/70 m-0 mt-1 mb-5 leading-relaxed">Enable AI-powered trend detection for your portfolio.</p>
              </div>
              <button onClick={() => toast.success('Upgraded to Pro Tier!')} className="w-full py-2.5 rounded-xl bg-[#F4C395] hover:bg-[#e3b284] text-[#072F29] font-black text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer border-none">
                Try Pro
              </button>
            </div>
          </div>

          {/* Right Main Feed */}
          <div className="md:col-span-3 space-y-4">
            {feed.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs transition-all hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    {item.avatar ? (
                      <img src={item.avatar} alt="Marcus" className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200" />
                    ) : (
                      <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                        <Icon size={20} />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-sm font-bold text-gray-900 m-0">{item.title}</h3>
                        <span className="text-xs text-gray-400 font-medium shrink-0">{item.time}</span>
                      </div>

                      {item.body && <p className="text-xs text-gray-600 leading-relaxed m-0 mb-3.5">{item.body}</p>}

                      {item.bodyBold && (
                        <p className="text-xs text-gray-600 leading-relaxed m-0 mb-3.5">
                          {item.bodyPrefix}<strong className="text-gray-900 font-extrabold">{item.bodyBold}</strong>{item.bodySuffix}
                        </p>
                      )}

                      {item.quote && (
                        <div className="bg-gray-50 border-l-3 border-gray-300 rounded-r-xl p-3 my-2.5 text-xs italic text-gray-700 font-medium">
                          {item.quote}
                        </div>
                      )}

                      {item.linkText && (
                        <button onClick={() => toast.info('Displaying v2.4 Release Notes')} className="text-xs font-black text-gray-900 hover:underline bg-transparent border-none p-0 cursor-pointer block mt-2">
                          {item.linkText}
                        </button>
                      )}

                      {item.actions && (
                        <div className="flex items-center gap-3 mt-3">
                          {item.actions.map((act) => {
                            if (act.type === 'primary') {
                              return (
                                <button key={act.label} onClick={() => act.route ? navigate(act.route) : toast.success('Replying...')} className="bg-[#072F29] hover:bg-[#0b4f45] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg border-none cursor-pointer">
                                  {act.label}
                                </button>
                              );
                            }
                            if (act.type === 'accent') {
                              return (
                                <button key={act.label} onClick={() => act.route && navigate(act.route)} className="bg-[#F4C395] hover:bg-[#e3b284] text-[#072F29] font-bold text-xs px-3.5 py-1.5 rounded-lg border-none cursor-pointer">
                                  {act.label}
                                </button>
                              );
                            }
                            if (act.type === 'secondary') {
                              return (
                                <button key={act.label} onClick={() => act.route && navigate(act.route)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-3.5 py-1.5 rounded-lg border-none cursor-pointer">
                                  {act.label}
                                </button>
                              );
                            }
                            if (act.type === 'outline') {
                              return (
                                <button key={act.label} onClick={() => toast.success('Calling resident...')} className="bg-white border border-gray-200 text-gray-700 font-bold text-xs px-3.5 py-1.5 rounded-lg cursor-pointer shadow-2xs">
                                  {act.label}
                                </button>
                              );
                            }
                            // ghost
                            return (
                              <button key={act.label} onClick={() => handleDismiss(item.id)} className="text-xs font-semibold text-gray-500 hover:text-gray-800 bg-transparent border-none cursor-pointer ml-1">
                                {act.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── TENANT FALLBACK DEMO VIEW ──
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-black bg-transparent border-none p-0 cursor-pointer">
          <ArrowLeft size={16} /> Go Back
        </button>
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-2xl text-gray-900 m-0">Notifications</h1>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
        <div className="space-y-4">
          {tenantNotifs.map((n) => (
            <div key={n.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h4 className="text-sm font-bold m-0 mb-1">{n.title}</h4>
              <p className="text-xs text-gray-600 m-0">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
