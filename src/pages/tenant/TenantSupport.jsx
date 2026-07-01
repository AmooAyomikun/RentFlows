import { useState } from 'react';
import { HelpCircle, Phone, Mail, Clock, MessageSquare, ChevronDown, ChevronUp, CheckCircle2, Send, ShieldAlert, FileText } from 'lucide-react';

const faqList = [
  {
    q: 'How do I pay my monthly rent online?',
    a: 'Navigate to the "Pay Rent" tab in the left sidebar. You can set up automated Direct Debit (ACH), pay via debit card, or generate a bank transfer reference for instant portal reconciliation.'
  },
  {
    q: 'What is considered a maintenance emergency?',
    a: 'Emergencies include severe water leaks or flooding, complete loss of electrical power, gas leaks, or broken entry doors compromising security. For these, call our 24/7 hotline immediately at +234 803 000 0198.'
  },
  {
    q: 'How do I request a visitor parking permit?',
    a: 'Visitor parking permits can be requested up to 48 hours in advance through your property manager or by submitting a general inquiry below. Each unit receives up to 10 free visitor passes per month.'
  },
  {
    q: 'What happens at the end of my lease term?',
    a: 'Our management office will send a digital lease renewal offer 60 days prior to your lease expiration date (December 31). You can review, sign, or negotiate terms directly within the Lease Details page.'
  }
];

const TenantSupport = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [inquiryTopic, setInquiryTopic] = useState('General Question');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!inquiryMsg.trim()) return;
    setSentSuccess(true);
    setInquiryMsg('');
    setTimeout(() => setSentSuccess(false), 6000);
  };

  return (
    <div className="space-y-6 w-full text-[#1E293B] pb-8">
      {/* Title Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 m-0">Help & Resident Support</h1>
        <p className="text-xs text-gray-500 mt-1 m-0">Access instant portal FAQs, contact property management, or speak with resident concierge services.</p>
      </div>

      {sentSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>Your support inquiry has been transmitted to Adeleke & Co. Management. Our concierge desk responds within 2 business hours.</span>
        </div>
      )}

      {/* Top Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Phone size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 m-0">Property Management Office</h3>
            <p className="text-xs text-gray-500 mt-0.5 m-0">Mon – Fri (8:00 AM – 6:00 PM)</p>
          </div>
          <a href="tel:+2348030000198" className="block text-xs font-mono font-black text-primary hover:underline">
            +234 803 000 0198
          </a>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#C75B30]/10 text-[#C75B30] flex items-center justify-center">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 m-0">24/7 Emergency Hotline</h3>
            <p className="text-xs text-gray-500 mt-0.5 m-0">For active leaks, fire, or hazards</p>
          </div>
          <a href="tel:+2348030009999" className="block text-xs font-mono font-black text-[#C75B30] hover:underline">
            +234 803 000 9999
          </a>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Mail size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 m-0">Concierge Desk Email</h3>
            <p className="text-xs text-gray-500 mt-0.5 m-0">General packages & leasing support</p>
          </div>
          <a href="mailto:concierge@victoriaislandtowers.ng" className="block text-xs font-semibold text-blue-600 hover:underline truncate">
            concierge@victoriaislandtowers.ng
          </a>
        </div>
      </div>

      {/* Main Content Grid: FAQ + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 m-0 pb-2 border-b border-gray-100 flex items-center gap-2">
            <HelpCircle size={16} className="text-primary" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqList.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 bg-gray-50/60 hover:bg-gray-50 flex items-center justify-between text-left cursor-pointer border-none font-bold text-xs text-gray-900"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={16} className="text-gray-400 shrink-0 ml-2" /> : <ChevronDown size={16} className="text-gray-400 shrink-0 ml-2" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Send Direct Inquiry */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 m-0 pb-2 border-b border-gray-100 flex items-center gap-2">
              <MessageSquare size={16} className="text-primary" /> Send Concierge Message
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              Have a question not covered above? Send a direct message to your assigned property manager.
            </p>
            <form onSubmit={handleSendInquiry} className="space-y-3 mt-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Topic</label>
                <select
                  value={inquiryTopic}
                  onChange={e => setInquiryTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-bold text-gray-800"
                >
                  <option>General Question</option>
                  <option>Billing & Payments</option>
                  <option>Lease Terms</option>
                  <option>Visitor & Parking</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can our management team assist you today?"
                  value={inquiryMsg}
                  onChange={e => setInquiryMsg(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#04332C] hover:bg-[#03241f] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer border-none transition-all shadow-xs"
              >
                <Send size={14} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantSupport;
