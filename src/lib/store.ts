import { create } from 'zustand';
import { db, type Task, type UserData } from './db';
import { liveQuery } from 'dexie';
import confetti from 'canvas-confetti';
import { isSameDay, subDays } from 'date-fns';

interface AppState {
  tasks: Task[];
  user: UserData | null;
  isLoading: boolean;
  initialized: boolean;
  
  // Actions
  init: () => Promise<void>;
  addTask: (title: string, recurrence?: string, priority?: number, tags?: string[]) => Promise<void>;
  toggleTask: (id: number, completed: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  checkStreak: () => Promise<void>;
  updateProfile: (name: string, email: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  tasks: [],
  user: null,
  isLoading: true,
  initialized: false,

  init: async () => {
    // Subscribe to Dexie changes
    liveQuery(() => db.tasks.toArray()).subscribe(tasks => {
      set({ tasks });
    });
    
    liveQuery(() => db.userData.toArray()).subscribe(users => {
      if (users.length > 0) {
        set({ user: users[0] });
      }
    });

    set({ isLoading: false, initialized: true });
  },

  addTask: async (title: string, recurrence?: string, priority: number = 1, tags: string[] = []) => {
    const id = await db.tasks.add({
      title,
      completed: false,
      dueDate: new Date(),
      recurrence,
      priority,
      tags,
      createdAt: new Date(),
      streakImpact: true,
    });
    
    await db.activityLog.add({
      date: new Date(),
      taskId: id as number,
      action: 'created'
    });
  },

  toggleTask: async (id: number, completed: boolean) => {
    await db.tasks.update(id, { completed });
    
    if (completed) {
      // Log activity
      await db.activityLog.add({
        date: new Date(),
        taskId: id,
        action: 'completed'
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Update points
      const user = get().user;
      if (user && user.id) {
        await db.userData.update(user.id, {
          points: user.points + 10
        });
        get().checkStreak();
      }
    }
  },

  deleteTask: async (id: number) => {
    await db.tasks.delete(id);
  },

  checkStreak: async () => {
    const user = get().user;
    if (!user || !user.id) return;

    // Simple streak logic: if completed a task today, and last completed was yesterday, increment.
    // Note: Real implementation needs more robust checking against "all daily tasks" or similar.
    // For MVP: Completing ANY task extends streak if not already extended today.
    
    const today = new Date();
    const lastDate = user.lastCompletedDate;
    
    if (!lastDate) {
      // First ever task
      await db.userData.update(user.id, {
        currentStreak: 1,
        lastCompletedDate: today
      });
      return;
    }

    if (isSameDay(today, lastDate)) {
      // Already counted for today
      return;
    }

    if (isSameDay(lastDate, subDays(today, 1))) {
      // Streak continues
      await db.userData.update(user.id, {
        currentStreak: user.currentStreak + 1,
        lastCompletedDate: today
      });
    } else {
      // Streak broken
      await db.userData.update(user.id, {
        currentStreak: 1,
        lastCompletedDate: today
      });
    }
  },

  updateProfile: async (name: string, email: string) => {
    const user = get().user;
    if (user && user.id) {
      await db.userData.update(user.id, { name, email });
      // Update local state immediately for UI responsiveness
      set({ user: { ...user, name, email } });
    }
  }
}));
