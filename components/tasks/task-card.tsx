'use client';

import { Task } from '@/lib/context/tasks-context';
import { useTasks } from '@/lib/context/tasks-context';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, GripVertical } from 'lucide-react';
import { useState } from 'react';
import { TaskEditDialog } from './task-edit-dialog';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

export function TaskCard({ task, isDragging }: TaskCardProps) {
  const { deleteTask } = useTasks();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('taskStatus', task.status);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        className={`rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md cursor-move ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        {/* Header with drag handle */}
        <div className="flex items-start gap-3 mb-3">
          <div className="cursor-grab active:cursor-grabbing mt-1 text-muted-foreground hover:text-foreground transition-colors">
            <GripVertical className="h-4 w-4" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2 break-words">
              {task.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 break-words">
            {task.description}
          </p>
        )}

        {/* Priority badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEditDialog(true)}
            className="flex-1 h-8"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>

      <TaskEditDialog
        task={task}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}
