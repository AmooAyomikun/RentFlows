import unitsData from '../mocks/units.json';
import { mockDelay, lsGet, lsSet } from './mockUtils';

const LS_KEY = 'rf_units';
const getAll = () => lsGet(LS_KEY, unitsData);
const save = (data) => lsSet(LS_KEY, data);

export const getUnits = async ({ propertyId } = {}) => {
  await mockDelay();
  let units = getAll();
  if (propertyId) units = units.filter((u) => u.propertyId === propertyId);
  return units;
};

export const getUnitById = async (id) => {
  await mockDelay();
  const unit = getAll().find((u) => u.id === id);
  if (!unit) throw new Error(`Unit ${id} not found.`);
  return unit;
};

export const createUnit = async (data) => {
  await mockDelay(400, 700);
  const units = getAll();
  const newUnit = {
    ...data,
    id: `unit-${Date.now()}`,
    status: 'vacant',
    tenantId: null,
  };
  save([...units, newUnit]);
  return newUnit;
};

export const updateUnit = async (id, data) => {
  await mockDelay(400, 700);
  const units = getAll();
  const updated = units.map((u) => (u.id === id ? { ...u, ...data } : u));
  save(updated);
  return updated.find((u) => u.id === id);
};
