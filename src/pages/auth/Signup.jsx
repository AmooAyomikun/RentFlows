import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Mail, Lock, Building2, Key } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import useAuthStore from '../../store/authStore';
import { signup } from '../../services/authService';

const landlordSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  businessName: z.string().min(2, 'Business/property name is required'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const tenantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const Signup = () => {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(searchParams.get('role') || 'landlord');
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const schema = role === 'landlord' ? landlordSchema : tenantSchema;

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

  const onSubmit = async (data) => {
    try {
      const user = await signup({ ...data, role });
      setUser(user);
      toast.success('Account created! Welcome to RentFlow.');
      const dashPath = role === 'tenant' ? '/tenant/dashboard' : '/landlord/dashboard';
      navigate(dashPath);
    } catch (err) {
      toast.error(err.message || 'Could not create account. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-charcoal text-2xl mb-1">Create your account.</h1>
        <p className="text-muted text-sm">14-day free trial. No card required.</p>
      </div>

      {/* Role toggle */}
      <div className="flex bg-warm border border-border rounded-lg p-1 gap-1 mb-6" role="group" aria-label="Account type">
        {['landlord', 'tenant'].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => switchRole(r)}
            aria-pressed={role === r}
            className={[
              'flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded transition-all',
              role === r ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-charcoal',
            ].join(' ')}
          >
            {r === 'landlord' ? <><Building2 size={16} /> I'm a Landlord</> : <><Key size={16} /> I'm a Tenant</>}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <Button variant="outline" size="lg" className="w-full" leftIcon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        }>
          Sign up with Google
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-muted">Or sign up with email</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.form
          key={role}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
          aria-label={`${role} signup form`}
        >
          <Input
            label="Full name"
            id="signup-name"
            type="text"
            placeholder="Chukwuma Obi"
            required
            leftIcon={<User size={15} />}
            error={errors.name?.message}
            {...register('name')}
          />

          {role === 'landlord' && (
            <Input
              label="Business / property name"
              id="signup-business"
              type="text"
              placeholder="Obi Properties"
              required
              leftIcon={<Building2 size={15} />}
              error={errors.businessName?.message}
              {...register('businessName')}
            />
          )}

          <Input
            label="Email address"
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            required
            leftIcon={<Mail size={15} />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            id="signup-password"
            type="password"
            placeholder="Min. 8 characters"
            required
            leftIcon={<Lock size={15} />}
            helperText="At least 8 characters"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm password"
            id="signup-confirm"
            type="password"
            placeholder="Repeat your password"
            required
            leftIcon={<Lock size={15} />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <p className="text-xs text-muted">
            By creating an account, you agree to our{' '}
            <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>

          <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
            Create account
          </Button>
        </motion.form>
      </AnimatePresence>

      <p className="text-center text-sm text-muted mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
