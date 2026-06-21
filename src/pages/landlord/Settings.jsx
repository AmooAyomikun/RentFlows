import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Save, Banknote, Shield, Bell } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Toggle from '../../components/ui/Toggle';
import Tabs from '../../components/ui/Tabs';

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  businessName: z.string().optional(),
});

const Settings = () => {
  const { user, setUser } = useAuthStore();
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      businessName: user?.businessName || '',
    }
  });

  const onProfileSave = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    setUser({ ...user, ...data });
    toast.success('Profile updated successfully');
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      content: (
        <Card>
          <h2 className="font-semibold text-charcoal mb-4 border-b border-border pb-2">Personal Information</h2>
          <form onSubmit={handleSubmit(onProfileSave)} className="space-y-4 max-w-md">
            <Input label="Full Name" {...register('name')} />
            <Input label="Email Address" type="email" {...register('email')} />
            <Input label="Business Name" {...register('businessName')} />
            <div className="pt-2">
              <Button type="submit" loading={isSubmitting} leftIcon={<Save size={16} />}>Save Changes</Button>
            </div>
          </form>
        </Card>
      )
    },
    {
      id: 'payouts',
      label: 'Payout Details',
      content: (
        <Card>
          <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
            <Banknote size={18} className="text-primary" />
            <h2 className="font-semibold text-charcoal">Bank Information</h2>
          </div>
          <div className="max-w-md space-y-4">
            <div className="bg-warm p-4 rounded-md border border-border">
              <p className="text-sm font-medium text-charcoal">Current Account</p>
              <p className="text-xs text-muted mt-1">Guaranty Trust Bank</p>
              <p className="text-mono text-sm mt-2">**** 1234</p>
            </div>
            <Button variant="outline">Update Bank Details</Button>
            <p className="text-xs text-muted">Rent collected will be automatically paid out to this account within 1-2 business days.</p>
          </div>
        </Card>
      )
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: (
        <Card>
          <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
            <Bell size={18} className="text-primary" />
            <h2 className="font-semibold text-charcoal">Alert Preferences</h2>
          </div>
          <div className="max-w-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-charcoal">Rent Payments</p>
                <p className="text-xs text-muted">Get notified when a tenant pays rent</p>
              </div>
              <Toggle defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-charcoal">Maintenance Requests</p>
                <p className="text-xs text-muted">Get notified when a new issue is reported</p>
              </div>
              <Toggle defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-charcoal">Late Payment Summary</p>
                <p className="text-xs text-muted">Weekly digest of overdue payments</p>
              </div>
              <Toggle defaultChecked />
            </div>
          </div>
        </Card>
      )
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <Card>
          <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
            <Shield size={18} className="text-primary" />
            <h2 className="font-semibold text-charcoal">Password & Authentication</h2>
          </div>
          <div className="max-w-md space-y-6">
            <Button variant="outline">Change Password</Button>
            
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-medium mb-2">Two-Factor Authentication</h3>
              <p className="text-xs text-muted mb-4">Add an extra layer of security to your account.</p>
              <Button variant="secondary">Enable 2FA</Button>
            </div>
          </div>
        </Card>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-charcoal">Settings</h1>
        <p className="text-sm text-muted">Manage your account and preferences.</p>
      </div>

      <Tabs tabs={tabs} defaultTab="profile" />
    </div>
  );
};

export default Settings;
