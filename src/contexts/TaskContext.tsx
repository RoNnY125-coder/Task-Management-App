import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task, Status, Priority, Label, User } from '@/types/task';
import { mockTasks, mockLabels, mockUsers, currentUser } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface TaskContextType {
  tasks: Task[];
  labels: Label[];
  users: User[];
  currentUser: User;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'activityLog' | 'comments'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: Status) => void;
  reorderTasks: (sourceIndex: number, destIndex: number, status: Status) => void;
  getTasksByStatus: (status: Status) => Task[];
  searchTasks: (query: string) => Task[];
  filterTasks: (filters: {
    assignee?: string;
    priority?: Priority;
    status?: Status;
    label?: string;
  }) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [labels] = useState<Label[]>(mockLabels);
  const [users] = useState<User[]>(mockUsers);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'activityLog' | 'comments'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      activityLog: [{
        id: `activity-${Date.now()}`,
        userId: currentUser.id,
        action: 'created',
        timestamp: new Date(),
      }],
      comments: [],
    };
    setTasks(prev => [...prev, newTask]);
    toast({
      title: 'Task created',
      description: `"${taskData.title}" has been added to the board.`,
    });
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
    toast({
      title: 'Task updated',
      description: 'Your changes have been saved.',
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: 'Task deleted',
      description: 'The task has been removed from the board.',
    });
  }, []);

  const moveTask = useCallback((taskId: string, newStatus: Status) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          updatedAt: new Date(),
          activityLog: [
            ...task.activityLog,
            {
              id: `activity-${Date.now()}`,
              userId: currentUser.id,
              action: `moved to ${newStatus.replace('-', ' ')}`,
              timestamp: new Date(),
            },
          ],
        };
      }
      return task;
    }));
  }, []);

  const reorderTasks = useCallback((sourceIndex: number, destIndex: number, status: Status) => {
    setTasks(prev => {
      const statusTasks = prev.filter(t => t.status === status);
      const otherTasks = prev.filter(t => t.status !== status);
      const [removed] = statusTasks.splice(sourceIndex, 1);
      statusTasks.splice(destIndex, 0, removed);
      return [...otherTasks, ...statusTasks];
    });
  }, []);

  const getTasksByStatus = useCallback((status: Status) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  const searchTasks = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(lowercaseQuery) ||
      task.description.toLowerCase().includes(lowercaseQuery)
    );
  }, [tasks]);

  const filterTasks = useCallback((filters: {
    assignee?: string;
    priority?: Priority;
    status?: Status;
    label?: string;
  }) => {
    return tasks.filter(task => {
      if (filters.assignee && !task.assignees.includes(filters.assignee)) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.status && task.status !== filters.status) return false;
      if (filters.label && !task.labels.includes(filters.label)) return false;
      return true;
    });
  }, [tasks]);

  return (
    <TaskContext.Provider value={{
      tasks,
      labels,
      users,
      currentUser,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      reorderTasks,
      getTasksByStatus,
      searchTasks,
      filterTasks,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
