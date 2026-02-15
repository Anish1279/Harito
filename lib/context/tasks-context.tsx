'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TaskInput, BatchTaskUpdate } from '../validations';

export interface Task extends TaskInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface TasksContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: Omit<TaskInput, 'id'>) => Promise<void>;
  updateTask: (id: string, task: Partial<TaskInput>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteMultiple: (ids: string[]) => Promise<void>;
  updateMultiple: (update: BatchTaskUpdate) => Promise<void>;
  getTasksByStatus: (status: TaskInput['status']) => Task[];
  searchTasks: (query: string) => Task[];
  reorderTasks: (taskId: string, fromStatus: Task['status'], toStatus: Task['status'], newPosition: number) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deduplicate tasks by ID
        const seen = new Set();
        const uniqueTasks = parsed.reduce((acc: Task[], task: Task) => {
          if (!seen.has(task.id)) {
            seen.add(task.id);
            acc.push(task);
          } else {
            // If duplicate found, create a new ID
            const newId = `${task.id}_${Math.random().toString(36).substr(2, 9)}`;
            seen.add(newId);
            acc.push({ ...task, id: newId });
          }
          return acc;
        }, []);
        setTasks(uniqueTasks);
        if (uniqueTasks.length !== parsed.length) {
          localStorage.setItem('tasks', JSON.stringify(uniqueTasks));
        }
      }
    } catch (err) {
      console.error('Failed to restore tasks:', err);
    }
  }, []);

  const persistTasks = useCallback((newTasks: Task[]) => {
    try {
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (err) {
      console.error('Failed to persist tasks:', err);
    }
  }, []);

  const addTask = useCallback(async (taskData: Omit<TaskInput, 'id'>) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      const newTask: Task = {
        id: crypto.randomUUID(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setTasks(prev => {
        const updatedTasks = [...prev, newTask];
        persistTasks(updatedTasks);
        return updatedTasks;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add task';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [persistTasks]);

  const updateTask = useCallback(async (id: string, taskData: Partial<TaskInput>) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      setTasks(prev => {
        const updatedTasks = prev.map(task =>
          task.id === id
            ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
            : task
        );
        persistTasks(updatedTasks);
        return updatedTasks;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update task';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [persistTasks]);

  const deleteTask = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setTasks(prev => {
        const updatedTasks = prev.filter(task => task.id !== id);
        persistTasks(updatedTasks);
        return updatedTasks;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [persistTasks]);

  const deleteMultiple = useCallback(async (ids: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      setTasks(prev => {
        const updatedTasks = prev.filter(task => !ids.includes(task.id));
        persistTasks(updatedTasks);
        return updatedTasks;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete tasks';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [persistTasks]);

  const updateMultiple = useCallback(async (update: BatchTaskUpdate) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      setTasks(prev => {
        const updatedTasks = prev.map(task =>
          update.taskIds.includes(task.id)
            ? {
              ...task,
              ...(update.status && { status: update.status }),
              ...(update.priority && { priority: update.priority }),
              updatedAt: new Date().toISOString(),
            }
            : task
        );
        persistTasks(updatedTasks);
        return updatedTasks;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update tasks';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [persistTasks]);

  const getTasksByStatus = useCallback((status: TaskInput['status']) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  const searchTasks = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return tasks.filter(task =>
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description?.toLowerCase().includes(lowerQuery)
    );
  }, [tasks]);

  const reorderTasks = useCallback(async (taskId: string, fromStatus: Task['status'], toStatus: Task['status'], newPosition: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 200));

      setTasks(prev => {
        const updatedTasks = [...prev];
        const taskIndex = updatedTasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) return prev;

        // Remove the task from its current position
        const [draggedTask] = updatedTasks.splice(taskIndex, 1);

        // Update task status
        const updatedTask = {
          ...draggedTask,
          status: toStatus,
          updatedAt: new Date().toISOString()
        };

        // Calculate insertion index
        const destTasks = updatedTasks.filter(t => t.status === toStatus);
        let insertIndex = -1;

        if (destTasks.length === 0) {
          // If destination is empty, append to end (or beginning, doesn't matter much effectively but end is safer)
          insertIndex = updatedTasks.length;
        } else if (newPosition >= destTasks.length) {
          // Insert after the last task of this status
          const lastTask = destTasks[destTasks.length - 1];
          insertIndex = updatedTasks.indexOf(lastTask) + 1;
        } else {
          // Insert before the task at newPosition
          const targetTask = destTasks[newPosition];
          insertIndex = updatedTasks.indexOf(targetTask);
        }

        // Safety check
        if (insertIndex === -1) insertIndex = updatedTasks.length;

        updatedTasks.splice(insertIndex, 0, updatedTask);

        persistTasks(updatedTasks);
        return updatedTasks;
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reorder tasks';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [persistTasks]);

  const value: TasksContextType = {
    tasks,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    deleteMultiple,
    updateMultiple,
    getTasksByStatus,
    searchTasks,
    reorderTasks,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
