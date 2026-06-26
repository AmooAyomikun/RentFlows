import { useState } from 'react';
import { toast } from 'sonner';
import {
  User, Shield, Bell, Users, CreditCard, FileText
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const navItems = [
  { id: 'profile', label: 'Profile Settings', icon: User },
  { id: 'security', label: 'Account Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'team', label: 'Team & Permissions', icon: Users },
  { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
];

const Settings = () => {
  const { user, setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [fullName, setFullName] = useState(user?.name || 'Julian Vance');
  const [email, setEmail] = useState(user?.email || 'julian.vance@rentflow.com');
  const [bio, setBio] = useState('Senior Asset Manager specializing in luxury residential portfolios across the Tri-State area.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (setUser) setUser({ ...user, name: fullName, email });
    setIsSubmitting(false);
    toast.success('Profile changes saved successfully');
  };

  return (
    <div className="font-sans text-gray-900 pb-12">
      {/* ── PAGE TITLE ── */}
      <div className="mb-8">
        <h1 className="text-[28px] font-display font-extrabold text-[#072F29] tracking-tight m-0">Settings</h1>
      </div>

      {/* ── TWO COLUMN SETTINGS LAYOUT ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Left Sidebar Nav */}
        <div className="md:col-span-1 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer border-none text-xs sm:text-sm ${
                  isActive
                    ? 'bg-gray-200/80 font-bold text-gray-900 shadow-2xs'
                    : 'bg-transparent font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#072F29]' : 'text-gray-500'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Main Content Card */}
        <div className="md:col-span-3 bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-2xs">
          {activeTab === 'profile' ? (
            <div>
              <h2 className="text-xl font-bold text-gray-900 m-0">Profile Settings</h2>
              <p className="text-xs sm:text-sm text-gray-500 m-0 mt-1 mb-6">Manage how your personal information appears across the platform.</p>
              
              <div className="border-b border-gray-100 mb-8" />

              <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-8 items-start">
                {/* Avatar Preview replicating abstract document graphic in circle */}
                <div className="w-28 h-28 rounded-full bg-linear-to-tr from-[#D6C7B2] to-[#072F29] p-3 flex items-center justify-center shrink-0 border border-gray-200 shadow-2xs relative overflow-hidden mx-auto sm:mx-0">
                  <div className="bg-white rounded-lg w-16 h-20 shadow-md p-2 flex flex-col gap-1.5 transform rotate-[-6deg]">
                    <div className="w-8 h-1.5 bg-gray-300 rounded-full" />
                    <div className="w-12 h-1 bg-gray-200 rounded-full mt-1" />
                    <div className="w-10 h-1 bg-gray-200 rounded-full" />
                    <div className="w-11 h-1 bg-gray-200 rounded-full" />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="flex-1 w-full space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#072F29]/20 font-medium box-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#072F29]/20 font-medium box-border"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full bg-white border border-gray-300 rounded-xl p-3.5 text-xs sm:text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#072F29]/20 leading-relaxed font-medium box-border"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#C75B30] hover:bg-[#b5522b] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer border-none"
                    >
                      {isSubmitting ? 'Saving...' : 'Save Profile Changes'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <h3 className="text-lg font-bold text-gray-800 mb-1 capitalize">{activeTab}</h3>
              <p className="text-xs text-gray-400 m-0">Preferences for {activeTab} are configured at the organization tier.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
