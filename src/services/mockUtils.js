/**
 * Mock delay utility — simulates realistic network latency.
 * @param {number} [min=400] - Minimum delay in ms
 * @param {number} [max=900] - Maximum delay in ms
 */
export const mockDelay = (min = 400, max = 900) =>
  new Promise((resolve) =>
    setTimeout(resolve, min + Math.random() * (max - min))
  );

/**
 * Occasionally throws a mock error to test error states.
 * @param {number} [rate=0] - Error rate 0–1 (e.g. 0.1 = 10% chance)
 */
export const maybeError = (rate = 0) => {
  if (Math.random() < rate) {
    throw new Error('Mock network error — try again.');
  }
};

/**
 * Reads from localStorage with a fallback to the provided default.
 */
export const lsGet = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Writes to localStorage.
 */
export const lsSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silent fail for storage quota issues
  }
};
