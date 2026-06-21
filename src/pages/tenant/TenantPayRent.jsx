import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, CreditCard, Building, Lock, CheckCircle2 } from 'lucide-react';
import { getTenantProfile } from '../../services/tenantService';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';

const TenantPayRent = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const [step, setStep] = useState('checkout'); // 'checkout' | 'processing' | 'success'

  const { data: profile, isLoading } = useQuery({
    queryKey: ['tenant-profile'],
    queryFn: getTenantProfile,
  });

  if (isLoading) {
    return <div className="max-w-xl mx-auto mt-10"><ContentCardSkeleton /></div>;
  }

  // Mock calculation
  const baseRent = profile?.rentAmount || 350000;
  const serviceCharge = 25000;
  const totalAmount = baseRent + serviceCharge;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto mt-12 text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-success" />
        </div>
        <h1 className="font-display font-bold text-charcoal text-3xl mb-2">Payment Successful!</h1>
        <p className="text-muted mb-8">
          You have successfully paid {formatCurrency(totalAmount)}. A receipt has been sent to your email.
        </p>
        <Card className="text-left mb-8 bg-warm border-transparent shadow-none">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted">Transaction Ref:</span><span className="font-mono font-medium">TRX-{Date.now().toString().slice(-6)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Date:</span><span className="font-medium">{new Date().toLocaleDateString()}</span></div>
            <div className="flex justify-between"><span className="text-muted">Payment Method:</span><span className="font-medium capitalize">{method}</span></div>
          </div>
        </Card>
        <Button size="lg" className="w-full" onClick={() => navigate('/tenant/payments')}>Back to Payments</Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/tenant/payments')}
          className="p-2 hover:bg-warm rounded-full transition-colors text-muted hover:text-charcoal"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display font-bold text-2xl text-charcoal">Complete Payment</h1>
      </div>

      <Card padding={false} className="overflow-hidden border-border shadow-sm">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Order Summary */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal mb-4">Payment Summary</h2>
            <div className="bg-warm rounded-lg p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Rent ({profile?.propertyName || 'Property'})</span>
                <span className="font-mono">{formatCurrency(baseRent)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Service Charge</span>
                <span className="font-mono">{formatCurrency(serviceCharge)}</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between items-center">
                <span className="font-semibold text-charcoal">Total Due</span>
                <span className="font-display font-bold text-xl text-primary font-mono">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-lg font-semibold text-charcoal mb-4">Select Payment Method</h2>
            <div className="space-y-3">
              <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${method === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <input type="radio" name="paymentMethod" value="card" checked={method === 'card'} onChange={(e) => setMethod(e.target.value)} className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
                <CreditCard size={20} className={method === 'card' ? 'text-primary' : 'text-muted'} />
                <div className="flex-1">
                  <p className={`font-semibold ${method === 'card' ? 'text-primary' : 'text-charcoal'}`}>Pay with Card</p>
                  <p className="text-xs text-muted">Powered by Paystack</p>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${method === 'transfer' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <input type="radio" name="paymentMethod" value="transfer" checked={method === 'transfer'} onChange={(e) => setMethod(e.target.value)} className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
                <Building size={20} className={method === 'transfer' ? 'text-primary' : 'text-muted'} />
                <div className="flex-1">
                  <p className={`font-semibold ${method === 'transfer' ? 'text-primary' : 'text-charcoal'}`}>Bank Transfer</p>
                  <p className="text-xs text-muted">Direct transfer to dedicated account</p>
                </div>
              </label>
            </div>
          </div>

          {/* Pay Button */}
          <div className="pt-4">
            <Button 
              size="lg" 
              className="w-full text-lg shadow-md"
              loading={step === 'processing'}
              onClick={handlePay}
            >
              Pay {formatCurrency(totalAmount)}
            </Button>
            <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted">
              <Lock size={12} />
              <span>Payments are secure and encrypted</span>
            </div>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default TenantPayRent;
