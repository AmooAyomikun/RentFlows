import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * UI store — cross-page UI state that doesn't belong to a single component.
 * Sidebar state is persisted; modal/drawer states are transient.
 */
const useUIStore = create(
  persist(
    (set, get) => ({
      // Sidebar (landlord dashboard)
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (val) => set({ sidebarCollapsed: val }),

      // Mobile sidebar drawer
      mobileSidebarOpen: false,
      setMobileSidebarOpen: (val) => set({ mobileSidebarOpen: val }),

      // Active modal identifier (or null)
      activeModal: null,
      openModal: (id) => set({ activeModal: id }),
      closeModal: () => set({ activeModal: null }),

      // Active drawer identifier (or null)
      activeDrawer: null,
      drawerData: null,
      openDrawer: (id, data = null) => set({ activeDrawer: id, drawerData: data }),
      closeDrawer: () => set({ activeDrawer: null, drawerData: null }),

      // Global search open state
      searchOpen: false,
      setSearchOpen: (val) => set({ searchOpen: val }),

      // Global portal language selection
      portalLanguage: 'en-US',
      setPortalLanguage: (lang) => set({ portalLanguage: lang }),
    }),
    {
      name: 'rf_ui',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        portalLanguage: state.portalLanguage,
      }),
    }
  )
);

export default useUIStore;
