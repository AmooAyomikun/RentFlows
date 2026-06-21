import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Building2, Key } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuthStore from '../../store/authStore';
import { login } from '../../services/authService';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthStore();
  const from = location.state?.from?.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-charcoal text-2xl mb-1">Welcome back.</h1>
        <p className="text-muted text-sm">Log in to your RentFlow account.</p>
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
          Continue with Google
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-muted">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate aria-label="Login form">
        <Input
          label="Email address"
          id="login-email"
          type="email"
          placeholder="you@example.com"
          required
          leftIcon={<Mail size={15} />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          id="login-password"
          type="password"
          placeholder="Your password"
          required
          leftIcon={<Lock size={15} />}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
          Log in
        </Button>
        <p className="text-center text-xs text-muted mt-2">
          No credit card required · 14-day free trial
        </p>
      </form>

      {/* Demo shortcuts */}
      <div className="mt-6 border-t border-border pt-5">
        <p className="text-xs text-muted text-center mb-3">Quick demo access:</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Building2 size={16} />}
            onClick={async () => {
              const u = await login({ email: 'demo@landlord.com', password: 'demo123' });
              setUser(u);
              navigate('/landlord/dashboard');
            }}
          >
            Landlord Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Key size={16} />}
            onClick={async () => {
              const u = await login({ email: 'demo@tenant.com', password: 'demo123' });
              setUser(u);
              navigate('/tenant/dashboard');
            }}
          >
            Tenant Demo
          </Button>
        </div>
      </div>

      <p className="text-center text-sm text-muted mt-6">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary font-medium hover:underline">Sign up free</Link>
      </p>
    </div>
  );
};

export default Login;
