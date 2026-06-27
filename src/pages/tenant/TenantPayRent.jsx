import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard, Building, Lock, CheckCircle2, Zap, Calendar,
  ArrowRight, MapPin, ShieldCheck
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

/**
 * TenantPayRent — Redesigned pixel-perfect to match Screenshot 1 (Pay Rent)
 * Features Stepper, Rent Breakdown, Schedule Selection, Method Selector, and Map preview.
 */
const TenantPayRent = () => {
  const navigate = useNavigate();
  const [scheduleType, setScheduleType] = useState('now'); // 'now' | 'later'
  const [method, setMethod] = useState('bank'); // 'bank' | 'card'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Localized Nigerian values matching the $3,250.00 total due
  const baseRent = 3000000;
  const utilities = 200000;
  const parking = 50000;
  const totalAmount = baseRent + utilities + parking;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1800);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl">
        <div className="w-20 h-20 bg-[#072F29]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={44} className="text-[#072F29]" />
        </div>
        <h2 className="font-display font-black text-gray-900 text-3xl mb-2">Payment Authorized</h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Your payment of <span className="font-mono font-bold text-gray-900">{formatCurrency(totalAmount)}</span> has been successfully processed. An automated invoice receipt has been dispatched to your email.
        </p>
        <div className="bg-[#FAF7F2] rounded-2xl p-5 mb-8 text-left space-y-3 text-xs">
          <div className="flex justify-between"><span className="text-gray-500">Transaction Ref:</span><span className="font-mono font-bold text-gray-900">RF-PAY-{Date.now().toString().slice(-6)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Date & Time:</span><span className="font-medium text-gray-900">{new Date().toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Payment Source:</span><span className="font-bold text-gray-900 uppercase">{method === 'bank' ? 'Bank Account (**4928)' : 'Debit Card (**1022)'}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className="text-emerald-700 font-extrabold">SETTLED</span></div>
        </div>
        <button
          onClick={() => navigate('/tenant/payments')}
          className="w-full py-3.5 px-6 rounded-xl bg-[#072F29] hover:bg-[#0b4f45] text-white font-bold text-sm shadow-md transition-all cursor-pointer uppercase tracking-wider"
        >
          View Payment History
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto space-y-8 pb-16">
      
      {/* 3-Step Progress Indicator (Centered matching Screenshot 1) */}
      <div className="flex items-center justify-center pt-2 pb-4">
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Step 1 */}
          <div className="flex items-center gap-2.5 border-b-2 border-gray-900 pb-2 px-1">
            <span className="w-6 h-6 rounded-full bg-[#072F29] text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
            <span className="text-xs font-black tracking-widest text-gray-900">DETAILS</span>
          </div>

          <div className="w-8 sm:w-16 h-px bg-gray-300 shrink-0 mb-2" />

          {/* Step 2 */}
          <div className="flex items-center gap-2.5 pb-2 px-1 opacity-60">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 font-bold text-xs flex items-center justify-center shrink-0">2</span>
            <span className="text-xs font-bold tracking-widest text-gray-500">REVIEW</span>
          </div>

          <div className="w-8 sm:w-16 h-px bg-gray-300 shrink-0 mb-2" />

          {/* Step 3 */}
          <div className="flex items-center gap-2.5 pb-2 px-1 opacity-60">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 font-bold text-xs flex items-center justify-center shrink-0">3</span>
            <span className="text-xs font-bold tracking-widest text-gray-500">RECEIPT</span>
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card A: Monthly Rent Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Monthly Rent Summary</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Plot 63, Elgin Street, Ikeja GRA, Lagos 10299</p>
              </div>
              <span className="bg-[#E2F3EE] text-[#072F29] text-xs font-extrabold px-3.5 py-1.5 rounded-full shrink-0 shadow-2xs">
                Active Lease
              </span>
            </div>

            <div className="space-y-4 pt-2 border-t border-gray-100 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 font-medium">Base Rent</span>
                <span className="font-mono font-bold text-gray-900 text-base">{formatCurrency(baseRent)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 font-medium">Utilities (Fixed)</span>
                <span className="font-mono font-bold text-gray-900 text-base">{formatCurrency(utilities)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 font-medium">Parking Space #42</span>
                <span className="font-mono font-bold text-gray-900 text-base">{formatCurrency(parking)}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
              <span className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">Total Rent Due</span>
              <span className="text-2xl sm:text-3xl font-black text-gray-900 font-mono tracking-tighter">{formatCurrency(totalAmount)}</span>
            </div>
          </motion.div>

          {/* Card B: Schedule Payment */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8"
          >
            <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-5">Schedule Payment</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Pay Now */}
              <div
                onClick={() => setScheduleType('now')}
                className={[
                  'rounded-2xl p-5 relative cursor-pointer transition-all border-2',
                  scheduleType === 'now'
                    ? 'border-gray-900 bg-[#FAF7F2] shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-400',
                ].join(' ')}
              >
                {scheduleType === 'now' && (
                  <CheckCircle2 size={18} className="text-gray-900 absolute top-4 right-4 fill-gray-900 text-white" />
                )}
                <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center mb-4">
                  <Zap size={18} className="fill-current" />
                </div>
                <p className="font-black text-gray-900 text-sm">Pay Now</p>
                <p className="text-xs text-gray-500 mt-1">Process immediately</p>
              </div>

              {/* Option 2: Schedule for later */}
              <div
                onClick={() => setScheduleType('later')}
                className={[
                  'rounded-2xl p-5 relative cursor-pointer transition-all border-2',
                  scheduleType === 'later'
                    ? 'border-gray-900 bg-[#FAF7F2] shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-400',
                ].join(' ')}
              >
                {scheduleType === 'later' && (
                  <CheckCircle2 size={18} className="text-gray-900 absolute top-4 right-4 fill-gray-900 text-white" />
                )}
                <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center mb-4">
                  <Calendar size={18} />
                </div>
                <p className="font-black text-gray-900 text-sm">Schedule for later</p>
                <p className="text-xs text-gray-500 mt-1">Choose a future date</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card C: Payment Method */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Payment Method</h2>
              <button className="text-xs font-extrabold text-gray-900 hover:underline cursor-pointer">
                Add New
              </button>
            </div>

            <div className="space-y-3.5">
              {/* Bank Account Option */}
              <div
                onClick={() => setMethod('bank')}
                className={[
                  'rounded-2xl p-4 sm:p-4 flex items-center justify-between cursor-pointer transition-all border-2',
                  method === 'bank'
                    ? 'border-gray-900 bg-[#FAF7F2] shadow-2xs'
                    : 'border-gray-200 bg-white hover:border-gray-300',
                ].join(' ')}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${method === 'bank' ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
                    {method === 'bank' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">Bank Account / Paystack</p>
                    <p className="text-xs text-gray-500 truncate">Ending in 4928 • Savings</p>
                  </div>
                </div>
                <Building size={20} className="text-gray-700 shrink-0 ml-3" />
              </div>

              {/* Credit Card Option */}
              <div
                onClick={() => setMethod('card')}
                className={[
                  'rounded-2xl p-4 sm:p-4 flex items-center justify-between cursor-pointer transition-all border-2',
                  method === 'card'
                    ? 'border-gray-900 bg-[#FAF7F2] shadow-2xs'
                    : 'border-gray-200 bg-white hover:border-gray-300',
                ].join(' ')}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${method === 'card' ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
                    {method === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">Debit Card</p>
                    <p className="text-xs text-gray-500 truncate">Ending in 1022 • Exp 12/26</p>
                  </div>
                </div>
                <CreditCard size={20} className="text-gray-500 shrink-0 ml-3" />
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-6 py-6 border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" /> SSL SECURED</span>
              <span className="flex items-center gap-1.5"><Lock size={13} className="text-gray-400" /> PCI COMPLIANT</span>
            </div>

            {/* Confirm & Pay Button */}
            <div className="pt-6">
              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-[#C75B30] hover:bg-[#b54f27] text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99] disabled:opacity-75"
              >
                <span>{isProcessing ? 'Initiating Gateway...' : `Confirm and Pay ${formatCurrency(totalAmount)}`}</span>
                {!isProcessing && <ArrowRight size={19} />}
              </button>

              <p className="text-[10px] text-gray-400 text-center mt-3.5 leading-relaxed px-2">
                By clicking confirm, you authorize RentFlow to initiate a one-time transaction for the amount stated above.
              </p>
            </div>
          </motion.div>

          {/* Card D: Property Location Graphic preview */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-3 overflow-hidden"
          >
            <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-2xl h-44 flex flex-col items-center justify-center relative overflow-hidden group shadow-inner">
              {/* Subtle map watermark background simulation */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#072F29_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="w-12 h-12 bg-[#072F29] text-white rounded-full flex items-center justify-center shadow-xl mb-2.5 group-hover:scale-110 transition-transform relative z-10 ring-4 ring-white/50">
                <MapPin size={22} className="fill-[#072F29] text-white" />
              </div>
              <p className="font-extrabold text-gray-900 text-sm tracking-tight relative z-10">Property Location</p>
              <p className="text-xs text-gray-600 font-medium relative z-10 mt-0.5">Ikeja GRA, Lagos</p>
            </div>
          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default TenantPayRent;
