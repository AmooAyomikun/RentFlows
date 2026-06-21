import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { forgotPassword } from '../../services/authService';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
});

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email }) => {
    try {
      await forgotPassword(email);
      setSentEmail(email);
      setSent(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  if (sent) {
    return (
      <div className="p-8 text-center">
        <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={26} className="text-success" aria-hidden="true" />
        </div>
        <h1 className="font-display font-bold text-charcoal text-xl mb-2">Check your inbox.</h1>
        <p className="text-muted text-sm mb-6">
          We've sent a password reset link to <strong className="text-charcoal">{sentEmail}</strong>.
          It expires in 30 minutes.
        </p>
        <p className="text-xs text-muted">
          Didn't get it?{' '}
          <button onClick={() => setSent(false)} className="text-primary hover:underline">Try again</button>
        </p>
        <div className="mt-6 border-t border-border pt-5">
          <Link to="/login" className="text-sm text-primary hover:underline">← Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-charcoal text-2xl mb-1">Forgot your password?</h1>
        <p className="text-muted text-sm">Enter your email and we'll send a reset link.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label="Password reset request form">
        <Input
          label="Email address"
          id="forgot-email"
          type="email"
          placeholder="you@example.com"
          required
          leftIcon={<Mail size={15} />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
          Send reset link
        </Button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        Remember it?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
