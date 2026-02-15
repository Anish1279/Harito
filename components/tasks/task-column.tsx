'use client';

import { Task, useTasks } from '@/lib/context/tasks-context';
import { TaskCard } from './task-card';
import { useState } from 'react';

interface TaskColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
}

export function TaskColumn({ title, status, tasks }: TaskColumnProps) {
  const { reorderTasks } = useTasks();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const taskId = e.dataTransfer.getData('taskId');
    const fromStatus = e.dataTransfer.getData('taskStatus') as Task['status'];

    if (taskId && fromStatus) {
      try {
        // Calculate position based on drop location
        const newPosition = tasks.length;
        await reorderTasks(taskId, fromStatus, status, newPosition);
      } catch (error) {
        console.error('Failed to reorder task:', error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Column Header */}
      <div className="flex items-center justify-between px-2">
        <h2 className="font-semibold text-foreground text-sm md:text-base">
          {title}
        </h2>
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
          {tasks.length}
        </span>
      </div>

      {/* Tasks Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col gap-3 min-h-96 rounded-lg border-2 transition-colors p-4 ${
          isDragOver
            ? 'border-primary bg-primary/5'
            : 'border-border/50 bg-secondary/30'
        }`}
      >
        {tasks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-64">
            <p className="text-center text-sm text-muted-foreground">
              No tasks yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
