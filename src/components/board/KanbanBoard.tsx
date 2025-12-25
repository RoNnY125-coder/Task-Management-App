import { useState } from 'react';
import { Task, Status, Priority } from '@/types/task';
import { useTasks } from '@/contexts/TaskContext';
import { useTheme } from '@/contexts/ThemeContext';
import { KanbanColumn } from './KanbanColumn';
import { TaskModal } from './TaskModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  Moon, 
  Sun, 
  LayoutGrid, 
  List, 
  Calendar,
  CheckSquare,
  Settings,
  LogOut,
  User,
  ChevronDown,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const statuses: Status[] = ['todo', 'in-progress', 'review', 'done'];

export function KanbanBoard() {
  const { tasks, currentUser, users, labels } = useTasks();
  const { theme, toggleTheme } = useTheme();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<Status>('todo');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAssignee, setFilterAssignee] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');

  const handleAddTask = (status: Status) => {
    setEditingTask(null);
    setDefaultStatus(status);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterAssignee('');
    setFilterPriority('');
  };

  const hasActiveFilters = searchQuery || filterAssignee || filterPriority;

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo and navigation */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
                <CheckSquare className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-foreground hidden sm:block">TaskFlow</span>
            </Link>

            <Badge variant="secondary" className="hidden lg:flex">
              Product Team
            </Badge>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md mx-6 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <Button
              onClick={() => handleAddTask('todo')}
              className="gap-2 h-9"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Task</span>
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2 px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sub-header with filters */}
      <div className="border-b border-border bg-muted/20 px-6 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-medium">{totalTasks}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-status-progress" />
              <span className="text-muted-foreground">In Progress:</span>
              <span className="font-medium">{inProgressTasks}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-status-done" />
              <span className="text-muted-foreground">Completed:</span>
              <span className="font-medium">{completedTasks}</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="hidden lg:flex items-center gap-1 p-1 rounded-lg bg-muted">
              <Button variant="ghost" size="icon" className="h-7 w-7 bg-background shadow-sm">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-6 w-px bg-border hidden lg:block" />

            {/* Assignee filter */}
            <Select value={filterAssignee} onValueChange={setFilterAssignee}>
              <SelectTrigger className="w-[140px] h-8 text-sm">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All assignees</SelectItem>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {user.name.split(' ')[0]}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Priority filter */}
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[120px] h-8 text-sm">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priorities</SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-priority-high" />
                    High
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-priority-medium" />
                    Medium
                  </div>
                </SelectItem>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-priority-low" />
                    Low
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Board */}
      <main className="p-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {statuses.map(status => (
            <KanbanColumn
              key={status}
              status={status}
              onEditTask={handleEditTask}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      </main>

      {/* Task Modal */}
      <TaskModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        task={editingTask}
        defaultStatus={defaultStatus}
      />
    </div>
  );
}
