import propertiesData from '../mocks/properties.json';
import { mockDelay, lsGet, lsSet } from './mockUtils';

const LS_KEY = 'rf_properties';

const getAll = () => lsGet(LS_KEY, propertiesData);
const save = (data) => lsSet(LS_KEY, data);

export const getProperties = async () => {
  await mockDelay();
  return getAll();
};

export const getPropertyById = async (id) => {
  await mockDelay();
  const props = getAll();
  const prop = props.find((p) => p.id === id);
  if (!prop) throw new Error(`Property ${id} not found.`);
  return prop;
};

export const createProperty = async (data) => {
  await mockDelay(600, 1000);
  const props = getAll();
  const newProp = {
    ...data,
    id: `prop-${Date.now()}`,
    totalUnits: data.units?.length ?? 0,
    occupiedUnits: 0,
    monthlyRevenue: 0,
    createdAt: new Date().toISOString(),
  };
  save([...props, newProp]);
  return newProp;
};

export const updateProperty = async (id, data) => {
  await mockDelay(600, 900);
  const props = getAll();
  const updated = props.map((p) => (p.id === id ? { ...p, ...data } : p));
  save(updated);
  return updated.find((p) => p.id === id);
};

export const deleteProperty = async (id) => {
  await mockDelay(400, 700);
  const props = getAll();
  save(props.filter((p) => p.id !== id));
  return { success: true };
};
