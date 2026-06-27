import { useState } from 'react';
import { toast } from 'sonner';
import { 
  Edit2, Camera, Shield, ShieldCheck, CheckCircle2, Plus, 
  Phone, ChevronDown, Check, Lock, Key
} from 'lucide-react';

const TenantSettings = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [biometric, setBiometric] = useState(true);

  return (
    <div className="space-y-6 w-full text-[#1E293B] pb-8">
      {/* Title Section */}
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-[#1E293B] tracking-tight">
          Profile Settings
        </h1>
      </div>

      {/* Main 2-Column vs 1-Column Grid Layout matching exact mockup aspect ratios */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (Takes up 2 spans on desktop) */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="font-black text-base text-[#1E293B] font-display">Personal Information</h2>
              <button 
                onClick={() => toast.info('Opening profile editor...')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-black transition-colors cursor-pointer"
              >
                <Edit2 size={14} />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-start gap-6">
              {/* Profile Photo with Camera Badge */}
              <div className="relative shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" 
                  alt="Alexander Rivera" 
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-[#E6F2EF] shadow-2xs" 
                />
                <button 
                  onClick={() => toast.info('Change profile photo')}
                  className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-[#04332C] hover:bg-[#064e43] text-white rounded-full flex items-center justify-center shadow-sm transition-all cursor-pointer ring-2 ring-white"
                  aria-label="Upload photo"
                >
                  <Camera size={13} />
                </button>
              </div>

              {/* Data Fields Grid */}
              <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 w-full">
                <div>
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">FULL NAME</span>
                  <span className="text-base font-black text-[#1E293B] mt-0.5 block font-display">Alexander Rivera</span>
                </div>

                <div>
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">PREFERRED NAME</span>
                  <span className="text-base font-semibold text-gray-700 mt-0.5 block">Alex</span>
                </div>

                <div className="min-w-0">
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">EMAIL ADDRESS</span>
                  <span className="text-sm font-bold text-[#1E293B] mt-0.5 block truncate">alex.rivera@example.com</span>
                </div>

                <div>
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">PHONE NUMBER</span>
                  <span className="text-sm font-bold text-[#1E293B] mt-0.5 block font-mono">+1 (555) 123-4567</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">PRIMARY ADDRESS</span>
                  <span className="text-sm font-bold text-[#1E293B] mt-0.5 block">1224 Oakwood Heights, Apt 4C, San Francisco, CA 94107</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Verification Side-by-Side Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            
            {/* Password & Access Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                  <Shield size={18} strokeWidth={2.2} />
                </div>
                <h3 className="font-black text-sm text-[#1E293B] font-display">Password & Access</h3>
              </div>

              <div className="space-y-4 pt-2 divide-y divide-gray-100">
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="font-extrabold text-xs sm:text-sm text-[#1E293B]">Password</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Last updated 3 months ago</p>
                  </div>
                  <button 
                    onClick={() => toast.info('Opening password change modal...')}
                    className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shrink-0 ml-2"
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
                      toast.success(`Biometric login ${!biometric ? 'enabled' : 'disabled'}`);
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
            <div className="bg-[#04332C] text-white rounded-xl p-6 shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#FF8C5A] shrink-0">
                  <ShieldCheck size={18} strokeWidth={2.2} />
                </div>
                <h3 className="font-black text-sm text-white font-display">Verification</h3>
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
                  onClick={() => toast.info('Managing recovery codes...')}
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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-[#1E293B] font-display">Emergency Contacts</h3>
              <button 
                onClick={() => toast.info('Adding emergency contact...')}
                className="text-gray-500 hover:text-black transition-colors cursor-pointer p-1"
                aria-label="Add emergency contact"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {/* Contact 1 */}
              <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-3.5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#E6F2EF] text-[#04332C] font-black text-xs flex items-center justify-center shrink-0">
                  ES
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-black text-sm text-[#1E293B] leading-tight">Elena Rivera</h4>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">Spouse</p>
                  <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-gray-700 mt-1">
                    <Phone size={11} className="text-gray-400 shrink-0" />
                    <span>+1 (555) 987-6543</span>
                  </div>
                </div>
              </div>

              {/* Contact 2 */}
              <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-3.5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#FEE2E2] text-[#9B3A0E] font-black text-xs flex items-center justify-center shrink-0">
                  MR
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-black text-sm text-[#1E293B] leading-tight">Marcus Reed</h4>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">Father</p>
                  <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-gray-700 mt-1">
                    <Phone size={11} className="text-gray-400 shrink-0" />
                    <span>+1 (555) 234-5678</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portal Preferences Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h3 className="font-black text-base text-[#1E293B] font-display">Portal Preferences</h3>

            <div>
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">LANGUAGE</label>
              <div className="relative">
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#04332C]/20 cursor-pointer">
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Spanish (ES)</option>
                  <option value="fr-FR">French (FR)</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="pt-1">
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-3">NOTIFICATION CHANNELS</label>
              <div className="space-y-3">
                <label 
                  onClick={() => setEmailNotifs(!emailNotifs)}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${emailNotifs ? 'bg-[#04332C] text-white' : 'border border-gray-300 bg-white'}`}>
                    {emailNotifs && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="text-xs font-bold text-gray-700">Email Notifications</span>
                </label>

                <label 
                  onClick={() => setSmsNotifs(!smsNotifs)}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${smsNotifs ? 'bg-[#04332C] text-white' : 'border border-gray-300 bg-white'}`}>
                    {smsNotifs && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="text-xs font-bold text-gray-700">SMS Alerts</span>
                </label>

                <label 
                  onClick={() => setPushNotifs(!pushNotifs)}
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
          <div className="bg-[#33665C] text-white rounded-xl p-6 shadow-md space-y-4">
            <h3 className="font-black text-base text-white font-display">Profile Strength</h3>

            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-[#FF8C5A] rounded-full transition-all duration-500" />
            </div>

            <p className="text-xs text-white/90 font-medium leading-relaxed">
              You're almost there! Add a secondary payment method to reach 100% profile completeness.
            </p>

            <button 
              onClick={() => toast.success('Redirecting to payment methods setup...')}
              className="w-full py-2.5 rounded-xl bg-[#437A70] hover:bg-[#4f8d82] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer text-center block mt-1"
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
            <h3 className="font-black text-base text-[#DC2626] font-display">Privacy & Data</h3>
            <p className="text-xs text-gray-600 font-medium mt-1 leading-relaxed">
              Manage how your personal data is handled or request an account deactivation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
            <button 
              onClick={() => toast.info('Preparing your personal data export...')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-extrabold text-xs tracking-wider uppercase transition-all shadow-2xs cursor-pointer whitespace-nowrap"
            >
              Export Data
            </button>
            <button 
              onClick={() => toast.error('Account deactivation requested. Please check your email to confirm.')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#b91c1c] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              Deactivate Account
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TenantSettings;
