import { useState } from 'react';
import { toast } from 'sonner';
import {
  ClipboardList, Clock, Banknote, AlertTriangle, ArrowRight, MoreHorizontal,
  CheckCircle2, Star, Filter, Plus, Eye, UserPlus, Calendar, History,
  Wrench, Zap, Snowflake, X, Send, Check
} from 'lucide-react';

const initialKanbanColumns = [
  {
    id: 'received',
    title: 'Received',
    count: 24,
    dotColor: 'bg-gray-400',
    items: [
      {
        id: 'k1',
        urgent: true,
        tag: 'URGENT',
        tagBg: 'bg-rose-50 text-rose-600',
        code: '#M-2041',
        title: 'Broken Main Pipe',
        location: 'Victoria Island Towers • Unit 4B',
        avatarText: 'UN',
        avatarBg: 'bg-slate-800 text-white',
        footerRight: 'Added 2h ago',
      },
      {
        id: 'k2',
        urgent: false,
        tag: 'NORMAL',
        tagBg: 'bg-gray-100 text-gray-700',
        code: '#M-2042',
        title: 'Leaking Sink Faucet',
        location: 'GRA Phase 2 Duplexes • Unit 1',
        avatarText: 'ZB',
        avatarBg: 'bg-teal-800 text-white',
        footerRight: 'Added 5h ago',
      }
    ]
  },
  {
    id: 'in_progress',
    title: 'In-Progress',
    count: 18,
    dotColor: 'bg-[#0B4F45]',
    items: [
      {
        id: 'k3',
        urgent: false,
        tag: 'NORMAL',
        tagBg: 'bg-emerald-50 text-emerald-700',
        code: '#M-1995',
        title: 'HVAC Seasonal Cleaning',
        location: 'Lekki Palms Villas • Amenity Center',
        contractorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
        contractorName: 'Segun Adebayo',
        footerRight: 'Working',
        footerRightStyle: 'text-teal-700 italic font-bold',
        borderLeft: 'border-l-4 border-emerald-500',
      },
      {
        id: 'k4',
        urgent: true,
        tag: 'URGENT',
        tagBg: 'bg-rose-50 text-rose-600',
        code: '#M-1998',
        title: 'Generator Automatic Transfer Switch Repair',
        location: 'Victoria Island Towers • Plant Room',
        contractorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        contractorName: 'Chinedu Okafor',
        footerRight: 'Working',
        footerRightStyle: 'text-teal-700 italic font-bold',
        borderLeft: 'border-l-4 border-rose-500',
      }
    ]
  },
  {
    id: 'completed',
    title: 'Completed',
    count: 106,
    dotColor: 'bg-emerald-500',
    items: [
      {
        id: 'k5',
        urgent: false,
        tag: 'COMPLETED',
        tagBg: 'bg-gray-100 text-gray-600',
        code: '#M-1990',
        title: 'Smart Lock Installation',
        location: 'Banana Island Lofts • Unit 302',
        doneIcon: true,
        doneText: 'Done by Tunde B.',
        footerRight: 'Oct 12',
      },
      {
        id: 'k6',
        urgent: false,
        tag: 'COMPLETED',
        tagBg: 'bg-gray-100 text-gray-600',
        code: '#M-1985',
        title: 'CCTV Camera Replacement',
        location: 'Maitama Heights • Gatehouse',
        doneIcon: true,
        doneText: 'Done by VoltMaster',
        footerRight: 'Oct 10',
      }
    ]
  }
];

const topProviders = [
  {
    name: 'Precision Plumbing Lagos',
    jobs: 'Completed: 142 Jobs',
    rating: '4.9',
    response: '1.8h response',
    iconBg: 'bg-blue-900 text-white',
    icon: Wrench,
  },
  {
    name: 'VoltMaster Electrical Lagos',
    jobs: 'Completed: 88 Jobs',
    rating: '4.7',
    response: '2.4h response',
    iconBg: 'bg-slate-900 text-white',
    icon: Zap,
  },
  {
    name: 'EcoChill HVAC Abuja',
    jobs: 'Completed: 56 Jobs',
    rating: '4.5',
    response: '3.1h response',
    iconBg: 'bg-teal-50 text-teal-800',
    icon: Snowflake,
  },
];

const allContractors = [
  ...topProviders,
  { name: 'Kano Power & Solar Solutions', jobs: 'Completed: 45 Jobs', rating: '4.8', response: '2.0h response', iconBg: 'bg-amber-900 text-white', icon: Zap },
  { name: 'Victoria Island Carpentry & Paint', jobs: 'Completed: 74 Jobs', rating: '4.6', response: '3.5h response', iconBg: 'bg-purple-900 text-white', icon: Wrench },
  { name: 'Lekki Cleaners & Fumigation', jobs: 'Completed: 110 Jobs', rating: '4.9', response: '1.2h response', iconBg: 'bg-emerald-900 text-white', icon: Snowflake },
];

const initialActivity = [
  {
    id: 'act1',
    date: 'Oct 24, 09:12 AM',
    property: 'Victoria Island Towers',
    unit: 'Unit 4B',
    category: 'Plumbing',
    catIcon: '💧',
    status: 'In-Progress',
    statusBg: 'bg-amber-100 text-amber-800',
    actionIcon: Eye,
  },
  {
    id: 'act2',
    date: 'Oct 23, 02:45 PM',
    property: 'Lekki Palms Villas',
    unit: 'Amenity Center',
    category: 'Electrical',
    catIcon: '⚡',
    status: 'Completed',
    statusBg: 'bg-emerald-100 text-emerald-800',
    actionIcon: Eye,
  },
  {
    id: 'act3',
    date: 'Oct 22, 11:30 AM',
    property: 'Maitama Heights',
    unit: 'Unit 3',
    category: 'General',
    catIcon: '🛠️',
    status: 'Pending Assign',
    statusBg: 'bg-gray-200 text-gray-800',
    actionIcon: UserPlus,
  },
  {
    id: 'act4',
    date: 'Oct 21, 04:15 PM',
    property: 'Banana Island Lofts',
    unit: 'Unit 502',
    category: 'Security',
    catIcon: '🔒',
    status: 'Completed',
    statusBg: 'bg-emerald-100 text-emerald-800',
    actionIcon: Eye,
  },
];

const Maintenance = () => {
  const [columns, setColumns] = useState(initialKanbanColumns);
  const [recentActivity, setRecentActivity] = useState(initialActivity);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const [showFullBoardModal, setShowFullBoardModal] = useState(false);
  const [showContractorsModal, setShowContractorsModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  const [orderForm, setOrderForm] = useState({
    title: '',
    propertyUnit: '',
    category: 'Plumbing',
    priority: 'Normal'
  });

  const filteredActivity = recentActivity.filter(act => {
    if (selectedCategory === 'All Categories') return true;
    return act.category === selectedCategory;
  });

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!orderForm.title || !orderForm.propertyUnit) {
      toast.error('Please fill in title and property unit.');
      return;
    }

    const newCode = `#M-${Math.floor(2000 + Math.random() * 9000)}`;
    const newCard = {
      id: `k_${Date.now()}`,
      urgent: orderForm.priority === 'Urgent',
      tag: orderForm.priority.toUpperCase(),
      tagBg: orderForm.priority === 'Urgent' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700',
      code: newCode,
      title: orderForm.title,
      location: orderForm.propertyUnit,
      avatarText: 'NEW',
      avatarBg: 'bg-[#0B4F45] text-white',
      footerRight: 'Just now'
    };

    const updatedCols = columns.map(c => {
      if (c.id === 'received') {
        return { ...c, count: c.count + 1, items: [newCard, ...c.items] };
      }
      return c;
    });

    const iconMap = { Plumbing: '💧', Electrical: '⚡', General: '🛠️', Security: '🔒' };
    const newAct = {
      id: `act_${Date.now()}`,
      date: 'Oct 24, Just now',
      property: orderForm.propertyUnit.split('•')[0] || orderForm.propertyUnit,
      unit: orderForm.propertyUnit.split('•')[1] || 'Unit',
      category: orderForm.category,
      catIcon: iconMap[orderForm.category] || '🛠️',
      status: 'Pending Assign',
      statusBg: 'bg-gray-200 text-gray-800',
      actionIcon: UserPlus
    };

    setColumns(updatedCols);
    setRecentActivity([newAct, ...recentActivity]);
    setShowNewOrderModal(false);
    setOrderForm({ title: '', propertyUnit: '', category: 'Plumbing', priority: 'Normal' });
    toast.success(`Work Order ${newCode} successfully logged and assigned to Received!`);
  };

  return (
    <div className="font-sans text-gray-900 pb-12 relative">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight m-0">Maintenance & Repairs</h1>
        <p className="text-base text-[#4A4F4C] font-medium mt-1 mb-0">Oversee property health, active service tickets, and contractor assignments.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
              <ClipboardList size={18} />
            </div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold uppercase text-gray-800 m-0 mb-1">Open Tickets</p>
            <p className="text-3xl font-display font-black text-gray-900 m-0 tracking-tight">42</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <Clock size={18} />
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">-4h vs avg</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold uppercase text-gray-800 m-0 mb-1">Avg Resolution Time</p>
            <p className="text-3xl font-display font-black text-gray-900 m-0 tracking-tight">28 hrs</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
              <Banknote size={18} />
            </div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Month</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold uppercase text-gray-800 m-0 mb-1">Spend (MTD)</p>
            <p className="text-3xl font-display font-black text-gray-900 m-0 tracking-tight">₦4.2M</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center shrink-0">
              <AlertTriangle size={18} />
            </div>
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">Requires Action</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold uppercase text-gray-800 m-0 mb-1">Urgent Repairs</p>
            <p className="text-3xl font-display font-black text-rose-600 m-0 tracking-tight">09</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight m-0">Workflow Overview</h2>
          <button
            onClick={() => setShowFullBoardModal(true)}
            className="text-xs font-bold text-gray-800 hover:underline inline-flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer"
          >
            <span>View Full Board</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(col => (
            <div key={col.id} className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/60 min-h-[220px] flex flex-col gap-3">
              <div className="flex items-center justify-between px-1 shrink-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                  <span className="text-xs font-black text-gray-800">{col.title} ({col.count})</span>
                </div>
                <MoreHorizontal size={16} className="text-gray-400 cursor-pointer" />
              </div>

              {col.items.map(card => (
                <div
                  key={card.id}
                  onClick={() => toast.info(`Viewing ticket ${card.code}: ${card.title}`)}
                  className={`bg-white rounded-xl border border-gray-200/80 p-5 card-shadow relative overflow-hidden transition-all hover:shadow-md cursor-pointer ${card.borderLeft || ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${card.tagBg}`}>
                      {card.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-600">{card.code}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 m-0 mt-1 leading-snug">{card.title}</h3>
                  <p className="text-xs text-gray-500 m-0 mt-1">{card.location}</p>

                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {card.avatarText ? (
                        <span className={`w-6 h-6 rounded-full ${card.avatarBg} text-[10px] font-bold flex items-center justify-center shrink-0`}>{card.avatarText}</span>
                      ) : card.contractorImg ? (
                        <img src={card.contractorImg} alt={card.contractorName} className="w-6 h-6 rounded-full object-cover shrink-0" />
                      ) : card.doneIcon ? (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      ) : null}
                      <span className="text-xs font-bold text-gray-700 truncate">{card.contractorName || card.doneText || 'Tenant Logged'}</span>
                    </div>
                    <span className={`text-[11px] font-medium ${card.footerRightStyle || 'text-gray-400'}`}>{card.footerRight}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-5">
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Top Service Contractors</h2>
              <Star size={16} className="text-amber-500 fill-amber-500" />
            </div>

            <div className="space-y-4">
              {topProviders.map(provider => (
                <div key={provider.name} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/60 border border-gray-100">
                  <div className={`w-10 h-10 rounded-xl ${provider.iconBg} flex items-center justify-center shrink-0`}>
                    <provider.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-gray-900 m-0 truncate">{provider.name}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                      <span>{provider.jobs}</span>
                      <span>⭐ {provider.rating}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium m-0 mt-0.5">{provider.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-gray-100 text-center">
            <button
              onClick={() => setShowContractorsModal(true)}
              className="text-xs font-black text-[#0B4F45] hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              View All Contractors ({allContractors.length})
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 card-shadow overflow-hidden lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Recent Activity</h2>
              
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <span>Filter by:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-transparent font-bold text-gray-800 border-none pr-6 py-1 focus:ring-0 cursor-pointer text-xs"
                  >
                    <option>All Categories</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>General</option>
                    <option>Security</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowNewOrderModal(true)}
                  className="bg-[#C75B30] hover:bg-[#b5522b] text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs inline-flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer border-none"
                >
                  <Plus size={15} strokeWidth={3} />
                  <span>New Work Order</span>
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Date</th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Property / Unit</th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Category</th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Status</th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase text-right"> </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredActivity.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500 font-medium">
                        No recent activities match "{selectedCategory}".
                      </td>
                    </tr>
                  ) : (
                    filteredActivity.map((act) => (
                      <tr key={act.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="py-4 px-5 text-xs font-mono text-gray-800">{act.date}</td>
                        <td className="py-4 px-5">
                          <span className="text-xs sm:text-sm font-bold text-gray-900 block">{act.property}</span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">{act.unit}</span>
                        </td>
                        <td className="py-4 px-5 text-xs sm:text-sm font-medium text-gray-700">
                          <span className="mr-1.5">{act.catIcon}</span>{act.category}
                        </td>
                        <td className="py-4 px-5">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${act.statusBg}`}>
                            {act.status}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button onClick={() => toast.info(`Viewing details for ${act.category} order at ${act.property}`)} className="p-1 text-gray-500 hover:text-black transition-colors cursor-pointer bg-transparent border-none" aria-label="Action">
                            <act.actionIcon size={17} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showFullBoardModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-gray-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-gray-900 m-0">Full Maintenance Kanban Board</h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">Showing all 148 work orders across Received, In-Progress, and Completed</p>
              </div>
              <button onClick={() => setShowFullBoardModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto pr-1 flex-1">
              {columns.map(col => (
                <div key={col.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-black text-xs text-gray-800 pb-2 border-b border-gray-200">
                    <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <span>{col.title} ({col.count} items)</span>
                  </div>
                  {col.items.map(card => (
                    <div key={card.id} className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                        <span className={card.urgent ? 'text-rose-600 font-black' : ''}>{card.tag}</span>
                        <span>{card.code}</span>
                      </div>
                      <div className="text-xs font-bold text-gray-900 leading-tight">{card.title}</div>
                      <div className="text-[11px] text-gray-500 mt-1">{card.location}</div>
                    </div>
                  ))}
                  <div className="text-center py-2 text-xs font-bold text-gray-400 italic">
                    + {col.count - col.items.length} more tickets...
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end shrink-0">
              <button onClick={() => setShowFullBoardModal(false)} className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B4F45] text-white hover:bg-[#073831] border-none cursor-pointer">
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {showContractorsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-gray-900 m-0">Verified Service Contractors</h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">Licensed Nigerian artisans and engineering firms</p>
              </div>
              <button onClick={() => setShowContractorsModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto space-y-3 pr-1 flex-1">
              {allContractors.map((provider, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200/80">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${provider.iconBg} flex items-center justify-center shrink-0`}>
                      <provider.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 m-0 truncate">{provider.name}</h4>
                      <p className="text-xs text-gray-500 m-0 mt-0.5">{provider.jobs}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-amber-600">⭐ {provider.rating}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{provider.response}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end shrink-0">
              <button onClick={() => setShowContractorsModal(false)} className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B4F45] text-white hover:bg-[#073831] border-none cursor-pointer">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-bold text-gray-900 m-0">Create New Work Order</h3>
              <button onClick={() => setShowNewOrderModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Issue / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Broken Water Pipe / Aircon Malfunction"
                  value={orderForm.title}
                  onChange={e => setOrderForm({ ...orderForm, title: e.target.value })}
                  className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#C75B30]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Property • Unit</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lekki Palms Villas • Unit 14B"
                  value={orderForm.propertyUnit}
                  onChange={e => setOrderForm({ ...orderForm, propertyUnit: e.target.value })}
                  className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#C75B30]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
                  <select
                    value={orderForm.category}
                    onChange={e => setOrderForm({ ...orderForm, category: e.target.value })}
                    className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#C75B30] bg-white cursor-pointer"
                  >
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>General</option>
                    <option>Security</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Priority</label>
                  <select
                    value={orderForm.priority}
                    onChange={e => setOrderForm({ ...orderForm, priority: e.target.value })}
                    className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#C75B30] bg-white cursor-pointer"
                  >
                    <option>Normal</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setShowNewOrderModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 border-none bg-transparent cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-[#C75B30] hover:bg-[#b5522b] text-white border-none cursor-pointer shadow-sm flex items-center gap-1.5">
                  <Plus size={14} strokeWidth={3} /> Dispatch Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
