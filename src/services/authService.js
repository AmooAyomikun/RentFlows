import currentUserData from '../mocks/currentUser.json';
import { mockDelay, lsGet, lsSet } from './mockUtils';

const LS_KEY = 'rf_session';

const LS_USERS_KEY = 'rf_users';
const getUsers = () => lsGet(LS_USERS_KEY, [currentUserData.landlord, currentUserData.tenant]);

/**
 * Returns the current session from localStorage, or null if not logged in.
 */
export const getSession = () => lsGet(LS_KEY, null);

/**
 * Mock login — matches email against known mock users and sets session.
 * @param {{ email: string, password: string }} credentials
 */
export const login = async ({ email, password }) => {
  await mockDelay(600, 1000);

  if (!password || password.length < 1) {
    throw new Error('Password is required.');
  }

  const users = getUsers();
  const foundUser = users.find(u => u.email === email);
  
  if (foundUser) {
    lsSet(LS_KEY, foundUser);
    return foundUser;
  }

  // Accept any @landlord.com or @tenant.com for demo convenience
  if (email.includes('@landlord')) {
    const user = { ...currentUserData.landlord, email };
    lsSet(LS_KEY, user);
    return user;
  }

  if (email.includes('@tenant')) {
    const user = { ...currentUserData.tenant, email };
    lsSet(LS_KEY, user);
    return user;
  }

  throw new Error('Invalid email or password. Try chidi@rentflow.ng (landlord) or adaeze@gmail.com (tenant).');
};

/**
 * Mock signup — creates a new landlord session.
 */
export const signup = async (data) => {
  await mockDelay(800, 1200);

  const role = data.role || 'landlord';
  const baseUser = role === 'tenant' ? currentUserData.tenant : currentUserData.landlord;
  const user = {
    ...baseUser,
    id: `user-${Date.now()}`,
    name: data.name || baseUser.name,
    email: data.email || baseUser.email,
    phone: data.phone || baseUser.phone,
    businessName: data.businessName || baseUser.businessName,
    role,
  };

  const users = getUsers();
  lsSet(LS_USERS_KEY, [...users, user]);
  lsSet(LS_KEY, user);
  return user;
};

/**
 * Mock logout — clears the session.
 */
export const logout = async () => {
  await mockDelay(200, 400);
  localStorage.removeItem(LS_KEY);
};

/**
 * Mock forgot-password — always succeeds for any email.
 */
export const forgotPassword = async ({ email }) => {
  await mockDelay(600, 1000);
  if (!email || !email.includes('@')) throw new Error('Please enter a valid email address.');
  return { message: `Reset link sent to ${email}` };
};

/**
 * Mock reset-password — always succeeds.
 */
export const resetPassword = async ({ password }) => {
  await mockDelay(600, 1000);
  if (!password || password.length < 8) throw new Error('Password must be at least 8 characters.');
  return { message: 'Password reset successfully.' };
};

/**
 * Mock invite acceptance for tenant onboarding.
 */
export const acceptInvite = async ({ token, password }) => {
  await mockDelay(800, 1200);
  const user = { ...currentUserData.tenant };
  lsSet(LS_KEY, user);
  return user;
};

/**
 * Mock invite record lookup.
 */
export const getInviteByToken = async (token) => {
  await mockDelay(400, 700);
  return {
    token,
    landlordName: 'Chidi Amaechi',
    propertyName: 'Greenview Estate Block A',
    unitLabel: 'Unit A8',
    rentAmount: 280000,
    dueDayOfMonth: 15,
  };
};
