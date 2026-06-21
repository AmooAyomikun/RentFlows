import tenantsData from '../mocks/tenants.json';
import { mockDelay, lsGet, lsSet } from './mockUtils';

const LS_KEY = 'rf_tenants';
const getAll = () => lsGet(LS_KEY, tenantsData);
const save = (data) => lsSet(LS_KEY, data);

export const getTenants = async ({ propertyId, status } = {}) => {
  await mockDelay();
  let tenants = getAll();
  if (propertyId) tenants = tenants.filter((t) => t.propertyId === propertyId);
  if (status) tenants = tenants.filter((t) => t.paymentStatus === status);
  return tenants;
};

export const getTenantById = async (id) => {
  await mockDelay();
  const tenant = getAll().find((t) => t.id === id);
  if (!tenant) throw new Error(`Tenant ${id} not found.`);
  return tenant;
};

export const inviteTenant = async (data) => {
  await mockDelay(800, 1200);
  return { success: true, inviteToken: `inv-${Date.now()}`, ...data };
};

export const removeTenant = async (id) => {
  await mockDelay(500, 800);
  const tenants = getAll();
  save(tenants.filter((t) => t.id !== id));
  return { success: true };
};

export const updateTenant = async (id, data) => {
  await mockDelay(500, 800);
  const tenants = getAll();
  const updated = tenants.map((t) => (t.id === id ? { ...t, ...data } : t));
  save(updated);
  return updated.find((t) => t.id === id);
};

export const getTenantDashboard = async () => {
  await mockDelay(400, 600);
  return {
    lease: {
      propertyName: "Okafor Plaza",
      unitName: "Apt 4B",
      rentAmount: 450000,
      rentCycle: "year",
      startDate: "2025-01-01",
      endDate: "2025-12-31"
    },
    balance: {
      amount: 450000,
      dueDate: "2025-01-01",
      status: "pending"
    }
  };
};

export const getTenantPayments = async () => {
  await mockDelay(300, 500);
  return [
    { id: '1', date: '2024-01-05', amount: 450000, status: 'completed' },
    { id: '2', date: '2023-01-10', amount: 450000, status: 'completed' },
  ];
};

export const getTenantProfile = async () => {
  await mockDelay(300, 500);
  return {
    propertyName: "Okafor Plaza",
    unitName: "Apt 4B",
    rentAmount: 450000,
    rentCycle: "year",
    startDate: "2025-01-01",
    endDate: "2025-12-31"
  };
};

