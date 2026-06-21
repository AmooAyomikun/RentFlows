import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Save, Shield, Bell } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Toggle from '../../components/ui/Toggle';
import Tabs from '../../components/ui/Tabs';

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

const TenantSettings = () => {
  const { user, setUser } = useAuthStore();
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
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
            <Input label="Phone Number" type="tel" {...register('phone')} placeholder="+234..." />
            <div className="pt-2">
              <Button type="submit" loading={isSubmitting} leftIcon={<Save size={16} />}>Save Changes</Button>
            </div>
          </form>
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
                <p className="font-medium text-sm text-charcoal">Rent Reminders</p>
                <p className="text-xs text-muted">Receive reminders 7, 3, and 1 day before rent is due</p>
              </div>
              <Toggle defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-charcoal">Payment Receipts</p>
                <p className="text-xs text-muted">Email a PDF receipt automatically after payment</p>
              </div>
              <Toggle defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-charcoal">Maintenance Updates</p>
                <p className="text-xs text-muted">Get notified when the status of your request changes</p>
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
            <h2 className="font-semibold text-charcoal">Password Change</h2>
          </div>
          <div className="max-w-md space-y-4">
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm New Password" type="password" />
            <div className="pt-2">
              <Button>Update Password</Button>
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
        <p className="text-sm text-muted">Manage your personal profile and preferences.</p>
      </div>

      <Tabs tabs={tabs} defaultTab="profile" />
    </div>
  );
};

export default TenantSettings;
