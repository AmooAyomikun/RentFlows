import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSession } from '../services/authService';

/**
 * Auth store — holds the current user session, role and auth state.
 * Persisted to localStorage so a page refresh keeps the user logged in during demos.
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      role: null, // 'landlord' | 'tenant' | null

      /** Initialize from existing localStorage session (call on app mount) */
      init: () => {
        const session = getSession();
        if (session) {
          set({ user: session, isAuthenticated: true, role: session.role });
        }
      },

      /** Called after successful mock login */
      setUser: (user) =>
        set({ user, isAuthenticated: true, role: user.role }),

      /** Update user profile fields */
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      /** Called on logout */
      clearUser: () =>
        set({ user: null, isAuthenticated: false, role: null }),
    }),
    {
      name: 'rf_auth',
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
      }),
    }
  )
);

export default useAuthStore;
