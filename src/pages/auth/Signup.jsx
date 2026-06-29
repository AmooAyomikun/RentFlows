import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Building2, Key, Users } from 'lucide-react';
import { toast } from 'sonner';
import useAuthStore from '../../store/authStore';
import { signup, login } from '../../services/authService';
import { LogoMark } from '../../components/layout/Navbar';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const Signup = () => {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(searchParams.get('role') || 'landlord');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const switchRole = (newRole) => {
    setRole(newRole);
    reset();
  };

  const onInvalid = (errors) => {
    const firstError = Object.values(errors)[0]?.message;
    if (firstError) toast.error(firstError);
  };

  const onSubmit = async (data) => {
    try {
      const payload = { 
        ...data, 
        role, 
        confirmPassword: data.password,
        businessName: role === 'landlord' ? `${data.name} Properties` : 'Personal Tenant'
      };
      const user = await signup(payload);
      setUser(user);
      toast.success('Account created! Welcome to RentFlow.');
      const dashPath = role === 'tenant' ? '/tenant/dashboard' : '/landlord/dashboard';
      navigate(dashPath, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Could not create account. Please try again.');
    }
  };

  const handleLandlordDemo = async () => {
    try {
      toast.loading('Logging in as Landlord Demo...', { id: 'demo-signup' });
      const user = await login({ email: 'demo@landlord.com', password: 'demo123' });
      setUser(user);
      toast.success('Welcome to Landlord Demo!', { id: 'demo-signup' });
      navigate('/landlord/dashboard', { replace: true });
    } catch (err) {
      toast.error('Could not log in to demo account.', { id: 'demo-signup' });
    }
  };

  const handleTenantDemo = async () => {
    try {
      toast.loading('Logging in as Tenant Demo...', { id: 'demo-signup' });
      const user = await login({ email: 'demo@tenant.com', password: 'demo123' });
      setUser(user);
      toast.success('Welcome to Tenant Demo!', { id: 'demo-signup' });
      navigate('/tenant/dashboard', { replace: true });
    } catch (err) {
      toast.error('Could not log in to demo account.', { id: 'demo-signup' });
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden flex selection:bg-primary/10 selection:text-primary font-body bg-white">
      {/* LEFT SIDE: Brand Showcase (Dark Forest Green) */}
      <div className="hidden lg:flex lg:w-[46%] bg-[#0B4F45] h-full p-10 xl:p-14 flex-col justify-between relative overflow-hidden text-white select-none">
        {/* Ambient subtle light glow */}
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Logo */}
        <header className="relative z-10 flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2.5 focus:outline-none group">
            <LogoMark />
            <span className="font-display font-bold text-xl text-white tracking-tight group-hover:text-primary-100 transition-colors">
              RentFlow
            </span>
          </Link>
        </header>

        {/* Middle Headline */}
        <div className="my-auto py-8 relative z-10 max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-3xl xl:text-[40px] leading-[1.14] tracking-tight mb-4 text-white"
          >
            Operational agility for the modern property era.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/75 text-xs xl:text-sm leading-relaxed max-w-sm"
          >
            Standardize your portfolio, automate financial flows, and delight residents with a platform designed for scale.
          </motion.p>
        </div>

        {/* Bottom Showcase Card & Architecture BG */}
        <div className="relative z-10 mt-auto pt-6">
          <div className="absolute inset-x-0 bottom-0 h-72 overflow-hidden opacity-20 mix-blend-luminosity pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Architecture background"
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-[#07302A]/85 backdrop-blur-md p-4 shadow-xl flex items-center gap-3.5 max-w-md"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#A3E6C5] shrink-0 border border-white/5">
              <Users size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xs xl:text-sm text-white mb-0.5">
                Join 2,000+ Leaders
              </span>
              <span className="text-[11px] text-white/70 leading-normal">
                Join property professionals managing over ₦500B in African real estate assets today.
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE: Signup Form (Clean White/Pale Cream) */}
      <div className="w-full lg:w-[54%] h-full bg-[#FAF9F6] lg:bg-white flex flex-col justify-between p-6 sm:p-10 relative overflow-y-auto">
        {/* Mobile Header Navigation */}
        <div className="lg:hidden flex items-center justify-between w-full mb-4">
          <Link to="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="font-display font-bold text-base text-charcoal">RentFlow</span>
          </Link>
          <Link to="/login" className="text-xs font-bold text-primary">Sign In</Link>
        </div>

        {/* Form Container (Sleek Stitch Proportions, No Floating Overlaps) */}
        <div className="max-w-[380px] w-full mx-auto my-auto py-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal tracking-tight mb-1">
              Get Started
            </h2>
            <p className="text-muted text-xs sm:text-sm mb-5">
              Create your account to start managing your flow.
            </p>

            {/* Segmented Role Toggle */}
            <div className="mb-4">
              <span className="text-[10px] font-bold tracking-wider text-muted uppercase mb-1.5 block">
                I AM JOINING AS A
              </span>
              <div className="flex bg-[#F2F0EC] p-1 rounded-full gap-1">
                <button
                  type="button"
                  onClick={() => switchRole('landlord')}
                  className={`py-2 px-4 text-xs rounded-full transition-all flex items-center justify-center gap-1.5 select-none ${
                    role === 'landlord'
                      ? 'bg-white text-charcoal font-bold shadow-xs'
                      : 'text-muted hover:text-charcoal font-medium'
                  }`}
                >
                  Landlord
                </button>
                <button
                  type="button"
                  onClick={() => switchRole('tenant')}
                  className={`py-2 px-4 text-xs rounded-full transition-all flex items-center justify-center gap-1.5 select-none ${
                    role === 'tenant'
                      ? 'bg-white text-charcoal font-bold shadow-xs'
                      : 'text-muted hover:text-charcoal font-medium'
                  }`}
                >
                  Tenant
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-3" noValidate>
              {/* Full Name */}
              <div>
                <label htmlFor="signup-name" className={`text-[10px] font-bold tracking-wider uppercase mb-1 block ${errors.name ? 'text-red-500' : 'text-muted'}`}>
                  FULL NAME
                </label>
                <div className="relative">
                  <User size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${errors.name ? 'text-red-500' : 'text-muted/70'}`} />
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    className={`w-full h-10 pl-10 pr-3 rounded-lg border text-charcoal text-xs placeholder:text-muted/60 focus:outline-none focus:ring-2 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${errors.name ? 'border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/20' : 'border-border/80 bg-white focus:border-primary focus:ring-primary/20'}`}
                    {...register('name')}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">⚠️ {errors.name.message}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="signup-email" className={`text-[10px] font-bold tracking-wider uppercase mb-1 block ${errors.email ? 'text-red-500' : 'text-muted'}`}>
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${errors.email ? 'text-red-500' : 'text-muted/70'}`} />
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="name@company.com"
                    className={`w-full h-10 pl-10 pr-3 rounded-lg border text-charcoal text-xs placeholder:text-muted/60 focus:outline-none focus:ring-2 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${errors.email ? 'border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/20' : 'border-border/80 bg-white focus:border-primary focus:ring-primary/20'}`}
                    {...register('email')}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">⚠️ {errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="signup-password" className={`text-[10px] font-bold tracking-wider uppercase mb-1 block ${errors.password ? 'text-red-500' : 'text-muted'}`}>
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${errors.password ? 'text-red-500' : 'text-muted/70'}`} />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className={`w-full h-10 pl-10 pr-10 rounded-lg border text-charcoal text-xs placeholder:text-muted/60 focus:outline-none focus:ring-2 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${errors.password ? 'border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/20' : 'border-border/80 bg-white focus:border-primary focus:ring-primary/20'}`}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors focus:outline-none p-0.5"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">⚠️ {errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 bg-[#0B4F45] hover:bg-[#083D35] text-white font-body font-bold text-xs rounded-lg transition-all shadow-sm active:scale-[0.98] flex items-center justify-center disabled:opacity-70 mt-4"
              >
                {isSubmitting ? 'Creating account...' : 'Create Free Account'}
              </button>
            </form>

            {/* Prominent Demo Buttons (In normal flow, NO overlaps!) */}
            <div className="mt-5 pt-4 border-t border-border/60">
              <p className="text-[10px] font-bold tracking-wider text-muted uppercase text-center mb-2.5">
                OR TEST WITH INSTANT DEMO ACCOUNT
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleLandlordDemo}
                  className="h-9 bg-[#E6F4EA] hover:bg-[#d5ecd9] border border-[#1E9E6A]/30 text-[#0B4F45] rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-all shadow-2xs active:scale-[0.98]"
                >
                  <Building2 size={14} className="text-[#1E9E6A]" /> Landlord Demo
                </button>
                <button
                  type="button"
                  onClick={handleTenantDemo}
                  className="h-9 bg-[#E6F4EA] hover:bg-[#d5ecd9] border border-[#1E9E6A]/30 text-[#0B4F45] rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-all shadow-2xs active:scale-[0.98]"
                >
                  <Key size={14} className="text-[#1E9E6A]" /> Tenant Demo
                </button>
              </div>
            </div>

            {/* Terms Disclaimer */}
            <p className="text-center text-[11px] text-muted leading-relaxed mt-4">
              By signing up, you agree to our{' '}
              <Link to="/terms-of-service" className="text-charcoal font-bold hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy-policy" className="text-charcoal font-bold hover:underline">Privacy Policy</Link>.
            </p>

            {/* Bottom Login Link */}
            <p className="text-center text-xs text-muted mt-4 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-charcoal font-bold hover:text-primary hover:underline ml-1 transition-colors">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Empty placeholder for flex alignment */}
        <div className="hidden lg:block h-4" />
      </div>
    </div>
  );
};

export default Signup;
