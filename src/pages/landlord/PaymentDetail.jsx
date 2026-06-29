import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, FileText, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { getPaymentById } from '../../services/paymentService';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { formatCurrency, humanizeStatus } from '../../utils/formatCurrency';
import { formatDate, formatDateTime } from '../../utils/formatDate';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';
import EmptyState from '../../components/ui/EmptyState';

const PaymentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: payment, isLoading, error } = useQuery({
    queryKey: ['payment', id],
    queryFn: () => getPaymentById(id),
    retry: 1,
  });

  if (isLoading) {
    return <div className="space-y-6"><ContentCardSkeleton /></div>;
  }

  if (error || !payment) {
    return (
      <EmptyState 
        title="Payment not found" 
        description="The transaction you are looking for does not exist or has been removed."
        action={<Button onClick={() => navigate('/landlord/payments')}>Back to Payments</Button>}
      />
    );
  }

  const isPaid = payment.status === 'paid';
  const isOverdue = payment.status === 'overdue';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/landlord/payments')}
          className="p-2 hover:bg-warm rounded-full transition-colors text-muted hover:text-charcoal"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Payment Detail
            <Badge status={payment.status} label={humanizeStatus(payment.status)} />
          </h1>
          <p className="text-sm text-muted font-mono">{payment.transactionRef || payment.id}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <Card padding={false} className="overflow-hidden">
            {/* Status Banner */}
            <div className={`p-6 ${isPaid ? 'bg-success/10 border-b border-success/20' : isOverdue ? 'bg-error/10 border-b border-error/20' : 'bg-warning/10 border-b border-warning/20'}`}>
              <div className="flex items-center gap-3 mb-2">
                {isPaid ? <CheckCircle size={24} className="text-success" /> : isOverdue ? <AlertTriangle size={24} className="text-error" /> : <Clock size={24} className="text-warning" />}
                <span className={`text-base font-semibold ${isPaid ? 'text-success' : isOverdue ? 'text-error' : 'text-warning'}`}>
                  {isPaid ? 'Payment Successful' : isOverdue ? 'Payment Overdue' : 'Payment Pending'}
                </span>
              </div>
              <p className="text-3xl font-mono font-bold text-gray-900">
                {formatCurrency(payment.amount + (payment.lateFee || 0))}
              </p>
              {payment.lateFee > 0 && (
                <p className="text-sm text-error mt-1 flex items-center gap-1">
                  <AlertTriangle size={12} /> Includes {formatCurrency(payment.lateFee)} late fee
                </p>
              )}
            </div>

            {/* Details Grid */}
            <div className="p-6 grid sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Tenant</p>
                <p className="text-base font-medium text-gray-900">{payment.tenantName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Property & Unit</p>
                <p className="text-base font-medium text-gray-900">{payment.propertyName}</p>
                <p className="text-sm text-gray-500">{payment.unitLabel}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Due Date</p>
                <p className="text-base text-[#4A4F4C]">{formatDate(payment.dueDate)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Payment Date</p>
                <p className="text-base text-[#4A4F4C]">{payment.paymentDate ? formatDateTime(payment.paymentDate) : '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Payment Method</p>
                <p className="text-base text-[#4A4F4C] capitalize">
                  {payment.method ? payment.method.replace('_', ' ') : '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Base Rent Amount</p>
                <p className="text-base font-mono font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <FileText size={18} className="text-primary" />
              <h2 className="text-sm font-semibold uppercase text-gray-800">Receipt</h2>
            </div>
            
            {isPaid ? (
              <div className="space-y-4">
                <div className="aspect-[1/1.4] bg-warm rounded border border-border flex items-center justify-center p-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <Button size="sm" variant="primary" leftIcon={<Download size={14} />}>Download PDF</Button>
                  </div>
                  {/* Mock Receipt visual */}
                  <div className="w-full h-full bg-white shadow-sm rounded-sm p-4 text-[8px] border border-border/50">
                    <div className="flex justify-between items-start mb-4 border-b border-border/50 pb-2">
                      <div className="font-bold text-[10px]">RentFlow</div>
                      <div className="text-right">
                        <div className="font-bold text-success text-[10px]">RECEIPT</div>
                        <div className="text-muted">{payment.transactionRef}</div>
                      </div>
                    </div>
                    <div className="space-y-1 mb-4">
                      <div><span className="text-muted">Billed To:</span> {payment.tenantName}</div>
                      <div><span className="text-muted">Property:</span> {payment.propertyName} - {payment.unitLabel}</div>
                    </div>
                    <table className="w-full text-left mb-4">
                      <tr className="border-b border-border/50"><th className="pb-1">Description</th><th className="text-right pb-1">Amount</th></tr>
                      <tr><td className="py-1">Rent ({formatDate(payment.dueDate)})</td><td className="text-right">{formatCurrency(payment.amount)}</td></tr>
                      {payment.lateFee > 0 && <tr><td className="py-1">Late Fee</td><td className="text-right">{formatCurrency(payment.lateFee)}</td></tr>}
                    </table>
                    <div className="border-t border-border/50 pt-2 flex justify-between font-bold text-[10px]">
                      <span>Total Paid</span>
                      <span>{formatCurrency(payment.amount + (payment.lateFee || 0))}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full" variant="outline" leftIcon={<Download size={16} />}>Download Receipt</Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-base text-[#4A4F4C] mb-4">Receipt will be available once the payment is marked as paid.</p>
                {isOverdue && <Button className="w-full" variant="outline">Send Reminder</Button>}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
