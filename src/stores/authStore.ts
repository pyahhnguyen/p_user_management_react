import { create } from 'zustand';

type Page = 'login' | 'register' | 'dashboard';

interface AuthState {
  currentPage: Page;
  isAuthenticated: boolean;
  setCurrentPage: (page: Page) => void;
  login: () => void;
  logout: () => void;
  registerSuccess: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentPage: 'login',
  isAuthenticated: false,
  setCurrentPage: (page) => set({ currentPage: page }),
  login: () => set({ isAuthenticated: true, currentPage: 'dashboard' }),
  logout: () => set({ isAuthenticated: false, currentPage: 'login' }),
  registerSuccess: () => set({ isAuthenticated: false, currentPage: 'login' }),
}));

