import { create } from 'zustand';
import type { User, UserFormData } from '../types/User';

interface UserState {
  users: User[];
  searchTerm: string;
  editingUser: User | null;
  showForm: boolean;
  setUsers: (users: User[]) => void;
  setSearchTerm: (term: string) => void;
  setEditingUser: (user: User | null) => void;
  setShowForm: (show: boolean) => void;
  addUser: (data: UserFormData) => void;
  updateUser: (data: UserFormData) => void;
  deleteUser: (id: string) => void;
  loadUsers: () => void;
  getFilteredUsers: () => User[];
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  searchTerm: '',
  editingUser: null,
  showForm: false,
  
  setUsers: (users) => {
    console.log('setUsers: setting users:', users);
    set({ users });
    localStorage.setItem('users', JSON.stringify(users));
  },
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  setEditingUser: (user) => set({ editingUser: user }),
  setShowForm: (show) => set({ showForm: show }),
  
  addUser: (data) => {
    console.log('addUser: adding data:', data);
    const newUser: User = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const currentUsers = get().users;
    const updatedUsers = [...currentUsers, newUser];
    console.log('addUser: updatedUsers:', updatedUsers);
    get().setUsers(updatedUsers);
    set({ showForm: false });
  },
  
  updateUser: (data) => {
    const { users, editingUser } = get();
    if (editingUser) {
      const updatedUsers = users.map(user =>
        user.id === editingUser.id ? { ...user, ...data } : user
      );
      get().setUsers(updatedUsers);
      set({ editingUser: null, showForm: false });
    }
  },
  
  deleteUser: (id) => {
    console.log('deleteUser: deleting id:', id);
    const currentUsers = get().users;
    console.log('deleteUser: currentUsers before:', currentUsers);
    const updatedUsers = currentUsers.filter(user => user.id !== id);
    console.log('deleteUser: updatedUsers after:', updatedUsers);
    get().setUsers(updatedUsers);
  },
  
  loadUsers: () => {
    const savedUsers = localStorage.getItem('users');
    console.log('loadUsers: savedUsers from localStorage:', savedUsers);
    
    if (savedUsers) {
      try {
        const users = JSON.parse(savedUsers);
        console.log('loadUsers: parsed users:', users);
        set({ users });
      } catch (error) {
        console.error('Error parsing users from localStorage:', error);
        set({ users: [] });
      }
    } else {
      const sampleUsers: User[] = [
        {
          id: '1',
          fullName: 'John Doe',
          email: 'john@example.com',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          createdAt: new Date().toISOString(),
        },
      ];
      console.log('loadUsers: creating sample users:', sampleUsers);
      set({ users: sampleUsers });
      localStorage.setItem('users', JSON.stringify(sampleUsers));
    }
  },
  
  getFilteredUsers: () => {
    const { users, searchTerm } = get();
    if (!searchTerm) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(
      user =>
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  },
}));

