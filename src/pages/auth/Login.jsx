import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Building2, Key, TrendingUp, LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';
import useAuthStore from '../../store/authStore';
import { login } from '../../services/authService';
import { LogoMark } from '../../components/layout/Navbar';

const schema = z.object({
  email: z.string().min(1, 'Email address is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthStore();
  const from = location.state?.from?.pathname;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onInvalid = (errors) => {
    const firstError = Object.values(errors)[0]?.message;
    if (firstError) toast.error(firstError);
  };

  const onSubmit = async (data) => {
    try {
      const user = await login({ email: data.email, password: data.password });
      setUser(user);
      toast.success(`Welcome back, ${user.name?.split(' ')[0]}!`);
      const dashPath = user.role === 'tenant' ? '/tenant/dashboard' : '/landlord/dashboard';
      navigate(from || dashPath, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Invalid credentials. Please try again.');
    }
  };

  const handleLandlordDemo = async () => {
    try {
      toast.loading('Logging in as Landlord Demo...', { id: 'demo-login' });
      const user = await login({ email: 'demo@landlord.com', password: 'demo123' });
      setUser(user);
      toast.success('Welcome to Landlord Demo!', { id: 'demo-login' });
      navigate('/landlord/dashboard', { replace: true });
    } catch (err) {
      toast.error('Could not log in to demo account.', { id: 'demo-login' });
    }
  };

  const handleTenantDemo = async () => {
    try {
      toast.loading('Logging in as Tenant Demo...', { id: 'demo-login' });
      const user = await login({ email: 'demo@tenant.com', password: 'demo123' });
      setUser(user);
      toast.success('Welcome to Tenant Demo!', { id: 'demo-login' });
      navigate('/tenant/dashboard', { replace: true });
    } catch (err) {
      toast.error('Could not log in to demo account.', { id: 'demo-login' });
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden flex selection:bg-primary/10 selection:text-primary font-body bg-white">
      {/* LEFT SIDE: Login Form (Clean White/Pale Cream) */}
      <div className="w-full lg:w-[54%] bg-[#FAF9F6] lg:bg-white h-full flex flex-col justify-between p-6 sm:p-10 relative overflow-y-auto">
        {/* Header Navigation */}
        <header className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center gap-2 focus:outline-none group">
            <LogoMark />
            <span className="font-display font-bold text-lg text-charcoal group-hover:text-primary transition-colors">
              RentFlow
            </span>
          </Link>
          <div className="text-xs text-muted font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="text-charcoal font-bold hover:text-primary hover:underline ml-1 transition-colors">
              Create an account
            </Link>
          </div>
        </header>

        {/* Center Content / Form (Sleek Stitch Proportions, No Floating Overlaps) */}
        <div className="max-w-[380px] w-full mx-auto my-auto py-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-charcoal tracking-tight mb-1">
              Welcome back
            </h1>
            <p className="text-muted text-xs sm:text-sm mb-6">
              Enter your credentials to manage your portfolio.
            </p>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-3.5" noValidate>
              {/* Email Input */}
              <div>
                <label htmlFor="login-email" className={`text-[10px] font-bold tracking-wider uppercase mb-1 block ${errors.email ? 'text-red-500' : 'text-muted'}`}>
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${errors.email ? 'text-red-500' : 'text-muted/70'}`} />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="name@company.com"
                    className={`w-full h-10 pl-10 pr-3 rounded-lg border text-charcoal text-xs placeholder:text-muted/60 focus:outline-none focus:ring-2 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${errors.email ? 'border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/20' : 'border-border/80 bg-white focus:border-primary focus:ring-primary/20'}`}
                    {...register('email')}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[11px] mt-1 font-medium flex items-center gap-1">⚠️ {errors.email.message}</p>}
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="login-password" className={`text-[10px] font-bold tracking-wider uppercase ${errors.password ? 'text-red-500' : 'text-muted'}`}>
                    PASSWORD
                  </label>
                  <Link to="/forgot-password" className="text-[11px] font-bold text-charcoal hover:text-primary transition-colors">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${errors.password ? 'text-red-500' : 'text-muted/70'}`} />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
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
                className="w-full h-10 bg-[#0B4F45] hover:bg-[#083D35] text-white font-body font-bold text-xs rounded-lg transition-all shadow-sm active:scale-[0.98] flex items-center justify-center disabled:opacity-70 mt-5"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Social Login Divider */}
            <div className="flex items-center gap-3 my-4 select-none">
              <div className="flex-1 h-px bg-border/80" />
              <span className="text-[9px] font-bold tracking-wider text-muted uppercase">OR CONTINUE WITH</span>
              <div className="flex-1 h-px bg-border/80" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => alert('Continuing with Google...')}
                className="h-9 bg-white border border-border/80 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-[0.98] text-xs font-bold text-charcoal transition-all shadow-2xs"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Continuing with Apple...')}
                className="h-9 bg-white border border-border/80 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-[0.98] text-xs font-bold text-charcoal transition-all shadow-2xs"
              >
                <LayoutGrid size={13} className="text-charcoal" />
                <span>Apple</span>
              </button>
            </div>

            {/* Prominent Demo Login Shortcuts (In normal flow, NO overlaps!) */}
            <div className="mt-5 pt-4 border-t border-border/60">
              <p className="text-[10px] font-bold tracking-wider text-muted uppercase text-center mb-2.5">
                OR TEST WITH INSTANT DEMO LOGIN
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
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <footer className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-border/40 text-[10px] text-muted font-medium gap-2">
          <div>© 2024 RentFlow. Simplified.</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-charcoal transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-charcoal transition-colors">Terms</Link>
          </div>
        </footer>
      </div>

      {/* RIGHT SIDE: Visual Showcase (Forest Green Background) */}
      <div className="hidden lg:flex lg:w-[46%] bg-[#0B4F45] h-full p-10 xl:p-14 flex-col justify-between relative overflow-hidden text-white select-none">
        {/* Ambient light glow */}
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Graphics / Mockup Area */}
        <div className="relative z-10 my-auto w-full max-w-md mx-auto py-6">
          {/* Top Left Annual Yield Badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -top-4 -left-4 z-20 bg-[#12423A]/90 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 shadow-xl flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[#A3E6C5] text-[#0B4F45] flex items-center justify-center shrink-0">
              <TrendingUp size={18} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col pr-1">
              <span className="text-[10px] text-white/70 font-medium leading-none mb-1">Annual Yield</span>
              <span className="font-display font-bold text-base text-white leading-none">+12.4%</span>
            </div>
            {/* Vertical Bar simulation */}
            <div className="flex items-end gap-1 h-6 pl-2 border-l border-white/10">
              <div className="w-1 bg-[#A3E6C5] h-full rounded-full" />
              <div className="w-1 bg-[#A3E6C5]/70 h-3/4 rounded-full" />
              <div className="w-1 bg-[#F2994A] h-4/5 rounded-full" />
            </div>
          </motion.div>

          {/* Center Mockup Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative bg-[#07302A]"
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
              alt="Dashboard Analytics Preview"
              className="w-full h-72 object-cover opacity-80 mix-blend-luminosity scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B4F45] via-transparent to-transparent opacity-90" />
          </motion.div>

          {/* Bottom Right Testimonial Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -bottom-6 -right-2 z-20 max-w-[280px] bg-[#12423A]/85 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-xl"
          >
            <p className="font-display italic font-bold text-xs xl:text-sm leading-snug mb-2 text-white">
              "RentFlow transformed our pan-African operations."
            </p>
            <p className="text-[10px] text-white/70 font-medium leading-relaxed">
              COO, Apex Real Estate
            </p>
          </motion.div>
        </div>

        {/* Headline at Bottom */}
        <div className="relative z-10 mt-auto pt-10">
          <h2 className="font-display font-bold text-2xl xl:text-3xl leading-[1.15] tracking-tight mb-2.5 text-white">
            Managing #15B in rent for Africa's leading landlords.
          </h2>
          <p className="text-white/75 text-xs xl:text-sm leading-relaxed max-w-sm">
            Join the 2,400+ asset managers who trust RentFlow for precision-engineered operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
