import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock } from 'lucide-react';
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
      const user = await login(data.email, data.password);
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
      </form>

      {/* Demo shortcuts */}
      <div className="mt-6 border-t border-border pt-5">
        <p className="text-xs text-muted text-center mb-3">Quick demo access:</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              const u = await login('landlord@demo.com', 'demo123');
              setUser(u);
              navigate('/landlord/dashboard');
            }}
          >
            🏠 Landlord Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              const u = await login('tenant@demo.com', 'demo123');
              setUser(u);
              navigate('/tenant/dashboard');
            }}
          >
            🔑 Tenant Demo
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
