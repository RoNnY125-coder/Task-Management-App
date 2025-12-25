import { useState } from 'react';
import { Task, Status, Priority } from '@/types/task';
import { useTasks } from '@/contexts/TaskContext';
import { PriorityBadge } from './StatusBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { format, isAfter, isBefore, startOfToday } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onEdit, isDragging }: TaskCardProps) {
  const { users, labels, deleteTask } = useTasks();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const assignedUsers = users.filter(u => task.assignees.includes(u.id));
  const taskLabels = labels.filter(l => task.labels.includes(l.id));
  
  const isOverdue = task.dueDate && isBefore(new Date(task.dueDate), startOfToday()) && task.status !== 'done';
  const isDueSoon = task.dueDate && !isOverdue && isBefore(new Date(task.dueDate), new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div
        className={cn(
          "group p-4 rounded-xl bg-card border border-border shadow-custom-sm",
          "hover:shadow-custom-md hover:border-primary/20 transition-all duration-200",
          "cursor-grab active:cursor-grabbing",
          isDragging && "rotate-2 shadow-custom-lg opacity-90"
        )}
      >
        {/* Header with priority and actions */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <PriorityBadge priority={task.priority} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Title */}
        <h3 
          className="font-medium text-foreground mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => onEdit(task)}
        >
          {task.title}
        </h3>

        {/* Description preview */}
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {task.description}
          </p>
        )}

        {/* Labels */}
        {taskLabels.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {taskLabels.map(label => (
              <Badge 
                key={label.id}
                variant="secondary"
                className="text-xs px-2 py-0"
                style={{ 
                  backgroundColor: `${label.color}15`,
                  color: label.color,
                  borderColor: `${label.color}30`
                }}
              >
                {label.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-3">
            {/* Due date */}
            {task.dueDate && (
              <div className={cn(
                "flex items-center gap-1 text-xs",
                isOverdue && "text-destructive",
                isDueSoon && !isOverdue && "text-priority-medium",
                !isOverdue && !isDueSoon && "text-muted-foreground"
              )}>
                <Calendar className="h-3.5 w-3.5" />
                {format(new Date(task.dueDate), 'MMM d')}
              </div>
            )}

            {/* Comments count */}
            {task.comments.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                {task.comments.length}
              </div>
            )}
          </div>

          {/* Assignees */}
          {assignedUsers.length > 0 && (
            <div className="flex -space-x-2">
              {assignedUsers.slice(0, 3).map(user => (
                <Avatar key={user.id} className="h-6 w-6 border-2 border-card">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {assignedUsers.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center border-2 border-card">
                  <span className="text-xs text-muted-foreground">+{assignedUsers.length - 3}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete task?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{task.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
