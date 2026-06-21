import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { resetPassword } from '../../services/authService';

const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'mock-token';
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ password }) => {
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch {
      toast.error('Invalid or expired reset link. Please request a new one.');
    }
  };

  if (done) {
    return (
      <div className="p-8 text-center">
        <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={26} className="text-success" aria-hidden="true" />
        </div>
        <h1 className="font-display font-bold text-charcoal text-xl mb-2">Password updated.</h1>
        <p className="text-muted text-sm mb-6">Your password has been changed. You can now log in with your new password.</p>
        <Button size="md" onClick={() => navigate('/login')} className="w-full">Go to login</Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-charcoal text-2xl mb-1">Reset your password.</h1>
        <p className="text-muted text-sm">Choose a new password for your account.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label="Reset password form">
        <Input
          label="New password"
          id="reset-password"
          type="password"
          placeholder="Min. 8 characters"
          required
          leftIcon={<Lock size={15} />}
          helperText="At least 8 characters"
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirm new password"
          id="reset-confirm"
          type="password"
          placeholder="Repeat your new password"
          required
          leftIcon={<Lock size={15} />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
          Reset password
        </Button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        <Link to="/forgot-password" className="text-primary hover:underline">Request a new reset link</Link>
      </p>
    </div>
  );
};

export default ResetPassword;
