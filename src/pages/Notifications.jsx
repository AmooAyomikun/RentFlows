import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Check, CheckCheck, Trash2, CreditCard, Wrench, Info,
  ArrowLeft, Inbox, Mail, AtSign, RefreshCw, Settings as GearIcon,
  Banknote, FileText, Server, Phone, MessageSquare, Download, Send, X, CheckCircle2, MessageCircle
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
    category: 'Payments',
    isUnread: true,
    type: 'payment',
    title: 'Rent Received - Unit 402B',
    time: '2m ago',
    icon: Banknote,
    iconBg: 'bg-teal-50 text-teal-800',
    bodyPrefix: 'Tenant Simisola Alabi has successfully processed the monthly rent payment of ',
    bodyBold: '₦3,250,000',
    bodySuffix: ' via NIBSS Bank Transfer.',
    receiptDetails: {
      tenant: 'Simisola Alabi',
      unit: 'Unit 402B, Victoria Island Towers',
      amount: '₦3,250,000',
      ref: 'NIBSS-2026-0629-9921',
      bank: 'Guaranty Trust Bank',
      date: 'June 29, 2026 - 10:14 AM'
    },
    actions: [
      { label: 'View Receipt', actionType: 'receipt' },
      { label: 'Dismiss', actionType: 'dismiss' },
    ]
  },
  {
    id: 'l2',
    category: 'Maintenance',
    isUnread: true,
    type: 'maintenance',
    title: 'Urgent: Plumbing Issue Reported',
    time: '1h ago',
    icon: Wrench,
    iconBg: 'bg-rose-50 text-rose-600',
    body: 'Unit 12C at "Victoria Island Towers" has reported a water leak in the master bathroom. High priority service ticket created.',
    tenantContact: { name: 'Obafemi Martins', phone: '+234 802 334 4556', unit: 'Unit 12C' },
    actions: [
      { label: 'Assign Contractor', actionType: 'contractor' },
      { label: 'Call Tenant', actionType: 'call' },
    ]
  },
  {
    id: 'l3',
    category: 'Lease Agreements',
    isUnread: false,
    type: 'lease',
    title: 'Lease Renewal Pending',
    time: '4h ago',
    icon: FileText,
    iconBg: 'bg-emerald-50 text-emerald-700',
    body: 'The lease for Unit 881 at "Lekki Residency" expires in 60 days. Renewal documents have been sent to the resident.',
    leaseDetails: { unit: 'Unit 881, Lekki Residency', tenant: 'Folake Adeyemi', currentRent: '₦4,000,000', proposedRent: '₦4,400,000' },
    actions: [
      { label: 'Review Terms', actionType: 'terms' },
    ]
  },
  {
    id: 'l4',
    category: 'System Updates',
    isUnread: false,
    type: 'system',
    title: 'RentFlow System Maintenance',
    time: '8h ago',
    icon: Server,
    iconBg: 'bg-gray-100 text-gray-700',
    body: "We're performing scheduled maintenance tonight at 02:00 AM WAT. Real-time bank sync may be delayed for 30 minutes.",
    linkText: 'Learn more about v2.4 updates',
  },
  {
    id: 'l5',
    category: 'Mentions',
    isUnread: true,
    type: 'mention',
    title: 'Tunde Bakare mentioned you',
    time: '1d ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    quote: '"@admin, please check the occupancy report for the Victoria Island block. The numbers seem to be lagging behind our Q3 projections."',
    actions: [
      { label: 'Reply', actionType: 'reply' },
      { label: 'Open Thread', actionType: 'thread' },
    ]
  },
];

const filterList = [
  { id: 'all', label: 'All Notifications', icon: Inbox },
  { id: 'unread', label: 'Unread', icon: Mail },
  { id: 'mentions', label: 'Mentions', icon: AtSign },
  { id: 'system', label: 'System Updates', icon: RefreshCw },
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
  const [activeCategory, setActiveCategory] = useState(null);
  const [feed, setFeed] = useState(landlordFeedItems);

  // Modals state
  const [receiptModal, setReceiptModal] = useState(null);
  const [contractorModal, setContractorModal] = useState(null);
  const [callModal, setCallModal] = useState(null);
  const [termsModal, setTermsModal] = useState(null);
  const [replyModal, setReplyModal] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [selectedContractor, setSelectedContractor] = useState('Segun Adebayo - Master Plumber');

  // Tenant state
  const [tenantNotifs, setTenantNotifs] = useState([]);
  const [tenantFilter, setTenantFilter] = useState('all');

  // Top Feature Navigation Switcher
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'whatsapp_settings' | 'whatsapp_log'

  // WhatsApp Settings state
  const [waSettings, setWaSettings] = useState({
    rentDue: true,
    paymentConfirmed: true,
    maintenanceUpdates: true,
    leaseExpiring: true,
    instalmentUpdates: false,
  });
  const [waNumber, setWaNumber] = useState('+234 803 456 7890');
  const [waVerified, setWaVerified] = useState(true);
  const [waVerifying, setWaVerifying] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [showVerifyBox, setShowVerifyBox] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // WhatsApp Log state
  const [waLogs, setWaLogs] = useState([
    {
      id: "wa-101",
      datetime: "Jul 1, 2026 • 09:15 AM",
      eventType: "Rent Due Reminder",
      recipient: "Simisola Alabi (+234 802 334 1122)",
      preview: "Hello Simisola, your rent of ₦3,250,000 for Unit 402B, Victoria Island Towers is due in 7 days (July 8, 2026). Click link to pay via NIBSS.",
      status: "Delivered",
    },
    {
      id: "wa-102",
      datetime: "Jul 1, 2026 • 08:42 AM",
      eventType: "Maintenance Update",
      recipient: "Obafemi Martins (+234 802 334 4556)",
      preview: "Your plumbing repair ticket #WF-992 for Unit 12C Victoria Island Towers is now IN PROGRESS. Contractor Segun Adebayo has been assigned.",
      status: "Delivered",
    },
    {
      id: "wa-103",
      datetime: "Jun 30, 2026 • 04:20 PM",
      eventType: "Payment Confirmed",
      recipient: "Chief Emeka Okafor (+234 803 111 9900)",
      preview: "Receipt #NIBSS-2026-0629-9921: We have confirmed receipt of ₦4,000,000 rent payment for Lekki Residency Apt 881.",
      status: "Delivered",
    },
    {
      id: "wa-104",
      datetime: "Jun 30, 2026 • 01:10 PM",
      eventType: "Lease Expiring",
      recipient: "Folake Adeyemi (+234 809 111 2233)",
      preview: "Urgent: Your lease for Unit 881 Lekki Residency expires in 60 days. Please review the proposed renewal terms sent to your portal.",
      status: "Delivered",
    },
    {
      id: "wa-105",
      datetime: "Jun 29, 2026 • 11:05 AM",
      eventType: "Instalment Update",
      recipient: "Babajide Sanwo (+234 701 444 8877)",
      preview: "Instalment Plan confirmation: Tranche 2 of 3 (₦1,200,000) cleared via NIBSS. Next due date is August 1st, 2026.",
      status: "Delivered",
    },
    {
      id: "wa-106",
      datetime: "Jun 28, 2026 • 03:55 PM",
      eventType: "Payment Confirmed",
      recipient: "Tunde Bakare (+234 812 000 4455)",
      preview: "Receipt #NIBSS-8821: ₦450,000 payment processed for Okafor Plaza Apt 4B. Thank you for choosing RentFlow.",
      status: "Failed",
      failReason: "Recipient phone number unreachable or WhatsApp Business API timeout.",
    },
    {
      id: "wa-107",
      datetime: "Jun 27, 2026 • 10:30 AM",
      eventType: "Rent Due Reminder",
      recipient: "Chinedu Okafor (+234 803 555 9988)",
      preview: "Reminder: Your rent of ₦1,800,000 for Ikeja GRA Duplex #4 is due on July 1st. Please ensure funds are ready.",
      status: "Delivered",
    },
  ]);
  const [waLogStatusFilter, setWaLogStatusFilter] = useState('All');
  const [waLogSearch, setWaLogSearch] = useState('');

  const handleStartVerify = () => {
    if (!waNumber.trim() || !waNumber.includes('+234')) {
      toast.error('Please enter a valid Nigerian WhatsApp number starting with +234');
      return;
    }
    setWaVerifying(true);
    setShowVerifyBox(true);
    toast.info(`Sending OTP via WhatsApp to ${waNumber}...`);
    setTimeout(() => {
      setWaVerifying(false);
      toast.success(`Verification OTP sent to ${waNumber}. Enter 4921 to confirm.`);
    }, 1200);
  };

  const handleConfirmCode = (e) => {
    e?.preventDefault();
    if (verifyCode === '4921' || verifyCode.length === 4) {
      setWaVerified(true);
      setShowVerifyBox(false);
      setVerifyCode('');
      toast.success('WhatsApp number verified and linked to RentFlow Business API!');
    } else {
      toast.error('Invalid 4-digit code. Please enter 4921 or try again.');
    }
  };

  const handleSaveWaSettings = (e) => {
    e?.preventDefault();
    setIsSavingSettings(true);
    setTimeout(() => {
      setIsSavingSettings(false);
      toast.success('WhatsApp Notification Settings saved successfully!');
    }, 800);
  };

  const handleRetryWaLog = (id) => {
    setWaLogs(waLogs.map(item => item.id === id ? { ...item, status: 'Delivered', failReason: undefined } : item));
    toast.success('Resent WhatsApp notification via backup business routing!');
  };

  useEffect(() => {
    if (role === 'tenant') {
      const stored = localStorage.getItem('rf_tenant_notifications');
      if (stored) setTenantNotifs(JSON.parse(stored));
      else {
        setTenantNotifs([
          { id: "notif-t1", title: "Rent payment processed", message: "Your rent payment of ₦450,000 has been successfully processed." },
          { id: "notif-t2", title: "Maintenance request updated", message: "Your plumbing repair request has been updated to IN PROGRESS." }
        ]);
      }
    }
  }, [role]);

  // Filter calculations
  const filteredFeed = feed.filter(item => {
    if (activeFilter === 'unread' && !item.isUnread) return false;
    if (activeFilter === 'mentions' && item.type !== 'mention') return false;
    if (activeFilter === 'system' && item.type !== 'system') return false;
    if (activeCategory && item.category !== activeCategory) return false;
    return true;
  });

  const getFilterCount = (id) => {
    if (id === 'all') return feed.length;
    if (id === 'unread') return feed.filter(i => i.isUnread).length;
    if (id === 'mentions') return feed.filter(i => i.type === 'mention').length;
    if (id === 'system') return feed.filter(i => i.type === 'system').length;
    return 0;
  };

  const handleDismiss = (id) => {
    setFeed(feed.filter(item => item.id !== id));
    toast.success('Notification removed');
  };

  const handleMarkAllRead = () => {
    setFeed(feed.map(item => ({ ...item, isUnread: false })));
    toast.success('All notifications marked as read');
  };

  const handleActionClick = (actionType, item) => {
    if (actionType === 'dismiss') {
      handleDismiss(item.id);
    } else if (actionType === 'receipt') {
      setReceiptModal(item.receiptDetails);
    } else if (actionType === 'contractor') {
      setContractorModal(item);
    } else if (actionType === 'call') {
      setCallModal(item.tenantContact);
    } else if (actionType === 'terms') {
      setTermsModal(item.leaseDetails);
    } else if (actionType === 'reply' || actionType === 'thread') {
      setReplyModal(item);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    toast.success('Reply posted to Tunde Bakare & team thread!');
    setReplyText('');
    setReplyModal(null);
  };

  const handleAssignContractorSubmit = (e) => {
    e.preventDefault();
    toast.success(`Work order dispatched to ${selectedContractor}`);
    setContractorModal(null);
  };

  const renderWhatsAppTabs = (
    <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-gray-200">
      <button
        onClick={() => setActiveTab('feed')}
        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
          activeTab === 'feed'
            ? 'bg-[#0B4F45] text-white shadow-sm'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Inbox size={16} />
        <span>Activity Feed</span>
      </button>
      <button
        onClick={() => setActiveTab('whatsapp_settings')}
        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
          activeTab === 'whatsapp_settings'
            ? 'bg-[#0B4F45] text-white shadow-sm'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]"></span>
        <span>WhatsApp Settings</span>
      </button>
      <button
        onClick={() => setActiveTab('whatsapp_log')}
        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
          activeTab === 'whatsapp_log'
            ? 'bg-[#0B4F45] text-white shadow-sm'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <FileText size={16} />
        <span>WhatsApp Log</span>
      </button>
    </div>
  );

  const renderWhatsAppSettingsView = (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="dashboard-card bg-[#FAF7F2]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <h2 className="dashboard-title text-xl sm:text-2xl font-bold text-[#0B4F45] m-0 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#25D366] inline-block animate-pulse"></span>
              WhatsApp Business Notifications
            </h2>
            <p className="dashboard-body-text text-xs sm:text-sm text-[#4A4F4C] m-0 mt-1">
              Configure automated instant WhatsApp alerts for property events across Lagos & Abuja.
            </p>
          </div>
          <div className="bg-[#25D366]/10 text-[#0B4F45] border border-[#25D366]/30 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0">
            <CheckCircle2 size={15} className="text-[#25D366]" />
            <span>Official Meta API Connected</span>
          </div>
        </div>

        {/* Connected Phone Number Box */}
        <div className="mt-6 p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs">
          <h3 className="dashboard-card-title text-base font-bold text-[#1B1F1D] m-0 mb-1">
            Recipient WhatsApp Number
          </h3>
          <p className="dashboard-body-text text-xs text-[#4A4F4C] m-0 mb-4">
            All automated triggers will be dispatched to this verified Nigerian WhatsApp contact.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[240px] relative">
              <input
                type="text"
                value={waNumber}
                onChange={(e) => { setWaNumber(e.target.value); setWaVerified(false); }}
                placeholder="+234 803 000 0000"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono font-bold text-[#1B1F1D] focus:outline-none focus:border-[#0B4F45]"
              />
              {waVerified && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Check size={12} strokeWidth={3} /> Verified
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleStartVerify}
              disabled={waVerifying || waVerified}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border-none flex items-center gap-1.5 shadow-2xs ${
                waVerified
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#C75B30] hover:bg-[#b5522b] text-white'
              }`}
            >
              {waVerifying ? <RefreshCw size={14} className="animate-spin" /> : null}
              <span>{waVerified ? 'Number Verified' : 'Verify via OTP'}</span>
            </button>
          </div>

          {/* Inline OTP verification form */}
          {showVerifyBox && !waVerified && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-3 animate-fade-in">
              <div>
                <h4 className="text-xs font-bold text-amber-900 m-0">Enter 4-digit verification code</h4>
                <p className="text-[11px] text-amber-800 m-0 mt-0.5">We sent a test code via WhatsApp to {waNumber} (Tip: enter 4921)</p>
              </div>
              <form onSubmit={handleConfirmCode} className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={4}
                  placeholder="4921"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  className="w-20 px-3 py-1.5 text-center font-mono font-bold text-sm bg-white border border-amber-300 rounded-lg focus:outline-none"
                />
                <button type="submit" className="px-4 py-1.5 bg-[#0B4F45] text-white text-xs font-bold rounded-lg border-none cursor-pointer">
                  Confirm
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Event Triggers List */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="dashboard-card-title text-sm font-bold uppercase tracking-wider text-[#1B1F1D] m-0">
              Notification Events Table
            </h3>
            <p className="dashboard-body-text text-xs text-[#4A4F4C] m-0 mt-0.5">
              Select which events trigger automated WhatsApp messages.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {[
              { key: 'rentDue', label: 'Rent Due Reminders', desc: 'Sent automatically 7 days, 3 days, and 24 hours before tenancy rent expiry.' },
              { key: 'paymentConfirmed', label: 'Payment Confirmed Alerts', desc: 'Instant NIBSS receipt delivery immediately after a tenant clears invoices.' },
              { key: 'maintenanceUpdates', label: 'Maintenance Ticket Updates', desc: 'Alerts when service contractors are assigned or when repairs are marked completed.' },
              { key: 'leaseExpiring', label: 'Lease Expiring Alerts', desc: 'Renewal reminders sent 60 and 30 days prior to tenancy expiration.' },
              { key: 'instalmentUpdates', label: 'Instalment & Split Payment Updates', desc: 'Reminders for structured multi-tranche rent split schedules.' },
            ].map((evt) => (
              <div key={evt.key} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0B4F45] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B1F1D] m-0">{evt.label}</h4>
                    <p className="text-xs text-[#4A4F4C] m-0 mt-0.5 leading-relaxed">{evt.desc}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWaSettings({ ...waSettings, [evt.key]: !waSettings[evt.key] });
                    toast.success(`${evt.label} WhatsApp alert ${!waSettings[evt.key] ? 'enabled' : 'disabled'}`);
                  }}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer border-none transition-colors shrink-0 ${
                    waSettings[evt.key] ? 'bg-[#0B4F45]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    waSettings[evt.key] ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={handleSaveWaSettings}
            disabled={isSavingSettings}
            className="px-8 py-3.5 rounded-xl bg-[#0B4F45] hover:bg-[#083D35] text-white font-bold text-xs sm:text-sm border-none cursor-pointer shadow-sm transition-all flex items-center gap-2"
          >
            {isSavingSettings ? <RefreshCw size={16} className="animate-spin" /> : <Check size={16} />}
            <span>{isSavingSettings ? 'Saving Settings...' : 'Save WhatsApp Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderWhatsAppLogView = (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="dashboard-card bg-[#FAF7F2]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A4F4C]">Total WhatsApp Sent</span>
          <h3 className="text-2xl font-display font-extrabold text-[#0B4F45] m-0 mt-1">{waLogs.length + 1475}</h3>
          <p className="text-xs text-[#4A4F4C] m-0 mt-1">Across 18 active properties</p>
        </div>
        <div className="dashboard-card bg-emerald-50/50 border-emerald-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Delivered Successfully</span>
          <h3 className="text-2xl font-display font-extrabold text-emerald-900 m-0 mt-1 font-mono">99.1%</h3>
          <p className="text-xs text-emerald-700 m-0 mt-1">Average delivery under 3 seconds</p>
        </div>
        <div className="dashboard-card bg-rose-50/50 border-rose-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">Failed / Retrying</span>
          <h3 className="text-2xl font-display font-extrabold text-rose-900 m-0 mt-1 font-mono">{waLogs.filter(l => l.status === 'Failed').length}</h3>
          <p className="text-xs text-rose-700 m-0 mt-1">Network or expired WhatsApp sessions</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="dashboard-card bg-white flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#1B1F1D]">Status:</span>
          {['All', 'Delivered', 'Failed'].map((st) => (
            <button
              key={st}
              onClick={() => setWaLogStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border-none cursor-pointer transition-colors ${
                waLogStatusFilter === st
                  ? 'bg-[#0B4F45] text-white shadow-2xs'
                  : 'bg-gray-100 text-[#4A4F4C] hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
        <div className="relative min-w-[260px] flex-1 sm:max-w-xs">
          <input
            type="text"
            placeholder="Search recipient or message preview..."
            value={waLogSearch}
            onChange={(e) => setWaLogSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-[#1B1F1D] focus:outline-none focus:border-[#0B4F45]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-card bg-white p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-[#4A4F4C]">
                <th className="p-4">Date / Time</th>
                <th className="p-4">Event Type</th>
                <th className="p-4">Recipient</th>
                <th className="p-4 min-w-[280px]">Message Preview</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-[#1B1F1D]">
              {waLogs
                .filter(log => waLogStatusFilter === 'All' || log.status === waLogStatusFilter)
                .filter(log => !waLogSearch.trim() || log.recipient.toLowerCase().includes(waLogSearch.toLowerCase()) || log.preview.toLowerCase().includes(waLogSearch.toLowerCase()))
                .map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 whitespace-nowrap font-mono text-[11px] text-[#4A4F4C]">{log.datetime}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-bold text-[#0B4F45] bg-teal-50 px-2.5 py-1 rounded-lg">
                        {log.eventType}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-[#1B1F1D] whitespace-nowrap">{log.recipient}</td>
                    <td className="p-4 text-[#4A4F4C] leading-normal max-w-md">
                      <div className="line-clamp-2">{log.preview}</div>
                      {log.failReason && (
                        <div className="mt-1 text-[11px] text-rose-600 font-medium bg-rose-50 p-1.5 rounded-md flex items-center justify-between gap-2">
                          <span>Note: {log.failReason}</span>
                          <button
                            onClick={() => handleRetryWaLog(log.id)}
                            className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] rounded border-none cursor-pointer shrink-0"
                          >
                            Retry Now
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        log.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${log.status === 'Delivered' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (role === 'landlord') {
    return (
      <div className="font-sans text-gray-900 pb-12 relative">
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

        {renderWhatsAppTabs}

        {activeTab === 'feed' && (
          /* ── TWO COLUMN LAYOUT ── */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            {/* Left Sidebar Filters */}
            <div className="md:col-span-1 space-y-8">
              {/* Filter By */}
              <div>
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block mb-3 px-1">Filter By</span>
                <div className="space-y-1">
                  {filterList.map((f) => {
                    const Icon = f.icon;
                    const isActive = activeFilter === f.id && !activeCategory;
                    return (
                      <button
                        key={f.id}
                        onClick={() => { setActiveFilter(f.id); setActiveCategory(null); }}
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
                          {getFilterCount(f.id)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Categories</span>
                  {activeCategory && (
                    <button onClick={() => setActiveCategory(null)} className="text-[10px] text-rose-600 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer">
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1.5">
                  {categoryList.map((cat) => {
                    const isCatActive = activeCategory === cat.label;
                    return (
                      <button
                        key={cat.label}
                        onClick={() => setActiveCategory(isCatActive ? null : cat.label)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-none ${isCatActive ? 'bg-gray-200 text-gray-900 shadow-2xs' : 'bg-transparent text-gray-700 hover:bg-gray-100/60'}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                          <span>{cat.label}</span>
                        </div>
                        <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">
                          {feed.filter(i => i.category === cat.label).length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Smart Alerts Promo Card */}
              <div className="bg-[#072F29] text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white m-0">Smart Alerts</h3>
                  <p className="text-xs text-white/70 m-0 mt-1 mb-5 leading-relaxed">Enable AI-powered trend detection for your portfolio.</p>
                </div>
                <button onClick={() => toast.success('AI Smart Alerts activated for your portfolio!')} className="w-full py-2.5 rounded-xl bg-[#F4C395] hover:bg-[#e3b284] text-[#072F29] font-black text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer border-none">
                  Try Pro
                </button>
              </div>
            </div>

            {/* Right Main Feed */}
            <div className="md:col-span-3 space-y-4">
              {filteredFeed.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center text-gray-500">
                  <Inbox size={36} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-base font-bold text-gray-800 m-0">No matching notifications</h3>
                  <p className="text-xs text-gray-500 m-0 mt-1">Try selecting another filter or category.</p>
                </div>
              ) : (
                filteredFeed.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className={`bg-white rounded-2xl border transition-all p-5 shadow-2xs hover:shadow-sm ${item.isUnread ? 'border-[#072F29]/30 bg-emerald-50/10' : 'border-gray-200/80'}`}>
                      <div className="flex items-start gap-4">
                        {item.avatar ? (
                          <img src={item.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200" />
                        ) : (
                          <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                            <Icon size={20} />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-gray-900 m-0">{item.title}</h3>
                              {item.isUnread && <span className="w-2 h-2 rounded-full bg-[#C75B30] inline-block" />}
                            </div>
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
                            <button onClick={() => toast.info('Displaying v2.4 Release Notes & changelog')} className="text-xs font-black text-[#072F29] hover:underline bg-transparent border-none p-0 cursor-pointer block mt-2">
                              {item.linkText} &rarr;
                            </button>
                          )}

                          {item.actions && (
                            <div className="flex items-center gap-3 mt-3 flex-wrap">
                              {item.actions.map((act, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleActionClick(act.actionType, item)}
                                  className={`text-xs font-bold px-3.5 py-1.5 rounded-lg cursor-pointer transition-all ${
                                    idx === 0
                                      ? 'bg-[#072F29] hover:bg-[#0b4f45] text-white border-none shadow-2xs'
                                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  {act.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {activeTab === 'whatsapp_settings' && renderWhatsAppSettingsView}
        {activeTab === 'whatsapp_log' && renderWhatsAppLogView}

        {/* ── MODALS ── */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {/* Receipt Modal */}
            {receiptModal && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 m-0 flex items-center gap-2">
                      <Banknote className="text-[#072F29]" size={20} /> NIBSS Payment Receipt
                    </h3>
                    <button onClick={() => setReceiptModal(null)} className="text-gray-400 hover:text-black bg-transparent border-none p-1 cursor-pointer"><X size={18} /></button>
                  </div>
                  <div className="py-4 space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Tenant Name</span><span className="font-bold">{receiptModal.tenant}</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Property Unit</span><span className="font-bold">{receiptModal.unit}</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Amount Paid</span><span className="font-black text-sm text-emerald-700">{receiptModal.amount}</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Reference No</span><span className="font-mono">{receiptModal.ref}</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Originating Bank</span><span className="font-bold">{receiptModal.bank}</span></div>
                    <div className="flex justify-between py-1"><span className="text-gray-500">Date Cleared</span><span>{receiptModal.date}</span></div>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button onClick={() => toast.success('Downloading NIBSS Receipt PDF...')} className="flex-1 bg-[#072F29] text-white font-bold text-xs py-2.5 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 hover:bg-[#0b4f45]">
                      <Download size={15} /> Download PDF
                    </button>
                    <button onClick={() => setReceiptModal(null)} className="px-4 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl border-none cursor-pointer hover:bg-gray-200">Close</button>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Assign Contractor Modal */}
            {contractorModal && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 m-0 flex items-center gap-2">
                      <Wrench className="text-rose-600" size={20} /> Assign Emergency Contractor
                    </h3>
                    <button onClick={() => setContractorModal(null)} className="text-gray-400 hover:text-black bg-transparent border-none p-1 cursor-pointer"><X size={18} /></button>
                  </div>
                  <form onSubmit={handleAssignContractorSubmit} className="py-4 space-y-4 text-xs">
                    <p className="text-gray-600 m-0">Select a verified Nigerian contractor to dispatch for Unit 12C water leak repair:</p>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1.5">Select Contractor Firm</label>
                      <select value={selectedContractor} onChange={e => setSelectedContractor(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-800 cursor-pointer">
                        <option>Segun Adebayo - Master Plumber (1.2h avg response)</option>
                        <option>Precision Plumbing Lagos (4.9 Rating)</option>
                        <option>Chinedu Okafor - Rapid Repairs</option>
                      </select>
                    </div>
                    <div className="pt-2 flex gap-3">
                      <button type="submit" className="flex-1 bg-[#C75B30] hover:bg-[#b5522b] text-white font-bold text-xs py-3 rounded-xl border-none cursor-pointer">
                        Dispatch Work Order
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Call Resident Modal */}
            {callModal && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 m-0">{callModal.name}</h3>
                  <p className="text-xs text-gray-500 m-0 mt-1">Resident • {callModal.unit}</p>
                  <div className="my-6 p-3 bg-gray-50 rounded-xl font-mono font-bold text-sm text-gray-800">
                    {callModal.phone}
                  </div>
                  <div className="flex gap-3">
                    <a href={`tel:${callModal.phone}`} onClick={() => toast.info('Initiating cellular call...')} className="flex-1 bg-[#072F29] text-white font-bold text-xs py-2.5 rounded-xl no-underline flex items-center justify-center gap-1.5">
                      <Phone size={14} /> Call GSM
                    </a>
                    <button onClick={() => { toast.success('Opened WhatsApp thread'); setCallModal(null); }} className="flex-1 bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl border-none cursor-pointer flex items-center justify-center gap-1.5">
                      <MessageSquare size={14} /> WhatsApp
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Terms Modal */}
            {termsModal && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 m-0 flex items-center gap-2">
                      <FileText className="text-emerald-600" size={20} /> Lease Renewal Proposal
                    </h3>
                    <button onClick={() => setTermsModal(null)} className="text-gray-400 hover:text-black bg-transparent border-none p-1 cursor-pointer"><X size={18} /></button>
                  </div>
                  <div className="py-4 space-y-3 text-xs">
                    <div className="flex justify-between py-1"><span className="text-gray-500">Property</span><span className="font-bold">{termsModal.unit}</span></div>
                    <div className="flex justify-between py-1"><span className="text-gray-500">Resident</span><span className="font-bold">{termsModal.tenant}</span></div>
                    <div className="flex justify-between py-1"><span className="text-gray-500">Current Annual Rent</span><span className="font-bold">{termsModal.currentRent}</span></div>
                    <div className="flex justify-between py-1 bg-emerald-50 p-2 rounded-lg"><span className="text-emerald-900 font-bold">Proposed Renewal Rent (+10%)</span><span className="font-black text-emerald-800 text-sm">{termsModal.proposedRent}</span></div>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button onClick={() => { toast.success('Renewal offer dispatched to resident via email!'); setTermsModal(null); }} className="flex-1 bg-[#072F29] text-white font-bold text-xs py-2.5 rounded-xl border-none cursor-pointer">
                      Approve & Send Offer
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Reply Modal */}
            {replyModal && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 m-0">Reply to Tunde Bakare</h3>
                    <button onClick={() => setReplyModal(null)} className="text-gray-400 hover:text-black bg-transparent border-none p-1 cursor-pointer"><X size={18} /></button>
                  </div>
                  <form onSubmit={handleSendReply} className="py-4 space-y-3">
                    <div className="p-3 bg-gray-50 rounded-xl text-xs italic text-gray-600 mb-2">
                      {replyModal.quote}
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Type your reply to the asset management team..."
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      className="w-full p-3 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-[#072F29] resize-none"
                      required
                    />
                    <div className="flex justify-end gap-2 pt-2">
                      <button type="submit" className="bg-[#072F29] text-white font-bold text-xs px-5 py-2.5 rounded-xl border-none cursor-pointer flex items-center gap-1.5 hover:bg-[#0b4f45]">
                        <Send size={14} /> Send Reply
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    );
  }

  // ── TENANT VIEW ──
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 font-sans text-gray-900">
      <div className="space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-black bg-transparent border-none p-0 cursor-pointer">
          <ArrowLeft size={16} /> Go Back
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-[28px] text-[#072F29] m-0 tracking-tight">Notifications</h1>
            <p className="text-xs sm:text-sm text-[#4A4F4C] font-medium mt-1 m-0">Manage your WhatsApp triggers and tenant notification logs.</p>
          </div>
        </div>
      </div>

      {renderWhatsAppTabs}

      {activeTab === 'feed' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
          <div className="space-y-4">
            {tenantNotifs.map((n) => (
              <div key={n.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <h4 className="text-sm font-bold m-0 mb-1 text-[#1B1F1D]">{n.title}</h4>
                <p className="text-xs text-[#4A4F4C] m-0 leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'whatsapp_settings' && renderWhatsAppSettingsView}
      {activeTab === 'whatsapp_log' && renderWhatsAppLogView}
    </div>
  );
};

export default Notifications;
