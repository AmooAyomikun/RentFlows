import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/ui/Modal';

const TenantPayRent = () => {
  const navigate = useNavigate();
  const [scheduleType, setScheduleType] = useState('now'); // 'now' | 'later'
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [savedMethods, setSavedMethods] = useState([
    { id: 'bank', title: 'Bank Account', subtitle: 'Ending in 4928 • GTBank Savings', icon: 'account_balance' },
    { id: 'card', title: 'Debit Card', subtitle: 'Ending in 1022 • Mastercard Exp 12/26', icon: 'credit_card' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMethodType, setNewMethodType] = useState('bank');
  const [newBankName, setNewBankName] = useState('Zenith Bank');
  const [newAccNum, setNewAccNum] = useState('');
  const [formError, setFormError] = useState('');

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center bg-white rounded-xl p-6 border border-gray-200 card-shadow">
        <div className="w-16 h-16 bg-primary-container/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl">check_circle</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 m-0 mb-2">Payment Authorized</h1>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed m-0">
          Your payment of <span className="font-mono font-bold text-primary">₦3,250,000</span> has been successfully processed. A receipt has been dispatched to your email.
        </p>
        <div className="bg-surface rounded-lg p-4 mb-6 text-left space-y-2 text-xs border border-outline-variant/60">
          <div className="flex justify-between"><span className="text-on-surface-variant">Transaction Ref:</span><span className="font-mono font-bold text-on-surface">RF-PAY-{Date.now().toString().slice(-6)}</span></div>
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
    <div className="space-y-6 relative">
      
      {/* Multi-step Progress */}
      <div className="flex items-center justify-center gap-12 py-4">
        <div className="flex items-center gap-3 pb-2 border-b-2 border-primary text-primary font-normal">
          <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-normal">1</span>
          <span className="text-sm font-medium">Details</span>
        </div>
        <div className="w-12 h-px bg-outline-variant"></div>
        <div className="flex items-center gap-3 pb-2 border-b-2 border-transparent text-on-surface-variant font-normal">
          <span className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-sm font-normal">2</span>
          <span className="text-sm font-medium">Review</span>
        </div>
        <div className="w-12 h-px bg-outline-variant"></div>
        <div className="flex items-center gap-3 pb-2 border-b-2 border-transparent text-on-surface-variant font-normal">
          <span className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-sm font-normal">3</span>
          <span className="text-sm font-medium">Receipt</span>
        </div>
      </div>

      {/* Bento Layout Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Summary & Schedule (7/12 matching design lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Payment Summary Card */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 card-shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Monthly Rent Summary</h2>
                <p className="text-sm text-gray-600 mt-1 m-0">Victoria Island Towers, Suite 402, Lagos, Nigeria</p>
              </div>
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-semibold">Active Lease</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-surface-container">
                <span className="text-base text-[#4A4F4C]">Base Rent</span>
                <span className="font-mono text-primary font-semibold">₦3,000,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-surface-container">
                <span className="text-base text-[#4A4F4C]">Utilities (Fixed)</span>
                <span className="font-mono text-primary font-semibold">₦200,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-surface-container">
                <span className="text-base text-[#4A4F4C]">Parking Space #42</span>
                <span className="font-mono text-primary font-semibold">₦50,000</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-bold text-gray-900">Total Rent Due</span>
                <span className="text-2xl font-bold text-primary">₦3,250,000</span>
              </div>
            </div>
          </section>

          {/* Schedule Payment */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 card-shadow">
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-4 m-0">Schedule Payment</h2>
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
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Payment Method Selector */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 card-shadow flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Payment Method</h2>
                <button type="button" onClick={() => setShowAddModal(true)} className="text-primary text-sm font-semibold hover:underline cursor-pointer">Add New</button>
              </div>
              
              <div className="space-y-3">
                {savedMethods.map(method => (
                  <label
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors group ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary-container/10'
                        : 'border-outline-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="w-5 h-5 text-primary focus:ring-primary accent-[#00372f]"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-on-surface">{method.title}</p>
                      <p className="text-xs text-on-surface-variant">{method.subtitle}</p>
                    </div>
                    <span className={`material-symbols-outlined ${paymentMethod === method.id ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                      {method.icon}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              {/* Security Badges */}
              <div className="mt-8 flex items-center justify-center gap-6 py-4 border-t border-surface-container">
                <div className="flex items-center gap-2 opacity-60">
                  <span className="material-symbols-outlined text-xl">verified_user</span>
                  <span className="text-[10px] font-bold">SSL SECURED</span>
                </div>
                <div className="flex items-center gap-2 opacity-60">
                  <span className="material-symbols-outlined text-xl">security</span>
                  <span className="text-[10px] font-bold">PCI COMPLIANT</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full bg-[#C75B30] hover:bg-[#b04a25] disabled:opacity-75 text-white py-4 rounded-lg font-semibold text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{isProcessing ? 'Processing...' : 'Confirm and Pay ₦3,250,000'}</span>
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

      {/* Add New Payment Method Modal */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setNewAccNum(''); setFormError(''); }} title="Add Payment Method">
        {formError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100 font-medium">
            {formError}
          </div>
        )}
        <div className="space-y-4 text-left">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Method Type</label>
            <select value={newMethodType} onChange={e => setNewMethodType(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none">
              <option value="bank">Bank Account (NUBAN)</option>
              <option value="card">Debit / Credit Card</option>
            </select>
          </div>
          {newMethodType === 'bank' ? (
            <>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Select Bank</label>
                <select value={newBankName} onChange={e => setNewBankName(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none">
                  <option value="Zenith Bank">Zenith Bank Plc</option>
                  <option value="GTBank">Guaranty Trust Bank (GTCO)</option>
                  <option value="Access Bank">Access Bank Plc</option>
                  <option value="UBA">United Bank for Africa (UBA)</option>
                  <option value="First Bank">First Bank of Nigeria</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">10-Digit Account Number</label>
                <input type="text" maxLength={10} placeholder="0123456789" value={newAccNum} onChange={e => setNewAccNum(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Card Number</label>
                <input type="text" placeholder="5399 •••• •••• ••••" value={newAccNum} onChange={e => setNewAccNum(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase block mb-1">CVV</label>
                  <input type="password" maxLength={4} placeholder="123" className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none" />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-3 mt-6 justify-end">
          <button onClick={() => { setShowAddModal(false); setNewAccNum(''); setFormError(''); }} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer bg-transparent">Cancel</button>
          <button onClick={() => {
            if (!newAccNum || newAccNum.length < 4) {
              setFormError('Please enter a valid account or card number (min 4 characters).');
              return;
            }
            const last4 = newAccNum.slice(-4);
            const newId = `method-${Date.now()}`;
            const newObj = newMethodType === 'bank' 
              ? { id: newId, title: 'Bank Account', subtitle: `Ending in ${last4} • ${newBankName}`, icon: 'account_balance' }
              : { id: newId, title: 'Debit Card', subtitle: `Ending in ${last4} • Mastercard`, icon: 'credit_card' };
            setSavedMethods(prev => [...prev, newObj]);
            setPaymentMethod(newId);
            setShowAddModal(false);
            setNewAccNum('');
            setFormError('');
          }} className="px-5 py-2 bg-[#072F29] text-white rounded-xl text-xs font-bold hover:bg-[#051f1b] cursor-pointer border-none">Save Method</button>
        </div>
      </Modal>

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

