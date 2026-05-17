import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Goal, UserRole, AuditLog } from '@/types';

interface AppState {
  currentUser: User | null;
  users: User[];
  goals: Goal[];
  auditLogs: AuditLog[];
  
  // Actions
  login: (role: UserRole) => void;
  logout: () => void;
  
  // Goal Management
  addGoal: (goal: Omit<Goal, 'id' | 'currentValue' | 'lastUpdated'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  submitGoals: (userId: string) => void;
  
  // Manager Actions
  approveGoal: (id: string, comment?: string) => void;
  reworkGoal: (id: string, comment: string) => void;
  
  // Admin Actions
  unlockGoals: (userId: string, reason: string) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
}

const demoUsers: User[] = [
  { id: 'emp-1', name: 'Alex Rivera', email: 'alex@strata.ai', role: 'employee', department: 'Engineering', managerId: 'man-1', avatar: 'https://picsum.photos/seed/alex/100' },
  { id: 'man-1', name: 'Sarah Chen', email: 'sarah@strata.ai', role: 'manager', department: 'Engineering', avatar: 'https://picsum.photos/seed/sarah/100' },
  { id: 'adm-1', name: 'HR Admin', email: 'hr@strata.ai', role: 'admin', department: 'Operations', avatar: 'https://picsum.photos/seed/admin/100' },
];

const initialGoals: Goal[] = [
  {
    id: 'g1',
    userId: 'emp-1',
    thrustArea: 'Product Quality',
    title: 'Reduce bug density in core modules',
    description: 'Achieve a 20% reduction in open critical bugs by implementing automated regression tests.',
    unit: 'Bugs/KLOC',
    target: 0.5,
    weightage: 30,
    status: 'approved',
    currentValue: 0.7,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'g2',
    userId: 'emp-1',
    thrustArea: 'Innovation',
    title: 'Launch 3 beta features for Enterprise Tier',
    description: 'Successfully move 3 major features from design to beta production for Tier 1 clients.',
    unit: 'Features',
    target: 3,
    weightage: 40,
    status: 'approved',
    currentValue: 1,
    lastUpdated: new Date().toISOString(),
  },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: demoUsers,
      goals: initialGoals,
      auditLogs: [],

      login: (role: UserRole) => {
        const user = demoUsers.find(u => u.role === role) || null;
        set({ currentUser: user });
      },

      logout: () => set({ currentUser: null }),

      addGoal: (goalData) => set((state) => {
        const newGoal: Goal = {
          ...goalData,
          id: Math.random().toString(36).substr(2, 9),
          currentValue: 0,
          lastUpdated: new Date().toISOString(),
          status: 'draft',
        };
        return { goals: [...state.goals, newGoal] };
      }),

      updateGoal: (id, updates) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, ...updates, lastUpdated: new Date().toISOString() } : g)
      })),

      deleteGoal: (id) => set((state) => ({
        goals: state.goals.filter(g => g.id !== id)
      })),

      submitGoals: (userId) => set((state) => ({
        goals: state.goals.map(g => g.userId === userId && g.status === 'draft' ? { ...g, status: 'pending' } : g)
      })),

      approveGoal: (id, comment) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, status: 'approved', managerComment: comment } : g)
      })),

      reworkGoal: (id, comment) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, status: 'rework', managerComment: comment } : g)
      })),

      unlockGoals: (userId, reason) => {
        set((state) => ({
          goals: state.goals.map(g => g.userId === userId ? { ...g, status: 'draft' } : g)
        }));
        get().addAuditLog({ userId, action: 'Unlock Goals', details: reason });
      },

      addAuditLog: (log) => set((state) => ({
        auditLogs: [
          { ...log, id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString() },
          ...state.auditLogs
        ]
      })),
    }),
    {
      name: 'strata-performance-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
