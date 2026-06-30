import { useState, useRef } from 'react';
import { toast } from 'sonner';
import {
  User, Shield, Bell, Users, CreditCard, Camera, Lock, Smartphone,
  Mail, Download, Plus, Trash2, CheckCircle2, AlertCircle, Key
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const navItems = [
  { id: 'profile', label: 'Profile Settings', icon: User },
  { id: 'security', label: 'Account Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'team', label: 'Team & Permissions', icon: Users },
  { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
];

const presetAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80"
];

const Settings = () => {
  const { user, updateUser } = useAuthStore();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile State
  const [fullName, setFullName] = useState(user?.name || 'Amoo Ayomikun');
  const [email, setEmail] = useState(user?.email || 'amoo.ayo@rentflow.ng');
  const [phone, setPhone] = useState(user?.phone || '+234 803 000 1122');
  const [bio, setBio] = useState(user?.bio || 'Senior Asset Manager specializing in luxury residential portfolios across Lagos & Abuja.');
  const [avatar, setAvatar] = useState(() => localStorage.getItem('rentflows_profile_image') || user?.avatar || presetAvatars[0]);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Security State
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [twoFactor, setTwoFactor] = useState(true);

  // Notification State
  const [notifPrefs, setNotifPrefs] = useState({
    emailAlerts: true,
    smsAlerts: true,
    rentReceipts: true,
    maintenanceUrgent: true,
    monthlyReports: false
  });

  // Team State
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Amoo Ayomikun', email: 'amoo.ayo@rentflow.ng', role: 'Owner / Principal', status: 'Active' },
    { id: 2, name: 'Chidi Amaechi', email: 'chidi.a@rentflow.ng', role: 'Asset Manager', status: 'Active' },
    { id: 3, name: 'Simisola Alabi', email: 'simi.alabi@rentflow.ng', role: 'Financial Accountant', status: 'Active' },
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Property Manager');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatar(base64String);
        localStorage.setItem('rentflows_profile_image', base64String);
        if (updateUser) updateUser({ avatar: base64String });
        toast.success('Profile image uploaded successfully from device!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    localStorage.setItem('rentflows_profile_image', avatar);
    if (updateUser) updateUser({ name: fullName, email, phone, bio, avatar });
    setIsSubmitting(false);
    toast.success('Profile settings updated successfully!');
  };

  const handleAddCustomAvatar = () => {
    if (!customAvatarUrl) return;
    setAvatar(customAvatarUrl);
    localStorage.setItem('rentflows_profile_image', customAvatarUrl);
    if (updateUser) updateUser({ avatar: customAvatarUrl });
    setCustomAvatarUrl('');
    toast.success('Custom image URL applied as profile avatar!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.newPass) {
      toast.error('Please enter current and new passwords');
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    setPasswords({ current: '', newPass: '', confirm: '' });
    toast.success('Account password changed securely!');
  };

  const handleAddTeamMember = (e) => {
    e.preventDefault();
    if (!newMemberEmail) return;
    const newMember = {
      id: Date.now(),
      name: newMemberEmail.split('@')[0].replace('.', ' '),
      email: newMemberEmail,
      role: newMemberRole,
      status: 'Pending Invite'
    };
    setTeamMembers([...teamMembers, newMember]);
    setNewMemberEmail('');
    toast.success(`Invitation dispatched to ${newMemberEmail}`);
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
    toast.info('Team member access revoked.');
  };

  return (
    <div className="font-sans text-gray-900 pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight m-0">Settings</h1>
        <p className="text-sm text-gray-500 mt-1 m-0">Manage profile data, account credentials, notifications, and team permissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
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
        <div className="md:col-span-3 bg-white rounded-xl border border-gray-200/80 p-6 card-shadow min-h-[480px]">
          {/* TAB 1: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Profile Settings</h2>
              <p className="text-xs text-gray-500 m-0 mt-1 mb-6">Update your photo and personal contact details.</p>
              <div className="border-b border-gray-100 mb-6" />

              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Profile Image Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <div className="relative shrink-0 cursor-pointer group" onClick={() => fileInputRef.current?.click()} title="Click to upload image">
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                    <img
                      src={avatar}
                      alt="Profile Avatar"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#072F29] text-white flex items-center justify-center shadow-xs group-hover:bg-[#C75B30] transition-colors">
                      <Camera size={14} />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="text-xs font-bold text-gray-800 uppercase tracking-wider">Choose Profile Photo</div>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#C75B30] hover:bg-[#b5522b] text-white text-xs font-bold px-3 py-2 rounded-xl border-none cursor-pointer flex items-center gap-1.5 shadow-2xs mr-1"
                      >
                        <Camera size={14} /> Upload from Device
                      </button>
                      {presetAvatars.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => { setAvatar(url); localStorage.setItem('rentflows_profile_image', url); toast.info('Selected preset portrait'); }}
                          className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-transform active:scale-95 p-0 ${avatar === url ? 'border-[#C75B30] ring-2 ring-[#C75B30]/30' : 'border-transparent'}`}
                        >
                          <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="url"
                        placeholder="Or paste image URL (https://...)"
                        value={customAvatarUrl}
                        onChange={e => setCustomAvatarUrl(e.target.value)}
                        className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 flex-1 focus:outline-none focus:border-[#072F29]"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomAvatar}
                        className="bg-[#072F29] text-white text-xs font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer hover:bg-[#0b4f45]"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#072F29] font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#072F29] font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#072F29] font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Role / Designation</label>
                    <input
                      type="text"
                      disabled
                      value="Senior Asset Manager"
                      className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-500 font-bold cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Professional Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-gray-300 rounded-xl p-3.5 text-xs sm:text-sm text-gray-800 resize-none focus:outline-none focus:border-[#072F29] leading-relaxed font-medium"
                  />
                </div>

                <div className="flex justify-end pt-2 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#C75B30] hover:bg-[#b5522b] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer border-none"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: ACCOUNT SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Account Security</h2>
                <p className="text-xs text-gray-500 m-0 mt-1">Manage password updates and multi-factor authentication.</p>
              </div>
              <div className="border-b border-gray-100" />

              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                <h3 className="text-xs font-bold uppercase text-gray-700 m-0 flex items-center gap-1.5">
                  <Key size={15} className="text-[#072F29]" /> Change Account Password
                </h3>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={passwords.current}
                    onChange={e => setPasswords({...passwords, current: e.target.value})}
                    className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#072F29]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Min 8 chars, numbers & symbols"
                    value={passwords.newPass}
                    onChange={e => setPasswords({...passwords, newPass: e.target.value})}
                    className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#072F29]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Re-type new password"
                    value={passwords.confirm}
                    onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                    className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#072F29]"
                  />
                </div>
                <button type="submit" className="bg-[#072F29] text-white font-bold text-xs px-5 py-2.5 rounded-xl border-none cursor-pointer hover:bg-[#0b4f45]">
                  Update Password
                </button>
              </form>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Smartphone size={20} className="text-[#072F29] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 m-0">Two-Factor Authentication (2FA)</h4>
                      <p className="text-[11px] text-gray-500 m-0 mt-0.5">Secure logins with OTP verification sent via Nigerian GSM or Email.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setTwoFactor(!twoFactor); toast.info(`2FA is now ${!twoFactor ? 'Enabled' : 'Disabled'}`); }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold border-none cursor-pointer transition-colors ${twoFactor ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-800'}`}
                  >
                    {twoFactor ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Notification Preferences</h2>
                <p className="text-xs text-gray-500 m-0 mt-1">Control which alerts are delivered to your email and phone.</p>
              </div>
              <div className="border-b border-gray-100" />

              <div className="space-y-3">
                {[
                  { key: 'emailAlerts', title: 'Email Notifications', desc: 'Receive instant alerts on tenant lease agreements and applications.' },
                  { key: 'smsAlerts', title: 'SMS Notifications (+234 GSM)', desc: 'Get urgent maintenance and payment confirmation text messages.' },
                  { key: 'rentReceipts', title: 'Automated Rent Receipts', desc: 'Send automatic NIBSS bank receipt summaries when rent is cleared.' },
                  { key: 'maintenanceUrgent', title: 'Urgent Maintenance Dispatches', desc: 'Notify assigned plumbers and electricians immediately on high-priority tickets.' },
                  { key: 'monthlyReports', title: 'Monthly Portfolio Digest', desc: 'Receive detailed monthly executive PDF reports on the 1st of every month.' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/70 border border-gray-200/60">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 m-0">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 m-0 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setNotifPrefs({ ...notifPrefs, [item.key]: !notifPrefs[item.key] });
                        toast.success(`Updated ${item.title}`);
                      }}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer border-none transition-colors ${notifPrefs[item.key] ? 'bg-[#072F29]' : 'bg-gray-300'}`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifPrefs[item.key] ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TEAM & PERMISSIONS */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Team & Permissions</h2>
                  <p className="text-xs text-gray-500 m-0 mt-1">Collaborate with asset managers, property accountants, and agents.</p>
                </div>
              </div>
              <div className="border-b border-gray-100" />

              {/* Invite Member Form */}
              <form onSubmit={handleAddTeamMember} className="flex flex-wrap gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <input
                  type="email"
                  placeholder="Colleague's email (e.g. musa@rentflow.ng)"
                  value={newMemberEmail}
                  onChange={e => setNewMemberEmail(e.target.value)}
                  className="flex-1 min-w-[200px] p-2.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#072F29]"
                />
                <select
                  value={newMemberRole}
                  onChange={e => setNewMemberRole(e.target.value)}
                  className="p-2.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none cursor-pointer"
                >
                  <option>Property Manager</option>
                  <option>Financial Accountant</option>
                  <option>Legal Officer</option>
                </select>
                <button type="submit" className="bg-[#C75B30] text-white font-bold text-xs px-4 py-2.5 rounded-lg border-none cursor-pointer hover:bg-[#b5522b] flex items-center gap-1">
                  <Plus size={14} /> Invite
                </button>
              </form>

              {/* Team List */}
              <div className="space-y-2">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200/80 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#072F29] text-white font-bold text-xs flex items-center justify-center">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 m-0">{member.name}</h4>
                        <p className="text-[10px] text-gray-500 m-0">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">{member.role}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {member.status}
                      </span>
                      {member.role !== 'Owner / Principal' && (
                        <button onClick={() => handleRemoveMember(member.id)} className="text-gray-400 hover:text-rose-600 bg-transparent border-none p-1 cursor-pointer">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SUBSCRIPTION & BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Subscription & Billing</h2>
                <p className="text-xs text-gray-500 m-0 mt-1">Manage your active RentFlow plan and NIBSS payment gateways.</p>
              </div>
              <div className="border-b border-gray-100" />

              {/* Current Plan Summary */}
              <div className="p-5 rounded-2xl bg-linear-to-r from-[#072F29] to-[#0b4f45] text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
                <div>
                  <span className="bg-white/20 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">Active Tier</span>
                  <h3 className="text-lg font-display font-black m-0 mt-2">RentFlow Enterprise Portfolio</h3>
                  <p className="text-xs text-white/80 m-0 mt-1">Unlimited Nigerian properties • Automated NIBSS Bank reconciliation</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black font-display">₦250,000 <span className="text-xs font-normal">/ yr</span></div>
                  <button onClick={() => toast.info('Contacting Enterprise billing sales...')} className="mt-2 bg-[#C75B30] hover:bg-[#b5522b] text-white font-bold text-xs px-4 py-2 rounded-xl border-none cursor-pointer">
                    Upgrade Plan
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-700 m-0 mb-3">Linked Payment Method</h3>
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <CreditCard size={24} className="text-[#072F29]" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 m-0">Mastercard ending in 4092</h4>
                      <p className="text-[10px] text-gray-500 m-0 mt-0.5">Expires 08/2028 • Linked to Guaranty Trust Bank</p>
                    </div>
                  </div>
                  <button onClick={() => toast.success('Payment gateway updated')} className="text-xs font-bold text-[#072F29] hover:underline bg-transparent border-none cursor-pointer">
                    Update Card
                  </button>
                </div>
              </div>

              {/* Billing History */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-700 m-0 mb-3">Recent Invoices</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                  {[
                    { date: 'Jun 1, 2026', inv: 'INV-2026-006', amount: '₦250,000', status: 'Paid' },
                    { date: 'Jun 1, 2025', inv: 'INV-2025-006', amount: '₦220,000', status: 'Paid' }
                  ].map((inv, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 bg-white text-xs">
                      <div className="font-mono font-bold text-gray-800">{inv.inv} ({inv.date})</div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold">{inv.amount}</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{inv.status}</span>
                        <button onClick={() => toast.success(`Downloading ${inv.inv}.pdf...`)} className="text-gray-500 hover:text-black bg-transparent border-none p-1 cursor-pointer flex items-center gap-1">
                          <Download size={14} /> PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
