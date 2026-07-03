import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, Building2, Calendar, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import useAuthStore from '../../store/authStore';
import { LogoMark } from '../../components/layout/Navbar';

// Mock invite data keyed by token
const mockInvites = {
  'default': {
    landlordName: 'Adeleke & Co. Properties',
    landlordAvatar: 'AC',
    propertyName: 'Victoria Island Towers',
    unitLabel: 'Suite 402-B',
    rentAmount: '₦3,250,000',
    dueDay: '1st of every month',
    leaseStart: 'Jul 1, 2026',
    leaseEnd: 'Jun 30, 2027',
    tenantEmail: 'tenant@example.com',
  }
};

const schema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const PasswordStrength = ({ password }) => {
  const checks = [
    { label: '8+ characters', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /[0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ['bg-red-400', 'bg-amber-400', 'bg-emerald-400'];
  const labels = ['Weak', 'Fair', 'Strong'];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : 'bg-gray-200'}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-bold ${score === 0 ? 'text-gray-400' : score === 1 ? 'text-red-500' : score === 2 ? 'text-amber-500' : 'text-emerald-600'}`}>
          {password ? labels[score - 1] || 'Weak' : ''}
        </span>
        <div className="flex gap-2">
          {checks.map(c => (
            <span key={c.label} className={`text-[10px] font-medium ${c.pass ? 'text-emerald-600' : 'text-gray-400'}`}>
              {c.pass ? '✓' : '○'} {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const InviteAcceptance = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [step, setStep] = useState('preview'); // 'preview' | 'password' | 'success'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  // Get invite data (fallback to default for demo)
  const invite = mockInvites[token] || mockInvites['default'];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ resolver: zodResolver(schema) });

  const passwordWatch = watch('password', '');

  const onSubmit = async () => {
    // Simulate account creation delay
    await new Promise(r => setTimeout(r, 1200));
    setStep('success');
    toast.success('Welcome to RentFlow! Your account is ready.');
  };

  const handleContinueToDashboard = () => {
    // Mock login as tenant
    setUser({
      id: 'tenant-demo',
      name: 'Ayomikun Adeleke',
      email: invite.tenantEmail,
      role: 'tenant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    });
    navigate('/tenant/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Header */}
      <div className="w-full max-w-lg mb-6 flex items-center justify-center gap-3">
        <LogoMark />
        <span className="font-display font-bold text-xl text-[#0B4F45]">RentFlow</span>
      </div>

      <AnimatePresence mode="wait">
        {/* ── STEP 1: Preview Lease & Property ── */}
        {step === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg"
          >
            {/* Invite Header */}
            <div className="bg-[#0B4F45] text-white rounded-t-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                {invite.landlordAvatar}
              </div>
              <p className="text-sm text-white/70 mb-1">You've been invited by</p>
              <h1 className="text-xl font-display font-bold text-white">{invite.landlordName}</h1>
              <p className="text-sm text-white/60 mt-1">to join their property management portal</p>
            </div>

            {/* Lease Preview Card */}
            <div className="bg-white border border-[#E5E1DA] rounded-b-2xl p-6 shadow-sm space-y-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8F8B] mb-3">Your Tenancy Details</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5E1DA]">
                    <Building2 size={18} className="text-[#0B4F45] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#8A8F8B] font-semibold">Property & Unit</p>
                      <p className="text-sm font-bold text-[#1B1F1D]">{invite.propertyName} — {invite.unitLabel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5E1DA]">
                    <CreditCard size={18} className="text-[#C75B30] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#8A8F8B] font-semibold">Monthly Rent</p>
                      <p className="text-sm font-bold text-[#1B1F1D] font-mono">{invite.rentAmount} <span className="font-sans font-normal text-[#8A8F8B] text-xs">due on {invite.dueDay}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5E1DA]">
                    <Calendar size={18} className="text-[#3B7DD8] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#8A8F8B] font-semibold">Lease Period</p>
                      <p className="text-sm font-bold text-[#1B1F1D]">{invite.leaseStart} → {invite.leaseEnd}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <strong>Safe & secure.</strong> RentFlow encrypts all your data and receipts. Your payment information is never shared without consent.
                </p>
              </div>

              <button
                onClick={() => setStep('password')}
                className="w-full py-3.5 bg-[#0B4F45] hover:bg-[#083D35] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] border-none cursor-pointer"
              >
                <span>Accept & Set Up My Account</span>
                <ArrowRight size={18} />
              </button>

              <p className="text-center text-[11px] text-[#8A8F8B]">
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="text-[#0B4F45] font-bold hover:underline bg-transparent border-none cursor-pointer">
                  Sign in instead
                </button>
              </p>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Set Password ── */}
        {step === 'password' && (
          <motion.div
            key="password"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg"
          >
            <div className="bg-white border border-[#E5E1DA] rounded-2xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-[#FAF7F2] border-b border-[#E5E1DA] p-6 text-center">
                <h2 className="font-display font-bold text-xl text-[#0B4F45]">Create your password</h2>
                <p className="text-sm text-[#4A4F4C] mt-1">Set a secure password for your RentFlow account</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                {/* Account Email (read-only) */}
                <div>
                  <label className="text-[10px] font-bold text-[#8A8F8B] uppercase tracking-wider block mb-1.5">Account Email</label>
                  <div className="h-11 px-3.5 rounded-xl border border-[#E5E1DA] bg-[#FAF7F2] flex items-center text-sm text-[#4A4F4C] font-medium">
                    {invite.tenantEmail}
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="invite-password" className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${errors.password ? 'text-red-500' : 'text-[#8A8F8B]'}`}>
                    New Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${errors.password ? 'text-red-500' : 'text-[#8A8F8B]'}`} />
                    <input
                      id="invite-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      className={`w-full h-11 pl-10 pr-10 rounded-xl border text-[#1B1F1D] text-sm placeholder:text-[#8A8F8B]/60 focus:outline-none focus:ring-2 transition-all ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/10' : 'border-[#E5E1DA] focus:border-[#0B4F45] focus:ring-[#0B4F45]/20 bg-white'}`}
                      {...register('password', {
                        onChange: (e) => setPasswordValue(e.target.value)
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8F8B] hover:text-[#1B1F1D] transition-colors cursor-pointer border-none bg-transparent"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <PasswordStrength password={passwordWatch} />
                  {errors.password && <p className="text-red-500 text-[11px] mt-1.5 font-medium">⚠ {errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="invite-confirm" className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${errors.confirmPassword ? 'text-red-500' : 'text-[#8A8F8B]'}`}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${errors.confirmPassword ? 'text-red-500' : 'text-[#8A8F8B]'}`} />
                    <input
                      id="invite-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      className={`w-full h-11 pl-10 pr-10 rounded-xl border text-[#1B1F1D] text-sm placeholder:text-[#8A8F8B]/60 focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/10' : 'border-[#E5E1DA] focus:border-[#0B4F45] focus:ring-[#0B4F45]/20 bg-white'}`}
                      {...register('confirmPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8F8B] hover:text-[#1B1F1D] transition-colors cursor-pointer border-none bg-transparent"
                    >
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-[11px] mt-1.5 font-medium">⚠ {errors.confirmPassword.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#0B4F45] hover:bg-[#083D35] disabled:opacity-60 text-white font-bold rounded-xl transition-all active:scale-[0.98] border-none cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Accept &amp; Continue</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('preview')}
                  className="w-full py-2.5 text-sm font-medium text-[#4A4F4C] hover:text-[#0B4F45] transition-colors border-none bg-transparent cursor-pointer"
                >
                  ← Back to invite details
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Success ── */}
        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg"
          >
            <div className="bg-white border border-[#E5E1DA] rounded-2xl shadow-sm overflow-hidden text-center">
              <div className="bg-[#0B4F45] p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle size={40} className="text-[#0B4F45]" />
                </motion.div>
              </div>

              <div className="p-8 space-y-4">
                <h2 className="font-display font-bold text-2xl text-[#0B4F45]">You're all set! 🎉</h2>
                <p className="text-sm text-[#4A4F4C] leading-relaxed">
                  Welcome to <strong className="text-[#0B4F45]">RentFlow</strong>. Your account has been created and linked to your lease at{' '}
                  <strong>{invite.propertyName}</strong>.
                </p>

                <div className="flex flex-col gap-3 p-4 bg-[#FAF7F2] rounded-xl border border-[#E5E1DA] text-left">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#4A4F4C]">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" /> View your lease agreement
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#4A4F4C]">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" /> Pay rent online in seconds
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#4A4F4C]">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" /> Download payment receipts
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#4A4F4C]">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0" /> Log maintenance requests
                  </div>
                </div>

                <button
                  onClick={handleContinueToDashboard}
                  className="w-full py-4 bg-[#0B4F45] hover:bg-[#083D35] text-white font-bold rounded-xl transition-all active:scale-[0.98] border-none cursor-pointer flex items-center justify-center gap-2 shadow-sm text-base"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 text-center text-[11px] text-[#8A8F8B]">
        © 2026 RentFlow •{' '}
        <button onClick={() => navigate('/privacy-policy')} className="hover:text-[#0B4F45] underline bg-transparent border-none cursor-pointer">Privacy</button>
        {' '}•{' '}
        <button onClick={() => navigate('/terms-of-service')} className="hover:text-[#0B4F45] underline bg-transparent border-none cursor-pointer">Terms</button>
      </p>
    </div>
  );
};

export default InviteAcceptance;
