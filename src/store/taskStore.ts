import { create } from 'zustand';
import { Task, LogEntry } from '../types';
import { useAuthStore } from './authStore';

interface TaskState {
  tasks: Task[];
  logs: LogEntry[];
  addTask: (reference: string, status: Task['status']) => void;
  updateTaskStatus: (reference: string, status: Task['status']) => void;
  deleteTask: (reference: string) => void;
  addLogEntry: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  updateLogEntry: (id: string, details: string) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  logs: [],
  addTask: (reference, status) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const newTask: Task = {
      reference,
      status,
      createdAt: new Date().toISOString(),
      createdBy: user.id,
      updatedAt: new Date().toISOString(),
      updatedBy: user.id,
    };

    set(state => ({
      tasks: [...state.tasks, newTask],
    }));

    get().addLogEntry({
      userId: user.id,
      userName: user.name,
      action: 'create_task',
      taskReference: reference,
      details: `Created task with reference ${reference}`,
    });
  },
  updateTaskStatus: (reference, status) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set(state => ({
      tasks: state.tasks.map(task =>
        task.reference === reference
          ? { ...task, status, updatedAt: new Date().toISOString(), updatedBy: user.id }
          : task
      ),
    }));

    get().addLogEntry({
      userId: user.id,
      userName: user.name,
      action: 'update_status',
      taskReference: reference,
      details: `Updated task status to ${status}`,
    });
  },
  deleteTask: (reference) => {
    const user = useAuthStore.getState().user;
    if (!user || user.role !== 'admin') return;

    set(state => ({
      tasks: state.tasks.filter(task => task.reference !== reference),
    }));

    get().addLogEntry({
      userId: user.id,
      userName: user.name,
      action: 'delete_task',
      taskReference: reference,
      details: `Deleted task ${reference}`,
    });
  },
  addLogEntry: (entry) => {
    const newEntry: LogEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    set(state => ({
      logs: [...state.logs, newEntry],
    }));
  },
  updateLogEntry: (id, details) => {
    const user = useAuthStore.getState().user;
    if (!user || user.role !== 'admin') return;

    set(state => ({
      logs: state.logs.map(log =>
        log.id === id ? { ...log, details } : log
      ),
    }));
  },
}));