import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  users: User[];
  error: string | null;
  login: (code: string) => void;
  logout: () => void;
  clearError: () => void;
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (id: string) => void;
  updateUser: (id: string, updates: Partial<Omit<User, 'id'>>) => void;
}

// Initialize with the admin user
const initialUsers: User[] = [
  { 
    id: 'admin',
    email: 'admin_bobAPP',
    name: 'Administrador',
    role: 'admin'
  }
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  users: initialUsers,
  error: null,
  login: (code: string) => {
    const user = get().users.find(u => u.email.toLowerCase() === code.toLowerCase());
    if (user) {
      set({ user, error: null });
    } else {
      set({ error: 'Código de usuario no válido' });
    }
  },
  logout: () => set({ user: null, error: null }),
  clearError: () => set({ error: null }),
  addUser: (userData) => {
    const { user, users } = get();
    if (user?.role !== 'admin') return;

    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
    };
    set({ users: [...users, newUser] });
  },
  deleteUser: (id) => {
    const { user, users } = get();
    if (user?.role !== 'admin' || id === user.id) return;
    set({ users: users.filter(u => u.id !== id) });
  },
  updateUser: (id, updates) => {
    const { user, users } = get();
    if (user?.role !== 'admin') return;
    set({
      users: users.map(u => u.id === id ? { ...u, ...updates } : u)
    });
  }
}));