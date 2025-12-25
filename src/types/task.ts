export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'review' | 'done';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  details?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: Date | null;
  assignees: string[];
  labels: string[];
  comments: Comment[];
  activityLog: ActivityLog[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Column {
  id: Status;
  title: string;
  tasks: Task[];
}

export interface Workspace {
  id: string;
  name: string;
  members: string[];
  tasks: Task[];
  labels: Label[];
}
