import maintenanceData from '../mocks/maintenanceRequests.json';
import { mockDelay, lsGet, lsSet } from './mockUtils';

const LS_KEY = 'rf_maintenance';
const getAll = () => lsGet(LS_KEY, maintenanceData);
const save = (data) => lsSet(LS_KEY, data);

export const getMaintenanceRequests = async ({ tenantId, propertyId, status } = {}) => {
  await mockDelay();
  let reqs = getAll();
  if (tenantId) reqs = reqs.filter((r) => r.tenantId === tenantId);
  if (propertyId) reqs = reqs.filter((r) => r.propertyId === propertyId);
  if (status) reqs = reqs.filter((r) => r.status === status);
  return reqs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getMaintenanceById = async (id) => {
  await mockDelay();
  const req = getAll().find((r) => r.id === id);
  if (!req) throw new Error(`Request ${id} not found.`);
  return req;
};

export const createMaintenanceRequest = async (data) => {
  await mockDelay(600, 1000);
  const reqs = getAll();
  const newReq = {
    ...data,
    id: `maint-${Date.now()}`,
    status: 'received',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: '',
    statusHistory: [
      { status: 'received', timestamp: new Date().toISOString(), note: 'Request received.' },
    ],
  };
  save([newReq, ...reqs]);
  return newReq;
};

export const updateMaintenanceStatus = async (id, status, note = '') => {
  await mockDelay(500, 800);
  const reqs = getAll();
  const updated = reqs.map((r) => {
    if (r.id !== id) return r;
    const historyEntry = { status, timestamp: new Date().toISOString(), note };
    return {
      ...r,
      status,
      updatedAt: new Date().toISOString(),
      notes: note || r.notes,
      statusHistory: [...(r.statusHistory || []), historyEntry],
    };
  });
  save(updated);
  return updated.find((r) => r.id === id);
};

export const getMaintenanceSnapshot = async () => {
  await mockDelay(300, 600);
  const reqs = getAll();
  return {
    received: reqs.filter((r) => r.status === 'received').length,
    in_progress: reqs.filter((r) => r.status === 'in_progress').length,
    resolved: reqs.filter((r) => r.status === 'resolved').length,
    total: reqs.length,
  };
};
