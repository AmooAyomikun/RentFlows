import paymentsData from '../mocks/payments.json';
import { mockDelay, lsGet, lsSet } from './mockUtils';

const LS_KEY = 'rf_payments';
const getAll = () => lsGet(LS_KEY, paymentsData);
const save = (data) => lsSet(LS_KEY, data);

export const getPayments = async ({ tenantId, propertyId, status, from, to } = {}) => {
  await mockDelay();
  let payments = getAll();
  if (tenantId) payments = payments.filter((p) => p.tenantId === tenantId);
  if (propertyId) payments = payments.filter((p) => p.propertyId === propertyId);
  if (status) payments = payments.filter((p) => p.status === status);
  if (from) payments = payments.filter((p) => p.paymentDate && new Date(p.paymentDate) >= new Date(from));
  if (to) payments = payments.filter((p) => p.paymentDate && new Date(p.paymentDate) <= new Date(to));
  return payments.sort((a, b) => {
    const dateA = a.paymentDate || a.dueDate;
    const dateB = b.paymentDate || b.dueDate;
    return new Date(dateB) - new Date(dateA);
  });
};

export const getPaymentById = async (id) => {
  await mockDelay();
  const payment = getAll().find((p) => p.id === id);
  if (!payment) throw new Error(`Payment ${id} not found.`);
  return payment;
};

export const createPayment = async (data) => {
  await mockDelay(1000, 1500);
  const payments = getAll();
  const newPayment = {
    ...data,
    id: `pay-${Date.now()}`,
    status: 'paid',
    paymentDate: new Date().toISOString(),
    transactionRef: `TRX-${Date.now()}`,
    receiptUrl: null,
  };
  save([newPayment, ...payments]);
  return newPayment;
};

/**
 * Returns revenue trend data for the last N months.
 * @param {number} months
 */
export const getRevenueTrend = async (months = 6) => {
  await mockDelay();
  const now = new Date();
  const result = [];
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = date.toLocaleDateString('en-NG', { month: 'short', year: '2-digit' });
    // Simulate realistic variance
    const base = 8450000;
    const variance = (Math.random() - 0.3) * 1500000;
    result.push({ month: label, revenue: Math.max(5000000, Math.round(base + variance)) });
  }
  return result;
};

/**
 * Summary totals for the filter period.
 */
export const getPaymentSummary = async ({ propertyId } = {}) => {
  await mockDelay(300, 600);
  const payments = getAll().filter((p) => !propertyId || p.propertyId === propertyId);
  const collected = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);
  const pending = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
  const overdue = payments
    .filter((p) => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount + (p.lateFee || 0), 0);
  return { collected, pending, overdue };
};
