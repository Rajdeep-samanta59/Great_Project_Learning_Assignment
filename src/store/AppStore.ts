import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Milestone, OptimizedRoute } from '../types';

interface AppState {
  milestones: Milestone[];
  optimizedRoute: OptimizedRoute | null;
  addMilestone: (m: Milestone) => void;
  removeMilestone: (id: string) => void;
  setOptimizedRoute: (r: OptimizedRoute) => void;
  toggleComplete: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      milestones: [],
      optimizedRoute: null,
      addMilestone: (m) => set((s) => ({ milestones: [...s.milestones, m] })),
      removeMilestone: (id) => set((s) => ({ milestones: s.milestones.filter(x => x.id !== id) })),
      setOptimizedRoute: (r) => set({ optimizedRoute: r }),
      toggleComplete: (id) => set((s) => ({
        milestones: s.milestones.map(m => m.id === id ? { ...m, completed: !m.completed } : m)
      }))
    }),
    { name: 'ma-storage', getStorage: () => AsyncStorage }
  )
);