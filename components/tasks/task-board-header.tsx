'use client';

import { useAuth } from '@/lib/context/auth-context';
import { useTasks } from '@/lib/context/tasks-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogOut, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TaskBoardHeaderProps {
  onNewTask: () => void;
  onSearch: (query: string) => void;
}

export function TaskBoardHeader({ onNewTask, onSearch }: TaskBoardHeaderProps) {
  const { logout, user } = useAuth();
  const router = useRouter();
  const { tasks } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header className="border-b border-border bg-card shadow-sm sticky top-0 z-10">
      <div className="max-w-full px-4 md:px-6 py-4">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
          {/* Left side - Title and stats */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Task Board
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Total tasks: <span className="font-semibold text-foreground">{tasks.length}</span></span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Welcome, <span className="font-semibold text-foreground">{user?.name}</span></span>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-10 w-full sm:w-48"
              />
            </div>

            <Button
              onClick={onNewTask}
              className="h-10 gap-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              New Task
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleLogout}
              className="h-10 w-10 hidden sm:flex"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="h-10 sm:hidden w-full justify-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
