'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { useTasks } from '@/lib/context/tasks-context';
import { TaskBoardHeader } from '@/components/tasks/task-board-header';
import { TaskColumn } from '@/components/tasks/task-column';
import { NewTaskDialog } from '@/components/tasks/new-task-dialog';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuth();
  const { tasks, searchTasks } = useTasks();
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isInitialized, router]);

  // Update filtered tasks when search query or tasks change
  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredTasks(searchTasks(searchQuery));
    } else {
      setFilteredTasks(tasks);
    }
  }, [searchQuery, tasks, searchTasks]);

  if (!isInitialized || !isAuthenticated) {
    return null;
  }

  // Get tasks by status
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const doneTasks = filteredTasks.filter(task => task.status === 'done');

  return (
    <div className="min-h-screen bg-background">
      <TaskBoardHeader
        onNewTask={() => setNewTaskDialogOpen(true)}
        onSearch={setSearchQuery}
      />

      {/* Main Content */}
      <main className="max-w-full px-4 md:px-6 py-8">
        {filteredTasks.length === 0 && searchQuery ? (
          // Empty search results
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-foreground mb-2">
              No tasks found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          // Task board grid
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn
              title="To Do"
              status="todo"
              tasks={todoTasks}
            />
            <TaskColumn
              title="In Progress"
              status="in-progress"
              tasks={inProgressTasks}
            />
            <TaskColumn
              title="Done"
              status="done"
              tasks={doneTasks}
            />
          </div>
        )}
      </main>

      {/* New Task Dialog */}
      <NewTaskDialog
        open={newTaskDialogOpen}
        onOpenChange={setNewTaskDialogOpen}
      />
    </div>
  );
}
