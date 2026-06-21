import notificationsData from '../mocks/notifications.json';
import { mockDelay, lsGet, lsSet } from './mockUtils';

const LS_KEY = 'rf_notifications';
const getAll = () => lsGet(LS_KEY, notificationsData);
const save = (data) => lsSet(LS_KEY, data);

export const getNotifications = async ({ type } = {}) => {
  await mockDelay();
  let notifs = getAll();
  if (type && type !== 'all') notifs = notifs.filter((n) => n.type === type);
  return notifs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getUnreadCount = async () => {
  await mockDelay(200, 400);
  return getAll().filter((n) => !n.isRead).length;
};

export const markAsRead = async (id) => {
  await mockDelay(200, 400);
  const notifs = getAll();
  save(notifs.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  return { success: true };
};

export const markAllAsRead = async () => {
  await mockDelay(300, 600);
  save(getAll().map((n) => ({ ...n, isRead: true })));
  return { success: true };
};
