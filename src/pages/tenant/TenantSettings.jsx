import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Edit2, Camera, Shield, ShieldCheck, CheckCircle2, Plus, 
  Phone, ChevronDown, Check, Lock, Key, Copy, AlertTriangle, User, Mail, Image as ImageIcon
} from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { downloadDataExportJSON } from '../../utils/documentGenerator';
import useUIStore from '../../store/uiStore';
import useAuthStore from '../../store/authStore';

const presetAvatars = [
  { id: 'av-1', label: 'Executive Male (Default)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-2', label: 'Professional Female', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-3', label: 'Modern Portrait', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-4', label: 'Corporate Tech', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-5', label: 'Business Casual', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-6', label: 'Minimalist Portrait', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80' },
];

const TenantSettings = () => {
  const navigate = useNavigate();
  const { portalLanguage, setPortalLanguage } = useUIStore();
  const { user, updateUser } = useAuthStore();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [passError, setPassError] = useState('');
  const [biometric, setBiometric] = useState(true);
  const [profileImg, setProfileImg] = useState(user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80');
  const fileInputRef = useRef(null);

  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: user?.name || 'Ayomikun Adeleke',
    prefName: 'Ayo',
    email: user?.email || 'ayomikun.adeleke@rentflows.ng',
    phone: '+234 803 123 4567',
    address: 'Victoria Island Towers, Flat 402-B, Ahmadu Bello Way, Lagos, Nigeria'
  });

  // Modal states
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  // Edit form states
  const [editForm, setEditForm] = useState({ ...profileData });
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [newContact, setNewContact] = useState({ name: '', relation: '', phone: '' });
  const [contacts, setContacts] = useState([
    { initials: 'CA', color: 'bg-[#E6F2EF] text-[#04332C]', name: 'Chidinma Adeleke', relation: 'Spouse', phone: '+234 802 987 6543' },
    { initials: 'BA', color: 'bg-[#FEE2E2] text-[#9B3A0E]', name: 'Babatunde Adeleke', relation: 'Brother', phone: '+234 803 234 5678' }
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImg(url);
      updateUser({ avatar: url });
      setStatusMsg('Profile photo uploaded and synced across portal!');
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const handleSelectPresetAvatar = (url) => {
    setProfileImg(url);
    updateUser({ avatar: url });
    setShowAvatarModal(false);
    setStatusMsg('Profile photo updated from gallery!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({ ...editForm });
    setShowEditProfileModal(false);
    setStatusMsg('Profile information saved successfully!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) {
      setPassError('New passwords do not match.');
      return;
    }
    setPassError('');
    setShowPasswordModal(false);
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    setStatusMsg('Password updated securely!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;
    const initials = newContact.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    setContacts([...contacts, { initials, color: 'bg-[#E0F2FE] text-[#0369A1]', ...newContact }]);
    setNewContact({ name: '', relation: '', phone: '' });
    setShowContactModal(false);
    setStatusMsg('Emergency contact added successfully!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="space-y-6 w-full text-[#1E293B] pb-8">
      {/* Title Section */}
      <div>
        {statusMsg && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            {statusMsg}
          </div>
        )}
        <h1 className="text-2xl font-bold text-gray-900 m-0">
          Profile Settings
        </h1>
      </div>

      {/* Main 2-Column vs 1-Column Grid Layout matching exact mockup aspect ratios */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (Takes up 2 spans on desktop) */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Personal Information</h2>
              <button 
                onClick={() => {
                  setEditForm({ ...profileData });
                  setShowEditProfileModal(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-black transition-colors cursor-pointer bg-white border-none"
              >
                <Edit2 size={14} />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-start gap-6">
              {/* Profile Photo with Camera Badge */}
              <div className="relative shrink-0 flex flex-col items-center gap-2">
                <div className="relative">
                  <img 
                    src={profileImg} 
                    alt="Ayomikun Adeleke" 
                    className="w-28 h-28 rounded-2xl object-cover border-4 border-[#E6F2EF] shadow-2xs" 
                  />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-[#04332C] hover:bg-[#064e43] text-white rounded-full flex items-center justify-center shadow-sm transition-all cursor-pointer ring-2 ring-white border-none"
                    aria-label="Upload photo from computer"
                    title="Upload file from device"
                  >
                    <Camera size={13} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAvatarModal(true)}
                  className="text-[11px] font-bold text-[#04332C] hover:underline bg-transparent border-none cursor-pointer flex items-center gap-1"
                >
                  <ImageIcon size={12} />
                  <span>Choose Preset Avatar</span>
                </button>
              </div>

              {/* Data Fields Grid */}
              <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 w-full">
                <div>
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">FULL NAME</span>
                  <span className="text-base font-black text-[#1E293B] mt-0.5 block font-display">{profileData.fullName}</span>
                </div>

                <div>
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">PREFERRED NAME</span>
                  <span className="text-base font-semibold text-gray-700 mt-0.5 block">{profileData.prefName}</span>
                </div>

                <div className="min-w-0">
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">EMAIL ADDRESS</span>
                  <span className="text-sm font-bold text-[#1E293B] mt-0.5 block truncate">{profileData.email}</span>
                </div>

                <div>
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">PHONE NUMBER</span>
                  <span className="text-sm font-bold text-[#1E293B] mt-0.5 block font-mono">{profileData.phone}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">PRIMARY ADDRESS</span>
                  <span className="text-sm font-bold text-[#1E293B] mt-0.5 block">{profileData.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Verification Side-by-Side Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            
            {/* Password & Access Card */}
            <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200 flex flex-col justify-between space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                  <Shield size={18} strokeWidth={2.2} />
                </div>
                <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Password & Access</h2>
              </div>

              <div className="space-y-4 pt-2 divide-y divide-gray-100">
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="font-extrabold text-xs sm:text-sm text-[#1E293B]">Password</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Last updated 3 months ago</p>
                  </div>
                  <button 
                    onClick={() => setShowPasswordModal(true)}
                    className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shrink-0 ml-2 bg-white"
                  >
                    Update
                  </button>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="font-extrabold text-xs sm:text-sm text-[#1E293B]">Biometric Login</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">FaceID or TouchID enabled</p>
                  </div>
                  <button 
                    onClick={() => {
                      setBiometric(!biometric);
                      setStatusMsg(`Biometric login ${!biometric ? 'enabled' : 'disabled'}`);
                      setTimeout(() => setStatusMsg(''), 4000);
                    }}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer flex items-center shrink-0 ml-2 ${biometric ? 'bg-[#04332C] justify-end' : 'bg-gray-300 justify-start'}`}
                    aria-label="Toggle biometric login"
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-sm block transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Verification Card */}
            <div className="bg-[#04332C] text-white rounded-xl p-6 card-shadow flex flex-col justify-between space-y-5 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#FF8C5A] shrink-0">
                  <ShieldCheck size={18} strokeWidth={2.2} />
                </div>
                <h2 className="text-sm font-semibold uppercase text-white m-0">Verification</h2>
              </div>

              <div className="space-y-3 pt-1">
                <div className="inline-flex items-center gap-2 text-white font-extrabold text-sm">
                  <CheckCircle2 size={16} className="text-[#68D391] shrink-0" />
                  <span>Two-Factor Authentication Active</span>
                </div>
                <p className="text-xs text-[#FAF7F2]/80 font-medium leading-relaxed">
                  Your account is protected by an extra layer of security. Codes are sent to your mobile device during sign-in.
                </p>
              </div>

              <div className="pt-2">
                <span 
                  onClick={() => setShowRecoveryModal(true)}
                  className="text-xs font-bold text-[#FF8C5A] hover:underline cursor-pointer inline-block"
                >
                  Manage Recovery Codes
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (Takes up 1 span on desktop) */}
        <div className="space-y-6 min-w-0">
          
          {/* Emergency Contacts Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Emergency Contacts</h2>
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-gray-500 hover:text-black transition-colors cursor-pointer p-1 bg-white border-none"
                aria-label="Add emergency contact"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {contacts.map((c, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-3.5 flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${c.color}`}>
                    {c.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-black text-sm text-[#1E293B] leading-tight">{c.name}</h4>
                    <p className="text-[11px] text-gray-500 font-medium mt-0.5">{c.relation}</p>
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-gray-700 mt-1">
                      <Phone size={11} className="text-gray-400 shrink-0" />
                      <span>{c.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portal Preferences Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200 space-y-5">
            <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Portal Preferences</h2>

            <div>
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">LANGUAGE</label>
              <div className="relative">
                <select 
                  value={portalLanguage || 'en-US'}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPortalLanguage(val);
                    const langNames = {
                      'en-US': 'English (NG / UK)',
                      'yo-NG': 'Yoruba (Èdè Yorùbá)',
                      'ig-NG': 'Igbo (Asụsụ Igbo)',
                      'ha-NG': 'Hausa (Harshen Hausa)'
                    };
                    setStatusMsg(`Portal language set to ${langNames[val]}!`);
                    setTimeout(() => setStatusMsg(''), 4000);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#04332C]/20 cursor-pointer"
                >
                  <option value="en-US">English (NG / UK)</option>
                  <option value="yo-NG">Yoruba (Èdè Yorùbá)</option>
                  <option value="ig-NG">Igbo (Asụsụ Igbo)</option>
                  <option value="ha-NG">Hausa (Harshen Hausa)</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="pt-1">
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-3">NOTIFICATION CHANNELS</label>
              <div className="space-y-3">
                <label 
                  onClick={() => {
                    setEmailNotifs(!emailNotifs);
                    setStatusMsg(`Email notifications ${!emailNotifs ? 'enabled' : 'disabled'}`);
                    setTimeout(() => setStatusMsg(''), 3000);
                  }}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${emailNotifs ? 'bg-[#04332C] text-white' : 'border border-gray-300 bg-white'}`}>
                    {emailNotifs && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="text-xs font-bold text-gray-700">Email Notifications</span>
                </label>

                <label 
                  onClick={() => {
                    setSmsNotifs(!smsNotifs);
                    setStatusMsg(`SMS alerts ${!smsNotifs ? 'enabled' : 'disabled'}`);
                    setTimeout(() => setStatusMsg(''), 3000);
                  }}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${smsNotifs ? 'bg-[#04332C] text-white' : 'border border-gray-300 bg-white'}`}>
                    {smsNotifs && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="text-xs font-bold text-gray-700">SMS Alerts</span>
                </label>

                <label 
                  onClick={() => {
                    setPushNotifs(!pushNotifs);
                    setStatusMsg(`Push notifications ${!pushNotifs ? 'enabled' : 'disabled'}`);
                    setTimeout(() => setStatusMsg(''), 3000);
                  }}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${pushNotifs ? 'bg-[#04332C] text-white' : 'border border-gray-300 bg-white'}`}>
                    {pushNotifs && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="text-xs font-bold text-gray-700">Push Notifications</span>
                </label>
              </div>
            </div>
          </div>

          {/* Profile Strength Card */}
          <div className="bg-[#33665C] text-white rounded-xl p-6 card-shadow space-y-4">
            <h2 className="text-sm font-semibold uppercase text-white m-0">Profile Strength</h2>

            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-[#FF8C5A] rounded-full transition-all duration-500" />
            </div>

            <p className="text-xs text-white/90 font-medium leading-relaxed">
              You're almost there! Add a secondary payment method to reach 100% profile completeness.
            </p>

            <button 
              onClick={() => navigate('/tenant/payments')}
              className="w-full py-2.5 rounded-xl bg-[#437A70] hover:bg-[#4f8d82] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer text-center block mt-1 border-none"
            >
              Complete Profile
            </button>
          </div>

        </div>
      </div>

      {/* Full-Width Section below 2-column grid matching exact mockup hierarchy */}
      <div className="pt-2">
        {/* Privacy & Data Card */}
        <div className="bg-[#FDF2F2] border border-[#FDE8E8] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold uppercase text-[#DC2626] m-0">Privacy & Data</h2>
            <p className="text-xs text-gray-600 font-medium mt-1 leading-relaxed m-0">
              Manage how your personal data is handled or request an account deactivation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
            <button 
              onClick={() => {
                downloadDataExportJSON(profileData);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-extrabold text-xs tracking-wider uppercase transition-all shadow-2xs cursor-pointer whitespace-nowrap"
            >
              Export Data
            </button>
            <button 
              onClick={() => setShowDeactivateModal(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#b91c1c] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer whitespace-nowrap border-none"
            >
              Deactivate Account
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={showEditProfileModal} onClose={() => setShowEditProfileModal(false)} title="Edit Personal Information">
        <form onSubmit={handleSaveProfile} className="space-y-4 text-[#1E293B]">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={editForm.fullName} 
              onChange={e => setEditForm({ ...editForm, fullName: e.target.value })} 
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Preferred Name</label>
              <input 
                type="text" 
                value={editForm.prefName} 
                onChange={e => setEditForm({ ...editForm, prefName: e.target.value })} 
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Phone Number</label>
              <input 
                type="text" 
                required
                value={editForm.phone} 
                onChange={e => setEditForm({ ...editForm, phone: e.target.value })} 
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={editForm.email} 
              onChange={e => setEditForm({ ...editForm, email: e.target.value })} 
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Primary Address</label>
            <textarea 
              rows={2}
              value={editForm.address} 
              onChange={e => setEditForm({ ...editForm, address: e.target.value })} 
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowEditProfileModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold bg-white cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none cursor-pointer">Save Changes</button>
          </div>
        </form>
      </Modal>

      {/* Password Modal */}
      <Modal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} title="Update Account Password">
        <form onSubmit={handleUpdatePassword} className="space-y-4 text-[#1E293B]">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Current Password</label>
            <input type="password" required value={passwordForm.current} onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold" placeholder="••••••••" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">New Password</label>
            <input type="password" required value={passwordForm.newPass} onChange={e => setPasswordForm({ ...passwordForm, newPass: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold" placeholder="••••••••" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Confirm New Password</label>
            <input type="password" required value={passwordForm.confirm} onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold" placeholder="••••••••" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowPasswordModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold bg-white cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none cursor-pointer">Update Password</button>
          </div>
        </form>
      </Modal>

      {/* Recovery Codes Modal */}
      <Modal isOpen={showRecoveryModal} onClose={() => setShowRecoveryModal(false)} title="Two-Factor Recovery Codes">
        <div className="space-y-4 text-[#1E293B]">
          <p className="text-xs text-gray-600 leading-relaxed m-0">Store these backup codes in a safe place. If you lose access to your mobile authenticator, each code can be used once to log in.</p>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 rounded-xl border border-gray-200 font-mono text-xs font-bold text-[#04332C] text-center">
            <div>RF-8921-A1B2</div><div>RF-8921-C3D4</div>
            <div>RF-8921-E5F6</div><div>RF-8921-G7H8</div>
            <div>RF-8921-J9K0</div><div>RF-8921-L1M2</div>
            <div>RF-8921-N3P4</div><div>RF-8921-Q5R6</div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <button 
              onClick={() => {
                navigator.clipboard?.writeText("RF-8921-A1B2\nRF-8921-C3D4\nRF-8921-E5F6\nRF-8921-G7H8\nRF-8921-J9K0\nRF-8921-L1M2\nRF-8921-N3P4\nRF-8921-Q5R6");
                setStatusMsg('Recovery codes copied to clipboard!');
                setTimeout(() => setStatusMsg(''), 4000);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 cursor-pointer inline-flex items-center gap-1.5"
            >
              <Copy size={14} /> Copy All Codes
            </button>
            <button onClick={() => setShowRecoveryModal(false)} className="px-5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none cursor-pointer">Done</button>
          </div>
        </div>
      </Modal>

      {/* Add Contact Modal */}
      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="Add Emergency Contact">
        <form onSubmit={handleAddContact} className="space-y-4 text-[#1E293B]">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Contact Name</label>
            <input type="text" required value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold" placeholder="e.g. Samuel Adeleke" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Relationship</label>
            <input type="text" required value={newContact.relation} onChange={e => setNewContact({ ...newContact, relation: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold" placeholder="e.g. Father, Sister" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Phone Number</label>
            <input type="text" required value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono" placeholder="+234 803 000 0000" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowContactModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold bg-white cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none cursor-pointer">Add Contact</button>
          </div>
        </form>
      </Modal>

      {/* Deactivate Modal */}
      <Modal isOpen={showDeactivateModal} onClose={() => setShowDeactivateModal(false)} title="Deactivate Tenant Portal Account">
        <div className="space-y-4 text-[#1E293B]">
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={18} />
            <div className="text-xs text-red-900 leading-relaxed">
              <strong>Warning:</strong> Deactivating your account will restrict online rent payments, maintenance requests, and lease downloads. Active leases remain legally binding under property management terms.
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setShowDeactivateModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold bg-white cursor-pointer">Keep Account Active</button>
            <button 
              onClick={() => {
                setShowDeactivateModal(false);
                setStatusMsg('Account deactivation request logged. Please check your email for confirmation link.');
                setTimeout(() => setStatusMsg(''), 6000);
              }} 
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold border-none cursor-pointer"
            >
              Confirm Deactivation
            </button>
          </div>
        </div>
      </Modal>

      {/* Avatar Gallery Modal */}
      <Modal isOpen={showAvatarModal} onClose={() => setShowAvatarModal(false)} title="Select Profile Avatar">
        <div className="space-y-4 text-[#1E293B]">
          <p className="text-xs text-gray-600 leading-relaxed m-0">
            Choose from professional verified resident portraits or upload directly from your device.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-80 overflow-y-auto p-1">
            {presetAvatars.map((av) => (
              <div 
                key={av.id}
                onClick={() => handleSelectPresetAvatar(av.url)}
                className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-[1.02] ${profileImg === av.url ? 'border-[#04332C] ring-2 ring-[#04332C]/30 shadow-md' : 'border-gray-200 hover:border-[#04332C]/60'}`}
              >
                <img src={av.url} alt={av.label} className="w-full h-28 object-cover" />
                <div className="p-2 bg-white text-center">
                  <p className="text-[11px] font-bold text-gray-800 truncate m-0">{av.label}</p>
                </div>
                {profileImg === av.url && (
                  <div className="absolute top-2 right-2 bg-[#04332C] text-white p-1 rounded-full shadow-sm">
                    <CheckCircle2 size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setShowAvatarModal(false);
                fileInputRef.current?.click();
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors border-none cursor-pointer flex items-center gap-2"
            >
              <Camera size={14} />
              <span>Upload Custom Photo...</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAvatarModal(false)}
              className="px-5 py-2 bg-[#04332C] text-white rounded-xl text-xs font-bold border-none cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TenantSettings;
