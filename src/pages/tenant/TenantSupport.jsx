import { useState } from 'react';
import { toast } from 'sonner';
import Modal from '../../components/ui/Modal';
import {
  HelpCircle, Phone, Mail, Clock, MessageSquare, ChevronDown, ChevronUp,
  CheckCircle2, Send, ShieldAlert, FileText, Scale, AlertCircle, UploadCloud,
  CheckCircle, FileCheck, ArrowRight, Shield, X, Plus
} from 'lucide-react';
import PageHero from '../../components/ui/PageHero';

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

const initialDisputes = [
  {
    id: 'DSP-209',
    category: 'Security Deposit Deduction Fee',
    subject: 'Contesting ₦150,000 Painting & Scuff Charge',
    against: 'Adeleke & Co. Management (Landlord)',
    amount: '₦150,000',
    filedDate: 'Jun 14, 2026',
    status: 'In Independent Arbitration',
    step: 3, // 1: Filed, 2: Landlord Response, 3: Arbitrator Review, 4: Verdict
    description: 'Landlord deducted ₦150k from deposit citing wall scuffs in hallway. Pre-move-in inspection signed report clearly documents those scuffs were present before tenancy commenced.',
    arbitratorNote: 'Assigned to Barrister O. Kazeem (Lagos State Court-Accredited Mediator). Reviewing move-in date photos.'
  },
  {
    id: 'DSP-142',
    category: 'Maintenance Overcharge Reimbursement',
    subject: 'Emergency Plumbing Repair Surcharge',
    against: 'Adeleke & Co. Management (Landlord)',
    amount: '₦45,000',
    filedDate: 'May 02, 2026',
    status: 'Resolved in Resident Favor',
    step: 4,
    description: 'Tenant paid out-of-pocket for burst main pipe at 2 AM after 24/7 hotline failed to dispatch technician. Landlord initially refused credit against rent.',
    arbitratorNote: 'Verdict: Landlord ordered to credit ₦45,000 against June rent cycle. Case Closed.'
  }
];

const TenantSupport = () => {
  const [activeTab, setActiveTab] = useState('support'); // 'support' | 'disputes'
  const [openFaq, setOpenFaq] = useState(0);
  const [inquiryTopic, setInquiryTopic] = useState('General Question');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  // Dispute state
  const [disputes, setDisputes] = useState(initialDisputes);
  const [showNewDisputeModal, setShowNewDisputeModal] = useState(false);
  const [disputeForm, setDisputeForm] = useState({
    category: 'Security Deposit Deduction',
    subject: '',
    amount: '',
    description: ''
  });

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!inquiryMsg.trim()) return;
    setSentSuccess(true);
    setInquiryMsg('');
    setTimeout(() => setSentSuccess(false), 6000);
  };

  const handleFileDispute = (e) => {
    e.preventDefault();
    if (!disputeForm.subject || !disputeForm.description) return;

    const newEntry = {
      id: `DSP-${Math.floor(200 + Math.random() * 800)}`,
      category: disputeForm.category,
      subject: disputeForm.subject,
      against: 'Adeleke & Co. Management (Landlord)',
      amount: disputeForm.amount ? `₦${disputeForm.amount}` : 'Non-Monetary Claim',
      filedDate: 'Just now',
      status: 'Claim Filed & Docketed',
      step: 1,
      description: disputeForm.description,
      arbitratorNote: 'Pending assignment of court-accredited neutral mediator.'
    };

    setDisputes([newEntry, ...disputes]);
    toast.success('Formal mediation claim docketed! Landlord has 7 business days to submit evidence.');
    setShowNewDisputeModal(false);
    setDisputeForm({ category: 'Security Deposit Deduction', subject: '', amount: '', description: '' });
  };

  return (
    <div className="space-y-6 w-full text-[#1E293B] pb-12 font-sans">
      <PageHero
        icon={HelpCircle}
        iconBg="bg-blue-700"
        tag="Concierge & Arbitration"
        title="Help, Support & Dispute Mediation"
        subtitle="Access instant portal concierge or invoke formal independent arbitration for tenancy matters."
        gradient="from-[#000D1A] via-[#001A33] to-[#002B52]"
        stats={[
          { value: '2h', label: 'Response Time' },
          { value: `${disputes.filter(d => d.step < 4).length}`, label: 'Active Disputes' },
          { value: '24/7', label: 'Emergency Line' },
        ]}
        actions={[
          { label: 'File Dispute', icon: Scale, onClick: () => { setActiveTab('disputes'); setShowNewDisputeModal(true); } },
          { label: activeTab === 'disputes' ? 'Back to Support' : 'View Disputes', icon: FileCheck, onClick: () => setActiveTab(v => v === 'disputes' ? 'support' : 'disputes'), variant: 'ghost' },
        ]}
      />

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('support')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
            activeTab === 'support' ? 'bg-[#0B4F45] text-white shadow-xs' : 'bg-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <HelpCircle size={15} />
          <span>Concierge & FAQ Desk</span>
        </button>
        <button
          onClick={() => setActiveTab('disputes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
            activeTab === 'disputes' ? 'bg-[#0B4F45] text-white shadow-xs' : 'bg-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Scale size={15} className="text-[#C75B30]" />
          <span>Mediation & Dispute Center</span>
          <span className="bg-[#C75B30] text-white px-2 py-0.5 rounded-full text-[10px] font-black">
            {disputes.filter(d => d.step < 4).length} Active
          </span>
        </button>
      </div>

      {activeTab === 'support' ? (
        <div className="space-y-6 animate-fade-in">
          {sentSuccess && (
            <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>Your support inquiry has been transmitted to Adeleke & Co. Management. Our concierge desk responds within 2 business hours.</span>
            </div>
          )}

          {/* Top Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0B4F45]/10 text-[#0B4F45] flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0B4F45] m-0">Property Management Office</h3>
                <p className="text-xs text-[#4A4F4C] mt-0.5 m-0">Mon – Fri (8:00 AM – 6:00 PM)</p>
              </div>
              <a href="tel:+2348030000198" className="block text-xs font-mono font-black text-[#0B4F45] hover:underline">
                +234 803 000 0198
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#C75B30]/10 text-[#C75B30] flex items-center justify-center">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0B4F45] m-0">24/7 Emergency Hotline</h3>
                <p className="text-xs text-[#4A4F4C] mt-0.5 m-0">For active leaks, fire, or hazards</p>
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
                <h3 className="font-bold text-sm text-[#0B4F45] m-0">Concierge Desk Email</h3>
                <p className="text-xs text-[#4A4F4C] mt-0.5 m-0">General packages & leasing support</p>
              </div>
              <a href="mailto:concierge@victoriaislandtowers.ng" className="block text-xs font-semibold text-blue-600 hover:underline truncate">
                concierge@victoriaislandtowers.ng
              </a>
            </div>
          </div>

          {/* Main Content Grid: FAQ + Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B4F45] m-0 pb-2 border-b border-gray-100 flex items-center gap-2">
                <HelpCircle size={16} className="text-[#C75B30]" /> Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqList.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-4 bg-gray-50/60 hover:bg-gray-50 flex items-center justify-between text-left cursor-pointer border-none font-bold text-xs text-gray-900"
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? <ChevronUp size={16} className="text-gray-400 shrink-0 ml-2" /> : <ChevronDown size={16} className="text-gray-400 shrink-0 ml-2" />}
                    </button>
                    {openFaq === idx && (
                      <div className="p-4 bg-white text-xs text-[#4A4F4C] leading-relaxed border-t border-gray-100">
                        <p className="m-0 text-xs text-[#4A4F4C]">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B4F45] m-0 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#0B4F45]" /> Send Concierge Message
                </h2>
                <p className="text-xs text-[#4A4F4C] mt-2 m-0">
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
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#0B4F45]/20 outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0B4F45] hover:bg-[#083d35] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer border-none transition-all shadow-xs"
                  >
                    <Send size={14} /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── MEDIATION & DISPUTE RESOLUTION CENTER VIEW ── */
        <div className="space-y-6 animate-fade-in">
          
          {/* Dispute Banner */}
          <div className="bg-[#0B4F45] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="bg-[#C75B30] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Scale size={14} /> Independent Arbitration Tribunal
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white m-0">
                Formal Tenancy Dispute Resolution
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed m-0">
                RentFlow partners with accredited Multi-Door Courthouses and real estate mediators. Claims filed here freeze contested escrow deposits until neutral adjudication completes.
              </p>
            </div>

            <button
              onClick={() => setShowNewDisputeModal(true)}
              className="px-6 py-3.5 rounded-xl bg-[#C75B30] hover:bg-[#b04a25] text-white font-bold text-xs sm:text-sm border-none cursor-pointer shadow-lg transition-all flex items-center gap-2 shrink-0"
            >
              <Plus size={18} />
              <span>File New Mediation Claim</span>
            </button>
          </div>

          {/* Active Disputes List */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-[#0B4F45] m-0 flex items-center gap-2">
              <FileCheck size={18} className="text-[#C75B30]" />
              Docketed Disputes & Resolution Progress ({disputes.length})
            </h3>

            {disputes.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[#C75B30] uppercase tracking-wider">{d.id}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs font-bold text-gray-500">{d.category}</span>
                    </div>
                    <h4 className="text-lg font-display font-bold text-[#0B4F45] m-0 mt-1">{d.subject}</h4>
                    <p className="text-xs text-[#4A4F4C] m-0 mt-1">Against: <strong className="text-gray-800">{d.against}</strong> • Filed: {d.filedDate}</p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[11px] font-bold text-gray-400 uppercase block">Contested Amount</span>
                    <span className="text-xl font-mono font-black text-gray-900 block">{d.amount}</span>
                    <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-[11px] font-bold ${
                      d.step === 4 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {d.status}
                    </span>
                  </div>
                </div>

                {/* 4-Step Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-gray-600">
                    <span className={d.step >= 1 ? 'text-[#0B4F45]' : ''}>1. Claim Docketed</span>
                    <span className={d.step >= 2 ? 'text-[#0B4F45]' : ''}>2. Landlord Evidence</span>
                    <span className={d.step >= 3 ? 'text-[#0B4F45]' : ''}>3. Arbitrator Review</span>
                    <span className={d.step >= 4 ? 'text-emerald-600' : ''}>4. Final Verdict</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((stepIdx) => (
                      <div
                        key={stepIdx}
                        className={`h-2.5 rounded-full transition-all ${
                          d.step >= stepIdx
                            ? stepIdx === 4
                              ? 'bg-emerald-500 shadow-2xs'
                              : 'bg-[#0B4F45]'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-gray-200/80 space-y-2">
                  <p className="text-xs text-[#4A4F4C] m-0 leading-relaxed">
                    <strong className="text-[#0B4F45]">Claim Statement:</strong> {d.description}
                  </p>
                  <p className="text-xs text-emerald-800 bg-emerald-50/80 p-2.5 rounded-lg m-0 border border-emerald-200 font-medium">
                    <strong className="font-bold">Tribunal Update:</strong> {d.arbitratorNote}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* FILE NEW DISPUTE MODAL */}
      <Modal isOpen={showNewDisputeModal} onClose={() => setShowNewDisputeModal(false)} title="File Formal Tenancy Dispute">
        <form onSubmit={handleFileDispute} className="space-y-4 text-[#4A4F4C]">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Dispute Category</label>
            <select
              value={disputeForm.category}
              onChange={e => setDisputeForm({ ...disputeForm, category: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 bg-white focus:outline-none focus:border-[#0B4F45]"
            >
              <option>Security Deposit Deduction</option>
              <option>Maintenance Cost Overcharge</option>
              <option>Lease Violation Claim</option>
              <option>Noise & Quiet Enjoyment Breach</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Subject / Summary</label>
            <input
              type="text"
              placeholder="e.g. Unjustified ₦150k painting deduction"
              value={disputeForm.subject}
              onChange={e => setDisputeForm({ ...disputeForm, subject: e.target.value })}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#0B4F45]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Contested Amount (₦) [Optional]</label>
            <input
              type="text"
              placeholder="e.g. 150,000"
              value={disputeForm.amount}
              onChange={e => setDisputeForm({ ...disputeForm, amount: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#0B4F45]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Statement of Facts & Evidence</label>
            <textarea
              rows={4}
              placeholder="Describe the chronology of events. You can reference move-in inspection reports or maintenance tickets..."
              value={disputeForm.description}
              onChange={e => setDisputeForm({ ...disputeForm, description: e.target.value })}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#0B4F45] resize-none"
            />
          </div>

          <div className="p-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors">
            <UploadCloud size={20} className="mx-auto text-gray-400 mb-1" />
            <span className="text-xs font-bold text-[#0B4F45] block">Attach Evidence (Photos, Receipts, Chat Logs)</span>
            <span className="text-[10px] text-gray-400">Supported: PDF, JPG, PNG up to 15MB</span>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNewDisputeModal(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 bg-transparent border-none cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0B4F45] hover:bg-[#083d35] text-white border-none cursor-pointer shadow-sm"
            >
              Docket Claim for Arbitration
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default TenantSupport;
