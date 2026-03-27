import { create } from 'zustand';

export type UserRole = 'rider' | 'admin' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  token: string | null;
  hasSeenNewTerms: boolean;
  isOnline: boolean;

  login: (role: UserRole, token?: string) => void;
  logout: () => void;
  setHasSeenNewTerms: (seen: boolean) => void;
  setIsOnline: (online: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: null,
  token: null,
  hasSeenNewTerms: false,
  isOnline: false,

  login: (role, token = 'mock-token') =>
    set({
      isAuthenticated: true,
      role,
      token,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      role: null,
      token: null,
      hasSeenNewTerms: false,
      isOnline: false,
    }),

  setHasSeenNewTerms: (seen) =>
    set({
      hasSeenNewTerms: seen,
    }),

  setIsOnline: (online) =>
    set({
      isOnline: online,
    }),
}));
