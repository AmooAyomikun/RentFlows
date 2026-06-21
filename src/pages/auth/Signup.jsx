import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Mail, Lock, Building2 } from 'lucide-react';
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
              'flex-1 py-2.5 text-sm font-semibold rounded transition-all',
              role === r ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-charcoal',
            ].join(' ')}
          >
            {r === 'landlord' ? '🏠 I\'m a Landlord' : '🔑 I\'m a Tenant'}
          </button>
        ))}
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
