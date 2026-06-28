import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TenantPayRent = () => {
  const navigate = useNavigate();
  const [scheduleType, setScheduleType] = useState('now'); // 'now' | 'later'
  const [paymentMethod, setPaymentMethod] = useState('bank'); // 'bank' | 'card'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center bg-white rounded-xl p-8 border border-outline-variant card-shadow">
        <div className="w-16 h-16 bg-primary-container/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl">check_circle</span>
        </div>
        <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-2">Payment Authorized</h2>
        <p className="font-body-sm text-sm text-on-surface-variant mb-6 leading-relaxed">
          Your payment of <span className="font-data-mono font-bold text-primary">$3,250.00</span> has been successfully processed. A receipt has been dispatched to your email.
        </p>
        <div className="bg-surface rounded-lg p-4 mb-6 text-left space-y-2 text-xs border border-outline-variant/60">
          <div className="flex justify-between"><span className="text-on-surface-variant">Transaction Ref:</span><span className="font-data-mono font-bold text-on-surface">RF-PAY-{Date.now().toString().slice(-6)}</span></div>
          <div className="flex justify-between"><span className="text-on-surface-variant">Date & Time:</span><span className="font-medium text-on-surface">{new Date().toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-on-surface-variant">Payment Source:</span><span className="font-bold text-on-surface uppercase">{paymentMethod === 'bank' ? 'Bank Account (**4928)' : 'Credit Card (**1022)'}</span></div>
          <div className="flex justify-between"><span className="text-on-surface-variant">Status:</span><span className="text-primary font-bold">SETTLED</span></div>
        </div>
        <button
          onClick={() => navigate('/tenant/payments')}
          className="w-full py-3 px-6 rounded-lg bg-primary hover:opacity-90 text-on-primary font-semibold text-sm transition-all shadow-sm"
        >
          View Payment History
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-8 relative">
      
      {/* Multi-step Progress */}
      <div className="flex items-center justify-center gap-12 py-4">
        <div className="flex items-center gap-3 pb-2 border-b-2 border-primary text-primary font-normal">
          <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-normal">1</span>
          <span className="font-body-lg text-sm font-normal">Details</span>
        </div>
        <div className="w-12 h-px bg-outline-variant"></div>
        <div className="flex items-center gap-3 pb-2 border-b-2 border-transparent text-on-surface-variant font-normal">
          <span className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-sm font-normal">2</span>
          <span className="font-body-lg text-sm font-normal">Review</span>
        </div>
        <div className="w-12 h-px bg-outline-variant"></div>
        <div className="flex items-center gap-3 pb-2 border-b-2 border-transparent text-on-surface-variant font-normal">
          <span className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-sm font-normal">3</span>
          <span className="font-body-lg text-sm font-normal">Receipt</span>
        </div>
      </div>

      {/* Bento Layout Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-card-gap">
        
        {/* Left Column: Summary & Schedule (7/12 matching design lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-card-gap">
          
          {/* Payment Summary Card */}
          <section className="bg-white rounded-xl border border-outline-variant p-6 card-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline-md text-lg text-primary font-normal">Monthly Rent Summary</h3>
                <p className="text-on-surface-variant font-body-sm mt-1">6301 Elgin St. Celina, Delaware 10299</p>
              </div>
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-semibold">Active Lease</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-surface-container">
                <span className="text-on-surface-variant font-body-lg">Base Rent</span>
                <span className="font-data-mono text-primary font-semibold">$3,000.00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-surface-container">
                <span className="text-on-surface-variant font-body-lg">Utilities (Fixed)</span>
                <span className="font-data-mono text-primary font-semibold">$200.00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-surface-container">
                <span className="text-on-surface-variant font-body-lg">Parking Space #42</span>
                <span className="font-data-mono text-primary font-semibold">$50.00</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="font-headline-md text-xl text-primary">Total Rent Due</span>
                <span className="font-headline-md text-2xl text-primary">$3,250.00</span>
              </div>
            </div>
          </section>

          {/* Schedule Payment */}
          <section className="bg-white rounded-xl border border-outline-variant p-6 card-shadow">
            <h3 className="font-headline-md text-lg text-primary mb-4 font-normal">Schedule Payment</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setScheduleType('now')}
                className={`relative flex flex-col items-start p-4 rounded-lg transition-all text-left ${
                  scheduleType === 'now'
                    ? 'border-2 border-primary bg-primary-container/10'
                    : 'border border-outline-variant hover:border-primary'
                }`}
              >
                <span className={`material-symbols-outlined mb-2 ${scheduleType === 'now' ? 'text-primary [font-variation-settings:\'FILL\'_1]' : 'text-on-surface-variant'}`}>
                  bolt
                </span>
                <span className={`font-semibold ${scheduleType === 'now' ? 'text-primary' : 'text-on-surface'}`}>Pay Now</span>
                <span className="text-xs text-on-surface-variant mt-1">Process immediately</span>
                {scheduleType === 'now' && (
                  <div className="absolute top-2 right-2">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setScheduleType('later')}
                className={`relative flex flex-col items-start p-4 rounded-lg transition-all text-left ${
                  scheduleType === 'later'
                    ? 'border-2 border-primary bg-primary-container/10'
                    : 'border border-outline-variant hover:border-primary'
                }`}
              >
                <span className={`material-symbols-outlined mb-2 ${scheduleType === 'later' ? 'text-primary' : 'text-on-surface-variant'}`}>
                  calendar_today
                </span>
                <span className={`font-semibold ${scheduleType === 'later' ? 'text-primary' : 'text-on-surface'}`}>Schedule for later</span>
                <span className="text-xs text-on-surface-variant mt-1">Choose a future date</span>
                {scheduleType === 'later' && (
                  <div className="absolute top-2 right-2">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  </div>
                )}
              </button>
            </div>
          </section>

        </div>

        {/* Right Column: Methods & Action (5/12 matching design lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-card-gap">
          
          {/* Payment Method Selector */}
          <section className="bg-white rounded-xl border border-outline-variant p-6 card-shadow flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-lg text-primary font-normal">Payment Method</h3>
                <button type="button" className="text-primary text-sm font-semibold hover:underline">Add New</button>
              </div>
              
              <div className="space-y-3">
                {/* Saved Method 1 */}
                <label
                  onClick={() => setPaymentMethod('bank')}
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors group ${
                    paymentMethod === 'bank'
                      ? 'border-primary bg-primary-container/10'
                      : 'border-outline-variant hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="w-5 h-5 text-primary focus:ring-primary accent-[#00372f]"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-on-surface">Bank Account</p>
                    <p className="text-xs text-on-surface-variant">Ending in 4928 • Savings</p>
                  </div>
                  <span className={`material-symbols-outlined ${paymentMethod === 'bank' ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                    account_balance
                  </span>
                </label>

                {/* Saved Method 2 */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors group ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary-container/10'
                      : 'border-outline-variant hover:bg-surface-container-low'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-5 h-5 text-primary focus:ring-primary accent-[#00372f]"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-on-surface">Credit Card</p>
                    <p className="text-xs text-on-surface-variant">Ending in 1022 • Exp 12/26</p>
                  </div>
                  <span className={`material-symbols-outlined ${paymentMethod === 'card' ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                    credit_card
                  </span>
                </label>
              </div>
            </div>

            <div>
              {/* Security Badges */}
              <div className="mt-8 flex items-center justify-center gap-6 py-4 border-t border-surface-container">
                <div className="flex items-center gap-2 opacity-60">
                  <span className="material-symbols-outlined text-xl">verified_user</span>
                  <span className="font-label-caps text-[10px]">SSL SECURED</span>
                </div>
                <div className="flex items-center gap-2 opacity-60">
                  <span className="material-symbols-outlined text-xl">security</span>
                  <span className="font-label-caps text-[10px]">PCI COMPLIANT</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full bg-[#C75B30] hover:bg-[#b04a25] disabled:opacity-75 text-white py-4 rounded-lg font-semibold font-headline-md text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{isProcessing ? 'Processing...' : 'Confirm and Pay $3,250.00'}</span>
                  {!isProcessing && (
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  )}
                </button>
                <p className="text-center text-[10px] text-on-surface-variant mt-4 px-4 leading-normal">
                  By clicking confirm, you authorize RentFlow to initiate a one-time transaction for the amount stated above.
                </p>
              </div>
            </div>
          </section>

          {/* Map Illustration */}
          <div className="rounded-xl overflow-hidden h-40 border border-outline-variant relative">
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ds18rXTiqHsLtFJR6dkg7uFkB2utp5ySuixG3ErD9kXGaFwB2gUqPgac3Vcy2WGSawQEfGotHngTxs1_gBJTTUfnH-5PUx2dpcEueJyHg7dm_3kBnzlQs93ZjcB1lfXPrnmQJYr8s9aWcoq-oW5t3IxKITUJIlSmIewfmlYuJoG28Re2ITZQ46-iMDn8FKFNbG_gu5Y07X8I6JrpEWQpJvcBQFf5ptqkoSvP1Rr641oCD2ULMdcuxNam0_Wx49XRK317qw-IlVDM"
                alt="Property Location Map"
                className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-white/80 to-transparent">
                <span className="material-symbols-outlined text-primary text-3xl [font-variation-settings:'FILL'_1]">
                  location_on
                </span>
                <span className="font-normal text-primary mt-1">Property Location</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Visual Atmosphere: Subtle Gradient Background */}
      <div className="fixed bottom-0 right-0 -z-10 opacity-20 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="450" cy="450" r="150" fill="url(#paint0_radial_atm)" />
          <defs>
            <radialGradient id="paint0_radial_atm" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(450 450) rotate(90) scale(150)">
              <stop stopColor="#0b4f45" />
              <stop offset="1" stopColor="#0b4f45" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

    </div>
  );
};

export default TenantPayRent;

