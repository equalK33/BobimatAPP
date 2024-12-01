export type UserRole = 'admin' | 'operator';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type TaskStatus = 'workshop' | 'quote' | 'pending_parts' | 'done';

export interface Task {
  reference: string;
  status: TaskStatus;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  taskReference?: string;
  details: string;
}