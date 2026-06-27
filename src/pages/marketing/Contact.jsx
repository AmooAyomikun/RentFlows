import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { submitContactForm } from '../../services/contentService';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

const subjectOptions = [
  { value: 'sales', label: 'Sales enquiry' },
  { value: 'support', label: 'Technical support' },
  { value: 'billing', label: 'Billing question' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@rentflow.ng', href: 'mailto:hello@rentflow.ng' },
  { icon: Phone, label: 'Phone', value: '+234 800 000 0000', href: 'tel:+23480000000' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+234 800 000 0001', href: 'https://wa.me/2348000000001' },
  { icon: MapPin, label: 'Office', value: '12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria', href: null },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await submitContactForm(data);
      setSubmitted(true);
    } catch {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <section className="bg-gradient-to-b from-[#061A15] via-[#0A2E25] to-[#071E18] py-20 md:py-28 relative overflow-hidden text-center" aria-label="Contact header">
        <div className="absolute top-[-20%] right-[15%] w-[400px] h-[400px] bg-[#0B4F45]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[10%] w-[350px] h-[350px] bg-[#C75B30]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-marketing mx-auto px-6 relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E79868] text-xs font-bold tracking-widest uppercase mb-5 shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Support Active · ~15m Avg Response
          </motion.div>
          <motion.h1
            className="font-display text-white font-black tracking-tight leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(38px, 5.5vw, 62px)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            We&apos;re Here to Help You <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E79868] via-white to-[#C75B30]">Succeed.</span>
          </motion.h1>
          <motion.p
            className="text-white/75 text-base md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            Whether you manage 1 unit or a 500-property portfolio across Africa, our dedicated team is ready to assist you by email, phone, or WhatsApp.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3 pt-2 text-xs font-medium text-white/70"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2">💬 WhatsApp Live Support</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2">🏢 Enterprise Onboarding Available</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2">📍 HQ: Lekki Phase 1, Lagos</span>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-warm" aria-label="Contact form and info">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Info panel */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div>
                <h2 className="font-display text-charcoal text-2xl mb-2">Get in touch.</h2>
                <p className="text-sm text-muted">Our team typically responds within 24 hours on business days.</p>
              </div>

              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-charcoal hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm text-charcoal">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="bg-primary/8 border border-primary/20 rounded-lg p-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-primary mb-1">Enterprise enquiries</p>
                  <p className="text-xs text-muted">Managing 150+ units? Let's talk about custom pricing and onboarding.</p>
                </div>
                <Button variant="primary" size="sm" className="w-full">Book a Demo</Button>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div className="lg:col-span-2 bg-white rounded-lg border border-border shadow-card p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle size={26} className="text-success" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-charcoal text-xl mb-2">Message sent!</h3>
                  <p className="text-muted text-sm max-w-xs">Thanks for reaching out. Our team will reply within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Contact form" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Full name"
                      placeholder="Your full name"
                      required
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email address"
                      type="email"
                      placeholder="you@example.com"
                      required
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>
                  <Select
                    label="Subject"
                    options={subjectOptions}
                    placeholder="Select a subject"
                    required
                    error={errors.subject?.message}
                    {...register('subject')}
                  />
                  <Textarea
                    label="Message"
                    placeholder="Tell us what's on your mind…"
                    rows={5}
                    required
                    error={errors.message?.message}
                    {...register('message')}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    loading={isSubmitting}
                    rightIcon={<Send size={16} />}
                    className="w-full sm:w-auto"
                  >
                    Send message
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
