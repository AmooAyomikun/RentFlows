import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const VerifyEmail = () => {
  return (
    <div className="p-8 md:p-12 text-center max-w-sm mx-auto">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail size={32} className="text-primary" />
      </div>
      
      <h1 className="font-display font-bold text-charcoal text-2xl mb-2">Check your email</h1>
      <p className="text-muted text-sm mb-8">
        We've sent a verification link to your email address. Please click the link to activate your account.
      </p>

      <div className="space-y-4">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={() => window.open('https://mail.google.com', '_blank')}
        >
          Open Mail App
        </Button>
        <p className="text-xs text-muted">
          Didn't receive the email? <button className="text-primary hover:underline font-medium">Click to resend</button>
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <Link to="/login" className="text-sm font-medium text-muted hover:text-charcoal transition-colors flex items-center justify-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to log in
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
