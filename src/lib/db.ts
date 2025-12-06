import Dexie, { type Table } from 'dexie';

export interface Task {
  id?: number;
  title: string;
  completed: boolean;
  dueDate: Date;
  recurrence?: string;
  priority: number;
  tags: string[];
  createdAt: Date;
  streakImpact: boolean;
}

export interface UserData {
  id?: number;
  name?: string;
  email?: string;
  points: number;
  currentStreak: number;
  lastCompletedDate: Date | null;
}

export interface ActivityLog {
  id?: number;
  date: Date;
  taskId: number;
  action: 'completed' | 'created';
}

export class StreaklyDatabase extends Dexie {
  tasks!: Table<Task>;
  userData!: Table<UserData>;
  activityLog!: Table<ActivityLog>;

  constructor() {
    super('StreaklyDB');
    this.version(1).stores({
      tasks: '++id, title, completed, dueDate, recurrence',
      userData: '++id',
    });
    this.version(2).stores({
      tasks: '++id, title, completed, dueDate, recurrence, priority',
    });
    this.version(3).stores({
      tasks: '++id, title, completed, dueDate, recurrence, priority, *tags',
      activityLog: '++id, date, action'
    });
    this.version(4).stores({
      userData: '++id, name, email' // Upgrade user table
    });
  }
}

export const db = new StreaklyDatabase();

// Initialize user data if not exists
db.on('populate', async () => {
  await db.userData.add({
    points: 0,
    currentStreak: 0,
    lastCompletedDate: null
  });
});
