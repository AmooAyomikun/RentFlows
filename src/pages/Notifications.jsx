import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, CheckCheck, Trash2, CreditCard, Wrench, Info, AlertTriangle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getNotifications, markAsRead, markAllAsRead } from '../services/notificationService';
import { timeAgo } from '../utils/formatDate';
import useAuthStore from '../store/authStore';

// Initial Mock Tenant Notifications (since backend/mocks only has landlord data)
const initialTenantNotifications = [
  {
    id: "notif-t1",
    type: "payment",
    title: "Rent payment processed",
    message: "Your rent payment of ₦450,000 for Apt 4B, Okafor Plaza has been successfully processed. Receipt is ready for download.",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    link: "/tenant/payments",
    icon: "check-circle"
  },
  {
    id: "notif-t2",
    type: "maintenance",
    title: "Maintenance request updated",
    message: "Your plumbing repair request for 'Leaking kitchen pipe' has been updated to IN PROGRESS.",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    link: "/tenant/maintenance",
    icon: "wrench"
  },
  {
    id: "notif-t3",
    type: "system",
    title: "Lease agreement active",
    message: "Your lease for Okafor Plaza Apt 4B has been activated by Chief Emeka Okafor.",
    isRead: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(), // 5 days ago
    link: "/tenant/lease",
    icon: "info"
  }
];

const Notifications = ({ role: propRole }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const role = propRole || user?.role || 'landlord';

  // State specifically for managing tenant notifications in localStorage during the demo
  const [tenantNotifs, setTenantNotifs] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load tenant notifications if tenant
  useEffect(() => {
    if (role === 'tenant') {
      const stored = localStorage.getItem('rf_tenant_notifications');
      if (stored) {
        setTenantNotifs(JSON.parse(stored));
      } else {
        localStorage.setItem('rf_tenant_notifications', JSON.stringify(initialTenantNotifications));
        setTenantNotifs(initialTenantNotifications);
      }
    }
  }, [role]);

  // Landlord notifications query
  const { data: landlordNotifs = [], isLoading: landlordLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications({ type: 'all' }),
    enabled: role === 'landlord',
  });

  const isLoading = role === 'landlord' ? landlordLoading : false;
  const notifications = role === 'landlord' ? landlordNotifs : tenantNotifs;

  // Mutation to mark a single notification as read
  const markReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  // Mutation to mark all notifications as read
  const markAllReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('All notifications marked as read');
    }
  });

  const handleMarkAsRead = (id) => {
    if (role === 'landlord') {
      markReadMutation.mutate(id);
    } else {
      const updated = tenantNotifs.map(n => n.id === id ? { ...n, isRead: true } : n);
      setTenantNotifs(updated);
      localStorage.setItem('rf_tenant_notifications', JSON.stringify(updated));
    }
  };

  const handleMarkAllAsRead = () => {
    if (role === 'landlord') {
      markAllReadMutation.mutate();
    } else {
      const updated = tenantNotifs.map(n => ({ ...n, isRead: true }));
      setTenantNotifs(updated);
      localStorage.setItem('rf_tenant_notifications', JSON.stringify(updated));
      toast.success('All notifications marked as read');
    }
  };

  const handleDeleteNotification = (id, e) => {
    e.stopPropagation(); // Prevent navigation click
    if (role === 'landlord') {
      // For demo, we can just filter it out from React Query cache or let it be
      queryClient.setQueryData(['notifications'], (old) => old.filter(n => n.id !== id));
      toast.success('Notification removed');
    } else {
      const updated = tenantNotifs.filter(n => n.id !== id);
      setTenantNotifs(updated);
      localStorage.setItem('rf_tenant_notifications', JSON.stringify(updated));
      toast.success('Notification removed');
    }
  };

  const handleNotificationClick = (item) => {
    if (!item.isRead) {
      handleMarkAsRead(item.id);
    }
    if (item.link) {
      navigate(item.link);
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'payment') return n.type === 'payment';
    if (filter === 'maintenance') return n.type === 'maintenance';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotifIcon = (type) => {
    switch (type) {
      case 'payment':
        return {
          icon: CreditCard,
          bg: 'bg-success/10 text-success',
        };
      case 'maintenance':
        return {
          icon: Wrench,
          bg: 'bg-warning/10 text-warning',
        };
      case 'system':
        return {
          icon: Info,
          bg: 'bg-info/10 text-info',
        };
      default:
        return {
          icon: Bell,
          bg: 'bg-primary/10 text-primary',
        };
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back navigation & header */}
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          size="sm" 
          leftIcon={<ArrowLeft size={16} />} 
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display font-bold text-2xl text-charcoal">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-sm text-muted">Stay updated with payments, maintenance, and alerts.</p>
          </div>

          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<CheckCheck size={16} />} 
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex border-b border-border gap-1 overflow-x-auto pb-px">
        {[
          { id: 'all', label: 'All' },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'payment', label: 'Payments' },
          { id: 'maintenance', label: 'Maintenance' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              filter === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-charcoal'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <Card padding={false} className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted">Loading notifications...</div>
        ) : filteredNotifs.length === 0 ? (
          <div className="p-12 text-center text-muted flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 bg-warm rounded-full flex items-center justify-center text-muted">
              <Bell size={24} />
            </div>
            <div>
              <p className="font-semibold text-charcoal">All caught up!</p>
              <p className="text-xs text-muted max-w-xs mt-1">
                {filter === 'all' 
                  ? 'No notifications found.' 
                  : `No ${filter} notifications found.`}
              </p>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            <AnimatePresence initial={false}>
              {filteredNotifs.map((item) => {
                const iconData = getNotifIcon(item.type);
                const Icon = iconData.icon;
                
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-4 p-4 hover:bg-warm/30 transition-colors cursor-pointer ${
                      !item.isRead ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                    }`}
                    onClick={() => handleNotificationClick(item)}
                  >
                    {/* Icon container */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconData.bg}`}>
                      <Icon size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <p className={`text-sm font-semibold text-charcoal truncate ${!item.isRead ? 'font-bold' : ''}`}>
                          {item.title}
                        </p>
                        <span className="text-xs text-muted shrink-0 mt-0.5">
                          {timeAgo(item.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-body leading-relaxed">
                        {item.message}
                      </p>
                      
                      {/* Interactive inline options (unread/delete) */}
                      <div className="flex items-center gap-4 pt-1.5 text-xs text-muted">
                        {!item.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(item.id);
                            }}
                            className="flex items-center gap-1 text-primary font-medium hover:underline"
                          >
                            <Check size={12} />
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={(e) => handleDeleteNotification(item.id, e)}
                          className="flex items-center gap-1 text-error/80 hover:text-error font-medium hover:underline"
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </Card>
    </div>
  );
};

export default Notifications;
